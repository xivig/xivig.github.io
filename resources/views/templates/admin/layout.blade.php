<!DOCTYPE html>
<html lang="en">

<head>
    @include('templates.admin.partials.head')
</head>

<body class="d-flex flex-column min-vh-100" data-bs-spy="scroll" data-bs-target="#blog-toc" data-bs-offset="100">

    @include('templates.admin.partials.preloader')

    @include('templates.admin.partials.header')

    @include('templates.admin.partials.sidebar')

    @include('templates.admin.partials.right-sidebar')

    <main class="main mt-5">
        <div class="main__container container-fluid">
            
            <!-- Standardized Page Header -->
            <div class="page-header shadow-sm rounded-4 overflow-hidden position-relative">
                <div class="page-header__inner d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                    <div class="page-header__left">
                        <nav class="page-header__nav mb-1" aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <a href="{{ url('/') }}">Home</a>
                                </li>
                                @if(!empty($parentTitle))
                                <li class="breadcrumb-item">
                                    <span>{{ $parentTitle }}</span>
                                </li>
                                @endif
                                <li class="breadcrumb-item active" aria-current="page">{{ $title ?? "" }}</li>
                            </ol>
                        </nav>
                        <h1 class="page-header__title mb-0" id="pageHeaderTitle">{{ $title ?? "" }}</h1>
                    </div>
                    <div class="page-header__right d-flex align-items-center gap-2.5 flex-wrap">
                        @if(!empty($actionUrl))
                            <a href="{{ url($actionUrl) }}" class="btn btn-primary shadow-sm rounded-pill px-4 py-2 fw-bold text-decoration-none" id="pagePrimaryActionBtn">
                                {{ $actionText ?? 'Primary Action' }}
                            </a>
                        @else
                            <button type="button" class="btn btn-primary shadow-sm rounded-pill px-4 py-2 fw-bold" id="pagePrimaryActionBtn">
                                {{ $actionText ?? 'Primary Action' }}
                            </button>
                        @endif
                    </div>
                </div>
            </div>

            <!-- Main Content Area -->
            @yield('content')

        </div>
    </main>

    @include('templates.admin.partials.footer')

    <!-- MOBILE BOTTOM NAVIGATION -->
    <div class="mobile-bottom-nav d-md-none">
        <a href="{{ url('/') }}" class="mobile-bottom-nav__item">
            <i class="bi bi-house"></i>
            <span>Home</span>
        </a>
        <a href="{{ url('dashboard-v2.html') }}" class="mobile-bottom-nav__item">
            <i class="bi bi-speedometer2"></i>
            <span>Stats</span>
        </a>
        <a href="{{ url('apps/chat.html') }}" class="mobile-bottom-nav__item">
            <i class="bi bi-chat-dots"></i>
            <span>Chat</span>
        </a>
        <a href="{{ url('profile.html') }}" class="mobile-bottom-nav__item">
            <i class="bi bi-person"></i>
            <span>Profile</span>
        </a>
        <a href="javascript:;" class="mobile-bottom-nav__item" id="sidebar-toggle">
            <i class="bi bi-list"></i>
            <span>Menu</span>
        </a>
    </div>

    <div class="sidebar-overlay"></div>

    @include('templates.admin.partials.scripts')

</body>

</html>
