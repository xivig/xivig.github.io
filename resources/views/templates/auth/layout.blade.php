<!DOCTYPE html>
<html lang="en">

<head>
    @include('templates.auth.partials.head')
</head>

<body class="auth-page">

    @include('templates.auth.partials.preloader')

    <div class="auth-card animate__animated animate__zoomIn">
        @yield('content')
    </div>

    @include('templates.auth.partials.scripts')
</body>

</html>
