/**
 * Xivig Mail Client Logic
 * Handles bulk selection, row highlighting, and compose operations
 */
export const initMailSelection = () => {
    const selectAllBox = document.getElementById('selectAll');
    const mailCheckboxes = document.querySelectorAll('.mail-item .form-check-input');
    const mailRows = document.querySelectorAll('.mail-item');

    if (!selectAllBox) return;

    // 1. Master Toggle Logic
    selectAllBox.addEventListener('change', function () {
        const isChecked = this.checked;

        mailCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            updateRowState(checkbox);
        });
    });

    // 2. Individual Checkbox Logic
    mailCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateRowState(checkbox);
            updateMasterCheckbox();
        });

        const row = checkbox.closest('.mail-item');
        row.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'INPUT' && !e.target.classList.contains('bi-star')) {
                checkbox.checked = !checkbox.checked;
                updateRowState(checkbox);
                updateMasterCheckbox();
            }
        });
    });

    function updateRowState(cb) {
        const row = cb.closest('.mail-item');
        if (cb.checked) {
            row.classList.add('is-selected');
        } else {
            row.classList.remove('is-selected');
        }
    }

    function updateMasterCheckbox() {
        const total = mailCheckboxes.length;
        const checkedCount = document.querySelectorAll('.mail-item .form-check-input:checked').length;

        selectAllBox.checked = (total === checkedCount);
        selectAllBox.indeterminate = (checkedCount > 0 && checkedCount < total);
    }
};

/**
 * Compose Mail Logic
 */
export const initComposeMail = () => {
    const composeForm = document.getElementById('composeForm');
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const discardBtn = document.getElementById('discardBtn');
    const fileInput = document.getElementById('fileInput');
    const attachmentLabel = document.getElementById('attachmentFileName');

    if (!composeForm && !saveDraftBtn) return;

    composeForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const recipient = document.getElementById('composeToInput')?.value || 'architect@xivig.com';
        if (window.NotificationService) {
            window.NotificationService.success('Message Dispatched', `Your email has been sent to ${recipient}.`);
        }
        composeForm.reset();
    });

    saveDraftBtn?.addEventListener('click', () => {
        if (window.NotificationService) {
            window.NotificationService.success('Draft Saved', 'Message safely saved to your Drafts folder.');
        }
    });

    discardBtn?.addEventListener('click', () => {
        if (window.NotificationService) {
            window.NotificationService.confirm('Discard Message?', 'Are you sure you want to discard this draft?')
                .then(res => {
                    if (res.isConfirmed) {
                        composeForm?.reset();
                        window.NotificationService.success('Draft Discarded', 'Message cleared.');
                    }
                });
        }
    });

    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && attachmentLabel) {
            attachmentLabel.innerText = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        }
    });
};
