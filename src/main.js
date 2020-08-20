// importing styles
import "./scss/main.scss";

// importing jquery-mousewheel plugin
require('jquery-mousewheel');

// importing mapplic jQuery plugin
import { mapplicInit } from "./js/mapplic";
mapplicInit($);

// importing app core
import { App } from "./js/app";

// start app
App.run("#mapplic");