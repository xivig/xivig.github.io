<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
    <div class="sidebar__brand">
        <div class="sidebar__brand-wrapper">
            <img src="{{ asset('assets/logo.webp') }}" alt="Logo" class="sidebar__logo" />
            <h4 class="sidebar__title">XivigApp</h4>
        </div>
        <div class="sidebar__close d-xl-none" id="sidebar-close">
            <i class="bi bi-x-lg"></i>
        </div>
    </div>

    <nav class="sidebar__nav custom-scroll">
        <ul class="sidebar__menu" id="accordion-menu">

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-house"></span>
                    <span class="sidebar__text">Home</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="/" class="sidebar__sub-link">Dashboard v1</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="#"
                                class="sidebar__sub-link">Dashboard v2</a>
                        </li>
                    </ul>
                </div>
            </li>

            <!-- Add more sidebar items here. For brevity, I'm only showing a few. In a real Laravel app, you might loop through a config file. -->

            <li class="sidebar__item mt-auto">
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <a href="{{ route('logout') }}" class="sidebar__link sidebar__link--logout text-danger" onclick="event.preventDefault(); this.closest('form').submit();">
                        <span class="sidebar__icon bi bi-box-arrow-right"></span>
                        <span class="sidebar__text">Logout</span>
                    </a>
                </form>
            </li>
        </ul>
    </nav>

    <div class="sidebar__footer mt-auto p-4 border-top border-opacity-10">
        <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-white extra-small">CLOUD SPACE</span>
            <span class="fw-black text-success extra-small">12% USED</span>
        </div>
        <div class="progress" style="height: 6px; background: rgba(0,0,0,0.05);">
            <div class="progress-bar bg-success" role="progressbar" style="width: 12%"></div>
        </div>
    </div>
</aside>
