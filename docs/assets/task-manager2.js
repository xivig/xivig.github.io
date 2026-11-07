import"./vendor-core.js";var e=e=>e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`),t=()=>{if(!document.querySelector(`.task-manager-module`))return;let t=`xivig_elite_tasks_v4`,n=[{id:`task-101`,title:`Design System Semantic Token Mapping`,category:`Design System`,status:`inprogress`,priority:`High`,dueDate:`Today, 5:00 PM`,assignee:{name:`Alex Morgan`,avatar:`/app/src/images/avatar-01.jpg`,initials:`AM`},checklist:[{text:`Audit SCSS color tokens`,done:!0},{text:`Map dark mode surface overrides`,done:!0},{text:`Verify typography scale rem values`,done:!1}],comments:6},{id:`task-102`,title:`API Gateway SSL Certificate Rotation`,category:`Security`,status:`inprogress`,priority:`Urgent`,dueDate:`Tomorrow`,assignee:{name:`David Kim`,avatar:`/app/src/images/avatar-03.jpg`,initials:`DK`},checklist:[{text:`Generate CSR on staging cluster`,done:!0},{text:`Deploy wildcard cert to Cloudflare`,done:!1}],comments:3},{id:`task-103`,title:`FullCalendar Vanilla JS Integration Audit`,category:`Engineering`,status:`upcoming`,priority:`Normal`,dueDate:`Apr 20`,assignee:{name:`Sarah Chen`,avatar:`/app/src/images/avatar-02.jpg`,initials:`SC`},checklist:[{text:`Verify draggable chips from side rail`,done:!1},{text:`Test modal create event binding`,done:!1}],comments:1},{id:`task-104`,title:`Clean Unused Root Assets & Image Bloat`,category:`DevOps`,status:`completed`,priority:`Normal`,dueDate:`Yesterday`,assignee:{name:`Alex Morgan`,avatar:`/app/src/images/avatar-01.jpg`,initials:`AM`},checklist:[{text:`Delete 38 dead image files`,done:!0},{text:`Verify gulp asset pipeline`,done:!0}],comments:4},{id:`task-105`,title:`Eliminate Legacy jQuery & Timedropper Plugins`,category:`Refactor`,status:`completed`,priority:`High`,dueDate:`Apr 12`,assignee:{name:`David Kim`,avatar:`/app/src/images/avatar-03.jpg`,initials:`DK`},checklist:[{text:`Replace Summernote with Quill v2`,done:!0},{text:`Native DataTables v2 refactor`,done:!0},{text:`AirDatepicker Vanilla implementation`,done:!0}],comments:9}],r=[],i=localStorage.getItem(t);if(i)try{r=JSON.parse(i)}catch{r=n}else r=n;let a=()=>{localStorage.setItem(t,JSON.stringify(r)),o()},o=()=>{let e=r.length,t=r.filter(e=>e.status===`inprogress`).length,n=r.filter(e=>e.status===`upcoming`).length,i=r.filter(e=>e.status===`completed`).length,a=document.getElementById(`kpiTotalTasks`),o=document.getElementById(`kpiInProgressTasks`),s=document.getElementById(`kpiUpcomingTasks`),c=document.getElementById(`kpiCompletedTasks`);a&&(a.textContent=e),o&&(o.textContent=t),s&&(s.textContent=n),c&&(c.textContent=i)},s=t=>{let n=document.createElement(`div`);n.className=`card task-row-card border border-secondary border-opacity-15 shadow-2xs rounded-3 mb-2.5 p-3 transition-all ${t.status===`completed`?`task-completed opacity-75 bg-body-tertiary`:`bg-body`}`,n.dataset.id=t.id;let i=t.checklist?t.checklist.filter(e=>e.done).length:0,o=t.checklist?t.checklist.length:0,s=`bg-secondary-subtle text-secondary`;t.priority===`Urgent`?s=`bg-danger-subtle text-danger border border-danger-subtle`:t.priority===`High`?s=`bg-danger-subtle text-danger`:t.priority===`Normal`?s=`bg-primary-subtle text-primary`:t.priority===`Low`&&(s=`bg-success-subtle text-success`),n.innerHTML=`
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2.5">
                <div class="d-flex align-items-center gap-3 flex-grow-1 min-w-0">
                    <div class="d-flex align-items-center flex-shrink-0">
                        <i class="bi bi-grip-vertical text-muted opacity-25 cursor-grab me-1" title="Reorder"></i>
                        <input class="form-check-input task-toggle-check cursor-pointer rounded-2 m-0 flex-shrink-0" type="checkbox" ${t.status===`completed`?`checked`:``} style="width: 18px; height: 18px; cursor: pointer;">
                    </div>
                    <div class="d-flex align-items-center gap-2 flex-wrap flex-grow-1 min-w-0">
                        <span class="fw-semibold mb-0 task-title text-truncate me-2 ${t.status===`completed`?`text-decoration-line-through text-muted opacity-75`:`text-main`}" style="font-size: 0.9rem;">${e(t.title)}</span>
                        <span class="badge ${s} extra-small fw-bold px-2 py-0.5 rounded-pill">${t.priority}</span>
                        <span class="badge bg-body-secondary text-muted border border-secondary border-opacity-15 extra-small px-2 py-0.5 rounded-pill">${e(t.category)}</span>
                        <span class="text-muted extra-small ms-auto ms-sm-0"><i class="bi bi-clock me-1"></i> ${e(t.dueDate)}</span>
                    </div>
                </div>

                <div class="d-flex align-items-center gap-3 ms-auto flex-shrink-0">
                    ${o>0?`
                        <div class="d-flex align-items-center gap-1.5 text-muted extra-small" title="Checklist progress">
                            <i class="bi bi-check2-square text-primary"></i>
                            <span class="fw-semibold">${i}/${o}</span>
                        </div>
                    `:``}

                    <div class="d-flex align-items-center gap-1.5 text-muted extra-small" title="Comments">
                        <i class="bi bi-chat-dots"></i>
                        <span class="fw-semibold">${t.comments||0}</span>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <img src="${t.assignee.avatar}" class="rounded-circle border border-2 border-white shadow-2xs" width="28" height="28" alt="${t.assignee.name}" title="${t.assignee.name}">
                    </div>

                    <div class="dropdown">
                        <button class="btn btn-light btn-sm rounded-circle p-1" data-bs-toggle="dropdown" aria-expanded="false" style="width: 28px; height: 28px;">
                            <i class="bi bi-three-dots-vertical text-muted"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3">
                            <li><a class="dropdown-item small task-action-open" href="javascript:;"><i class="bi bi-eye me-2 text-primary"></i> View Details</a></li>
                            <li><a class="dropdown-item small task-action-toggle" href="javascript:;"><i class="bi bi-check2-circle me-2 text-success"></i> ${t.status===`completed`?`Mark In Progress`:`Mark Completed`}</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item small text-danger task-action-delete" href="javascript:;"><i class="bi bi-trash me-2"></i> Delete</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;let l=n.querySelector(`.task-toggle-check`);return l.addEventListener(`change`,()=>{t.status=l.checked?`completed`:`inprogress`,a(),c()}),n.querySelector(`.task-action-toggle`).addEventListener(`click`,()=>{t.status=t.status===`completed`?`inprogress`:`completed`,a(),c()}),n.querySelector(`.task-action-delete`).addEventListener(`click`,()=>{r=r.filter(e=>e.id!==t.id),a(),c()}),n.querySelector(`.task-action-open`).addEventListener(`click`,()=>{v(t)}),n},c=(e=`all`,t=``)=>{let n=document.getElementById(`taskListContainer`);if(!n)return;n.innerHTML=``;let i=r;if(e!==`all`&&(i=i.filter(t=>t.status===e)),t&&(i=i.filter(e=>e.title.toLowerCase().includes(t.toLowerCase())||e.category.toLowerCase().includes(t.toLowerCase()))),i.length===0){n.innerHTML=`
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
            `,document.getElementById(`emptyStateCreateBtn`)?.addEventListener(`click`,()=>{p?.show()});return}i.forEach(e=>{n.appendChild(s(e))})},l=`all`,u=``;document.querySelectorAll(`.task-status-filter-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.task-status-filter-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),l=e.getAttribute(`data-status`)||`all`,c(l,u)})});let d=document.getElementById(`taskSearchInput`);d&&d.addEventListener(`input`,e=>{u=e.target.value.trim(),c(l,u)});let f=document.getElementById(`createTaskModal`),p=null;f&&window.bootstrap&&(p=new window.bootstrap.Modal(f));let m=document.getElementById(`pagePrimaryActionBtn`);m&&m.addEventListener(`click`,()=>{p?.show()});let h=document.getElementById(`createTaskForm`);h&&h.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`createTaskTitle`)?.value.trim(),n=document.getElementById(`createTaskCategory`)?.value||`Engineering`,i=document.getElementById(`createTaskPriority`)?.value||`Normal`,o=document.getElementById(`createTaskDueDate`)?.value||`Tomorrow`;if(!t)return;let s={id:`task-${Date.now()}`,title:t,category:n,status:`inprogress`,priority:i,dueDate:o,assignee:{name:`Alex Morgan`,avatar:`/app/src/images/avatar-01.jpg`,initials:`AM`},checklist:[],comments:0};r.unshift(s),a(),c(l,u),h.reset(),p?.hide()});let g=document.getElementById(`taskDetailDrawer`),_=null;g&&window.bootstrap&&(_=new window.bootstrap.Offcanvas(g));let v=t=>{if(!_)return;document.getElementById(`drawerTaskTitle`).textContent=t.title,document.getElementById(`drawerTaskCategory`).textContent=t.category,document.getElementById(`drawerTaskPriority`).textContent=t.priority,document.getElementById(`drawerTaskDueDate`).textContent=t.dueDate,document.getElementById(`drawerTaskAssignee`).textContent=t.assignee.name;let n=document.getElementById(`drawerChecklistItems`);n&&(n.innerHTML=``,t.checklist&&t.checklist.length>0?t.checklist.forEach(t=>{let r=document.createElement(`div`);r.className=`form-check mb-2`,r.innerHTML=`
                        <input class="form-check-input" type="checkbox" ${t.done?`checked`:``} disabled>
                        <label class="form-check-label small ${t.done?`text-decoration-line-through text-muted`:``}">${e(t.text)}</label>
                    `,n.appendChild(r)}):n.innerHTML=`<p class="text-muted extra-small mb-0">No subtasks defined.</p>`),_.show()};o(),c()};export{t as initTaskManager};