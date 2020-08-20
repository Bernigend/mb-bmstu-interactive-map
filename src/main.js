// importing styles
import "./scss/main.scss";

// importing Sentry
import * as Sentry from "@sentry/browser";
Sentry.init({ dsn: "https://20d50f6561574b8691a0f2c8a398d857@o412971.ingest.sentry.io/5398669" });

// importing jquery-mousewheel plugin
require('jquery-mousewheel');

// importing mapplic jQuery plugin
import { mapplicInit } from "./js/mapplic";
mapplicInit($);

// importing app core
import { App } from "./js/app";

// start app
App.run("#mapplic");