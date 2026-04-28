import $ from 'jquery';

// Define globally immediately
globalThis.jQuery = globalThis.$ = $;
window.jQuery = window.$ = $;

export default $;
