<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('partials.head')
    @yield('extra_css')
</head>

<body class="d-flex flex-column min-vh-100" data-bs-spy="scroll" data-bs-target="#blog-toc" data-bs-offset="100">

    @include('partials.preloader')

    @include('partials.header')

    @include('partials.sidebar')

    @include('partials.right-sidebar')

    <main class="main mt-5">
        <div class="main__container container-fluid">
            
            <!-- Standardized Page Header -->
            <div class="page-header shadow-sm">
                <h2 class="page-header__title">@yield('title')</h2>
                <nav class="page-header__nav" aria-label="breadcrumb">
                    <ol class="breadcrumb justify-content-center">
                        <li class="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        @hasSection('parentTitle')
                        <li class="breadcrumb-item">
                            <a href="#">@yield('parentTitle')</a>
                        </li>
                        @endif
                        <li class="breadcrumb-item active" aria-current="page">@yield('title')</li>
                    </ol>
                </nav>
            </div>

            <!-- Main Content Area -->
            @yield('content')

        </div>
    </main>

    @include('partials.footer')

    @include('partials.scripts')
    @yield('extra_js')

</body>

</html>
