var e=()=>{let e={debounceTime:300,minQueryLength:2},t={input:document.getElementById(`liveSearch`),results:document.getElementById(`searchResults`),loader:document.getElementById(`searchLoader`)};if(!t.input||!t.results)return;let n=e=>{e?t.loader.classList.remove(`d-none`):t.loader.classList.add(`d-none`)},r=(e=`Start typing to see results...`)=>`
        <div class="list-group-item border-0 py-5 text-center text-muted bg-white">
            <i class="bi bi-cursor fs-1 opacity-25 d-block mb-3"></i>
            ${e}
        </div>`,i=async e=>(await new Promise(e=>setTimeout(e,200)),[{title:`Inbox - Alexander Pierce`,category:`Messages`,icon:`bi-envelope`},{title:`Project Xivig Documentation`,category:`Files`,icon:`bi-file-earmark-pdf`},{title:`Dashboard Style 2`,category:`Pages`,icon:`bi-layout-sidebar`}].filter(t=>t.title.toLowerCase().includes(e.toLowerCase()))),a=e=>`
        <a href="#" class="list-group-item list-group-item-action border-0 py-3 px-4 result-item bg-white">
            <div class="d-flex align-items-center">
                <div class="bg-light p-2 rounded-3 me-3 text-primary">
                    <i class="bi ${e.icon} fs-5"></i>
                </div>
                <div>
                    <h6 class="mb-0 fw-bold">${e.title}</h6>
                    <small class="text-muted text-uppercase fw-semibold" style="font-size: 0.65rem;">${e.category}</small>
                </div>
                <i class="bi bi-chevron-right ms-auto text-muted small"></i>
            </div>
        </a>`,o=e=>{if(e.length===0){t.results.innerHTML=r(`No matches found.`);return}t.results.innerHTML=e.map(e=>a(e)).join(``)},s=async a=>{if(a.length<e.minQueryLength){t.results.innerHTML=r();return}n(!0);try{o(await i(a))}catch{t.results.innerHTML=r(`An error occurred.`)}finally{n(!1)}},c;t.input.addEventListener(`input`,t=>{let n=t.target.value.trim();clearTimeout(c),c=setTimeout(()=>s(n),e.debounceTime)})};export{e as initSearchApp};