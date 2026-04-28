/**
 * Form Plugins Module - Image Cropper & Summernote
 */
import EditorModule from './EditorModule.js';

// 1. Summernote Initialization
export const initSummernote = () => {
    const editor = new EditorModule('#summernote-editor', {
        placeholder: 'Start writing your elite architecture notes...'
    });
    editor.init();
};

/**
 * 2. Image Cropper Module
 * Modular implementation as per elite architecture standards
 */
export const initImageCropper = function () {
    console.log("Initializing Image Cropper...");
    const image = document.getElementById('image');
    const dataX = document.getElementById('dataX');
    const dataY = document.getElementById('dataY');
    const dataWidth = document.getElementById('dataWidth');
    const dataHeight = document.getElementById('dataHeight');
    const resultContainer = document.getElementById('croppedResult');
    const downloadBtn = document.getElementById('download');

    // Use window.Cropper which is exposed in main.js (via CDN in head.html)
    const CropperClass = window.Cropper;

    if (image && CropperClass) {
        console.log("Image and Cropper library found. Starting engine...");
        const options = {
            aspectRatio: 16 / 9,
            preview: '.img-preview',
            viewMode: 2,
            crop(event) {
                if (dataX) dataX.value = Math.round(event.detail.x);
                if (dataY) dataY.value = Math.round(event.detail.y);
                if (dataWidth) dataWidth.value = Math.round(event.detail.width);
                if (dataHeight) dataHeight.value = Math.round(event.detail.height);
            },
        };

        let cropper = new CropperClass(image, options);

        // Unified listener for all cropper actions
        const handleAction = (e) => {
            const btn = e.target.closest('[data-method]');
            if (!btn) return;

            const method = btn.getAttribute('data-method');
            let option = btn.getAttribute('data-option');

            if (!method) return;
            console.log(`Cropper Action: ${method}`, option);

            if (option && !isNaN(option)) {
                option = parseFloat(option);
            } else if (option === 'NaN') {
                option = NaN;
            }

            if (method === 'getCroppedCanvas') {
                const canvas = cropper.getCroppedCanvas();
                if (canvas && resultContainer) {
                    resultContainer.innerHTML = '';
                    resultContainer.appendChild(canvas);
                    if (downloadBtn) {
                        downloadBtn.href = canvas.toDataURL('image/jpeg');
                    }
                }
            } else if (typeof cropper[method] === 'function') {
                cropper[method](option);
            }
        };

        document.addEventListener('click', handleAction);

        // Handle File Upload
        const inputImage = document.getElementById('inputImage');
        if (inputImage) {
            inputImage.addEventListener('change', function () {
                const files = this.files;
                if (files && files.length) {
                    const file = files[0];
                    if (/^image\/\w+$/.test(file.type)) {
                        const uploadedImageURL = URL.createObjectURL(file);
                        cropper.destroy();
                        image.src = uploadedImageURL;
                        cropper = new CropperClass(image, options);
                        inputImage.value = null;
                    } else {
                        alert('Please choose an image file.');
                    }
                }
            });
        }
    } else {
        console.error("Cropper initialization failed: Missing image element or Cropper library.");
    }
};

export const initImageDropzone = () => {
    const dropzoneEl = document.querySelector("#admin-media-upload");
    if (dropzoneEl && typeof window.Dropzone !== 'undefined') {
        // Prevent Dropzone from auto-discovering
        window.Dropzone.autoDiscover = false;
        const Dropzone = window.Dropzone;

        try {
            new Dropzone(dropzoneEl, {
                url: "https://httpbin.org/post", // Demo endpoint
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
