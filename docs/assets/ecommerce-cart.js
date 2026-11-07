import"./mobile-controller.js";import"./main.js";document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`cart-items-container`),t=document.getElementById(`cart-item-count`),n=document.getElementById(`summary-subtotal`),r=document.getElementById(`summary-tax`),i=document.getElementById(`summary-total`),a=document.getElementById(`empty-cart-btn`);document.getElementById(`checkout-btn`);let o=document.getElementById(`applyPromoBtn`),s=document.getElementById(`promoCodeInput`),c=document.getElementById(`promoFeedback`),l=document.getElementById(`summary-discount-row`),u=document.getElementById(`summary-discount`),d=0,f=[{id:1,name:`Studio Wireless ANC Headphones`,category:`Electronics & Audio`,sku:`WH-1000XM5`,price:299,quantity:1,image:`/app/src/images/photo1.jpg`,icon:`bi-headphones`},{id:2,name:`Chrono Titan Smartwatch`,category:`Wearables & Fitness`,sku:`SW-CHRONO`,price:420,quantity:1,image:`/app/src/images/photo2.jpg`,icon:`bi-smartwatch`}],p=[];try{let e=localStorage.getItem(`cart`);e&&(p=JSON.parse(e))}catch{p=[]}(!p||p.length===0)&&(p=f,localStorage.setItem(`cart`,JSON.stringify(p)));function m(){if(p.length===0){e.innerHTML=`
                        <div class="p-5 text-center">
                            <div class="bg-light rounded-circle d-inline-flex p-4 mb-3">
                                <i class="bi bi-cart-x text-muted display-5"></i>
                            </div>
                            <h5 class="fw-bold text-dark mb-1">Your cart is currently empty</h5>
                            <p class="text-muted small mb-4">Discover our catalog and add items to your basket.</p>
                            <a href="ecommerce-products.html" class="btn btn-primary rounded-pill px-4 fw-bold">Explore Products</a>
                        </div>
                      `,h(0),g();return}e.innerHTML=``;let t=0;p.forEach(n=>{let r=n.price*n.quantity;t+=r;let i=document.createElement(`div`);i.classList.add(`d-flex`,`align-items-center`,`justify-content-between`,`p-4`,`border-bottom`),i.innerHTML=`
                      <div class="d-flex align-items-center gap-3">
                          <div class="bg-light p-2 rounded-3 border d-flex align-items-center justify-content-center" style="width: 64px; height: 64px;">
                              <i class="bi ${n.icon||`bi-box-seam`} text-primary fs-3"></i>
                          </div>
                          <div>
                              <h6 class="fw-bold text-dark mb-0 fs-15">${n.name}</h6>
                              <p class="text-muted extra-small mb-1">${n.category} &bull; <span class="fw-medium">${n.sku||`SKU-001`}</span></p>
                              <span class="fw-bold text-primary fs-14">$${n.price.toFixed(2)}</span>
                          </div>
                      </div>
                      <div class="d-flex align-items-center gap-4">
                          <div class="input-group input-group-sm rounded-pill overflow-hidden border" style="width: 105px;">
                              <button class="btn btn-light border-0 qty-minus px-2" data-id="${n.id}" type="button">-</button>
                              <input type="text" class="form-control border-0 text-center qty-input px-1 fw-bold bg-transparent" value="${n.quantity}" readonly>
                              <button class="btn btn-light border-0 qty-plus px-2" data-id="${n.id}" type="button">+</button>
                          </div>
                          <div class="text-end" style="min-width: 90px;">
                              <span class="fw-bold text-dark fs-15">$${r.toFixed(2)}</span>
                          </div>
                          <button class="btn btn-link text-danger p-1 remove-item" data-id="${n.id}" title="Remove item">
                              <i class="bi bi-trash fs-5"></i>
                          </button>
                      </div>
                    `,e.appendChild(i)}),h(t),g()}function h(e){let t=e*d,a=e-t,o=a*.1,s=a+o;n.textContent=`$`+e.toFixed(2),r.textContent=`$`+o.toFixed(2),i.textContent=`$`+s.toFixed(2),d>0?(l.classList.remove(`d-none`),u.textContent=`-$`+t.toFixed(2)):l.classList.add(`d-none`)}function g(){let e=p.reduce((e,t)=>e+t.quantity,0);t.textContent=`${e} ${e===1?`item`:`items`}`}e.addEventListener(`click`,e=>{let t=e.target.closest(`.qty-minus`),n=e.target.closest(`.qty-plus`),r=e.target.closest(`.remove-item`);if(n){let e=parseInt(n.dataset.id),t=p.find(t=>t.id===e);t&&(t.quantity++,localStorage.setItem(`cart`,JSON.stringify(p)),m())}if(t){let e=parseInt(t.dataset.id),n=p.find(t=>t.id===e);n&&n.quantity>1&&(n.quantity--,localStorage.setItem(`cart`,JSON.stringify(p)),m())}if(r){let e=parseInt(r.dataset.id);p=p.filter(t=>t.id!==e),localStorage.setItem(`cart`,JSON.stringify(p)),m()}}),a.addEventListener(`click`,()=>{confirm(`Are you sure you want to empty your cart?`)&&(p=[],localStorage.setItem(`cart`,JSON.stringify(p)),m())}),o&&o.addEventListener(`click`,()=>{let e=s.value.trim().toUpperCase();e===`VIP20`?(d=.2,c.classList.remove(`d-none`),m()):e&&alert(`Invalid code. Try VIP20`)});let _=document.getElementById(`pagePrimaryActionBtn`);_&&_.addEventListener(`click`,()=>{window.location.href=`checkout.html`}),m()});