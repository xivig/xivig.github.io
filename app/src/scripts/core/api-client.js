/**
 * XIVIG Centralized API Client & Error Handler
 * Standardizes API communication, CSRF protection, and error notification
 * across static demo and production backend environments.
 */

class XivigApiClient {
    constructor() {
        this.config = {
            baseUrl: window.XIVIG_API_BASE_URL || '',
            isPrototypeMode: window.XIVIG_PROTOTYPE_MODE !== false,
            timeout: 15000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        this.initCsrf();
    }

    /**
     * Automatically extracts CSRF token from Laravel meta tag if present
     */
    initCsrf() {
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag && metaTag.content) {
            this.config.headers['X-CSRF-TOKEN'] = metaTag.content;
            this.config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }
    }

    /**
     * Centralized request handler with timeout and error mapping
     */
    async request(endpoint, options = {}) {
        this.initCsrf();

        const url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
            ? endpoint
            : `${this.config.baseUrl}${endpoint}`;

        const isMockTarget = !endpoint || endpoint === '#' || endpoint === '/' || endpoint.startsWith('#');

        if (isMockTarget) {
            console.info(`[XIVIG ApiClient] Prototype Request to [${endpoint}]:`, options.body || {});
            return {
                ok: true,
                status: 200,
                mock: true,
                message: 'Prototype simulation: Action recorded successfully without backend persistence.',
                data: options.body ? (typeof options.body === 'string' ? JSON.parse(options.body) : options.body) : null
            };
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            const headers = { ...this.config.headers, ...(options.headers || {}) };
            
            // If body is FormData, let browser set Content-Type with boundary
            if (options.body instanceof FormData) {
                delete headers['Content-Type'];
            }

            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            let data;
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                const error = new Error(data?.message || `HTTP ${response.status}: Request failed`);
                error.status = response.status;
                error.data = data;
                throw error;
            }

            return {
                ok: true,
                status: response.status,
                data
            };
        } catch (err) {
            clearTimeout(timeoutId);
            this.handleError(err, endpoint);
            throw err;
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, body, options = {}) {
        const serialized = (body instanceof FormData || typeof body === 'string') ? body : JSON.stringify(body);
        return this.request(endpoint, { ...options, method: 'POST', body: serialized });
    }

    put(endpoint, body, options = {}) {
        const serialized = (body instanceof FormData || typeof body === 'string') ? body : JSON.stringify(body);
        return this.request(endpoint, { ...options, method: 'PUT', body: serialized });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }

    /**
     * Centralized Error Presentation
     */
    handleError(error, endpoint) {
        console.error(`[XIVIG ApiClient Error] [${endpoint}]:`, error);

        const message = error.name === 'AbortError'
            ? 'Request timed out. Please check your network connection.'
            : (error.message || 'An unexpected server error occurred.');

        if (typeof window.Swal !== 'undefined') {
            window.Swal.fire({
                icon: 'error',
                title: 'Action Failed',
                text: message,
                confirmButtonColor: '#4059E8'
            });
        }
    }
}

// Global Singleton Instance
export const apiClient = new XivigApiClient();
if (typeof window !== 'undefined') {
    window.xivigApi = apiClient;
}
