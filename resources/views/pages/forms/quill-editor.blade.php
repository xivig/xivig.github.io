@extends('templates.admin.layout')

@section('content')

<div class="row g-4">
    <!-- Top Action Bar -->
    <div class="col-12">
        <div class="card border border-secondary border-opacity-15 shadow-2xs rounded-4 p-4 bg-body">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                    <div class="d-flex align-items-center gap-2 mb-1">
                        <h4 class="fw-bold mb-0 text-main fs-18">Elite Quill WYSIWYG Editor</h4>
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill extra-small fw-bold px-2.5 py-0.5">Vanilla JS &bull; Quill v2</span>
                    </div>
                    <p class="text-muted small mb-0">High-performance rich text content creation, live code inspection, and instant markdown styling</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button type="button" id="btnCopyHtml" class="btn btn-outline-secondary btn-sm rounded-pill px-3.5">
                        <i class="bi bi-clipboard me-1.5"></i> Copy HTML
                    </button>
                    <button type="button" id="btnClearEditor" class="btn btn-outline-danger btn-sm rounded-pill px-3.5">
                        <i class="bi bi-trash3 me-1.5"></i> Clear
                    </button>
                    <button type="button" id="btnExportDoc" class="btn btn-primary btn-sm rounded-pill px-4 shadow-sm">
                        <i class="bi bi-download me-1.5"></i> Export HTML
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Dual-View Editor Card -->
    <div class="col-12">
        <div class="card border border-secondary border-opacity-15 shadow-2xs rounded-4 overflow-hidden bg-body">
            <!-- Mode Switch Header -->
            <div class="card-header bg-body border-bottom border-secondary border-opacity-15 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                <!-- Tabs: Visual vs Source Code -->
                <ul class="nav nav-pills gap-2" id="editorViewTabs" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link active rounded-pill px-3 py-1.5 extra-small fw-bold" id="tabVisual" type="button">
                            <i class="bi bi-eye me-1.5"></i> Visual Editor
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link rounded-pill px-3 py-1.5 extra-small fw-bold text-muted" id="tabSource" type="button">
                            <i class="bi bi-code-slash me-1.5"></i> Raw HTML Source
                        </button>
                    </li>
                </ul>

                <!-- Telemetry: Word & Character Count -->
                <div class="d-flex align-items-center gap-3 text-muted extra-small">
                    <span>Words: <strong class="text-main" id="wordCountBadge">0</strong></span>
                    <span>&bull;</span>
                    <span>Characters: <strong class="text-main" id="charCountBadge">0</strong></span>
                    <span>&bull;</span>
                    <span class="text-success"><i class="bi bi-check2-circle me-1"></i> Auto-saved</span>
                </div>
            </div>

            <!-- Editor Body -->
            <div class="card-body p-4">
                <!-- Visual Quill Surface -->
                <div id="visualEditorPane">
                    <div id="quill-editor" style="min-height: 320px;">
                        <h2>Atelier Design System Architecture</h2>
                        <p>Welcome to the <strong>Xivig Quill Editor</strong>. Engineered entirely in pure modern <strong>Vanilla JS</strong> without legacy jQuery overhead, this suite delivers immediate response times, real-time code synchronization, and seamless light/dark mode adaptability.</p>
                        
                        <h3>Core Platform Principles</h3>
                        <ul>
                            <li><strong>Instant Initialization:</strong> Zero layout shifts with dynamic on-demand module resolution.</li>
                            <li><strong>Semantic Typography:</strong> Fully tokenized heading hierarchy and responsive scale multipliers.</li>
                            <li><strong>Live Dual Synchronization:</strong> Switch seamlessly between visual typography and clean, formatted HTML markup.</li>
                        </ul>

                        <blockquote>
                            "Simplicity is the prerequisite for reliability." &mdash; Edsger W. Dijkstra
                        </blockquote>

                        <p>Draft your release documentation, blog entries, or product briefs with full confidence.</p>
                    </div>
                </div>

                <!-- Source Code Textarea Pane (Hidden by Default) -->
                <div id="sourceCodePane" class="d-none">
                    <textarea class="form-control font-monospace extra-small bg-body-tertiary border border-secondary border-opacity-15 p-3 custom-scroll" id="rawHtmlTextarea" rows="15" spellcheck="false" style="font-size: 0.825rem; line-height: 1.6;"></textarea>
                </div>
            </div>
        </div>
    </div>

    <!-- Inline Click-to-Edit Section -->
    <div class="col-12">
        <div class="card border border-secondary border-opacity-15 shadow-2xs rounded-4 p-4 bg-body">
            <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary border-opacity-10 flex-wrap gap-2">
                <div>
                    <h5 class="fw-bold mb-0 text-main fs-16">Interactive Inline Editor</h5>
                    <p class="text-muted extra-small mb-0">Click the edit button to transform the content container directly into an active editor</p>
                </div>
                <div class="btn-group shadow-2xs rounded-pill overflow-hidden inline-editor-btn-group" id="inlineActionGroup">
                    <button id="btnInlineEdit" class="btn btn-outline-primary btn-sm px-4" type="button">
                        <i class="bi bi-pencil-square me-1.5"></i> Edit Content
                    </button>
                    <button id="btnInlineCancel" class="btn btn-outline-secondary btn-sm px-3.5 d-none" type="button">
                        <i class="bi bi-x-circle me-1.5"></i> Cancel
                    </button>
                    <button id="btnInlineSave" class="btn btn-success btn-sm px-4 d-none" type="button">
                        <i class="bi bi-check2-circle me-1.5"></i> Save Changes
                    </button>
                </div>
            </div>

            <div id="inlineEditableContent" class="border border-secondary border-opacity-15 rounded-3 p-4 bg-body-tertiary transition-all">
                <h4 class="fw-bold text-main mb-2">Edge-Accelerated Performance</h4>
                <p class="text-secondary small mb-0">Transform any standard element into an active rich-text surface on the fly. When editing is finalized, the DOM safely persists the verified content markup with zero lingering dependencies.</p>
            </div>
        </div>
    </div>
</div>

<!-- Scoped Quill Styles & Script (Loaded upfront for instant initialization) -->
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>

<script>
(function() {
    function initQuillPage() {
        const editorEl = document.getElementById('quill-editor') || document.getElementById('summernote-editor');
        const visualPane = document.getElementById('visualEditorPane');
        const sourcePane = document.getElementById('sourceCodePane');
        const rawTextarea = document.getElementById('rawHtmlTextarea');
        const tabVisual = document.getElementById('tabVisual');
        const tabSource = document.getElementById('tabSource');
        const wordCountBadge = document.getElementById('wordCountBadge');
        const charCountBadge = document.getElementById('charCountBadge');
        const btnCopyHtml = document.getElementById('btnCopyHtml');
        const btnClearEditor = document.getElementById('btnClearEditor');
        const btnExportDoc = document.getElementById('btnExportDoc');

        if (!editorEl) return;

        let quillInstance = null;

        function updateTelemetry() {
            if (!quillInstance) return;
            const text = quillInstance.getText().trim();
            const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
            const chars = text.length;
            if (wordCountBadge) wordCountBadge.textContent = words;
            if (charCountBadge) charCountBadge.textContent = chars;
        }

        function setupMainQuill() {
            if (!window.Quill) return;

            // Check if Quill was already mounted on this element
            if (editorEl.__quill) {
                quillInstance = editorEl.__quill;
            } else if (editorEl.classList.contains('ql-container')) {
                quillInstance = window.Quill.find(editorEl);
            }

            if (!quillInstance) {
                quillInstance = new Quill(editorEl, {
                    theme: 'snow',
                    placeholder: 'Start writing your document...',
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['blockquote', 'code-block'],
                            ['link', 'image'],
                            ['clean']
                        ]
                    }
                });
                editorEl.__quill = quillInstance;
                editorEl.setAttribute('data-quill-initialized', 'true');
            }

            quillInstance.on('text-change', updateTelemetry);
            updateTelemetry();
        }

        // Wait for window.Quill if loading asynchronously
        function ensureQuillAndRun(callback, retries = 50) {
            if (window.Quill) {
                callback();
            } else if (retries > 0) {
                setTimeout(() => ensureQuillAndRun(callback, retries - 1), 100);
            }
        }

        ensureQuillAndRun(setupMainQuill);

        // 2. View Switching: Visual vs Raw HTML Source
        tabVisual?.addEventListener('click', (e) => {
            e.preventDefault();
            if (rawTextarea && quillInstance) {
                quillInstance.root.innerHTML = rawTextarea.value;
                updateTelemetry();
            }
            if (visualPane) visualPane.classList.remove('d-none');
            if (sourcePane) sourcePane.classList.add('d-none');
            tabVisual.classList.add('active');
            tabVisual.classList.remove('text-muted');
            tabSource?.classList.remove('active');
            tabSource?.classList.add('text-muted');
        });

        tabSource?.addEventListener('click', (e) => {
            e.preventDefault();
            if (rawTextarea && quillInstance) {
                rawTextarea.value = quillInstance.root.innerHTML;
            }
            if (visualPane) visualPane.classList.add('d-none');
            if (sourcePane) sourcePane.classList.remove('d-none');
            tabSource.classList.add('active');
            tabSource.classList.remove('text-muted');
            tabVisual?.classList.remove('active');
            tabVisual?.classList.add('text-muted');
        });

        // 3. Copy HTML Action
        btnCopyHtml?.addEventListener('click', () => {
            const html = quillInstance ? quillInstance.root.innerHTML : (rawTextarea ? rawTextarea.value : '');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(html).then(() => {
                    if (window.NotificationService) {
                        window.NotificationService.success('Copied!', 'Raw HTML has been copied to your clipboard.');
                    } else if (window.Swal) {
                        window.Swal.fire({ icon: 'success', title: 'Copied!', text: 'Raw HTML has been copied to your clipboard.', timer: 1500, showConfirmButton: false });
                    } else {
                        alert('HTML copied to clipboard!');
                    }
                });
            }
        });

        // 4. Clear Content Action
        btnClearEditor?.addEventListener('click', () => {
            if (confirm('Clear all editor content?')) {
                if (quillInstance) quillInstance.setText('');
                if (rawTextarea) rawTextarea.value = '';
                updateTelemetry();
            }
        });

        // 5. Export HTML File Action
        btnExportDoc?.addEventListener('click', () => {
            const html = quillInstance ? quillInstance.root.innerHTML : '';
            const blob = new Blob([html], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'xivig-document.html';
            a.click();
            URL.revokeObjectURL(a.href);
        });

        // 6. Inline Click-to-Edit Controller
        const btnInlineEdit = document.getElementById('btnInlineEdit');
        const btnInlineSave = document.getElementById('btnInlineSave');
        const btnInlineCancel = document.getElementById('btnInlineCancel');
        const inlineBox = document.getElementById('inlineEditableContent');
        let inlineQuill = null;
        let originalContent = '';

        function teardownInlineQuill() {
            if (inlineQuill) {
                const prev = inlineBox.previousElementSibling;
                if (prev && prev.classList.contains('ql-toolbar')) {
                    prev.remove();
                }
                inlineBox.querySelectorAll('.ql-clipboard, .ql-tooltip').forEach(el => el.remove());
                inlineBox.classList.remove('ql-container', 'ql-snow');
                inlineQuill = null;
            }
            btnInlineSave?.classList.add('d-none');
            btnInlineCancel?.classList.add('d-none');
            btnInlineEdit?.classList.remove('d-none');
        }

        btnInlineEdit?.addEventListener('click', () => {
            ensureQuillAndRun(() => {
                if (!inlineQuill && inlineBox) {
                    originalContent = inlineBox.innerHTML;
                    inlineQuill = new Quill(inlineBox, {
                        theme: 'snow',
                        modules: {
                            toolbar: [
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['clean']
                            ]
                        }
                    });
                    btnInlineEdit?.classList.add('d-none');
                    btnInlineSave?.classList.remove('d-none');
                    btnInlineCancel?.classList.remove('d-none');
                }
            });
        });

        btnInlineSave?.addEventListener('click', () => {
            if (inlineQuill) {
                const updatedHtml = inlineQuill.root.innerHTML;
                teardownInlineQuill();
                inlineBox.innerHTML = updatedHtml;

                if (window.Swal) {
                    window.Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        text: 'Inline edits have been successfully updated.',
                        confirmButtonColor: '#4059E8',
                        timer: 2000,
                        showConfirmButton: false
                    });
                } else if (window.NotificationService) {
                    window.NotificationService.success('Saved', 'Inline edits updated successfully.');
                } else {
                    alert('Inline edits updated successfully.');
                }
            }
        });

        btnInlineCancel?.addEventListener('click', () => {
            if (inlineQuill) {
                teardownInlineQuill();
                inlineBox.innerHTML = originalContent;
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuillPage);
    } else {
        initQuillPage();
    }
})();
</script>

<style>
    /* Quill Elite Light/Dark Integration */
    .ql-toolbar.ql-snow {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid var(--xv-border, #E5EAF2) !important;
        background: var(--bg-subtle, #F8FAFC);
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        padding: 10px 14px !important;
    }
    .ql-container.ql-snow {
        border: none !important;
        font-family: inherit !important;
        font-size: 0.9375rem !important;
    }
    .ql-editor {
        padding: 20px 24px !important;
        min-height: 280px;
    }
    [data-bs-theme="dark"] .ql-toolbar.ql-snow {
        background: rgba(255, 255, 255, 0.03) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
    }
    [data-bs-theme="dark"] .ql-stroke {
        stroke: #CBD5E1 !important;
    }
    [data-bs-theme="dark"] .ql-fill {
        fill: #CBD5E1 !important;
    }
    [data-bs-theme="dark"] .ql-picker {
        color: #CBD5E1 !important;
    }
    [data-bs-theme="dark"] .ql-picker-options {
        background-color: #111C2E !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }

    #inlineActionGroup.rounded-pill {
        border-radius: 50rem !important;
        overflow: hidden !important;
    }
    #inlineActionGroup > .btn {
        border-radius: 0;
    }
    #inlineActionGroup > #btnInlineEdit {
        border-radius: 50rem !important;
    }
    #inlineActionGroup > #btnInlineCancel {
        border-top-left-radius: 50rem !important;
        border-bottom-left-radius: 50rem !important;
    }
    #inlineActionGroup > #btnInlineSave {
        border-top-right-radius: 50rem !important;
        border-bottom-right-radius: 50rem !important;
    }
</style>

@endsection

