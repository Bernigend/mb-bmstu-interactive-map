import "./scss/main.scss";

window.$ = window.jQuery = require('jquery');
require('jquery-mousewheel');

import { mapplicInit } from "./js/mapplic";
mapplicInit($);

$(document).ready(function() {
    $('#mapplic').mapplic({
        source: './map/mb-bmstu-config.json',
        sidebar: true,
        height: "100%",
        search: true,
        searchdescription: true,
        minimap: false,
        marker: 'hidden',
        fullscreen: true,
        developer: true,
        maxscale: 1
    });
});