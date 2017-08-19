;(function($) {
    'use strict';

    /**
     *      Example:
     *
     *          $('.blah').sticky();
     *
     *          $('.blah').sticky().on('sticky-block', function(){
     *              ....
     *          });
     *
     *      Options:
     *
     *          topOffset  -  top indent block
     *          bottomOffset - bottom indent block,
     *          startTop    - enabled block for offset,
     *          minEnabledWidth: - minimum width for enable
     *
     *
     */

    const $window = $(window);
    const stickies = [];

    /**
     * Class Sticky block
     *
     */
    class Sticky {

        constructor(block, opts) {

            this.$block = $(block);
            this.$parentContainer = this.$block.parent();
            this.opts = $.extend({
                topOffset: 0,
                bottomOffset: 0,
                startTop: 0,
                minEnabledWidth: 768,
            }, opts);

            this.enable();
            stickies.push(this);

            $window.on('scroll.sticky', this.applyStickies);
            $window.on('load.sticky', this.applyStickies);
            $window.on('resize.sticky', () => {
                this.updateWidth();
            });
        }

        /**
         *  Enable block
         */
        enable() {
            this.updateWidth();

            if (this._enabled) {
                return;
            } else {
                this._enabled = true;
            }

            this.process($window.scrollTop());
        }

        /**
         *  Disable block
         */
        disable() {
            if (!this._enabled) {
                return;
            }

            this._enabled = false;
            this._state = null;
            this.$block.css({
                position: '',
                top: '',
                bottom: '',
            })
        }

        /**
         * Update width block
         * @returns {*}
         */
        updateWidth() {
            const init_style = this.$block.get(0).style.cssText;
            this.$block.get(0).style.cssText = '';

            this._width = this.$block.outerWidth();
            this.$block.get(0).style.cssText = init_style;

            if ((this._state == 'bottom') || (this._state == 'middle')) {
                this.$block.css('width', this._width);
            }

            return this._width;
        }

        /**
         * @param winScroll
         */
        process(winScroll) {
            if (!this._enabled) {
                return;
            }

            const container_top = this.$parentContainer.offset().top + (parseInt(this.$parentContainer.css('padding-top')) || 0) + this.opts.startTop;
            const blockHeight = this.$block.outerHeight(true);
            const containerHeight = this.$parentContainer.height();
            const scrollFrom = container_top - this.opts.topOffset;
            const scrollTo = scrollFrom + containerHeight - blockHeight - this.opts.bottomOffset;

            if (winScroll < scrollFrom && this._state != 'top') {
                this._state = 'top';

                this.$block.removeClass('active-sticky').css({
                    position: '',
                    top: '',
                    bottom: '',
                    width: ''
                });
                this.$block.trigger('sticky-block-off');
            } else if (this.$parentContainer.height() > this.$block.outerHeight(true)) {
                if (winScroll > scrollTo) {
                    if (this._state != 'bottom') {
                        this._state = 'bottom';
                        this.$block.removeClass('active-sticky').css({
                            position: 'absolute',
                            top: 'auto',
                            bottom: this.opts.bottomOffset,
                            width: this._width
                        });
                    }
                } else if (((winScroll >= scrollFrom) && (winScroll <= scrollTo)) && this._state != 'middle') {
                    this._state = 'middle';

                    this.$block.addClass('active-sticky').css({
                        position: 'fixed',
                        top: this.opts.topOffset,
                        bottom: 'auto',
                        width: this._width
                    });
                    this.$block.trigger('sticky-block');
                }
            }
        }

        /**
         * @param callback
         * @param time
         * @returns {Function}
         */
        rared(callback, time) {
            let sleeping,
                sleeping_call,
                that,
                args;

            return function() {
                if (sleeping) {
                    sleeping_call = true;
                    that = this;
                    args = arguments;
                    return;
                }

                callback.apply(this, arguments);
                sleeping = setTimeout(function() {
                    if (sleeping_call) {
                        callback.apply(that, args);
                        sleeping_call = false;
                    }
                    sleeping = null;
                }, time);
            }
        };

        /**
         *  apply sticky block
         */
        applyStickies() {
            const winScroll = $window.scrollTop();
            $.each(stickies, function(i, item) {
                item.process(winScroll);
            });
        }
    }

    $.fn.sticky = function(options) {
        return this.each(function() {
            new Sticky(this, options);
        })
    };

    window.Sticky = Sticky;

})(jQuery);
