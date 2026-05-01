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

    @include('templates.admin.partials.scripts')

</body>

</html>
