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
            <div class="page-header shadow-sm">
                <h2 class="page-header__title">{{ $title ?? "" }}</h2>
                <nav class="page-header__nav" aria-label="breadcrumb">
                    <ol class="breadcrumb justify-content-center">
                        <li class="breadcrumb-item">
                            <a href="{{ url('/') }}">Home</a>
                        </li>
                        @if($parentTitle)
                        <li class="breadcrumb-item">
                            <a href="#">{{ $parentTitle ?? "" }}</a>
                        </li>
                        @endif
                        <li class="breadcrumb-item active" aria-current="page">{{ $title ?? "" }}</li>
                    </ol>
                </nav>
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
