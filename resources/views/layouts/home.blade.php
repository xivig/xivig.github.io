<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('partials.home-head')
    @yield('extra_css')
</head>

<body class="home-layout @yield('bodyClass')" data-bs-spy="scroll" data-bs-target="#mainNav">

    @include('partials.preloader')

    @unless($hideHeader ?? false)
    @include('partials.home-header')
    @endunless

    <main @unless($hideHeader ?? false) class="pt-5 mt-5" @endunless>
        @yield('content')
    </main>

    @unless($hideFooter ?? false)
    @include('partials.home-footer')
    @endunless

    @include('partials.home-scripts')
    @yield('extra_js')

</body>

</html>
