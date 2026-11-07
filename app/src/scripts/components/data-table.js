/**
 * DataTables Initialization Module - 100% Vanilla JS
 * Professional integration with elite styling, export features, and robust safety checks
 */
export const initDataTables = () => {
    const waitForDataTables = (callback, maxTries = 50) => {
        let tries = 0;
        const interval = setInterval(() => {
            if (typeof window.DataTable !== 'undefined') {
                clearInterval(interval);
                callback(window.DataTable);
            } else if (tries >= maxTries) {
                clearInterval(interval);
            }
            tries++;
        }, 100);
    };

    waitForDataTables((DataTable) => {
        console.log("📊 DataTables: Initializing Elite Vanilla JS Modules with Exports...");

        // 1. Basic Datatable with Exports
        const exampleEl = document.querySelector('#example');
        if (exampleEl) {
            new DataTable(exampleEl, {
                responsive: true,
                pageLength: 5,
                language: {
                    search: "",
                    searchPlaceholder: "Search records..."
                }
            });
        }

        // 2. Directory Table
        const directoryEl = document.querySelector('#directory-table');
        if (directoryEl) {
            new DataTable(directoryEl, {
                responsive: true,
                pageLength: 5,
                language: {
                    search: "",
                    searchPlaceholder: "Find in directory..."
                }
            });
        }

        // 3. Batch Selection Table
        const batchEl = document.querySelector('#batch-table');
        if (batchEl) {
            new DataTable(batchEl, {
                pageLength: 5,
                columnDefs: [{
                    orderable: false,
                    targets: 0
                }],
                order: [[1, 'asc']]
            });

            const selectAll = document.getElementById('selectAll');
            const bulkBtn = document.getElementById('bulk-delete-btn');

            const updateBulkStatus = () => {
                const checked = document.querySelectorAll('.row-checkbox:checked').length;
                if (bulkBtn) {
                    if (checked > 0) {
                        bulkBtn.classList.remove('d-none');
                        const countSpan = bulkBtn.querySelector('span');
                        if (countSpan) countSpan.textContent = `Delete Selected (${checked})`;
                    } else {
                        bulkBtn.classList.add('d-none');
                    }
                }
            };

            if (selectAll) {
                selectAll.addEventListener('change', () => {
                    const checkboxes = document.querySelectorAll('.row-checkbox');
                    checkboxes.forEach(cb => { cb.checked = selectAll.checked; });
                    updateBulkStatus();
                });
            }

            document.addEventListener('change', (e) => {
                if (e.target && e.target.classList.contains('row-checkbox')) {
                    const allCheckboxes = document.querySelectorAll('.row-checkbox');
                    const checkedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
                    if (selectAll) {
                        selectAll.checked = allCheckboxes.length > 0 && allCheckboxes.length === checkedCheckboxes.length;
                    }
                    updateBulkStatus();
                }
            });
        }

        // 4. Reporting & Analytics Table
        const reportingEl = document.querySelector('#reporting-table');
        if (reportingEl) {
            new DataTable(reportingEl, {
                responsive: true,
                pageLength: 5,
                language: {
                    search: "",
                    searchPlaceholder: "Filter analytics..."
                }
            });
        }

        // 5. Responsive Inventory Table
        const responsiveEl = document.querySelector('#responsive-table');
        if (responsiveEl) {
            new DataTable(responsiveEl, {
                responsive: true,
                pageLength: 5,
                language: {
                    search: "",
                    searchPlaceholder: "Search inventory..."
                }
            });
        }

        // 6. Advanced Filtering Table
        const filterEl = document.querySelector('#filter-table');
        if (filterEl) {
            new DataTable(filterEl, {
                pageLength: 5
            });
        }
    });
};
