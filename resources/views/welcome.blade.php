@extends('layouts.home')

@section('title', 'Home')
@section('bodyClass', 'landing-page')

@section('content')
<section id="home" class="py-100">
    <div class="container text-center">
        <h1 class="display-3 fw-black mb-4">Architecting the Future</h1>
        <p class="lead text-muted mb-5">Experience the elite Laravel template for modern web applications.</p>
        <a href="{{ route('login') }}" class="btn btn-primary btn-lg rounded-pill px-5">Get Started</a>
    </div>
</section>
@endsection
