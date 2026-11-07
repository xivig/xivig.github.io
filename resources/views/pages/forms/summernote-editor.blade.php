@extends('templates.admin.layout')

@section('title', 'Quill Editor')

@section('content')
<script>
    window.location.replace("{{ url('/pages/forms/quill-editor') }}");
</script>
<div class="row justify-content-center py-5">
    <div class="col-md-6 text-center">
        <div class="card border border-secondary border-opacity-15 shadow-2xs rounded-4 p-5 bg-body">
            <h3 class="fw-bold text-primary mb-3">Redirecting to Quill Editor...</h3>
            <p class="text-muted mb-4">Summernote has been updated to Quill Editor v2. Please update your bookmarks.</p>
            <a href="{{ url('/pages/forms/quill-editor') }}" class="btn btn-primary rounded-pill px-4 py-2 fw-bold">Open Quill Editor</a>
        </div>
    </div>
</div>
@endsection
