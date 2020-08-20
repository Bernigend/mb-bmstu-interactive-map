// importing styles
import "./scss/main.scss";

// importing log wrapper
import { logger } from "./js/logger";

// importing jquery-mousewheel plugin
require('jquery-mousewheel');

// importing mapplic jQuery plugin
import { mapplicInit } from "./js/mapplic";
mapplicInit($);

// starting app
$(document).ready(function() {
    const mapplicElement = $('#mapplic');
    const mainHeader = $("#main-header");
    const mainHeaderHeight = mainHeader.outerHeight(true) + 15;

    // init logger
    logger.init($("#logger"));

    const mapplicOptions = {
        source: './map/mb-bmstu-config.json',
        sidebar: true,
        height: "100%",
        search: true,
        searchdescription: true,
        minimap: false,
        marker: 'hidden',
        fullscreen: true,
        developer: false,
        maxscale: 2
    }

    // init mapplic
    let map = mapplicElement.mapplic(mapplicOptions);

    map.on('mapstart', function(e, self) {
        logger.log("The map started loading");
    });

    map.on('svgloaded', function(e, self) {
        logger.log("One of the maps was loaded");
    });

    map.on('mapready', function(e, self) {
        logger.log("Map is ready");
        logger.log("Max scale: " + mapplicOptions.maxscale);

        $(".mapplic-search-input").attr("placeholder", "Поиск");

        $('.mapplic-fullscreen-button').css('margin-top', mainHeaderHeight + 'px');
        $('.mapplic-levels').css('margin-top', mainHeaderHeight + 'px');
        $('.mapplic-sidebar').css('padding-top', mainHeaderHeight + 80 + 'px');

        $('#loading-screen').delay(1000).fadeOut('slow');
    });
});