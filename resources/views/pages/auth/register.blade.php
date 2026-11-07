@extends('templates.auth.layout')

@section('content')


<div class="text-center">
    <h2 class="auth-card__title">Create Account</h2>
    <p class="auth-card__subtitle">Join the elite network of Xivig architects.</p>
</div>

<div class="social-auth">
    <a href="#" class="social-btn"><i class="fa-brands fa-github"></i></a>
    <a href="#" class="social-btn text-danger"><i class="fa-brands fa-google"></i></a>
    <a href="#" class="social-btn text-primary"><i class="fa-brands fa-linkedin-in"></i></a>
</div>

<div class="auth-divider">
    <span>OR REGISTER WITH EMAIL</span>
</div>

<div class="alert alert-info py-2 px-3 small border-0 rounded-3 mb-4 d-flex align-items-center">
    <i class="bi bi-info-circle me-2 flex-shrink-0"></i>
    <span><strong>Demo Mode:</strong> Pre-wired frontend form. Connect action to your registration backend.</span>
</div>

<form action="login.html" method="POST" id="registerForm">
    @csrf
    <div class="mb-4">
        <div class="input-group auth-input-group">
            <span class="input-group-text"><i class="bi bi-person"></i></span>
            <input type="text" class="form-control" name="name" id="regName" placeholder="Full Name" autocomplete="name" required>
        </div>
    </div>

    <div class="mb-4">
        <div class="input-group auth-input-group">
            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
            <input type="email" class="form-control" name="email" id="regEmail" placeholder="architect@xivig.com" autocomplete="email" required>
        </div>
    </div>

    <div class="mb-4">
        <div class="input-group auth-input-group">
            <span class="input-group-text"><i class="bi bi-shield-lock"></i></span>
            <input type="password" class="form-control" name="password" id="regPassword" placeholder="Create Password" autocomplete="new-password" required>
        </div>
    </div>

    <div class="mb-4">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="terms" required>
            <label class="form-check-label small text-muted" for="terms">
                I agree to the <a href="#" class="auth-link">Terms & Conditions</a>
            </label>
        </div>
    </div>

    <button type="submit" class="btn btn-primary w-100 py-3 rounded-3 fw-bold shadow-sm mb-4">
        Register Now
    </button>

    <p class="text-center small text-muted mb-0">
        Already have an account? <a href="login.html" class="auth-link">Sign In</a>
    </p>
</form>



@endsection