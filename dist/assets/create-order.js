import"./mobile-controller.js";import"./main.js";document.addEventListener(`DOMContentLoaded`,()=>{let e=0,t=15,n=()=>{let n=0;document.querySelectorAll(`#orderItemsList tr`).forEach(e=>{let t=parseFloat(e.getAttribute(`data-price`))||0,r=e.querySelector(`.qty-input`),i=t*(parseInt(r?.value)||1),a=e.querySelector(`.item-total`);a&&(a.textContent=`$${i.toFixed(2)}`),n+=i});let r=n*e,i=n-r,a=i*.08,o=i+t+a;document.getElementById(`summarySubtotal`).textContent=`$${n.toFixed(2)}`;let s=document.getElementById(`summaryDiscountRow`);e>0?(s.classList.remove(`d-none`),document.getElementById(`summaryDiscount`).textContent=`-$${r.toFixed(2)}`):s.classList.add(`d-none`),document.getElementById(`summaryShipping`).textContent=`$${t.toFixed(2)}`,document.getElementById(`summaryTax`).textContent=`$${a.toFixed(2)}`,document.getElementById(`summaryGrandTotal`).textContent=`$${o.toFixed(2)}`},r=document.getElementById(`orderItemsTable`);r.addEventListener(`click`,e=>{let t=e.target.closest(`.qty-minus`),r=e.target.closest(`.qty-plus`),i=e.target.closest(`.remove-item-btn`);if(t){let e=t.parentElement.querySelector(`.qty-input`),r=parseInt(e.value)||1;r>1&&(e.value=r-1,n())}else if(r){let e=r.parentElement.querySelector(`.qty-input`);e.value=(parseInt(e.value)||1)+1,n()}else if(i){let e=i.closest(`tr`);document.querySelectorAll(`#orderItemsList tr`).length>1?(e.remove(),n()):alert(`Order must contain at least one line item.`)}}),r.addEventListener(`input`,e=>{e.target.classList.contains(`qty-input`)&&(e.target.value<1&&(e.target.value=1),n())});let i=document.getElementById(`deliveryMethodSelect`);i&&i.addEventListener(`change`,()=>{t=parseFloat(i.value)||0,n()});let a=document.getElementById(`applyCouponBtn`),o=document.getElementById(`couponCodeInput`),s=document.getElementById(`couponFeedback`);a&&o&&a.addEventListener(`click`,()=>{let t=o.value.trim().toUpperCase();t===`VIP20`?(e=.2,s.classList.remove(`d-none`),n()):t&&alert(`Invalid promotional code. Try VIP20`)});let c=document.getElementById(`quickAddCustomItem`);c&&c.addEventListener(`click`,()=>{let e=prompt(`Enter item name:`,`Premium Leather Case`);if(!e)return;let t=prompt(`Enter unit price ($):`,`49.00`),r=parseFloat(t)||49,i=document.createElement(`tr`);i.setAttribute(`data-price`,r.toFixed(2)),i.innerHTML=`
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="bg-light p-2 rounded-3 me-3 border" style="width: 44px; height: 44px;">
                                            <i class="bi bi-box text-warning fs-4 d-flex justify-content-center"></i>
                                        </div>
                                        <div>
                                            <h6 class="fw-bold text-dark mb-0 fs-14">${e}</h6>
                                            <span class="text-muted extra-small">SKU: CUSTOM-${Math.floor(Math.random()*1e3)}</span>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="fw-semibold text-dark item-price">$${r.toFixed(2)}</span></td>
                                <td>
                                    <div class="input-group input-group-sm rounded-pill overflow-hidden border">
                                        <button class="btn btn-light border-0 qty-minus px-2" type="button">-</button>
                                        <input type="number" class="form-control border-0 text-center qty-input px-1" value="1" min="1">
                                        <button class="btn btn-light border-0 qty-plus px-2" type="button">+</button>
                                    </div>
                                </td>
                                <td class="text-end"><span class="fw-bold text-dark item-total">$${r.toFixed(2)}</span></td>
                                <td class="text-end">
                                    <button type="button" class="btn btn-link text-danger p-0 border-0 remove-item-btn"><i class="bi bi-trash fs-5"></i></button>
                                </td>
                            `,document.getElementById(`orderItemsList`).appendChild(i),n()});let l=document.getElementById(`addItemFromSearchBtn`),u=document.getElementById(`catalogSearchInput`);l&&u&&l.addEventListener(`click`,()=>{let e=u.value.trim();if(!e){u.focus();return}let t=document.createElement(`tr`);t.setAttribute(`data-price`,`150.00`),t.innerHTML=`
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="bg-light p-2 rounded-3 me-3 border" style="width: 44px; height: 44px;">
                                            <i class="bi bi-tag text-success fs-4 d-flex justify-content-center"></i>
                                        </div>
                                        <div>
                                            <h6 class="fw-bold text-dark mb-0 fs-14">${e}</h6>
                                            <span class="text-muted extra-small">SKU: ADDED-01</span>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="fw-semibold text-dark item-price">$150.00</span></td>
                                <td>
                                    <div class="input-group input-group-sm rounded-pill overflow-hidden border">
                                        <button class="btn btn-light border-0 qty-minus px-2" type="button">-</button>
                                        <input type="number" class="form-control border-0 text-center qty-input px-1" value="1" min="1">
                                        <button class="btn btn-light border-0 qty-plus px-2" type="button">+</button>
                                    </div>
                                </td>
                                <td class="text-end"><span class="fw-bold text-dark item-total">$150.00</span></td>
                                <td class="text-end">
                                    <button type="button" class="btn btn-link text-danger p-0 border-0 remove-item-btn"><i class="bi bi-trash fs-5"></i></button>
                                </td>
                            `,document.getElementById(`orderItemsList`).appendChild(t),u.value=``,n()});let d=document.getElementById(`placeOrderBtn`),f=document.getElementById(`pagePrimaryActionBtn`),p=new bootstrap.Modal(document.getElementById(`orderConfirmModal`)),m=()=>{p.show()};d&&d.addEventListener(`click`,m),f&&f.addEventListener(`click`,m)});