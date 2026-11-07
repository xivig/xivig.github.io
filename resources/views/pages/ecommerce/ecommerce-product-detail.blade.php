@extends('templates.admin.layout')

@section('content')

<!-- Screen: Dedicated Single Product Detail View -->
<div class="row g-4 mb-4">
    <!-- Main Product Showcase Card -->
    <div class="col-12">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="row g-0">
                <!-- Left: Interactive Gallery -->
                <div class="col-lg-6 bg-light bg-opacity-50 p-4 p-md-5 border-end border-light d-flex flex-column justify-content-between">
                    <div>
                        <!-- Main Image Display Container -->
                        <div class="position-relative bg-white rounded-4 border p-4 mb-3 d-flex align-items-center justify-content-center shadow-sm" style="min-height: 420px;">
                            <img id="mainProductImage" src="{{ asset('assets/admin/images/product-01.jpg') }}" class="img-fluid rounded-3" alt="Studio Wireless Pro ANC Headphones" style="max-height: 360px; object-fit: contain; transition: all 0.3s ease;">
                            
                            <!-- Badges -->
                            <div class="position-absolute top-0 start-0 m-3 d-flex flex-column gap-1.5">
                                <span class="badge bg-danger px-3 py-1.5 rounded-pill shadow-sm fw-bold">15% SAVINGS</span>
                                <span class="badge bg-primary px-3 py-1.5 rounded-pill shadow-sm fw-bold">TOP RATED</span>
                            </div>
                            <span class="badge bg-success-subtle text-success position-absolute top-0 end-0 m-3 px-3 py-1.5 rounded-pill fw-bold border">
                                <i class="bi bi-check-circle-fill me-1"></i> IN STOCK
                            </span>
                        </div>

                        <!-- Thumbnail Selection Rail -->
                        <div class="row g-2 mb-4" id="productThumbnails">
                            <div class="col-3">
                                <div class="bg-white rounded-3 border border-2 border-primary p-1 cursor-pointer text-center shadow-sm thumb-btn active" data-img="{{ asset('assets/admin/images/product-01.jpg') }}">
                                    <img src="{{ asset('assets/admin/images/product-01.jpg') }}" class="img-fluid rounded-2" alt="Product view 1" style="height: 65px; width: 100%; object-fit: cover;">
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="bg-white rounded-3 border p-1 cursor-pointer text-center opacity-75 hover-opacity-100 thumb-btn" data-img="{{ asset('assets/admin/images/product-02.jpg') }}">
                                    <img src="{{ asset('assets/admin/images/product-02.jpg') }}" class="img-fluid rounded-2" alt="Product view 2" style="height: 65px; width: 100%; object-fit: cover;">
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="bg-white rounded-3 border p-1 cursor-pointer text-center opacity-75 hover-opacity-100 thumb-btn" data-img="{{ asset('assets/admin/images/product-03.jpg') }}">
                                    <img src="{{ asset('assets/admin/images/product-03.jpg') }}" class="img-fluid rounded-2" alt="Product view 3" style="height: 65px; width: 100%; object-fit: cover;">
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="bg-white rounded-3 border p-1 cursor-pointer text-center opacity-75 hover-opacity-100 thumb-btn" data-img="{{ asset('assets/admin/images/product-04.jpg') }}">
                                    <img src="{{ asset('assets/admin/images/product-04.jpg') }}" class="img-fluid rounded-2" alt="Product view 4" style="height: 65px; width: 100%; object-fit: cover;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Assurance Micro-badges -->
                    <div class="row g-2 pt-3 border-top border-light text-center">
                        <div class="col-4">
                            <div class="d-flex align-items-center justify-content-center gap-1.5 text-muted extra-small fw-semibold">
                                <i class="bi bi-shield-check text-primary fs-14"></i>
                                <span>2-Yr Warranty</span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="d-flex align-items-center justify-content-center gap-1.5 text-muted extra-small fw-semibold">
                                <i class="bi bi-truck text-primary fs-14"></i>
                                <span>Free Shipping</span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="d-flex align-items-center justify-content-center gap-1.5 text-muted extra-small fw-semibold">
                                <i class="bi bi-arrow-counterclockwise text-primary fs-14"></i>
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Specifications, Commercial Controls & Actions -->
                <div class="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between">
                    <div>
                        <!-- Category, SKU & Brand Tag -->
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="badge bg-primary-subtle text-primary extra-small fw-bold px-2.5 py-1 rounded-pill">
                                Audio &bull; Flagship Series
                            </span>
                            <span class="text-muted extra-small fw-semibold font-monospace">SKU: XIV-AUD-990</span>
                        </div>

                        <!-- Product Title -->
                        <h2 class="fw-bold mb-2">Studio Wireless Pro ANC Headphones</h2>
                        
                        <!-- Ratings & Review Count -->
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <div class="text-warning small">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                            </div>
                            <span class="fw-bold small">4.9</span>
                            <span class="text-muted extra-small">(348 verified customer reviews)</span>
                            <span class="text-success extra-small fw-semibold ms-2"><i class="bi bi-patch-check-fill me-1"></i>98% recommend</span>
                        </div>

                        <!-- Price Section -->
                        <div class="d-flex align-items-baseline gap-3 mb-4 p-3 bg-light rounded-3 border">
                            <h2 class="fw-black mb-0 text-primary">$299.00</h2>
                            <span class="text-decoration-line-through text-muted fs-15">$349.00</span>
                            <span class="badge bg-danger-subtle text-danger extra-small fw-bold px-2 py-1">Save $50.00 (14% OFF)</span>
                            <span class="text-muted extra-small ms-auto d-none d-sm-inline">Taxes included</span>
                        </div>

                        <p class="text-muted small mb-4 leading-relaxed">
                            Engineered for uncompromising audiophile precision and all-day comfort. Features 40mm custom beryllium dynamic drivers, adaptive hybrid active noise cancellation up to 42dB, ultra-low latency spatial audio, and an astonishing 45 hours of battery endurance.
                        </p>

                        <!-- Colorway Selector -->
                        <div class="mb-3.5">
                            <div class="d-flex justify-content-between align-items-center mb-1.5">
                                <label class="form-label extra-small fw-bold text-uppercase text-muted tracking-wider mb-0">Color: <span class="text-dark" id="selectedColorName">Midnight Black</span></label>
                            </div>
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3 py-1.5 active fw-semibold d-inline-flex align-items-center gap-2 color-choice" data-color="Midnight Black">
                                    <span class="d-inline-block rounded-circle" style="width: 12px; height: 12px; background: #111827; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    Midnight Black
                                </button>
                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-2 color-choice" data-color="Luminous Indigo">
                                    <span class="d-inline-block rounded-circle" style="width: 12px; height: 12px; background: #4059E8;"></span>
                                    Luminous Indigo
                                </button>
                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-2 color-choice" data-color="Platinum Silver">
                                    <span class="d-inline-block rounded-circle" style="width: 12px; height: 12px; background: #E5E7EB; border: 1px solid #ccc;"></span>
                                    Platinum Silver
                                </button>
                            </div>
                        </div>

                        <!-- Edition Selector -->
                        <div class="mb-4">
                            <label class="form-label extra-small fw-bold text-uppercase text-muted tracking-wider mb-1.5">Edition Package</label>
                            <div class="d-flex gap-2 flex-wrap">
                                <button type="button" class="btn btn-outline-primary btn-sm rounded-3 px-3 py-1.5 fw-bold active edition-choice">Standard Wireless</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-3 px-3 py-1.5 fw-semibold edition-choice">Creator Bundle (+Hard Case)</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-3 px-3 py-1.5 fw-semibold edition-choice">Audiophile DAC Kit</button>
                            </div>
                        </div>

                        <!-- Quantity & Inventory Progress -->
                        <div class="p-3 bg-light rounded-3 border mb-4">
                            <div class="row align-items-center g-3">
                                <div class="col-sm-5">
                                    <label class="form-label extra-small fw-bold text-uppercase text-muted tracking-wider mb-1">Quantity</label>
                                    <div class="input-group input-group-sm" style="max-width: 130px;">
                                        <button class="btn btn-outline-secondary" type="button" id="btnQtyMinus"><i class="bi bi-dash"></i></button>
                                        <input type="text" class="form-control text-center fw-bold" id="inputQuantity" value="1" readonly>
                                        <button class="btn btn-outline-secondary" type="button" id="btnQtyPlus"><i class="bi bi-plus"></i></button>
                                    </div>
                                </div>
                                <div class="col-sm-7">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="extra-small text-muted fw-bold">Fulfillment Capacity</span>
                                        <span class="extra-small fw-bold text-success">142 units in stock</span>
                                    </div>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 82%;" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <small class="text-muted extra-small mt-1 d-block">Dispatches within 24 hours from US East warehouse.</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Commercial Action Buttons -->
                    <div class="pt-3 border-top">
                        <div class="d-flex align-items-center gap-2.5 flex-wrap">
                            <a href="ecommerce-edit-product.html" class="btn btn-primary rounded-pill px-4 py-2.5 fw-bold shadow-sm flex-grow-1">
                                <i class="bi bi-pencil-square me-1.5"></i> Edit Product
                            </a>
                            <button type="button" class="btn btn-outline-primary rounded-pill px-4 py-2.5 fw-bold" id="btnAddToCart">
                                <i class="bi bi-cart-plus me-1.5"></i> Add to Cart
                            </button>
                            <a href="ecommerce-product-analytics.html" class="btn btn-outline-secondary rounded-pill px-3 py-2.5 fw-bold" title="View Product Analytics">
                                <i class="bi bi-graph-up-arrow me-1.5"></i> Analytics
                            </a>
                            <button type="button" class="btn btn-light rounded-circle border shadow-sm p-2" title="Add to Wishlist" style="width: 44px; height: 44px;">
                                <i class="bi bi-heart text-muted"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Deep Specifications & Details Tabs -->
    <div class="col-12">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div class="card-header bg-transparent py-3 px-4 border-bottom">
                <ul class="nav nav-tabs card-header-tabs" id="productDetailTabs" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link active fw-bold small" id="specs-tab" data-bs-toggle="tab" data-bs-target="#specs-pane" type="button" role="tab">Specifications</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link fw-bold small text-muted" id="features-tab" data-bs-toggle="tab" data-bs-target="#features-pane" type="button" role="tab">Sound &amp; Features</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link fw-bold small text-muted" id="inventory-tab" data-bs-toggle="tab" data-bs-target="#inventory-pane" type="button" role="tab">Inventory Hubs</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link fw-bold small text-muted" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-pane" type="button" role="tab">Customer Reviews (348)</button>
                    </li>
                </ul>
            </div>
            <div class="card-body p-4 p-md-5">
                <div class="tab-content" id="productDetailTabsContent">
                    <!-- 1. Technical Specifications -->
                    <div class="tab-pane fade show active" id="specs-pane" role="tabpanel">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-3 small text-uppercase text-muted letter-spacing-1">Acoustic &amp; Hardware Engine</h6>
                                <table class="table table-borderless small mb-0">
                                    <tbody>
                                        <tr class="border-bottom"><td class="text-muted ps-0 py-2.5">Transducer Driver</td><td class="fw-bold text-end py-2.5">40mm Custom Beryllium Diaphragm</td></tr>
                                        <tr class="border-bottom"><td class="text-muted ps-0 py-2.5">Frequency Response</td><td class="fw-bold text-end py-2.5">10 Hz &ndash; 40,000 Hz (Hi-Res Certified)</td></tr>
                                        <tr class="border-bottom"><td class="text-muted ps-0 py-2.5">Impedance</td><td class="fw-bold text-end py-2.5">32 Ohms &plusmn; 10%</td></tr>
                                        <tr class="border-bottom"><td class="text-muted ps-0 py-2.5">Active Noise Cancellation</td><td class="fw-bold text-end py-2.5">Hybrid Triple-Mic System (Up to -42dB)</td></tr>
                                        <tr><td class="text-muted ps-0 py-2.5">Total Harmonic Distortion</td><td class="fw-bold text-end py-2.5">&lt; 0.1% @ 1kHz, 100dB SPL</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-3 small text-uppercase text-muted letter-spacing-1">Connectivity &amp; Power Architecture</h6>
                                <table class="table table-borderless small mb-0">
                                    <tbody>
                                        <tr class="border-bottom"><td class="text-muted ps-0 py-2.5">Bluetooth Standard</td><td class="fw-bold text-end py-2.5">v5.4 with Dual-Device Multipoint</td></tr>
                                        <tr class="border-bottom"><td class="text-muted ps-0 py-2.5">Supported Audio Codecs</td><td class="fw-bold text-end py-2.5">LDAC, aptX Adaptive, AAC, SBC</td></tr>
                                        <tr class="border-bottom"><td class="text-muted ps-0 py-2.5">Battery Operating Time</td><td class="fw-bold text-end py-2.5">45 Hours (ANC On) / 60 Hours (ANC Off)</td></tr>
                                        <tr class="border-bottom"><td class="text-muted ps-0 py-2.5">Fast Charge Capability</td><td class="fw-bold text-end py-2.5">15 min charge = 6 hours playback</td></tr>
                                        <tr><td class="text-muted ps-0 py-2.5">Weight</td><td class="fw-bold text-end py-2.5">254 grams (Lightweight Aluminum &amp; Memory Foam)</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Sound & Key Features -->
                    <div class="tab-pane fade" id="features-pane" role="tabpanel">
                        <div class="row g-4">
                            <div class="col-md-6 col-lg-3">
                                <div class="p-4 bg-light rounded-4 border h-100">
                                    <div class="rounded-3 bg-primary bg-opacity-10 text-primary d-inline-flex p-3 mb-3">
                                        <i class="bi bi-soundwave fs-20"></i>
                                    </div>
                                    <h6 class="fw-bold mb-2">Beryllium Drivers</h6>
                                    <p class="text-muted extra-small mb-0 leading-relaxed">
                                        Rigid, ultralight diaphragms deliver lightning-fast transient response, pinpoint stereo imaging, and crystalline treble without distortion.
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <div class="p-4 bg-light rounded-4 border h-100">
                                    <div class="rounded-3 bg-success bg-opacity-10 text-success d-inline-flex p-3 mb-3">
                                        <i class="bi bi-shield-shaded fs-20"></i>
                                    </div>
                                    <h6 class="fw-bold mb-2">Adaptive Hybrid ANC</h6>
                                    <p class="text-muted extra-small mb-0 leading-relaxed">
                                        Six high-precision feedforward and feedback microphones sample ambient noise 50,000 times per second for silence.
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <div class="p-4 bg-light rounded-4 border h-100">
                                    <div class="rounded-3 bg-warning bg-opacity-10 text-warning d-inline-flex p-3 mb-3">
                                        <i class="bi bi-battery-charging fs-20"></i>
                                    </div>
                                    <h6 class="fw-bold mb-2">45-Hour Endurance</h6>
                                    <p class="text-muted extra-small mb-0 leading-relaxed">
                                        Continuous battery performance supports international flights, marathon studio recording, and daily commutes on a single USB-C charge.
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <div class="p-4 bg-light rounded-4 border h-100">
                                    <div class="rounded-3 bg-info bg-opacity-10 text-info d-inline-flex p-3 mb-3">
                                        <i class="bi bi-broadcast-pin fs-20"></i>
                                    </div>
                                    <h6 class="fw-bold mb-2">Spatial Audio Tracking</h6>
                                    <p class="text-muted extra-small mb-0 leading-relaxed">
                                        Built-in gyroscope sensors track subtle head orientation changes to anchor acoustic instruments in a three-dimensional soundstage.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 3. Regional Inventory Hubs -->
                    <div class="tab-pane fade" id="inventory-pane" role="tabpanel">
                        <div class="row g-3">
                            <div class="col-md-3">
                                <div class="p-3 bg-light rounded-3 border">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="text-muted extra-small fw-bold text-uppercase">US East (New Jersey)</span>
                                        <span class="badge bg-success-subtle text-success extra-small fw-bold">Primary</span>
                                    </div>
                                    <h4 class="fw-bold mb-0 text-success mt-1">78 units</h4>
                                    <small class="text-muted extra-small">Dispatches in &lt; 24h &bull; Ready for transit</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="p-3 bg-light rounded-3 border">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="text-muted extra-small fw-bold text-uppercase">US West (California)</span>
                                        <span class="badge bg-success-subtle text-success extra-small fw-bold">Active</span>
                                    </div>
                                    <h4 class="fw-bold mb-0 text-success mt-1">44 units</h4>
                                    <small class="text-muted extra-small">Dispatches in &lt; 24h &bull; Ready for transit</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="p-3 bg-light rounded-3 border">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="text-muted extra-small fw-bold text-uppercase">EU Central (Frankfurt)</span>
                                        <span class="badge bg-warning-subtle text-warning extra-small fw-bold">Low Stock</span>
                                    </div>
                                    <h4 class="fw-bold mb-0 text-warning mt-1">15 units</h4>
                                    <small class="text-muted extra-small">Restock shipment arriving Tuesday</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="p-3 bg-light rounded-3 border">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="text-muted extra-small fw-bold text-uppercase">APAC Hub (Singapore)</span>
                                        <span class="badge bg-success-subtle text-success extra-small fw-bold">Active</span>
                                    </div>
                                    <h4 class="fw-bold mb-0 text-success mt-1">5 units</h4>
                                    <small class="text-muted extra-small">Local direct courier dispatch</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Customer Reviews -->
                    <div class="tab-pane fade" id="reviews-pane" role="tabpanel">
                        <div class="row g-4 align-items-center mb-4 pb-4 border-bottom">
                            <div class="col-md-4 text-center border-end">
                                <h1 class="display-4 fw-black text-primary mb-0">4.9</h1>
                                <div class="text-warning mb-1">
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                </div>
                                <span class="text-muted small">Based on 348 verified customer ratings</span>
                            </div>
                            <div class="col-md-8 ps-md-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="d-flex align-items-center gap-2 extra-small">
                                        <span style="width: 50px;">5 Stars</span>
                                        <div class="progress flex-grow-1" style="height: 6px;"><div class="progress-bar bg-warning" style="width: 88%;"></div></div>
                                        <span class="text-muted" style="width: 40px;">88%</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 extra-small">
                                        <span style="width: 50px;">4 Stars</span>
                                        <div class="progress flex-grow-1" style="height: 6px;"><div class="progress-bar bg-warning" style="width: 9%;"></div></div>
                                        <span class="text-muted" style="width: 40px;">9%</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 extra-small">
                                        <span style="width: 50px;">3 Stars</span>
                                        <div class="progress flex-grow-1" style="height: 6px;"><div class="progress-bar bg-warning" style="width: 2%;"></div></div>
                                        <span class="text-muted" style="width: 40px;">2%</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 extra-small">
                                        <span style="width: 50px;">2 Stars</span>
                                        <div class="progress flex-grow-1" style="height: 6px;"><div class="progress-bar bg-warning" style="width: 1%;"></div></div>
                                        <span class="text-muted" style="width: 40px;">1%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Customer Review Feed -->
                        <div class="d-flex flex-column gap-3">
                            <div class="p-3 bg-light rounded-3 border">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <div class="d-flex align-items-center gap-2">
                                        <img src="{{ asset('assets/admin/images/avatar-01.jpg') }}" class="rounded-circle" width="30" height="30" alt="Reviewer Marcus">
                                        <span class="fw-bold small">Marcus Vance</span>
                                        <span class="badge bg-success-subtle text-success extra-small">Verified Buyer</span>
                                    </div>
                                    <span class="text-muted extra-small">3 days ago</span>
                                </div>
                                <div class="text-warning small mb-2">
                                    <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                                </div>
                                <p class="text-muted small mb-0">Sublime acoustic definition. Listening to master tracks through LDAC Bluetooth is indistinguishable from my wired reference monitors. Battery lasted through an entire 14-hour flight with ANC enabled.</p>
                            </div>

                            <div class="p-3 bg-light rounded-3 border">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <div class="d-flex align-items-center gap-2">
                                        <img src="{{ asset('assets/admin/images/avatar-02.jpg') }}" class="rounded-circle" width="30" height="30" alt="Reviewer Elena">
                                        <span class="fw-bold small">Elena Rostova</span>
                                        <span class="badge bg-success-subtle text-success extra-small">Verified Buyer</span>
                                    </div>
                                    <span class="text-muted extra-small">1 week ago</span>
                                </div>
                                <div class="text-warning small mb-2">
                                    <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                                </div>
                                <p class="text-muted small mb-0">The memory foam ear cushions distribute weight exceptionally well. Zero clamping fatigue even after 8 hours of mastering work in the studio.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Related / Recommended Products Grid -->
    <div class="col-12">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div>
                <h5 class="fw-bold mb-0">Frequently Paired &amp; Related Gear</h5>
                <small class="text-muted extra-small">Customers who viewed this item also explored these products</small>
            </div>
            <a href="ecommerce-products.html" class="btn btn-outline-secondary btn-sm rounded-pill px-3 fw-bold">
                View All Catalog <i class="bi bi-arrow-right ms-1"></i>
            </a>
        </div>

        <div class="row g-3">
            <div class="col-sm-6 col-lg-3">
                <div class="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                    <div class="p-3 text-center bg-light">
                        <img src="{{ asset('assets/admin/images/product-02.jpg') }}" class="img-fluid rounded-3" alt="Chrono Titan Smartwatch" style="height: 140px; object-fit: contain;">
                    </div>
                    <div class="card-body p-3 d-flex flex-column justify-content-between">
                        <div>
                            <span class="text-muted extra-small fw-bold text-uppercase">Wearables</span>
                            <h6 class="fw-bold mb-1 mt-0.5 text-truncate">Chrono Titan Smartwatch</h6>
                            <div class="text-warning extra-small mb-2">
                                <i class="bi bi-star-fill"></i> 4.8 (118)
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                            <span class="fw-bold text-primary fs-15">$249.00</span>
                            <a href="ecommerce-product-detail.html" class="btn btn-outline-primary btn-sm rounded-pill px-2.5 py-1 extra-small fw-bold">View</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg-3">
                <div class="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                    <div class="p-3 text-center bg-light">
                        <img src="{{ asset('assets/admin/images/product-03.jpg') }}" class="img-fluid rounded-3" alt="Ergonomic Keyboard" style="height: 140px; object-fit: contain;">
                    </div>
                    <div class="card-body p-3 d-flex flex-column justify-content-between">
                        <div>
                            <span class="text-muted extra-small fw-bold text-uppercase">Computing</span>
                            <h6 class="fw-bold mb-1 mt-0.5 text-truncate">Ergonomic Mechanical Keyboard</h6>
                            <div class="text-warning extra-small mb-2">
                                <i class="bi bi-star-fill"></i> 4.9 (86)
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                            <span class="fw-bold text-primary fs-15">$179.00</span>
                            <a href="ecommerce-product-detail.html" class="btn btn-outline-primary btn-sm rounded-pill px-2.5 py-1 extra-small fw-bold">View</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg-3">
                <div class="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                    <div class="p-3 text-center bg-light">
                        <img src="{{ asset('assets/admin/images/product-04.jpg') }}" class="img-fluid rounded-3" alt="Hyperlight Running Shoes" style="height: 140px; object-fit: contain;">
                    </div>
                    <div class="card-body p-3 d-flex flex-column justify-content-between">
                        <div>
                            <span class="text-muted extra-small fw-bold text-uppercase">Footwear</span>
                            <h6 class="fw-bold mb-1 mt-0.5 text-truncate">Hyperlight Velocity Running Shoes</h6>
                            <div class="text-warning extra-small mb-2">
                                <i class="bi bi-star-fill"></i> 4.7 (210)
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                            <span class="fw-bold text-primary fs-15">$159.00</span>
                            <a href="ecommerce-product-detail.html" class="btn btn-outline-primary btn-sm rounded-pill px-2.5 py-1 extra-small fw-bold">View</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg-3">
                <div class="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                    <div class="p-3 text-center bg-light">
                        <img src="{{ asset('assets/admin/images/product-05.jpg') }}" class="img-fluid rounded-3" alt="Minimalist Leather Tech Folio" style="height: 140px; object-fit: contain;">
                    </div>
                    <div class="card-body p-3 d-flex flex-column justify-content-between">
                        <div>
                            <span class="text-muted extra-small fw-bold text-uppercase">Accessories</span>
                            <h6 class="fw-bold mb-1 mt-0.5 text-truncate">Minimalist Leather Tech Folio</h6>
                            <div class="text-warning extra-small mb-2">
                                <i class="bi bi-star-fill"></i> 4.6 (64)
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                            <span class="fw-bold text-primary fs-15">$89.00</span>
                            <a href="ecommerce-product-detail.html" class="btn btn-outline-primary btn-sm rounded-pill px-2.5 py-1 extra-small fw-bold">View</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Interactive Product Detail Controller Script -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // 1. Thumbnail Selector
        const mainImg = document.getElementById('mainProductImage');
        const thumbs = document.querySelectorAll('.thumb-btn');

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const targetSrc = this.getAttribute('data-img');
                if (mainImg && targetSrc) {
                    mainImg.style.opacity = '0.3';
                    setTimeout(() => {
                        mainImg.src = targetSrc;
                        mainImg.style.opacity = '1';
                    }, 150);
                }
                thumbs.forEach(t => {
                    t.classList.remove('active', 'border-primary', 'border-2');
                    t.classList.add('opacity-75');
                });
                this.classList.add('active', 'border-primary', 'border-2');
                this.classList.remove('opacity-75');
            });
        });

        // 2. Color Swatches
        const colorBtns = document.querySelectorAll('.color-choice');
        const selectedColorLabel = document.getElementById('selectedColorName');
        colorBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                colorBtns.forEach(b => {
                    b.classList.remove('active', 'btn-outline-primary');
                    b.classList.add('btn-outline-secondary');
                });
                this.classList.add('active', 'btn-outline-primary');
                this.classList.remove('btn-outline-secondary');
                if (selectedColorLabel) {
                    selectedColorLabel.textContent = this.getAttribute('data-color');
                }
            });
        });

        // 3. Edition Selector
        const editionBtns = document.querySelectorAll('.edition-choice');
        editionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                editionBtns.forEach(b => {
                    b.classList.remove('active', 'btn-outline-primary', 'fw-bold');
                    b.classList.add('btn-outline-secondary', 'fw-semibold');
                });
                this.classList.add('active', 'btn-outline-primary', 'fw-bold');
                this.classList.remove('btn-outline-secondary', 'fw-semibold');
            });
        });

        // 4. Quantity Stepper
        const minusBtn = document.getElementById('btnQtyMinus');
        const plusBtn = document.getElementById('btnQtyPlus');
        const qtyInput = document.getElementById('inputQuantity');

        if (minusBtn && plusBtn && qtyInput) {
            minusBtn.addEventListener('click', function() {
                let current = parseInt(qtyInput.value, 10) || 1;
                if (current > 1) qtyInput.value = current - 1;
            });
            plusBtn.addEventListener('click', function() {
                let current = parseInt(qtyInput.value, 10) || 1;
                if (current < 10) qtyInput.value = current + 1;
            });
        }

        // 5. Add to Cart Feedback
        const addToCartBtn = document.getElementById('btnAddToCart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const qty = qtyInput ? qtyInput.value : '1';
                if (typeof window.Swal !== 'undefined') {
                    window.Swal.fire({
                        icon: 'success',
                        title: 'Added to Cart!',
                        text: `Studio Wireless Pro ANC Headphones (${qty}x) added to your cart.`,
                        confirmButtonColor: '#4059E8',
                        showCancelButton: true,
                        cancelButtonText: 'Continue Shopping',
                        confirmButtonText: 'Proceed to Cart'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'ecommerce-cart.html';
                        }
                    });
                } else {
                    alert(`Added ${qty} item(s) to cart!`);
                }
            });
        }
    });
</script>

@endsection

