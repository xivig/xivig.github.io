import{p as e}from"./vendor-core.js";import{t}from"./sweet-alert.js";var n=async()=>{let n=document.getElementById(`sortable-sidebar`);if(!n)return;let r=JSON.parse(localStorage.getItem(`xivig_sidebar_config`)),i=[],a=(e,t)=>{e.innerHTML=``,t.forEach((t,n)=>{let r=document.createElement(`div`);r.className=`nested-item border-start border-2 border-primary ps-3 my-3`;let i=t.submenu&&t.submenu.length>0;r.innerHTML=`
                <div class="d-flex gap-2 mb-2 align-items-center">
                    <input type="text" class="form-control form-control-sm rounded-3 sub-label" value="${t.label}" placeholder="Sub-item Label">
                    <input type="text" class="form-control form-control-sm rounded-3 sub-path" value="${t.path}" placeholder="Path">
                    <button type="button" class="btn btn-sm btn-outline-danger border-0 remove-sub" data-index="${n}"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="form-check form-switch mb-2">
                    <input class="form-check-input has-nested-submenu" type="checkbox" ${i?`checked`:``}>
                    <label class="form-check-label small">Has Nested Submenu?</label>
                </div>
                <div class="nested-submenu-container ps-3 ${i?``:`d-none`}"></div>
                <button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-3 mt-2 add-nested-submenu-item ${i?``:`d-none`}">
                    <i class="bi bi-plus-lg me-1"></i> Add Level 2 Item
                </button>
            `,e.appendChild(r),i&&a(r.querySelector(`.nested-submenu-container`),t.submenu)})},o=()=>{let e=document.getElementById(`submenu-list`);e&&a(e,i)},s=()=>{let e=document.getElementById(`sidebar-live-preview`);if(!e)return;let t=JSON.parse(localStorage.getItem(`xivig_branding`))||{},n=localStorage.getItem(`xivig_logo`)||`/app/src/images/logo.png`,i=t.title||`XIVIG ELITE OS`,a=t.accent||`#4059E8`;e.innerHTML=`
            <div class="sidebar-mini shadow-lg" style="width: 100%; height: 100%; background: #0c1322; color: #fff; border-radius: 14px; font-size: 0.75rem; border: 1px solid rgba(255,255,255,0.08);">
                <div class="p-3 border-bottom border-white border-opacity-10 d-flex align-items-center gap-2">
                    <img src="${n}" style="width: 24px; height: 24px; object-fit: contain;">
                    <span class="fw-bold text-white small">${i}</span>
                </div>
                <div class="p-2">
                    ${(r||[]).map(e=>`
                        <div class="d-flex align-items-center gap-2 p-2 mb-1 rounded" style="background: rgba(255,255,255,0.05);">
                            <i class="${e.icon}" style="color: ${a};"></i>
                            <span class="text-white">${e.label}</span>
                            ${e.hasSubmenu?`<i class="bi bi-chevron-down ms-auto x-small opacity-50"></i>`:``}
                        </div>
                        ${e.hasSubmenu&&e.submenu?`
                            <div class="ps-4 mb-2 opacity-50">
                                ${e.submenu.map(e=>`<div class="py-1 border-start border-white border-opacity-10 ps-2 mb-1 text-white">${e.label}</div>`).join(``)}
                            </div>
                        `:``}
                    `).join(``)}
                    <div class="d-flex align-items-center gap-2 p-2 mt-4 rounded text-danger opacity-75">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </div>
                </div>
            </div>
        `},c=()=>{if(n.innerHTML=``,!r||r.length===0){n.innerHTML=`
                <li class="list-group-item p-4 text-center border-0">
                    <p class="text-muted small mb-0">No navigation items configured. Click "Add Item" to begin.</p>
                </li>
            `,s();return}r.forEach((e,t)=>{let r=document.createElement(`li`);r.className=`list-group-item p-3 d-flex align-items-center justify-content-between border-bottom border-light border-opacity-10`,r.dataset.id=e.id,r.innerHTML=`
                <div class="d-flex align-items-center gap-3">
                    <div class="handle text-muted" style="cursor: grab;" title="Drag to reorder">
                        <i class="bi bi-grip-vertical fs-5"></i>
                    </div>
                    <div class="icon-box bg-primary-subtle text-primary p-2 rounded-3 d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
                        <i class="${e.icon}"></i>
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-main small">${e.label}</h6>
                        <small class="text-muted">${e.path} ${e.hasSubmenu?`<span class="badge bg-secondary-subtle text-muted ms-1">${e.submenu?.length||0} sub-items</span>`:``}</small>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-secondary rounded-circle edit-item" data-index="${t}" title="Edit Item" style="width: 32px; height: 32px; padding: 0;">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger rounded-circle delete-item" data-index="${t}" title="Delete Item" style="width: 32px; height: 32px; padding: 0;">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `,n.appendChild(r)}),new e(n,{handle:`.handle`,animation:150,ghostClass:`sortable-ghost`,chosenClass:`sortable-chosen`,onEnd:function(e){let t=r.splice(e.oldIndex,1)[0];r.splice(e.newIndex,0,t),l(!0),s()}}),s()},l=(e=!1)=>{localStorage.setItem(`xivig_sidebar_config`,JSON.stringify(r)),window.dispatchEvent(new Event(`sidebarUpdated`)),e||t.success(`Config Saved`,`Sidebar changes applied globally.`)};if(!r||!Array.isArray(r)||r.length===0){let e=[`./data/sidebar-config.json`,`/data/sidebar-config.json`,`../data/sidebar-config.json`,`../../data/sidebar-config.json`,`../../../data/sidebar-config.json`],t=!1;for(let n of e)try{let e=await fetch(n);if(e.ok){r=await e.json(),localStorage.setItem(`xivig_sidebar_config`,JSON.stringify(r)),t=!0;break}}catch{}t||(r=[{id:1,label:`Dashboard`,icon:`bi bi-grid`,path:`index.html`,hasSubmenu:!1},{id:2,label:`Analytics`,icon:`bi bi-bar-chart`,path:`overview.html`,hasSubmenu:!1},{id:3,label:`System Metrics`,icon:`bi bi-cpu`,path:`system-metrics.html`,hasSubmenu:!1},{id:4,label:`Gallery`,icon:`bi bi-images`,path:`gallery.html`,hasSubmenu:!1},{id:5,label:`Help & Support`,icon:`bi bi-question-circle`,path:`help-support.html`,hasSubmenu:!1},{id:6,label:`Profile`,icon:`bi bi-person`,path:`profile.html`,hasSubmenu:!1}],localStorage.setItem(`xivig_sidebar_config`,JSON.stringify(r))),c()}else c();let u=JSON.parse(localStorage.getItem(`xivig_branding`))||{},d=document.getElementById(`sidebar-title-input`),f=document.getElementById(`accent-color`),p=document.getElementById(`accent-color-hex`),m=document.getElementById(`preview-logo`),h=localStorage.getItem(`xivig_logo`);d&&u.title&&(d.value=u.title),f&&u.accent&&(f.value=u.accent,p&&(p.value=u.accent)),m&&h&&(m.src=h),f?.addEventListener(`input`,e=>{p&&(p.value=e.target.value)}),document.querySelectorAll(`.swatch-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-color`);f&&(f.value=t),p&&(p.value=t)})}),document.getElementById(`logo-upload`)?.addEventListener(`change`,e=>{let n=e.target.files[0];if(!n)return;let r=new FileReader;r.onload=e=>{let n=e.target.result;m&&(m.src=n),localStorage.setItem(`xivig_logo`,n),s(),window.dispatchEvent(new Event(`brandingUpdated`)),t.success(`Logo Updated`,`Brand visual identity refreshed.`)},r.readAsDataURL(n)});let g=document.getElementById(`menu-item-form`),_=document.getElementById(`addMenuModal`),v=_?new bootstrap.Modal(_):null,y=e=>{let t=[];return e.querySelectorAll(`:scope > .nested-item`).forEach(e=>{let n=e.querySelector(`.sub-label`).value,r=e.querySelector(`.sub-path`).value,i=e.querySelector(`.has-nested-submenu`).checked,a=e.querySelector(`.nested-submenu-container`);if(n&&r){let e={label:n,path:r};i&&a?(e.hasSubmenu=!0,e.submenu=y(a)):(e.hasSubmenu=!1,e.submenu=null),t.push(e)}}),t};g?.addEventListener(`submit`,e=>{e.preventDefault();let t=parseInt(document.getElementById(`edit-index`).value),n=document.getElementById(`item-label`).value,i=document.getElementById(`item-icon`).value,a=document.getElementById(`item-path`).value,o=document.getElementById(`item-has-dropdown`).checked,s={id:t===-1?Date.now():r[t].id,label:n,icon:i,path:a,hasSubmenu:o,submenu:null};o&&(s.submenu=y(document.getElementById(`submenu-list`))),t===-1?r.push(s):r[t]=s,l(),c(),v?.hide()}),document.getElementById(`submenu-list`)?.addEventListener(`click`,e=>{if(e.target.closest(`.remove-sub`)){e.target.closest(`.nested-item`)?.remove();return}if(e.target.closest(`.add-nested-submenu-item`)){let t=e.target.closest(`.nested-item`).querySelector(`.nested-submenu-container`);if(t){let e=document.createElement(`div`);e.className=`nested-item border-start border-2 border-primary ps-3 my-3`,e.innerHTML=`
                    <div class="d-flex gap-2 mb-2 align-items-center">
                        <input type="text" class="form-control form-control-sm rounded-3 sub-label" value="" placeholder="Sub-item Label">
                        <input type="text" class="form-control form-control-sm rounded-3 sub-path" value="" placeholder="Path">
                        <button type="button" class="btn btn-sm btn-outline-danger border-0 remove-sub"><i class="bi bi-x-lg"></i></button>
                    </div>
                    <div class="form-check form-switch mb-2">
                        <input class="form-check-input has-nested-submenu" type="checkbox">
                        <label class="form-check-label small">Has Nested Submenu?</label>
                    </div>
                    <div class="nested-submenu-container ps-3 d-none"></div>
                    <button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-3 mt-2 add-nested-submenu-item d-none">
                        <i class="bi bi-plus-lg me-1"></i> Add Level 2 Item
                    </button>
                `,t.appendChild(e)}return}}),document.getElementById(`submenu-list`)?.addEventListener(`change`,e=>{if(e.target.classList.contains(`has-nested-submenu`)){let t=e.target.closest(`.nested-item`);t&&(t.querySelector(`.nested-submenu-container`)?.classList.toggle(`d-none`,!e.target.checked),t.querySelector(`.add-nested-submenu-item`)?.classList.toggle(`d-none`,!e.target.checked))}}),document.getElementById(`add-submenu-item`)?.addEventListener(`click`,()=>{let e=document.getElementById(`submenu-list`);if(!e)return;let t=document.createElement(`div`);t.className=`nested-item border-start border-2 border-primary ps-3 my-3`,t.innerHTML=`
            <div class="d-flex gap-2 mb-2 align-items-center">
                <input type="text" class="form-control form-control-sm rounded-3 sub-label" value="" placeholder="Sub-item Label">
                <input type="text" class="form-control form-control-sm rounded-3 sub-path" value="" placeholder="Path">
                <button type="button" class="btn btn-sm btn-outline-danger border-0 remove-sub"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="form-check form-switch mb-2">
                <input class="form-check-input has-nested-submenu" type="checkbox">
                <label class="form-check-label small">Has Nested Submenu?</label>
            </div>
            <div class="nested-submenu-container ps-3 d-none"></div>
            <button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-3 mt-2 add-nested-submenu-item d-none">
                <i class="bi bi-plus-lg me-1"></i> Add Level 2 Item
            </button>
        `,e.appendChild(t)}),n.addEventListener(`click`,e=>{let n=e.target.closest(`.delete-item`),a=e.target.closest(`.edit-item`);if(n){let e=parseInt(n.dataset.index);t.confirm(`Delete Item?`,`Are you sure you want to remove "${r[e].label}"?`).then(t=>{t.isConfirmed&&(r.splice(e,1),l(),c())})}if(a){let e=parseInt(a.dataset.index),t=r[e];document.getElementById(`edit-index`).value=e,document.getElementById(`item-label`).value=t.label,document.getElementById(`item-icon`).value=t.icon,document.getElementById(`item-path`).value=t.path,document.getElementById(`item-has-dropdown`).checked=t.hasSubmenu,i=t.submenu?[...t.submenu]:[],document.getElementById(`submenu-container`).classList.toggle(`d-none`,!t.hasSubmenu),o(),document.getElementById(`menuModalLabel`).innerText=`Edit Menu Item`,v?.show()}}),document.querySelector(`[data-bs-target="#addMenuModal"]`)?.addEventListener(`click`,()=>{document.getElementById(`edit-index`).value=`-1`,g.reset(),i=[],document.getElementById(`submenu-container`).classList.add(`d-none`),document.getElementById(`menuModalLabel`).innerText=`Add Menu Item`}),document.getElementById(`branding-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`sidebar-title-input`).value,r=document.getElementById(`accent-color`).value;localStorage.setItem(`xivig_branding`,JSON.stringify({title:n,accent:r})),window.dispatchEvent(new Event(`brandingUpdated`)),s(),t.success(`Branding Updated`,`Look and feel synchronized.`)}),document.getElementById(`export-config`)?.addEventListener(`click`,()=>{let e=`data:text/json;charset=utf-8,`+encodeURIComponent(JSON.stringify({sidebar:r,branding:JSON.parse(localStorage.getItem(`xivig_branding`))||{},logo:localStorage.getItem(`xivig_logo`)},null,2)),t=document.createElement(`a`);t.setAttribute(`href`,e),t.setAttribute(`download`,`xivig_elite_config.json`),document.body.appendChild(t),t.click(),t.remove()});let b=document.getElementById(`import-trigger`),x=document.getElementById(`import-config`);b?.addEventListener(`click`,()=>x.click()),x?.addEventListener(`change`,e=>{let n=e.target.files[0];if(!n)return;let i=new FileReader;i.onload=n=>{try{let i=JSON.parse(n.target.result),a=null;if(Array.isArray(i)?a=i:i.sidebar&&Array.isArray(i.sidebar)&&(a=i.sidebar,i.branding&&localStorage.setItem(`xivig_branding`,JSON.stringify(i.branding)),i.logo&&localStorage.setItem(`xivig_logo`,i.logo)),a)r=a,localStorage.setItem(`xivig_sidebar_config`,JSON.stringify(r)),c(),window.dispatchEvent(new Event(`sidebarUpdated`)),window.dispatchEvent(new Event(`brandingUpdated`)),t.success(`Import Success`,`Dashboard configuration restored.`);else throw Error(`Invalid format`);e.target.value=``}catch(n){console.error(`❌ Import Error:`,n),t.error(`Import Failed`,`Invalid JSON configuration file.`),e.target.value=``}},i.readAsText(n)}),document.getElementById(`reset-settings`)?.addEventListener(`click`,()=>{t.confirm(`Factory Reset?`,`Revert everything to system defaults?`).then(e=>{e.isConfirmed&&(localStorage.removeItem(`xivig_sidebar_config`),localStorage.removeItem(`xivig_branding`),localStorage.removeItem(`xivig_logo`),window.location.reload())})})};export{n as initAdminSettings};