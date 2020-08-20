const logger = {
    /**
     * @var {jQuery.fn.init} outputHtml
     */
    outputHtml: new jQuery(),

    /**
     * @param {jQuery.fn.init} outputHtml
     */
    init: function (outputHtml) {
        this.outputHtml = outputHtml;
    },

    /** @param {string} textToLog */
    log: function (textToLog) {
        console.log(textToLog);
        this.outputHtml.append(`<div>${textToLog}</div>`);
    }
};

module.exports.logger = logger;