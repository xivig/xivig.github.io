import"../../mobile-controller.js";import"../../main.js";document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`cart-items-container`),t=document.getElementById(`cart-item-count`),n=document.getElementById(`summary-subtotal`),r=document.getElementById(`summary-tax`),i=document.getElementById(`summary-total`),a=document.getElementById(`empty-cart-btn`),o=[];fetch(`http://127.0.0.1:8000/api/products`).then(e=>e.json()).then(e=>{o=e.map(e=>({...e,quantity:1})),s()});function s(){e.innerHTML=``;let t=0;o.forEach(n=>{let r=n.price*n.quantity;t+=r;let i=document.createElement(`div`);i.classList.add(`cart-item`,`d-flex`,`align-items-center`,`justify-content-between`,`p-4`,`mx-2`,`my-2`,`border-bottom`,`border-opacity-10`,`border-light`),i.innerHTML=`
                      <div class="d-flex align-items-center gap-4">
                          <div class="bg-light p-2 rounded-4 border shadow-sm position-relative overflow-hidden" style="width: 100px; height: 100px;">
                              <img src="${n.image}" alt="${n.name}" class="w-100 h-100 rounded-3" style="object-fit: cover;">
                          </div>
                          <div>
                              <h6 class="fw-bold text-dark mb-1 fs-5">${n.name}</h6>
                              <p class="text-muted small mb-0">${n.category}</p>
                          </div>
                      </div>
                      <div class="d-flex align-items-center gap-5">
                          <div class="text-center">
                              <label class="apple-label mb-2" style="font-size: 0.6rem;">Quantity</label>
                              <div class="quantity-picker shadow-sm">
                                  <button class="btn-qty decrease-qty" data-id="${n.id}"><i class="bi bi-dash"></i></button>
                                  <input type="text" class="qty-input" value="${n.quantity}" readonly>
                                  <button class="btn-qty increase-qty" data-id="${n.id}"><i class="bi bi-plus"></i></button>
                              </div>
                          </div>
                          <div class="text-end" style="min-width: 120px;">
                              <label class="apple-label mb-2" style="font-size: 0.6rem;">Total Price</label>
                              <h5 class="fw-black text-primary mb-0">$${r.toFixed(2)}</h5>
                          </div>
                          <button class="btn btn-white btn-sm rounded-circle shadow-sm border p-2 text-danger hover-bg-danger hover-text-white transition-all remove-item" data-id="${n.id}">
                              <i class="bi bi-x-lg"></i>
                          </button>
                      </div>
                    `,e.appendChild(i)}),c(t),l()}function c(e){let t=e*.1,a=e+t;n.textContent=`$`+e.toFixed(2),r.textContent=`$`+t.toFixed(2),i.textContent=`$`+a.toFixed(2)}function l(){t.textContent=`${o.reduce((e,t)=>e+t.quantity,0)} items`}e.addEventListener(`click`,e=>{let t=e.target;if(t.closest(`.increase-qty`)){let e=parseInt(t.closest(`.increase-qty`).dataset.id),n=o.find(t=>t.id===e);n&&(n.quantity++,s())}if(t.closest(`.decrease-qty`)){let e=parseInt(t.closest(`.decrease-qty`).dataset.id),n=o.find(t=>t.id===e);n&&n.quantity>1&&(n.quantity--,s())}if(t.closest(`.remove-item`)){let e=parseInt(t.closest(`.remove-item`).dataset.id);o=o.filter(t=>t.id!==e),s()}}),a.addEventListener(`click`,()=>{o=[],s()}),document.getElementById(`checkout-btn`).addEventListener(`click`,e=>{e.preventDefault(),localStorage.setItem(`cart`,JSON.stringify(o)),window.location.href=`checkout.html`})});