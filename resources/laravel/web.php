<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Xivig Admin Template Routes
|--------------------------------------------------------------------------
|
| This file contains all routes mapping to the sidebar links of the 
| Xivig Admin Template.
|
*/

// --- 1. HOME & DASHBOARDS ---
Route::get('/', function () { return view('pages.xivig'); })->name('home');
Route::get('/dashboard-v2.html', function () { return view('pages.dashboard-v2'); })->name('dashboard.v2');

// --- 2. ECOMMERCE ---
Route::prefix('ecommerce')->group(function () {
    Route::get('/ecommerce-products.html', function () { return view('pages.ecommerce.ecommerce-products'); });
    Route::get('/ecommerce-add-product.html', function () { return view('pages.ecommerce.ecommerce-add-product'); });
    Route::get('/ecommerce-product-show.html', function () { return view('pages.ecommerce.ecommerce-product-show'); });
    Route::get('/ecommerce-product-detail.html', function () { return view('pages.ecommerce.ecommerce-product-detail'); });
    Route::get('/ecommerce-orders.html', function () { return view('pages.ecommerce.ecommerce-orders'); });
    Route::get('/create-order.html', function () { return view('pages.ecommerce.create-order'); });
    Route::get('/ecommerce-cart.html', function () { return view('pages.ecommerce.ecommerce-cart'); });
});
Route::get('/store-settings.html', function () { return view('pages.store-settings'); });

// --- 3. BLOG & COURSE ---
Route::get('/blog-list.html', function () { return view('pages.blog-list'); });
Route::get('/blog-detail.html', function () { return view('pages.blog-detail'); });
Route::get('/course-dashboard.html', function () { return view('pages.course-dashboard'); });
Route::get('/course-interface.html', function () { return view('pages.course-interface'); });

// --- 4. APPS ---
Route::prefix('apps')->group(function () {
    Route::get('/calendar.html', function () { return view('pages.apps.calendar'); });
    Route::get('/chat.html', function () { return view('pages.apps.chat'); });
    Route::get('/video-player.html', function () { return view('pages.apps.video-player'); });
    Route::get('/kanban.html', function () { return view('pages.apps.kanban'); });
    Route::get('/task-manager.html', function () { return view('pages.apps.task-manager'); });
    Route::get('/file-manager.html', function () { return view('pages.apps.file-manager'); });
    Route::get('/inbox.html', function () { return view('pages.apps.inbox'); });
});

// --- 5. PROJECTS & USERS ---
Route::prefix('projects')->group(function () {
    Route::get('/project-list.html', function () { return view('pages.projects.project-list'); });
    Route::get('/project-add.html', function () { return view('pages.projects.project-add'); });
});
Route::prefix('users')->group(function () {
    Route::get('/user-list.html', function () { return view('pages.users.user-list'); });
    Route::get('/user-add.html', function () { return view('pages.users.user-add'); });
});

// --- 6. PIPELINE & ANALYTICS ---
Route::prefix('deployments')->group(function () {
    Route::get('/deployment-list.html', function () { return view('pages.deployments.deployment-list'); });
    Route::get('/build-history.html', function () { return view('pages.deployments.build-history'); });
    Route::get('/releases.html', function () { return view('pages.deployments.releases'); });
});
Route::prefix('analytics')->group(function () {
    Route::get('/overview.html', function () { return view('pages.analytics.overview'); });
    Route::get('/system-metrics.html', function () { return view('pages.analytics.system-metrics'); });
});

// --- 7. FORMS & TABLES ---
Route::prefix('forms')->group(function () {
    Route::get('/form-basic.html', function () { return view('pages.forms.form-basic'); });
    Route::get('/summernote-editor.html', function () { return view('pages.forms.summernote-editor'); });
    Route::get('/advanced-components.html', function () { return view('pages.forms.advanced-components'); });
    Route::get('/form-pickers.html', function () { return view('pages.forms.form-pickers'); });
    Route::get('/form-extras.html', function () { return view('pages.forms.form-extras'); });
    Route::get('/form-grid.html', function () { return view('pages.forms.form-grid'); });
    Route::get('/form-wizard.html', function () { return view('pages.forms.form-wizard'); });
    Route::get('/image-cropper.html', function () { return view('pages.forms.image-cropper'); });
    Route::get('/image-dropzone.html', function () { return view('pages.forms.image-dropzone'); });
});
Route::prefix('tables')->group(function () {
    Route::get('/basic-table.html', function () { return view('pages.tables.basic-table'); });
    Route::get('/datatable.html', function () { return view('pages.tables.datatable'); });
});

// --- 8. UI ELEMENTS & ICONS ---
Route::prefix('ui-elements')->group(function () {
    Route::get('/ui-buttons.html', function () { return view('pages.ui-elements.ui-buttons'); });
    Route::get('/ui-cards.html', function () { return view('pages.ui-elements.ui-cards'); });
    Route::get('/ui-cards-hover.html', function () { return view('pages.ui-elements.ui-cards-hover'); });
    Route::get('/ui-modals.html', function () { return view('pages.ui-elements.ui-modals'); });
    Route::get('/ui-tabs.html', function () { return view('pages.ui-elements.ui-tabs'); });
    Route::get('/ui-sweet-alert.html', function () { return view('pages.ui-elements.ui-sweet-alert'); });
    Route::get('/ui-notification.html', function () { return view('pages.ui-elements.ui-notification'); });
    Route::get('/ui-timeline.html', function () { return view('pages.ui-elements.ui-timeline'); });
    Route::get('/ui-progressbar.html', function () { return view('pages.ui-elements.ui-progressbar'); });
    Route::get('/ui-typography.html', function () { return view('pages.ui-elements.ui-typography'); });
    Route::get('/ui-list-group.html', function () { return view('pages.ui-elements.ui-list-group'); });
    Route::get('/ui-range-slider.html', function () { return view('pages.ui-elements.ui-range-slider'); });
    Route::get('/ui-carousel.html', function () { return view('pages.ui-elements.ui-carousel'); });
    Route::get('/ui-toggle.html', function () { return view('pages.ui-elements.ui-toggle'); });
    Route::get('/ui-offcanvas.html', function () { return view('pages.ui-elements.ui-offcanvas'); });
    Route::get('/bootstrap-icon.html', function () { return view('pages.ui-elements.bootstrap-icon'); });
    Route::get('/font-awesome.html', function () { return view('pages.ui-elements.font-awesome'); });
});

// --- 9. CHARTS ---
Route::prefix('charts')->group(function () {
    Route::get('/apexcharts.html', function () { return view('pages.charts.apexcharts'); });
    Route::get('/chartjs.html', function () { return view('pages.charts.chartjs'); });
    Route::get('/e-chart.html', function () { return view('pages.charts.e-chart'); });
    Route::get('/highchart.html', function () { return view('pages.charts.highchart'); });
    Route::get('/jtvector-map.html', function () { return view('pages.charts.jtvector-map'); });
});

// --- 10. EXTRAS & ERRORS ---
Route::get('/invoice.html', function () { return view('pages.invoice'); });
Route::get('/faq.html', function () { return view('pages.faq'); });
Route::get('/gallery.html', function () { return view('pages.gallery'); });
Route::get('/pricing-table.html', function () { return view('pages.pricing-table'); });
Route::get('/sitemap.html', function () { return view('pages.sitemap'); });
Route::get('/blank.html', function () { return view('pages.blank'); });
Route::get('/search.html', function () { return view('pages.search'); });

Route::prefix('error')->group(function () {
    Route::get('/400.html', function () { return view('pages.error.400'); });
    Route::get('/403.html', function () { return view('pages.error.403'); });
    Route::get('/404.html', function () { return view('pages.error.404'); });
    Route::get('/500.html', function () { return view('pages.error.500'); });
    Route::get('/503.html', function () { return view('pages.error.503'); });
});

// --- 11. ADDITIONAL & AUTH PAGES ---
Route::get('/maintenance.html', function () { return view('pages.maintenance'); });
Route::get('/help-support.html', function () { return view('pages.help-support'); });
Route::get('/profile.html', function () { return view('pages.profile'); });
Route::get('/account-settings.html', function () { return view('pages.account-settings'); });
Route::get('/admin-settings.html', function () { return view('pages.admin-settings'); });
Route::get('/documentation.html', function () { return view('pages.documentation'); });
Route::get('/xivig.html', function () { return view('pages.xivig'); });

Route::prefix('auth')->group(function () {
    Route::get('/account-onboarding.html', function () { return view('pages.auth.account-onboarding'); });
    Route::get('/login.html', function () { return view('pages.auth.login'); });
    Route::get('/register.html', function () { return view('pages.auth.register'); });
    Route::get('/forgot-password.html', function () { return view('pages.auth.forgot-password'); });
    Route::get('/reset-password.html', function () { return view('pages.auth.reset-password'); });
    Route::get('/two-factor-authentication.html', function () { return view('pages.auth.two-factor-authentication'); });
    Route::get('/lockscreen.html', function () { return view('pages.auth.lockscreen'); });
});

/*
|--------------------------------------------------------------------------
| FALLBACK ROUTE
|--------------------------------------------------------------------------
| This route will handle any other .html requests dynamically.
*/
Route::get('{path}.html', function ($path) {
    if (view()->exists("pages.$path")) {
        return view("pages.$path");
    }
    abort(404);
})->where('path', '.*');
