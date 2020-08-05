import "./scss/main.scss";

window.$ = window.jQuery = require('jquery');
require('jquery-mousewheel');

import { mapplicInit } from "./js/mapplic";
mapplicInit($);

$(document).ready(function() {
    const mapplicElement = $('#mapplic');
    const mainHeader = $("#main-header");
    const mainHeaderHeight = mainHeader.outerHeight(true) + 15;

    let map = mapplicElement.mapplic({
        source: './map/mb-bmstu-config.json',
        sidebar: true,
        height: "100%",
        search: true,
        searchdescription: true,
        minimap: false,
        marker: 'hidden',
        fullscreen: true,
        developer: false,
        maxscale: 3
    });

    map.on('mapstart', function(e, self) {
        console.log("The map started loading");
    });

    map.on('svgloaded', function(e, self) {
        console.log("One of the maps was loaded");
    });

    map.on('mapready', function(e, self) {
        console.log("Map is ready");

        $(".mapplic-search-input").attr("placeholder", "Поиск");

        $('.mapplic-fullscreen-button').css('margin-top', mainHeaderHeight + 'px');
        $('.mapplic-levels').css('margin-top', mainHeaderHeight + 'px');
        $('.mapplic-sidebar').css('padding-top', mainHeaderHeight + 80 + 'px');

        $('#loading-screen').delay(1000).fadeOut('slow');
    });
});