@extends('templates.admin.layout')

@section('content')

<div class="card border-0 shadow-sm rounded-4 overflow-hidden">
    <div class="card-header bg-transparent py-4 px-4 border-0 text-center">
        <h4 class="fw-bold mb-1">Font Awesome 6 Library</h4>
        <p class="text-muted small mb-0">Explore and copy scalable vector icons with instant keyword search and style filtering.</p>
    </div>

    <div class="card-body p-4 pt-0">
        <!-- Controls Bar: Search & Style Filter Tabs -->
        <div class="row g-3 align-items-center mb-4">
            <div class="col-lg-7 col-md-12">
                <div class="input-group input-group-lg rounded-3 overflow-hidden shadow-sm border" style="border-color: var(--card-border) !important;">
                    <span class="input-group-text bg-transparent border-0 ps-3">
                        <i class="fa-solid fa-magnifying-glass text-primary"></i>
                    </span>
                    <input type="text" class="form-control border-0 ps-2 shadow-none" id="iconFilterInput"
                        placeholder="Search 2,000+ icons by name, tag, or category..." autocomplete="off" style="background: transparent !important;">
                    <button class="btn btn-link text-muted pe-3 text-decoration-none d-none" type="button" id="clearIconSearch">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div class="col-lg-5 col-md-12">
                <div class="d-flex flex-wrap gap-2 justify-content-lg-end" id="faStyleFilters">
                    <button type="button" class="btn btn-sm btn-primary active rounded-pill px-3 py-2 fa-filter-btn" data-style="all">
                        All <span class="badge bg-white text-primary ms-1 rounded-pill" id="badgeAll">...</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 fa-filter-btn" data-style="solid">
                        Solid <span class="badge bg-secondary-subtle text-secondary ms-1 rounded-pill" id="badgeSolid">...</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 fa-filter-btn" data-style="regular">
                        Regular <span class="badge bg-secondary-subtle text-secondary ms-1 rounded-pill" id="badgeRegular">...</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 fa-filter-btn" data-style="brands">
                        Brands <span class="badge bg-secondary-subtle text-secondary ms-1 rounded-pill" id="badgeBrands">...</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Result Status Counter -->
        <div class="d-flex justify-content-between align-items-center mb-3 px-1">
            <span class="small text-muted" id="faResultsCount">Initializing icon repository...</span>
            <span class="small text-muted"><i class="fa-regular fa-hand-pointer me-1"></i>Click any icon card to copy snippet</span>
        </div>

        <!-- Icons Grid Container -->
        <div id="iconContainer" class="bg-transparent">
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading icons...</span>
                </div>
                <p class="mt-2 text-muted">Loading Font Awesome vector repository...</p>
            </div>
        </div>
    </div>
</div>

@endsection
