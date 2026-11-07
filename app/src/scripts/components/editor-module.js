/**
 * EditorModule - Modern Vanilla JS HTML & Rich Text Editor (Powered by Quill)
 * Self-healing dependency loader, live HTML synchronization, word counter, and zero jQuery.
 */

// Helper to ensure Quill CSS and JS are loaded
export const ensureQuillLoaded = () => {
    return new Promise((resolve, reject) => {
        if (window.Quill) {
            return resolve(window.Quill);
        }

        // Check if script is already in document
        const existingScript = document.querySelector('script[src*="quill"]');
        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(window.Quill));
            existingScript.addEventListener('error', reject);
            return;
        }

        // Inject Stylesheet
        if (!document.querySelector('link[href*="quill"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css';
            document.head.appendChild(link);
        }

        // Inject Script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js';
        script.onload = () => resolve(window.Quill);
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

export default class EditorModule {
    /**
     * @param {string|HTMLElement} target - Selector or DOM element
     * @param {Object} options - Quill configuration options
     */
    constructor(target, options = {}) {
        this.element = typeof target === 'string' ? document.querySelector(target) : target;
        this.options = options;
        this.instance = null;
        this.selector = typeof target === 'string' ? target : 'Element';
    }

    /**
     * Initialize the editor asynchronously ensuring Quill is available
     */
    async init() {
        if (!this.element) {
            console.warn(`EditorModule: Target "${this.selector}" not found.`);
            return this;
        }

        if (this.element.getAttribute('data-quill-initialized')) {
            return this;
        }

        try {
            await ensureQuillLoaded();
        } catch (err) {
            console.error("EditorModule: Failed to load Quill library:", err);
            return this;
        }

        const toolbarOptions = [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'blockquote', 'code-block', 'image'],
            ['clean']
        ];

        this.instance = new window.Quill(this.element, {
            theme: 'snow',
            placeholder: this.options.placeholder || 'Draft your elite documentation or content...',
            modules: {
                toolbar: this.options.toolbar || toolbarOptions
            }
        });

        this.element.setAttribute('data-quill-initialized', 'true');
        this.element.__quill = this.instance;

        // Optional change listener callback
        if (typeof this.options.onChange === 'function') {
            this.instance.on('text-change', () => {
                this.options.onChange(this.getContent(), this.getText());
            });
        }

        return this;
    }

    getContent() {
        return this.instance ? this.instance.root.innerHTML : (this.element ? this.element.innerHTML : '');
    }

    getText() {
        return this.instance ? this.instance.getText() : '';
    }

    setContent(html) {
        if (this.instance) {
            this.instance.root.innerHTML = html;
        } else if (this.element) {
            this.element.innerHTML = html;
        }
    }

    destroy() {
        if (this.instance) {
            const html = this.getContent();
            const parent = this.element.parentElement;
            const toolbar = parent ? parent.querySelector('.ql-toolbar') : null;
            if (toolbar) toolbar.remove();

            this.element.innerHTML = html;
            this.element.classList.remove('ql-container', 'ql-snow');
            this.element.removeAttribute('data-quill-initialized');
            this.instance = null;
        }
    }
}
