@extends('layouts.auth')

@section('title', 'Login')

@section('content')
<div class="text-center mb-4">
    <img src="{{ asset('assets/xivig-logo1.webp') }}" alt="Logo" width="80" class="mb-3">
    <h3 class="fw-bold">Welcome Back</h3>
    <p class="text-muted">Sign in to your account</p>
</div>

<form method="POST" action="{{ route('login') }}">
    @csrf
    <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input type="email" class="form-control rounded-3" id="email" name="email" required autofocus>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control rounded-3" id="password" name="password" required>
    </div>
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="remember" name="remember">
        <label class="form-check-label" for="remember">Remember me</label>
    </div>
    <button type="submit" class="btn btn-primary w-100 rounded-3 py-2 fw-bold">Sign In</button>
</form>
@endsection
