;(function($) {
    'use strict';

    /**
     *  Loader for ajax request
     */
    class Loader {
        constructor() {
            this.$loader = $('.js-loader');
            this.countRequests = 0; // Counter, how many times we did call method 'show'
        }

        /**
         * Show loader. If setTransparent has a value rhen we use empty transparent overlay
         * @param setTransparent
         */

        show(setTransparent) {
            // If loader didn't display yet, we are displaying it
            if (this._isLoaderStarted()) {
                const lookType = setTransparent ? 'transparent-mode' : '';
                this.$loader.addClass(lookType).show();
            }

            this.countRequests++;
        }

        /**
         * Hide loader (if this.countRequests < 1)
         */
        hide() {
            if (this.countRequests > 0) {
                this.countRequests--;
            }

            if (this._isLoaderStarted()) {
                this.$loader.hide();
            }
        }

        /**
         * Checking did run loader or not
         *
         * @returns {boolean}
         */
        _isLoaderStarted() {
            return this.countRequests < 1;
        }
    }

    $(function() {
        window.Loader = new Loader();
    });

})(jQuery);
