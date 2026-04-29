import $ from 'jquery';

// Define globally only if not already established with plugins
if (window.jQuery && window.jQuery.fn && (window.jQuery.fn.DataTable || window.jQuery.fn.summernote)) {
    console.log("♻️ jQuery Setup: Preserving existing global jQuery with plugins.");
} else {
    globalThis.jQuery = globalThis.$ = $;
    window.jQuery = window.$ = $;
}

export default window.jQuery || $;
