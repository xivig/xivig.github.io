var e=async()=>{let e=document.getElementById(`iconFilterInput`),t=document.getElementById(`iconContainer`);if(!e||!t)return;let n=[];console.log(`📥 Fetching FontAwesome Icons data...`);try{let e=[`/data/fa-icons.json`,`data/fa-icons.json`,`../data/fa-icons.json`,`../../data/fa-icons.json`,`../../../data/fa-icons.json`,`public/data/fa-icons.json`],r;for(let t of e)try{let e=await fetch(t),n=e.headers.get(`content-type`);if(e.ok&&n&&n.includes(`application/json`)){r=e,console.log(`✅ Found data at: ${t}`);break}}catch{}if(!r)throw Error(`Could not find fa-icons.json in any of the attempted paths.`);let i=await r.json();if(Object.keys(i).forEach(e=>{let t=i[e];t.svgs&&t.svgs.classic&&Object.keys(t.svgs.classic).forEach(t=>{let r=t===`brands`?`fa-brands`:t===`solid`?`fa-solid`:`fa-regular`;n.push({name:e,prefix:r})})}),console.log(`✅ Loaded ${n.length} FontAwesome icons.`),n.length===0){t.innerHTML=`<div class="col-12 text-center py-5"><p class="text-danger">No icons found in data file.</p></div>`;return}}catch(e){console.error(`❌ Failed to load FontAwesome icons:`,e),t.innerHTML=`<div class="col-12 text-center py-5">
            <p class="text-danger">Failed to load icon library.</p>
            <small class="text-muted">${e.message}</small>
        </div>`;return}let r=e=>{t.innerHTML=`
            <div class="card-box pd-20 mb-30 shadow-sm border-0 bg-transparent">
                <div class="row fontawesome-icon-list g-3">
                    ${e.slice(0,500).map(e=>`
                        <div class="col-xl-3 col-lg-4 col-md-6 icon-item animate__animated animate__fadeIn" data-name="${e.name}">
                            <div class="fa-hover border rounded-3 p-3 transition-all d-flex align-items-center" title="Click to copy">
                                <div class="icon-preview me-3 shadow-sm rounded p-2 text-primary text-center" style="width: 45px;">
                                    <i class="${e.prefix} fa-${e.name} fs-4"></i>
                                </div>
                                <span class="icon-class text-muted small fw-bold text-truncate">${e.prefix} fa-${e.name}</span>
                            </div>
                        </div>
                    `).join(``)}
                </div>
            </div>`,t.querySelectorAll(`.icon-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.querySelector(`.icon-class`).textContent,n=e.querySelector(`.fa-hover`);i(`<i class="${t}"></i>`,n)})})},i=(e,t)=>{navigator.clipboard.writeText(e).then(()=>{let e=t.innerHTML;t.innerHTML=`<span class="text-white small fw-bold w-100 text-center">Copied!</span>`,setTimeout(()=>{t.innerHTML=e},1e3)})};r(n),e.addEventListener(`input`,e=>{let t=e.target.value.toLowerCase().trim();r(n.filter(e=>e.name.includes(t)))})};export{e as initIconApp};