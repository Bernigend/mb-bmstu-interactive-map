const logger = {
    /**
     * @type {jQuery.fn.init}
     */
    outputHtml: new jQuery(),

    /**
     * @param {jQuery.fn.init} outputHtml
     */
    init: function (outputHtml) {
        this.outputHtml = outputHtml;
    },

    /**
     * @param {string} textToLog
     */
    log: function (textToLog) {
        console.log(textToLog);
        this.outputHtml.append(`<div>INFO: ${textToLog}</div>`);
    },

    /**
     * @param {string} errorToLog
     */
    error: function(errorToLog) {
        console.error(errorToLog);
        this.outputHtml.append(`<div>ERROR: ${errorToLog}</div>`);
    }
};

export { logger };