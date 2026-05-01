<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
    <div class="sidebar__brand">
        <div class="sidebar__brand-wrapper">
            <img src="{{ asset('assets/admin/images/logo.png') }}" alt="Logo" class="sidebar__logo" />
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
                        <li class="sidebar__sub-item"><a href="{{ url('/') }}" class="sidebar__sub-link">Dashboard v1</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('dashboard-v2.html') }}"
                                class="sidebar__sub-link">Dashboard v2</a>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-shop"></span>
                    <span class="sidebar__text">Ecommerce</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item sidebar__sub-item--has-dropdown">
                            <a href="javascript:;" class="sidebar__sub-link">Product Management</a>
                            <div class="sidebar__submenu-wrapper">
                                <ul class="sidebar__submenu">
                                    <li class="sidebar__sub-item"><a href="{{ url('ecommerce/ecommerce-products.html') }}"
                                            class="sidebar__sub-link">Product List</a></li>
                                    <li class="sidebar__sub-item"><a
                                            href="{{ url('ecommerce/ecommerce-add-product.html') }}"
                                            class="sidebar__sub-link">Add Product</a></li>
                                    <li class="sidebar__sub-item"><a
                                            href="{{ url('ecommerce/ecommerce-product-show.html') }}"
                                            class="sidebar__sub-link">Product Show</a></li>
                                </ul>
                            </div>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('ecommerce/ecommerce-product-detail.html') }}"
                                class="sidebar__sub-link">Product Analytics</a></li>
                        <li class="sidebar__sub-item sidebar__sub-item--has-dropdown">
                            <a href="javascript:;" class="sidebar__sub-link">Order Management</a>
                            <div class="sidebar__submenu-wrapper">
                                <ul class="sidebar__submenu">
                                    <li class="sidebar__sub-item"><a href="{{ url('ecommerce/ecommerce-orders.html') }}"
                                            class="sidebar__sub-link">Order List</a></li>
                                    <li class="sidebar__sub-item"><a href="{{ url('ecommerce/create-order.html') }}"
                                            class="sidebar__sub-link">Create Order</a></li>
                                </ul>
                            </div>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('ecommerce/ecommerce-cart.html') }}"
                                class="sidebar__sub-link">Shopping
                                Cart</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('store-settings.html') }}"
                                class="sidebar__sub-link">Store
                                Settings</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-journal-text"></span>
                    <span class="sidebar__text">Blog</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('blog-list.html') }}" class="sidebar__sub-link">Blog
                                List</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('blog-detail.html') }}"
                                class="sidebar__sub-link">Blog
                                Details</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-book-half"></span>
                    <span class="sidebar__text">Course</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('course-dashboard.html') }}"
                                class="sidebar__sub-link">Course
                                Dashboard</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('course-interface.html') }}"
                                class="sidebar__sub-link">Course
                                Interface</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-grid"></span>
                    <span class="sidebar__text">Apps</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('apps/calendar.html') }}"
                                class="sidebar__sub-link">Calendar</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('apps/chat.html') }}" class="sidebar__sub-link">Chat
                                @include('templates.admin.partials.notification-badge')
                            </a></li>

                        <li class="sidebar__sub-item"><a href="{{ url('apps/video-player.html') }}"
                                class="sidebar__sub-link">Video
                                Player</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('apps/kanban.html') }}"
                                class="sidebar__sub-link">Kanban</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('apps/task-manager.html') }}"
                                class="sidebar__sub-link">Task</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('apps/file-manager.html') }}"
                                class="sidebar__sub-link">File
                                Manager</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('apps/inbox.html') }}"
                                class="sidebar__sub-link">Mailbox
                                @include('templates.admin.partials.notification-badge')
                            </a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-briefcase"></span>
                    <span class="sidebar__text">Projects</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('projects/project-list.html') }}"
                                class="sidebar__sub-link">Project List</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('projects/project-add.html') }}"
                                class="sidebar__sub-link">Add Project</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-people"></span>
                    <span class="sidebar__text">Users</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('users/user-list.html') }}"
                                class="sidebar__sub-link">User List</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('users/user-add.html') }}"
                                class="sidebar__sub-link">Add User</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-rocket-takeoff"></span>
                    <span class="sidebar__text">Pipeline</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('deployments/deployment-list.html') }}"
                                class="sidebar__sub-link">Deployments</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('deployments/build-history.html') }}"
                                class="sidebar__sub-link">Build History</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('deployments/releases.html') }}"
                                class="sidebar__sub-link">Releases</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-bar-chart"></span>
                    <span class="sidebar__text">Analytics</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('analytics/overview.html') }}"
                                class="sidebar__sub-link">Overview</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('analytics/system-metrics.html') }}"
                                class="sidebar__sub-link">System Metrics</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-textarea-resize"></span>
                    <span class="sidebar__text">Form</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('forms/form-basic.html') }}"
                                class="sidebar__sub-link">Form Basic</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('forms/summernote-editor.html') }}"
                                class="sidebar__sub-link">Html Editor</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('forms/advanced-components.html') }}"
                                class="sidebar__sub-link">Advanced Components</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('forms/form-pickers.html') }}"
                                class="sidebar__sub-link">Form
                                Pickers</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('forms/form-extras.html') }}"
                                class="sidebar__sub-link">Form
                                Extras</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('forms/form-grid.html') }}"
                                class="sidebar__sub-link">Form Grid</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('forms/form-wizard.html') }}"
                                class="sidebar__sub-link">Form
                                Wizard</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('forms/image-cropper.html') }}"
                                class="sidebar__sub-link">Image
                                Cropper</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('forms/image-dropzone.html') }}"
                                class="sidebar__sub-link">Image
                                Dropzone</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-table"></span>
                    <span class="sidebar__text">Table</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('tables/basic-table.html') }}"
                                class="sidebar__sub-link">Basic
                                Table</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('tables/datatable.html') }}"
                                class="sidebar__sub-link">Datatables</a>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-archive"></span>
                    <span class="sidebar__text">UI Elements</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-buttons.html') }}"
                                class="sidebar__sub-link">Buttons</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-cards.html') }}"
                                class="sidebar__sub-link">Cards</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-cards-hover.html') }}"
                                class="sidebar__sub-link">Cards
                                Hover</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-modals.html') }}"
                                class="sidebar__sub-link">Modals</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-tabs.html') }}"
                                class="sidebar__sub-link">Tabs</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-sweet-alert.html') }}"
                                class="sidebar__sub-link">Sweet
                                Alert</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-notification.html') }}"
                                class="sidebar__sub-link">Notification</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-timeline.html') }}"
                                class="sidebar__sub-link">Timeline</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-progressbar.html') }}"
                                class="sidebar__sub-link">Progressbar</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-typography.html') }}"
                                class="sidebar__sub-link">Typography</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-list-group.html') }}"
                                class="sidebar__sub-link">List
                                group</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-range-slider.html') }}"
                                class="sidebar__sub-link">Range
                                slider</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-carousel.html') }}"
                                class="sidebar__sub-link">Carousel</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-toggle.html') }}"
                                class="sidebar__sub-link">Collapsible
                                Toggle</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/ui-offcanvas.html') }}"
                                class="sidebar__sub-link">Offcanvas</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-command"></span>
                    <span class="sidebar__text">Icons</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/bootstrap-icon.html') }}"
                                class="sidebar__sub-link">Bootstrap
                                Icons</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('ui-elements/font-awesome.html') }}"
                                class="sidebar__sub-link">FontAwesome
                                Icons</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-pie-chart"></span>
                    <span class="sidebar__text">Charts</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('charts/apexcharts.html') }}"
                                class="sidebar__sub-link">Apexcharts</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('charts/chartjs.html') }}"
                                class="sidebar__sub-link">Chart.js</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('charts/e-chart.html') }}"
                                class="sidebar__sub-link">E-Charts</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('charts/highchart.html') }}"
                                class="sidebar__sub-link">Highcharts</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('charts/jtvector-map.html') }}"
                                class="sidebar__sub-link">Vector
                                Map</a></li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-file-earmark-text"></span>
                    <span class="sidebar__text">Extras</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">

                        <li class="sidebar__sub-item"><a href="{{ url('invoice.html') }}"
                                class="sidebar__sub-link">Invoice</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('faq.html') }}" class="sidebar__sub-link">FAQ</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('gallery.html') }}"
                                class="sidebar__sub-link">Gallery</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('pricing-table.html') }}"
                                class="sidebar__sub-link">Pricing
                                Table</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('sitemap.html') }}"
                                class="sidebar__sub-link">Sitemap</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('blank.html') }}" class="sidebar__sub-link">Blank
                                Page</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('search.html') }}" class="sidebar__sub-link">Search
                                Result</a>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-bug"></span>
                    <span class="sidebar__text">Errors</span>
                </a>
                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('error/400.html') }}" class="sidebar__sub-link">400
                                Bad Request</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('error/403.html') }}" class="sidebar__sub-link">403
                                Forbidden</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('error/404.html') }}" class="sidebar__sub-link">404
                                Not Found</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('error/500.html') }}" class="sidebar__sub-link">500
                                Internal
                                Error</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('error/503.html') }}" class="sidebar__sub-link">503
                                Service
                                Unavailable</a></li>
                    </ul>
                </div>
            </li>
            <li class="sidebar__item sidebar__item--has-dropdown">
                <a href="javascript:;" class="sidebar__link">
                    <span class="sidebar__icon bi bi-file-earmark-text"></span>
                    <span class="sidebar__text">Additional Pages</span>
                </a>

                <div class="sidebar__submenu-wrapper">
                    <ul class="sidebar__submenu">
                        <li class="sidebar__sub-item"><a href="{{ url('maintenance.html') }}"
                                class="sidebar__sub-link">Maintenance</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('auth/account-onboarding.html') }}"
                                class="sidebar__sub-link">Account Onboarding</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('help-support.html') }}"
                                class="sidebar__sub-link">Help &
                                Support</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('profile.html') }}"
                                class="sidebar__sub-link">Profile</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('account-settings.html') }}"
                                class="sidebar__sub-link">Account
                                Settings</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('auth/login.html') }}"
                                class="sidebar__sub-link">Login</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('auth/register.html') }}"
                                class="sidebar__sub-link">Register</a>
                        </li>
                        <li class="sidebar__sub-item"><a href="{{ url('auth/forgot-password.html') }}"
                                class="sidebar__sub-link">Forgot
                                Password</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('auth/reset-password.html') }}"
                                class="sidebar__sub-link">Reset
                                Password</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('auth/two-factor-authentication.html') }}"
                                class="sidebar__sub-link">Two Factor Authentication</a></li>
                        <li class="sidebar__sub-item"><a href="{{ url('auth/lockscreen.html') }}"
                                class="sidebar__sub-link">Lock
                                Screen</a></li>
                    </ul>
                </div>

            </li>


            <li class="sidebar__item">
                <a href="{{ url('admin-settings.html') }}" class="sidebar__link">
                    <span class="sidebar__icon bi bi-gear"></span>
                    <span class="sidebar__text">Settings</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="{{ url('documentation.html') }}" class="sidebar__link">
                    <span class="sidebar__icon bi bi-file-earmark-medical"></span>
                    <span class="sidebar__text">Documentation</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="https://docs.xivig.com" target="_blank" class="sidebar__link">
                    <span class="sidebar__icon bi bi-book"></span>
                    <span class="sidebar__text">Online Docs</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="{{ url('xivig.html') }}" class="sidebar__link">
                    <span class="sidebar__icon bi bi-app"></span>
                    <span class="sidebar__text">Landing Page</span>
                </a>
            </li>
            <li class="sidebar__item mt-auto">
                <a href="{{ url('auth/login.html') }}" class="sidebar__link sidebar__link--logout text-danger">
                    <span class="sidebar__icon bi bi-box-arrow-right"></span>
                    <span class="sidebar__text">Logout</span>
                </a>
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