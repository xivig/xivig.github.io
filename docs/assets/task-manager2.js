import"./vendor-core.js";var e=()=>{if(!document.querySelector(`.task-manager-module`))return;let e=`xivig_elite_tasks_v4`,t=[{id:`task-101`,title:`Design System Semantic Token Mapping`,category:`Design System`,status:`inprogress`,priority:`High`,dueDate:`Today, 5:00 PM`,assignee:{name:`Alex Morgan`,avatar:`/app/src/images/photo1.jpg`,initials:`AM`},checklist:[{text:`Audit SCSS color tokens`,done:!0},{text:`Map dark mode surface overrides`,done:!0},{text:`Verify typography scale rem values`,done:!1}],comments:6},{id:`task-102`,title:`API Gateway SSL Certificate Rotation`,category:`Security`,status:`inprogress`,priority:`Urgent`,dueDate:`Tomorrow`,assignee:{name:`David Kim`,avatar:`/app/src/images/photo3.jpg`,initials:`DK`},checklist:[{text:`Generate CSR on staging cluster`,done:!0},{text:`Deploy wildcard cert to Cloudflare`,done:!1}],comments:3},{id:`task-103`,title:`FullCalendar Vanilla JS Integration Audit`,category:`Engineering`,status:`upcoming`,priority:`Normal`,dueDate:`Apr 20`,assignee:{name:`Sarah Chen`,avatar:`/app/src/images/photo2.jpg`,initials:`SC`},checklist:[{text:`Verify draggable chips from side rail`,done:!1},{text:`Test modal create event binding`,done:!1}],comments:1},{id:`task-104`,title:`Clean Unused Root Assets & Image Bloat`,category:`DevOps`,status:`completed`,priority:`Normal`,dueDate:`Yesterday`,assignee:{name:`Alex Morgan`,avatar:`/app/src/images/photo1.jpg`,initials:`AM`},checklist:[{text:`Delete 38 dead image files`,done:!0},{text:`Verify gulp asset pipeline`,done:!0}],comments:4},{id:`task-105`,title:`Eliminate Legacy jQuery & Timedropper Plugins`,category:`Refactor`,status:`completed`,priority:`High`,dueDate:`Apr 12`,assignee:{name:`David Kim`,avatar:`/app/src/images/photo3.jpg`,initials:`DK`},checklist:[{text:`Replace Summernote with Quill v2`,done:!0},{text:`Native DataTables v2 refactor`,done:!0},{text:`AirDatepicker Vanilla implementation`,done:!0}],comments:9}],n=[],r=localStorage.getItem(e);if(r)try{n=JSON.parse(r)}catch{n=t}else n=t;let i=()=>{localStorage.setItem(e,JSON.stringify(n)),a()},a=()=>{let e=n.length,t=n.filter(e=>e.status===`inprogress`).length,r=n.filter(e=>e.status===`upcoming`).length,i=n.filter(e=>e.status===`completed`).length,a=document.getElementById(`kpiTotalTasks`),o=document.getElementById(`kpiInProgressTasks`),s=document.getElementById(`kpiUpcomingTasks`),c=document.getElementById(`kpiCompletedTasks`);a&&(a.textContent=e),o&&(o.textContent=t),s&&(s.textContent=r),c&&(c.textContent=i)},o=e=>{let t=document.createElement(`div`);t.className=`card task-row-card border border-secondary border-opacity-15 shadow-2xs rounded-3 mb-2.5 p-3 transition-all ${e.status===`completed`?`task-completed opacity-75 bg-body-tertiary`:`bg-body`}`,t.dataset.id=e.id;let r=e.checklist?e.checklist.filter(e=>e.done).length:0,a=e.checklist?e.checklist.length:0,o=`bg-secondary-subtle text-secondary`;e.priority===`Urgent`?o=`bg-danger-subtle text-danger border border-danger-subtle`:e.priority===`High`?o=`bg-danger-subtle text-danger`:e.priority===`Normal`?o=`bg-primary-subtle text-primary`:e.priority===`Low`&&(o=`bg-success-subtle text-success`),t.innerHTML=`
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2.5">
                <div class="d-flex align-items-center gap-3 flex-grow-1 min-w-0">
                    <div class="d-flex align-items-center flex-shrink-0">
                        <i class="bi bi-grip-vertical text-muted opacity-25 cursor-grab me-1" title="Reorder"></i>
                        <input class="form-check-input task-toggle-check cursor-pointer rounded-2 m-0 flex-shrink-0" type="checkbox" ${e.status===`completed`?`checked`:``} style="width: 18px; height: 18px; cursor: pointer;">
                    </div>
                    <div class="d-flex align-items-center gap-2 flex-wrap flex-grow-1 min-w-0">
                        <span class="fw-semibold mb-0 task-title text-truncate me-2 ${e.status===`completed`?`text-decoration-line-through text-muted opacity-75`:`text-main`}" style="font-size: 0.9rem;">${e.title}</span>
                        <span class="badge ${o} extra-small fw-bold px-2 py-0.5 rounded-pill">${e.priority}</span>
                        <span class="badge bg-body-secondary text-muted border border-secondary border-opacity-15 extra-small px-2 py-0.5 rounded-pill">${e.category}</span>
                        <span class="text-muted extra-small ms-auto ms-sm-0"><i class="bi bi-clock me-1"></i> ${e.dueDate}</span>
                    </div>
                </div>

                <div class="d-flex align-items-center gap-3 ms-auto flex-shrink-0">
                    ${a>0?`
                        <div class="d-flex align-items-center gap-1.5 text-muted extra-small" title="Checklist progress">
                            <i class="bi bi-check2-square text-primary"></i>
                            <span class="fw-semibold">${r}/${a}</span>
                        </div>
                    `:``}

                    <div class="d-flex align-items-center gap-1.5 text-muted extra-small" title="Comments">
                        <i class="bi bi-chat-dots"></i>
                        <span class="fw-semibold">${e.comments||0}</span>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <img src="${e.assignee.avatar}" class="rounded-circle border border-2 border-white shadow-2xs" width="28" height="28" alt="${e.assignee.name}" title="${e.assignee.name}">
                    </div>

                    <div class="dropdown">
                        <button class="btn btn-light btn-sm rounded-circle p-1" data-bs-toggle="dropdown" aria-expanded="false" style="width: 28px; height: 28px;">
                            <i class="bi bi-three-dots-vertical text-muted"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3">
                            <li><a class="dropdown-item small task-action-open" href="javascript:;"><i class="bi bi-eye me-2 text-primary"></i> View Details</a></li>
                            <li><a class="dropdown-item small task-action-toggle" href="javascript:;"><i class="bi bi-check2-circle me-2 text-success"></i> ${e.status===`completed`?`Mark In Progress`:`Mark Completed`}</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item small text-danger task-action-delete" href="javascript:;"><i class="bi bi-trash me-2"></i> Delete</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;let c=t.querySelector(`.task-toggle-check`);return c.addEventListener(`change`,()=>{e.status=c.checked?`completed`:`inprogress`,i(),s()}),t.querySelector(`.task-action-toggle`).addEventListener(`click`,()=>{e.status=e.status===`completed`?`inprogress`:`completed`,i(),s()}),t.querySelector(`.task-action-delete`).addEventListener(`click`,()=>{n=n.filter(t=>t.id!==e.id),i(),s()}),t.querySelector(`.task-action-open`).addEventListener(`click`,()=>{_(e)}),t},s=(e=`all`,t=``)=>{let r=document.getElementById(`taskListContainer`);if(!r)return;r.innerHTML=``;let i=n;if(e!==`all`&&(i=i.filter(t=>t.status===e)),t&&(i=i.filter(e=>e.title.toLowerCase().includes(t.toLowerCase())||e.category.toLowerCase().includes(t.toLowerCase()))),i.length===0){r.innerHTML=`
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
            `,document.getElementById(`emptyStateCreateBtn`)?.addEventListener(`click`,()=>{f?.show()});return}i.forEach(e=>{r.appendChild(o(e))})},c=`all`,l=``;document.querySelectorAll(`.task-status-filter-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.task-status-filter-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),c=e.getAttribute(`data-status`)||`all`,s(c,l)})});let u=document.getElementById(`taskSearchInput`);u&&u.addEventListener(`input`,e=>{l=e.target.value.trim(),s(c,l)});let d=document.getElementById(`createTaskModal`),f=null;d&&window.bootstrap&&(f=new window.bootstrap.Modal(d));let p=document.getElementById(`pagePrimaryActionBtn`);p&&p.addEventListener(`click`,()=>{f?.show()});let m=document.getElementById(`createTaskForm`);m&&m.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`createTaskTitle`)?.value.trim(),r=document.getElementById(`createTaskCategory`)?.value||`Engineering`,a=document.getElementById(`createTaskPriority`)?.value||`Normal`,o=document.getElementById(`createTaskDueDate`)?.value||`Tomorrow`;if(!t)return;let u={id:`task-${Date.now()}`,title:t,category:r,status:`inprogress`,priority:a,dueDate:o,assignee:{name:`Alex Morgan`,avatar:`/app/src/images/photo1.jpg`,initials:`AM`},checklist:[],comments:0};n.unshift(u),i(),s(c,l),m.reset(),f?.hide()});let h=document.getElementById(`taskDetailDrawer`),g=null;h&&window.bootstrap&&(g=new window.bootstrap.Offcanvas(h));let _=e=>{if(!g)return;document.getElementById(`drawerTaskTitle`).textContent=e.title,document.getElementById(`drawerTaskCategory`).textContent=e.category,document.getElementById(`drawerTaskPriority`).textContent=e.priority,document.getElementById(`drawerTaskDueDate`).textContent=e.dueDate,document.getElementById(`drawerTaskAssignee`).textContent=e.assignee.name;let t=document.getElementById(`drawerChecklistItems`);t&&(t.innerHTML=``,e.checklist&&e.checklist.length>0?e.checklist.forEach(e=>{let n=document.createElement(`div`);n.className=`form-check mb-2`,n.innerHTML=`
                        <input class="form-check-input" type="checkbox" ${e.done?`checked`:``} disabled>
                        <label class="form-check-label small ${e.done?`text-decoration-line-through text-muted`:``}">${e.text}</label>
                    `,t.appendChild(n)}):t.innerHTML=`<p class="text-muted extra-small mb-0">No subtasks defined.</p>`),g.show()};a(),s()};export{e as initTaskManager};