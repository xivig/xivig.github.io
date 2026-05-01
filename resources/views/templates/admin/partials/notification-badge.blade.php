<span id="{{ $id ?? "" }}" class="badge rounded-pill @if($color)bg-{{ $color ?? "" }}{{ $else ?? "" }}bg-danger@endif {{ $class ?? "" }}">
    @if($count){{ $count ?? "" }}{{ $else ?? "" }}0@endif
    <span class="visually-hidden">notifications</span>
</span>
