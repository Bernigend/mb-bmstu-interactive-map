import { logger } from "./logger";

const App = {
    /**
     * If true, the application was built for production
     * @type {boolean}
     */
    isProductionMode: true,

    /**
     * @type {boolean}
     */
    pageContentLoaded: false,

    /**
     * @type {boolean}
     */
    mapReady: false,

    /**
     * Returns mapplic options.
     * See: https://www.mapplic.com/plugin/docs/#options
     * @returns {{search: boolean, maxscale: number, fullscreen: boolean, sidebar: boolean, minimap: boolean, marker: string, searchdescription: boolean, developer: boolean, source: string, height: string}}
     */
    mapplicOptions: function() {
        return {
            source: './map/mb-bmstu-config.280920.json',
            sidebar: true,
            height: "100%",
            search: true,
            searchdescription: true,
            minimap: false,
            marker: 'hidden',
            fullscreen: true,
            developer: !App.isProductionMode,
            maxscale: 2
        }
    },

    /**
     * Mapplic object.
     * See: https://www.mapplic.com/plugin/docs
     * @type {(null|*)}
     */
    mapplicObject: null,

    /**
     * The main method of the program that starts it
     * @param {string} mapplicElementSelector
     */
    run: function(mapplicElementSelector) {
        // set isProduction value
        App.checkProductionMode();
        // init mapplic jQuery plugin
        App.mapplicInit(mapplicElementSelector);
        // launching actions when the DOM is ready
        document.addEventListener("DOMContentLoaded", () => {
            const loggerElement = $("#logger");
            loggerElement.css("display", App.isProductionMode ? "none" : "block");
            logger.init(loggerElement);
            logger.log("Environment mode: " + (App.isProductionMode ? "prod" : "dev"));
        });
        // launching actions when the page is fully loaded
        window.addEventListener("load", () => {
            logger.log("page content loaded");

            // start actions when changing the window size
            window.addEventListener("resize", () => {
                App.uiFixes();
            });

            App.pageContentLoaded = true;
            if (App.mapReady) {
                App.uiFixes();
                App.hideLoadingScreen();
            }
        });
    },

    /**
     * Init mapplic jQuery plugin with mapplic events handlers
     * @param {string} mapplicElementSelector
     */
    mapplicInit: function(mapplicElementSelector) {
        const onMapStart = function () {
            logger.log("The map started loading");
        };

        const onSvgLoaded = function() {
            logger.log("One of the maps was loaded");
        };

        const onMapReady = function() {
            logger.log("Map is ready");
            $(".mapplic-search-input").attr("placeholder", "Поиск");

            App.mapReady = true;
            if (App.pageContentLoaded) {
                App.uiFixes();
                App.hideLoadingScreen();
            }
        };

        document.addEventListener("DOMContentLoaded", () => {
            App.mapplicObject = $(mapplicElementSelector);
            App.mapplicObject.mapplic(App.mapplicOptions());

            App.mapplicObject.on("mapstart", onMapStart);
            App.mapplicObject.on("svgloaded", onSvgLoaded);
            App.mapplicObject.on("mapready", onMapReady);
        });
    },

    /**
     * Applies changes to the page design
     */
    uiFixes: function() {
        let mainHeaderHeight = $("#main-header").outerHeight(true) + 15;

        $('.mapplic-fullscreen-button').css('margin-top', mainHeaderHeight + 'px');
        $('.mapplic-levels').css('margin-top', mainHeaderHeight + 'px');
        $('.mapplic-sidebar').css('padding-top', mainHeaderHeight + 80 + 'px');
    },

    /**
     * Sets the value of the app.isProductionMode variable
     */
    checkProductionMode: function() {
        App.isProductionMode = process.env.NODE_ENV === "production";
    },

    /**
     * Fades out the loading screen
     */
    hideLoadingScreen: function() {
        $('#loading-screen').delay(1000).fadeOut('slow');
    }
};

export {App};