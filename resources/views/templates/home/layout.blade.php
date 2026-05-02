<!DOCTYPE html>
<html lang="en">

<head>
    @include('templates.home.partials.head')
</head>

<body class="home-layout {{ $bodyClass ?? "" }}" data-bs-spy="scroll" data-bs-target="#mainNav">

    @include('templates.home.partials.preloader')

    @unless($hideHeader)
    @include('templates.home.partials.header')
    @endunless

    <main @unless($hideHeader)class="pt-5 mt-5"@endunless>
        @yield('content')
    </main>

    @unless($hideFooter)
    @include('templates.home.partials.footer')
    @endunless

    <div class="sidebar-overlay"></div>

    @include('templates.home.partials.scripts')

</body>

</html>
