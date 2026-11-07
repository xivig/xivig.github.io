const escapeHtml = (str) => {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

import Sortable from 'sortablejs';

/**
 * Xivig Elite Task Manager Module
 * Reusable task lists, inline status updates, detail drawer, and dynamic KPIs.
 */
export const initTaskManager = () => {
    const container = document.querySelector('.task-manager-module');
    if (!container) return;

    const STORAGE_KEY = 'xivig_elite_tasks_v4';

    const INITIAL_TASKS = [
        {
            id: 'task-101',
            title: 'Design System Semantic Token Mapping',
            category: 'Design System',
            status: 'inprogress',
            priority: 'High',
            dueDate: 'Today, 5:00 PM',
            assignee: { name: 'Alex Morgan', avatar: '/app/src/images/photo1.jpg', initials: 'AM' },
            checklist: [
                { text: 'Audit SCSS color tokens', done: true },
                { text: 'Map dark mode surface overrides', done: true },
                { text: 'Verify typography scale rem values', done: false }
            ],
            comments: 6
        },
        {
            id: 'task-102',
            title: 'API Gateway SSL Certificate Rotation',
            category: 'Security',
            status: 'inprogress',
            priority: 'Urgent',
            dueDate: 'Tomorrow',
            assignee: { name: 'David Kim', avatar: '/app/src/images/photo3.jpg', initials: 'DK' },
            checklist: [
                { text: 'Generate CSR on staging cluster', done: true },
                { text: 'Deploy wildcard cert to Cloudflare', done: false }
            ],
            comments: 3
        },
        {
            id: 'task-103',
            title: 'FullCalendar Vanilla JS Integration Audit',
            category: 'Engineering',
            status: 'upcoming',
            priority: 'Normal',
            dueDate: 'Apr 20',
            assignee: { name: 'Sarah Chen', avatar: '/app/src/images/photo2.jpg', initials: 'SC' },
            checklist: [
                { text: 'Verify draggable chips from side rail', done: false },
                { text: 'Test modal create event binding', done: false }
            ],
            comments: 1
        },
        {
            id: 'task-104',
            title: 'Clean Unused Root Assets & Image Bloat',
            category: 'DevOps',
            status: 'completed',
            priority: 'Normal',
            dueDate: 'Yesterday',
            assignee: { name: 'Alex Morgan', avatar: '/app/src/images/photo1.jpg', initials: 'AM' },
            checklist: [
                { text: 'Delete 38 dead image files', done: true },
                { text: 'Verify gulp asset pipeline', done: true }
            ],
            comments: 4
        },
        {
            id: 'task-105',
            title: 'Eliminate Legacy jQuery & Timedropper Plugins',
            category: 'Refactor',
            status: 'completed',
            priority: 'High',
            dueDate: 'Apr 12',
            assignee: { name: 'David Kim', avatar: '/app/src/images/photo3.jpg', initials: 'DK' },
            checklist: [
                { text: 'Replace Summernote with Quill v2', done: true },
                { text: 'Native DataTables v2 refactor', done: true },
                { text: 'AirDatepicker Vanilla implementation', done: true }
            ],
            comments: 9
        }
    ];

    let tasks = [];
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (e) {
            tasks = INITIAL_TASKS;
        }
    } else {
        tasks = INITIAL_TASKS;
    }

    const saveTasks = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        updateKPIs();
    };

    const updateKPIs = () => {
        const total = tasks.length;
        const inProgress = tasks.filter(t => t.status === 'inprogress').length;
        const upcoming = tasks.filter(t => t.status === 'upcoming').length;
        const completed = tasks.filter(t => t.status === 'completed').length;

        const kpiTotal = document.getElementById('kpiTotalTasks');
        const kpiInProgress = document.getElementById('kpiInProgressTasks');
        const kpiUpcoming = document.getElementById('kpiUpcomingTasks');
        const kpiCompleted = document.getElementById('kpiCompletedTasks');

        if (kpiTotal) kpiTotal.textContent = total;
        if (kpiInProgress) kpiInProgress.textContent = inProgress;
        if (kpiUpcoming) kpiUpcoming.textContent = upcoming;
        if (kpiCompleted) kpiCompleted.textContent = completed;
    };

    // Render task item into list
    const renderTaskRow = (task) => {
        const row = document.createElement('div');
        row.className = `card task-row-card border border-secondary border-opacity-15 shadow-2xs rounded-3 mb-2.5 p-3 transition-all ${task.status === 'completed' ? 'task-completed opacity-75 bg-body-tertiary' : 'bg-body'}`;
        row.dataset.id = task.id;

        const doneCount = task.checklist ? task.checklist.filter(c => c.done).length : 0;
        const totalCount = task.checklist ? task.checklist.length : 0;

        let priorityClass = 'bg-secondary-subtle text-secondary';
        if (task.priority === 'Urgent') priorityClass = 'bg-danger-subtle text-danger border border-danger-subtle';
        else if (task.priority === 'High') priorityClass = 'bg-danger-subtle text-danger';
        else if (task.priority === 'Normal') priorityClass = 'bg-primary-subtle text-primary';
        else if (task.priority === 'Low') priorityClass = 'bg-success-subtle text-success';

        row.innerHTML = `
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2.5">
                <div class="d-flex align-items-center gap-3 flex-grow-1 min-w-0">
                    <div class="d-flex align-items-center flex-shrink-0">
                        <i class="bi bi-grip-vertical text-muted opacity-25 cursor-grab me-1" title="Reorder"></i>
                        <input class="form-check-input task-toggle-check cursor-pointer rounded-2 m-0 flex-shrink-0" type="checkbox" ${task.status === 'completed' ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;">
                    </div>
                    <div class="d-flex align-items-center gap-2 flex-wrap flex-grow-1 min-w-0">
                        <span class="fw-semibold mb-0 task-title text-truncate me-2 ${task.status === 'completed' ? 'text-decoration-line-through text-muted opacity-75' : 'text-main'}" style="font-size: 0.9rem;">${escapeHtml(task.title)}</span>
                        <span class="badge ${priorityClass} extra-small fw-bold px-2 py-0.5 rounded-pill">${task.priority}</span>
                        <span class="badge bg-body-secondary text-muted border border-secondary border-opacity-15 extra-small px-2 py-0.5 rounded-pill">${escapeHtml(task.category)}</span>
                        <span class="text-muted extra-small ms-auto ms-sm-0"><i class="bi bi-clock me-1"></i> ${escapeHtml(task.dueDate)}</span>
                    </div>
                </div>

                <div class="d-flex align-items-center gap-3 ms-auto flex-shrink-0">
                    ${totalCount > 0 ? `
                        <div class="d-flex align-items-center gap-1.5 text-muted extra-small" title="Checklist progress">
                            <i class="bi bi-check2-square text-primary"></i>
                            <span class="fw-semibold">${doneCount}/${totalCount}</span>
                        </div>
                    ` : ''}

                    <div class="d-flex align-items-center gap-1.5 text-muted extra-small" title="Comments">
                        <i class="bi bi-chat-dots"></i>
                        <span class="fw-semibold">${task.comments || 0}</span>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <img src="${task.assignee.avatar}" class="rounded-circle border border-2 border-white shadow-2xs" width="28" height="28" alt="${task.assignee.name}" title="${task.assignee.name}">
                    </div>

                    <div class="dropdown">
                        <button class="btn btn-light btn-sm rounded-circle p-1" data-bs-toggle="dropdown" aria-expanded="false" style="width: 28px; height: 28px;">
                            <i class="bi bi-three-dots-vertical text-muted"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3">
                            <li><a class="dropdown-item small task-action-open" href="javascript:;"><i class="bi bi-eye me-2 text-primary"></i> View Details</a></li>
                            <li><a class="dropdown-item small task-action-toggle" href="javascript:;"><i class="bi bi-check2-circle me-2 text-success"></i> ${task.status === 'completed' ? 'Mark In Progress' : 'Mark Completed'}</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item small text-danger task-action-delete" href="javascript:;"><i class="bi bi-trash me-2"></i> Delete</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Checkbox event
        const checkbox = row.querySelector('.task-toggle-check');
        checkbox.addEventListener('change', () => {
            task.status = checkbox.checked ? 'completed' : 'inprogress';
            saveTasks();
            renderAllTasks();
        });

        // Dropdown actions
        row.querySelector('.task-action-toggle').addEventListener('click', () => {
            task.status = task.status === 'completed' ? 'inprogress' : 'completed';
            saveTasks();
            renderAllTasks();
        });

        row.querySelector('.task-action-delete').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderAllTasks();
        });

        row.querySelector('.task-action-open').addEventListener('click', () => {
            openTaskDetail(task);
        });

        return row;
    };

    const renderAllTasks = (filterStatus = 'all', searchQuery = '') => {
        const listContainer = document.getElementById('taskListContainer');
        if (!listContainer) return;

        listContainer.innerHTML = '';

        let filtered = tasks;
        if (filterStatus !== 'all') {
            filtered = filtered.filter(t => t.status === filterStatus);
        }

        if (searchQuery) {
            filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div class="card border-0 shadow-sm rounded-4 p-5 text-center">
                    <div class="py-4">
                        <i class="bi bi-clipboard2-check display-4 text-muted opacity-50 mb-3 d-block"></i>
                        <h6 class="fw-bold mb-1">No tasks found</h6>
                        <p class="text-muted small mb-3">All caught up or try adjusting your search filters.</p>
                        <button type="button" class="btn btn-primary rounded-pill px-4 fw-bold btn-sm" id="emptyStateCreateBtn">
                            Create new task
                        </button>
                    </div>
                </div>
            `;
            document.getElementById('emptyStateCreateBtn')?.addEventListener('click', () => {
                bsCreateModal?.show();
            });
            return;
        }

        filtered.forEach(task => {
            listContainer.appendChild(renderTaskRow(task));
        });
    };

    // Filter status tabs
    let currentStatus = 'all';
    let currentQuery = '';

    document.querySelectorAll('.task-status-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.task-status-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentStatus = btn.getAttribute('data-status') || 'all';
            renderAllTasks(currentStatus, currentQuery);
        });
    });

    const searchInput = document.getElementById('taskSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentQuery = e.target.value.trim();
            renderAllTasks(currentStatus, currentQuery);
        });
    }

    // Modal Create Task
    const createModalEl = document.getElementById('createTaskModal');
    let bsCreateModal = null;
    if (createModalEl && window.bootstrap) {
        bsCreateModal = new window.bootstrap.Modal(createModalEl);
    }

    const pagePrimaryActionBtn = document.getElementById('pagePrimaryActionBtn');
    if (pagePrimaryActionBtn) {
        pagePrimaryActionBtn.addEventListener('click', () => {
            bsCreateModal?.show();
        });
    }

    const createForm = document.getElementById('createTaskForm');
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('createTaskTitle')?.value.trim();
            const category = document.getElementById('createTaskCategory')?.value || 'Engineering';
            const priority = document.getElementById('createTaskPriority')?.value || 'Normal';
            const dueDate = document.getElementById('createTaskDueDate')?.value || 'Tomorrow';

            if (!title) return;

            const newTask = {
                id: `task-${Date.now()}`,
                title: title,
                category: category,
                status: 'inprogress',
                priority: priority,
                dueDate: dueDate,
                assignee: { name: 'Alex Morgan', avatar: '/app/src/images/photo1.jpg', initials: 'AM' },
                checklist: [],
                comments: 0
            };

            tasks.unshift(newTask);
            saveTasks();
            renderAllTasks(currentStatus, currentQuery);

            createForm.reset();
            bsCreateModal?.hide();
        });
    }

    // Task Detail Drawer
    const detailDrawerEl = document.getElementById('taskDetailDrawer');
    let bsDetailDrawer = null;
    if (detailDrawerEl && window.bootstrap) {
        bsDetailDrawer = new window.bootstrap.Offcanvas(detailDrawerEl);
    }

    const openTaskDetail = (task) => {
        if (!bsDetailDrawer) return;

        document.getElementById('drawerTaskTitle').textContent = task.title;
        document.getElementById('drawerTaskCategory').textContent = task.category;
        document.getElementById('drawerTaskPriority').textContent = task.priority;
        document.getElementById('drawerTaskDueDate').textContent = task.dueDate;
        document.getElementById('drawerTaskAssignee').textContent = task.assignee.name;

        const checklistContainer = document.getElementById('drawerChecklistItems');
        if (checklistContainer) {
            checklistContainer.innerHTML = '';
            if (task.checklist && task.checklist.length > 0) {
                task.checklist.forEach(item => {
                    const li = document.createElement('div');
                    li.className = 'form-check mb-2';
                    li.innerHTML = `
                        <input class="form-check-input" type="checkbox" ${item.done ? 'checked' : ''} disabled>
                        <label class="form-check-label small ${item.done ? 'text-decoration-line-through text-muted' : ''}">${escapeHtml(item.text)}</label>
                    `;
                    checklistContainer.appendChild(li);
                });
            } else {
                checklistContainer.innerHTML = '<p class="text-muted extra-small mb-0">No subtasks defined.</p>';
            }
        }

        bsDetailDrawer.show();
    };

    updateKPIs();
    renderAllTasks();
};
