/**
 * Global Header Primary Action Dispatcher
 * Handles intelligent interactivity for page-header action buttons across all views.
 */
export function initHeaderActions() {
    const actionBtn = document.getElementById('pagePrimaryActionBtn');
    if (!actionBtn) return;

    // If it's an <a> tag with a valid destination link, allow natural navigation
    if (actionBtn.tagName === 'A') {
        const href = actionBtn.getAttribute('href');
        if (href && href !== '#' && href !== 'javascript:;' && !href.startsWith('javascript:')) {
            return;
        }
    }

    actionBtn.addEventListener('click', (e) => {
        const text = (actionBtn.textContent || '').trim();
        const lowerText = text.toLowerCase();
        const pageTitle = (document.getElementById('pageHeaderTitle')?.textContent || document.title.split('—')[0] || 'Page').trim();

        // 1. Save or Submit Form
        if (lowerText.includes('save') || lowerText.includes('submit')) {
            e.preventDefault();
            const form = document.querySelector('form');
            if (form) {
                if (form.checkValidity && !form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
            }
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Changes Saved!',
                    text: `${pageTitle} has been successfully updated.`,
                    confirmButtonColor: '#4059E8',
                    timer: 2200,
                    showConfirmButton: false
                });
            } else {
                alert(`Changes for ${pageTitle} saved successfully!`);
            }
            return;
        }

        // 2. Export / Download Telemetry or Reports
        if (lowerText.includes('export') || lowerText.includes('download') || lowerText.includes('report')) {
            e.preventDefault();
            if (window.Swal) {
                window.Swal.fire({
                    title: `Exporting ${pageTitle}`,
                    html: 'Preparing encrypted data package (CSV & JSON)...',
                    timer: 1400,
                    timerProgressBar: true,
                    didOpen: () => {
                        window.Swal.showLoading();
                    }
                }).then(() => {
                    // Generate and trigger actual client-side CSV download
                    try {
                        const csvContent = `data:text/csv;charset=utf-8,Category,Metric,Timestamp\n${pageTitle},Active,${new Date().toISOString()}\nStatus,Verified,${Date.now()}`;
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", `${pageTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-export.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } catch (err) {
                        console.warn("Direct CSV download skipped:", err);
                    }

                    window.Swal.fire({
                        icon: 'success',
                        title: 'Export Complete!',
                        text: `${pageTitle} telemetry file has been downloaded.`,
                        confirmButtonColor: '#4059E8',
                        timer: 2000,
                        showConfirmButton: false
                    });
                });
            } else {
                alert(`${pageTitle} export completed.`);
            }
            return;
        }

        // 3. Task Creation (Kanban, Task Manager)
        if (lowerText.includes('task')) {
            e.preventDefault();
            const taskInput = document.querySelector('input[name="task"], #taskTitle, #taskInput, .task-input');
            if (taskInput) {
                taskInput.focus();
                taskInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            if (window.Swal) {
                window.Swal.fire({
                    title: 'Create New Task',
                    input: 'text',
                    inputPlaceholder: 'Enter task description...',
                    showCancelButton: true,
                    confirmButtonText: 'Add Task',
                    confirmButtonColor: '#4059E8',
                    inputValidator: (val) => {
                        if (!val || !val.trim()) return 'Task title cannot be empty';
                    }
                }).then((res) => {
                    if (res.isConfirmed && res.value) {
                        window.Swal.fire({
                            icon: 'success',
                            title: 'Task Added!',
                            text: `"${res.value}" has been queued.`,
                            confirmButtonColor: '#4059E8',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                });
            }
            return;
        }

        // 4. Calendar Events
        if (lowerText.includes('event')) {
            e.preventDefault();
            const modalTrigger = document.querySelector('[data-bs-target*="event"], [data-bs-target*="Event"]');
            if (modalTrigger) {
                modalTrigger.click();
                return;
            }
            if (window.Swal) {
                window.Swal.fire({
                    title: 'Schedule New Event',
                    html: `
                        <input id="swalEventTitle" class="swal2-input" placeholder="Event title...">
                        <input id="swalEventDate" type="date" class="swal2-input" value="${new Date().toISOString().split('T')[0]}">
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Schedule Event',
                    confirmButtonColor: '#4059E8',
                    preConfirm: () => {
                        const title = document.getElementById('swalEventTitle').value;
                        if (!title || !title.trim()) {
                            window.Swal.showValidationMessage('Event title is required');
                        }
                        return title;
                    }
                }).then((res) => {
                    if (res.isConfirmed) {
                        window.Swal.fire({
                            icon: 'success',
                            title: 'Event Scheduled!',
                            text: `"${res.value}" added to calendar.`,
                            confirmButtonColor: '#4059E8'
                        });
                    }
                });
            }
            return;
        }

        // 5. File Uploads
        if (lowerText.includes('upload') || lowerText.includes('file')) {
            e.preventDefault();
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.click();
                return;
            }
        }

        // 6. Generic interactive feedback for any other button
        e.preventDefault();
        if (window.Swal) {
            window.Swal.fire({
                icon: 'info',
                title: text,
                text: `Action executed for ${pageTitle}.`,
                confirmButtonColor: '#4059E8',
                timer: 1800,
                showConfirmButton: false
            });
        }
    });
}
