<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('partials.auth-head')
    @yield('extra_css')
</head>

<body class="auth-page">

    @include('partials.preloader')

    <div class="auth-card animate__animated animate__zoomIn">
        @yield('content')
    </div>

    @include('partials.auth-scripts')
    @yield('extra_js')
</body>

</html>
