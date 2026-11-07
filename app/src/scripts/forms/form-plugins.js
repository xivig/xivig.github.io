/**
 * Form Plugins Module - Image Cropper, Summernote/Quill & Dropzone
 */
import EditorModule from '../components/editor-module.js';

// 1. Summernote / Quill Initialization
export const initQuillEditor = () => {
    const el = document.querySelector('#quill-editor, #summernote-editor');
    if (el && !el.getAttribute('data-quill-initialized') && !el.__quill) {
        const editor = new EditorModule(el, {
            placeholder: 'Start writing your elite architecture notes...'
        });
        editor.init();
    }
};
export const initSummernote = initQuillEditor;

/**
 * 2. Image Cropper Module
 * Self-healing dependency resolution, global action dispatch, telemetry tracking
 */
export const initImageCropper = function () {
    const image = document.getElementById('image') || document.getElementById('cropper-image');
    if (!image) return;

    if (image.getAttribute('data-cropper-initialized')) {
        return;
    }

    const dataX = document.getElementById('dataX');
    const dataY = document.getElementById('dataY');
    const dataWidth = document.getElementById('dataWidth');
    const dataHeight = document.getElementById('dataHeight');
    const dataRotate = document.getElementById('dataRotate');
    const resultContainer = document.getElementById('croppedResult');
    const downloadBtn = document.getElementById('download');

    function ensureCropper(callback, retries = 50) {
        if (window.Cropper) {
            callback(window.Cropper);
            return;
        }

        // Dynamically inject if missing from document
        if (!document.querySelector('script[src*="cropper"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js';
            script.onload = () => callback(window.Cropper);
            document.head.appendChild(script);
            return;
        }

        if (retries > 0) {
            setTimeout(() => ensureCropper(callback, retries - 1), 100);
        } else {
            console.error("Cropper.js library could not be loaded.");
        }
    }

    ensureCropper((CropperClass) => {
        let cropper;
        const options = {
            aspectRatio: 16 / 9,
            preview: '.img-preview',
            viewMode: 2,
            dragMode: 'crop',
            autoCropArea: 0.8,
            restore: false,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: true,
            crop(event) {
                if (dataX) dataX.value = Math.round(event.detail.x);
                if (dataY) dataY.value = Math.round(event.detail.y);
                if (dataWidth) dataWidth.value = Math.round(event.detail.width);
                if (dataHeight) dataHeight.value = Math.round(event.detail.height);
                if (dataRotate) dataRotate.value = Math.round(event.detail.rotate || 0);
            },
        };

        const startCropper = () => {
            if (cropper) cropper.destroy();
            cropper = new CropperClass(image, options);
            image.__cropper = cropper;
            image.setAttribute('data-cropper-initialized', 'true');
            console.log("Cropper instance initialized successfully.");
        };

        if (image.complete && image.naturalWidth > 0) {
            startCropper();
        } else {
            image.addEventListener('load', startCropper, { once: true });
        }

        // Global Action Dispatcher for all [data-method] buttons (toolbar + header button)
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-method]');
            if (!btn || !cropper) return;

            const method = btn.getAttribute('data-method');
            let option = btn.getAttribute('data-option');
            let secondOption = btn.getAttribute('data-second-option');

            if (option && !isNaN(option)) {
                option = parseFloat(option);
            } else if (option === 'NaN') {
                option = NaN;
            }

            if (secondOption && !isNaN(secondOption)) {
                secondOption = parseFloat(secondOption);
            }

            switch (method) {
                case 'getCroppedCanvas':
                    const canvas = cropper.getCroppedCanvas({
                        imageSmoothingEnabled: true,
                        imageSmoothingQuality: 'high',
                    });
                    if (canvas && resultContainer) {
                        canvas.style.maxWidth = '100%';
                        canvas.style.height = 'auto';
                        canvas.style.borderRadius = '8px';
                        canvas.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)';

                        resultContainer.innerHTML = '';
                        resultContainer.appendChild(canvas);

                        if (downloadBtn) {
                            downloadBtn.href = canvas.toDataURL('image/jpeg', 0.9);
                        }

                        // Trigger Modal if available (for Blade / modal preview layouts)
                        const modalEl = document.getElementById('getCroppedCanvasModal');
                        if (modalEl && window.bootstrap && window.bootstrap.Modal) {
                            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
                            modal.show();
                        }

                        if (window.NotificationService) {
                            window.NotificationService.success('Rendered!', 'Cropped canvas has been generated and is ready to download.');
                        }
                    }
                    break;
                case 'scaleX':
                    cropper.scaleX(option || -1);
                    btn.setAttribute('data-option', -(option || 1));
                    break;
                case 'scaleY':
                    cropper.scaleY(option || -1);
                    btn.setAttribute('data-option', -(option || 1));
                    break;
                case 'move':
                    cropper.move(option || 0, secondOption || 0);
                    break;
                case 'setAspectRatio':
                    cropper.setAspectRatio(option);
                    const ratioGroup = btn.closest('#aspectRatioGroup, .cropper-toolbar-group');
                    if (ratioGroup) {
                        ratioGroup.querySelectorAll('[data-method="setAspectRatio"]').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                    }
                    break;
                default:
                    if (typeof cropper[method] === 'function') {
                        cropper[method](option);
                    }
            }
        });

        // Handle File Upload
        const inputImage = document.getElementById('inputImage');
        if (inputImage) {
            const URL = window.URL || window.webkitURL;
            inputImage.addEventListener('change', function () {
                const files = this.files;
                if (files && files.length && cropper) {
                    const file = files[0];
                    if (/^image\/\w+$/.test(file.type)) {
                        const uploadedImageURL = URL.createObjectURL(file);
                        cropper.replace(uploadedImageURL);
                        inputImage.value = null;
                    } else {
                        window.alert('Please choose an image file.');
                    }
                }
            });
        }

        // Handle Direct Download if not yet rendered
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                if ((!downloadBtn.href || downloadBtn.href.startsWith('javascript:')) && cropper) {
                    e.preventDefault();
                    const canvas = cropper.getCroppedCanvas({
                        imageSmoothingEnabled: true,
                        imageSmoothingQuality: 'high',
                    });
                    if (canvas) {
                        downloadBtn.href = canvas.toDataURL('image/jpeg', 0.9);
                        downloadBtn.click();
                    }
                }
            });
        }
    });
};

export const initImageDropzone = () => {
    const dropzoneEl = document.querySelector("#admin-media-upload");
    if (dropzoneEl && typeof window.Dropzone !== 'undefined') {
        // Prevent Dropzone from auto-discovering
        window.Dropzone.autoDiscover = false;
        const Dropzone = window.Dropzone;

        try {
            new Dropzone(dropzoneEl, {
                url: window.XIVIG_UPLOAD_URL || "#", // Configurable upload endpoint with client-side fallback
                maxFilesize: 5,
                acceptedFiles: "image/*",
                // 1. Enable the "Remove file" link in the UI
                addRemoveLinks: true,
                dictRemoveFile: "Delete",
                
                // 2. Handle the deletion logic
                init: function () {
                    this.on("removedfile", function (file) {
                        // Only attempt server-side deletion if the file was actually uploaded
                        if (file.status === window.Dropzone.SUCCESS) {
                            const fileId = file.serverId || 'mock-id-123';
                            
                            fetch("/admin/delete", {
                                method: "POST",
                                body: JSON.stringify({
                                    filename: file.name, 
                                    id: fileId
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            .then(response => {
                                if (!response.ok) console.error("Server-side delete failed.");
                                else console.log("Server-side delete successful.");
                            })
                            .catch(err => console.error("Network error during delete:", err));
                        }
                    });

                    this.on("success", function(file, response) {
                        // We assume your server returns an ID in the response
                        // For demo purposes, we'll attach a mock ID
                        file.serverId = response.id || 'mock-id-' + Math.floor(Math.random() * 1000);
                        console.log("Upload successful. Server ID attached:", file.serverId);
                    });
                }
            });
        } catch (e) {
            console.error("Dropzone initialization error:", e);
        }
    }
};
