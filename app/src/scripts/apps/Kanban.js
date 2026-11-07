import Sortable from 'sortablejs';

/**
 * Xivig Elite Kanban Module
 * Full drag-and-drop, dynamic task creation, column WIP tracking, and filtering.
 */
export const initKanban = () => {
    const columns = ['todo', 'inprogress', 'review', 'completed'];

    // 1. Update column count badges
    const updateColumnCounts = () => {
        columns.forEach(colId => {
            const list = document.getElementById(colId);
            const badge = document.querySelector(`[data-count-for="${colId}"]`);
            if (list && badge) {
                badge.textContent = list.children.length;
            }
        });
    };

    // 2. Initialize SortableJS on all 4 columns
    columns.forEach(columnId => {
        const el = document.getElementById(columnId);
        if (!el) return;

        new Sortable(el, {
            group: 'kanban_board',
            animation: 200,
            ghostClass: 'kanban-ghost',
            chosenClass: 'kanban-chosen',
            dragClass: 'kanban-drag',
            handle: '.kanban-card',

            onEnd: (evt) => {
                const itemEl = evt.item;
                const targetColumn = evt.to.id;

                updateCardVisuals(itemEl, targetColumn);
                updateColumnCounts();
            }
        });
    });

    const updateCardVisuals = (card, columnId) => {
        card.classList.remove('border-primary', 'border-info', 'border-warning', 'border-success', 'is-completed');

        switch (columnId) {
            case 'todo':
                card.classList.add('border-primary');
                break;
            case 'inprogress':
                card.classList.add('border-info');
                break;
            case 'review':
                card.classList.add('border-warning');
                break;
            case 'completed':
                card.classList.add('border-success', 'is-completed');
                break;
        }
    };

    updateColumnCounts();

    // 3. Modal Integration for Page Header CTA "Add task"
    const taskModalEl = document.getElementById('addKanbanTaskModal');
    let bsTaskModal = null;
    if (taskModalEl && window.bootstrap) {
        bsTaskModal = new window.bootstrap.Modal(taskModalEl);
    }

    const openTaskModal = (targetCol = 'todo') => {
        const colSelect = document.getElementById('taskColumnSelect');
        if (colSelect) {
            colSelect.value = targetCol;
        }
        bsTaskModal?.show();
    };

    // Listen to page header CTA
    const pagePrimaryActionBtn = document.getElementById('pagePrimaryActionBtn');
    if (pagePrimaryActionBtn) {
        pagePrimaryActionBtn.addEventListener('click', () => {
            openTaskModal('todo');
        });
    }

    // Plus buttons on column headers
    document.querySelectorAll('.btn-add-column-task').forEach(btn => {
        btn.addEventListener('click', () => {
            const col = btn.getAttribute('data-column') || 'todo';
            openTaskModal(col);
        });
    });

    // 4. Create Task Form Submission
    const taskForm = document.getElementById('addKanbanTaskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('taskTitleInput')?.value.trim();
            const desc = document.getElementById('taskDescInput')?.value.trim();
            const col = document.getElementById('taskColumnSelect')?.value || 'todo';
            const priority = document.getElementById('taskPrioritySelect')?.value || 'Medium';
            const tag = document.getElementById('taskTagSelect')?.value || 'Engineering';

            if (!title) return;

            let priorityBadge = '<span class="badge bg-warning-subtle text-warning extra-small fw-bold">Medium</span>';
            if (priority === 'High' || priority === 'Urgent') {
                priorityBadge = '<span class="badge bg-danger-subtle text-danger extra-small fw-bold">High</span>';
            } else if (priority === 'Low') {
                priorityBadge = '<span class="badge bg-success-subtle text-success extra-small fw-bold">Low</span>';
            }

            const targetList = document.getElementById(col);
            if (targetList) {
                const newCard = document.createElement('div');
                newCard.className = `card kanban-card border border-secondary border-opacity-15 shadow-2xs rounded-3 p-3.5 bg-body border-start border-4 transition-all cursor-grab ${col === 'todo' ? 'border-primary' : col === 'inprogress' ? 'border-info' : col === 'review' ? 'border-warning' : 'border-success'}`;
                newCard.innerHTML = `
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="badge bg-primary-subtle text-primary extra-small fw-bold px-2 py-0.5 rounded-pill">${tag}</span>
                        ${priorityBadge}
                    </div>
                    <h6 class="fw-bold mb-1.5 fs-14 text-main text-truncate-2">${title}</h6>
                    <p class="text-muted extra-small mb-3 text-truncate-2">${desc || 'Standard architectural workflow sprint task.'}</p>
                    <div class="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-10">
                        <div class="d-flex align-items-center gap-2">
                            <img src="/app/src/images/photo1.jpg" class="rounded-circle border border-2 border-white shadow-2xs" width="24" height="24" alt="Assignee">
                            <span class="text-muted extra-small"><i class="bi bi-clock me-1"></i> Today</span>
                        </div>
                        <div class="d-flex align-items-center gap-2 text-muted extra-small">
                            <span><i class="bi bi-chat-dots me-1"></i> 1</span>
                            <span><i class="bi bi-check2-square me-1"></i> 0/2</span>
                        </div>
                    </div>
                `;
                targetList.prepend(newCard);
                updateColumnCounts();
            }

            taskForm.reset();
            bsTaskModal?.hide();
        });
    }

    // 5. Board Search Filtering
    const searchInput = document.getElementById('kanbanSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.kanban-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                if (!query || text.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};
