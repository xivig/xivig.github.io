@extends('templates.admin.layout')

@section('content')


<div class="container mt-5">
    <div class="row">
        <div class="col-md-8 offset-md-2 text-center">
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title text-success">Payment Successful!</h2>
                    <p class="card-text">Thank you for your order. You will receive an email confirmation shortly.</p>
                    <a href="{{ url('/') }}" class="btn btn-primary">Go to Dashboard</a>
                </div>
            </div>
        </div>
    </div>
</div>



@endsection