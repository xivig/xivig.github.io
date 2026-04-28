/**
 * EditorModule - A Vanilla JS Wrapper for Summernote
 * This module allows you to interact with Summernote without direct jQuery calls in your feature scripts.
 */
export default class EditorModule {
    /**
     * @param {string|HTMLElement} target - Selector or DOM element
     * @param {Object} options - Summernote configuration options
     */
    constructor(target, options = {}) {
        this.element = typeof target === 'string' ? document.querySelector(target) : target;
        this.options = options;
        this.instance = null;
        this.selector = typeof target === 'string' ? target : 'Element';
    }

    /**
     * Initialize the editor
     */
    init() {
        if (!this.element) {
            console.error(`EditorModule: Target "${this.selector}" not found.`);
            return this;
        }

        if (!window.jQuery || !window.jQuery.fn.summernote) {
            console.error("EditorModule: jQuery or Summernote plugin missing.");
            return this;
        }

        const $ = window.jQuery;
        const $el = $(this.element);

        const defaultConfig = {
            height: 350,
            placeholder: 'Start writing...',
            dialogsInBody: true,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph', 'height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video', 'hr']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ],
            callbacks: {
                onInit: () => {
                    this._applyEliteStyles();
                    if (this.options.callbacks && typeof this.options.callbacks.onInit === 'function') {
                        this.options.callbacks.onInit();
                    }
                }
            }
        };

        const config = { ...defaultConfig, ...this.options };
        
        $el.summernote(config);
        this.instance = $el;
        
        return this;
    }

    /**
     * Internal styling logic using Vanilla JS where possible
     * @private
     */
    _applyEliteStyles() {
        // Summernote creates the editor UI immediately after the target element
        const editorWrapper = this.element.nextElementSibling;
        
        if (editorWrapper && editorWrapper.classList.contains('note-editor')) {
            // Apply Elite Styles to the main container
            editorWrapper.classList.add('border-0', 'shadow-lg', 'rounded-4', 'overflow-hidden', 'mb-4');
            
            // Style the toolbar
            const toolbar = editorWrapper.querySelector('.note-toolbar');
            if (toolbar) {
                toolbar.classList.add('border-0', 'bg-light-subtle', 'py-3', 'px-4');
                
                // Fix toolbar buttons
                const buttons = toolbar.querySelectorAll('.note-btn');
                buttons.forEach(btn => {
                    btn.classList.add('shadow-none', 'border-0');
                });
            }

            // Style the editable area
            const editable = editorWrapper.querySelector('.note-editable');
            if (editable) {
                editable.classList.add('p-4');
            }
        }
    }

    /**
     * Get the HTML content from the editor
     * @returns {string}
     */
    getContent() {
        return this.instance ? this.instance.summernote('code') : '';
    }

    /**
     * Set the HTML content of the editor
     * @param {string} html 
     */
    setContent(html) {
        if (this.instance) {
            this.instance.summernote('code', html);
        }
    }

    /**
     * Focus the editor
     */
    focus() {
        if (this.instance) {
            this.instance.summernote('focus');
        }
    }

    /**
     * Destroy the editor instance
     */
    destroy() {
        if (this.instance) {
            this.instance.summernote('destroy');
            this.instance = null;
        }
    }
}
