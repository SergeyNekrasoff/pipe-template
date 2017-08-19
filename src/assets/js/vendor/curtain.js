/**
 * Plugin to show and hide elemets
 */
;(function($) {

var Curtain = function (options) {
    this.data = $.extend({
        triggerClass: '.js-curtain-trigger',
        targetClass: '.js-curtain-target',
        overlayClass: '.js-overlay',
        overlayRel: 'overlay',
        effectSpeed: 200
    }, options);

    $(this.data.triggerClass).each(function () {
        $(this).addClass('flag-closed');
    });
    $(this.data.targetClass).slideUp(0).find('> *').fadeOut(0);

    $(document)
        .on('click', this.data.triggerClass, this.moveCurtain.bind(this))
        .on('mouseenter', '.js-hover-curtain-trigger', this.moveCurtain.bind(this))
        .on('click', '.js-overlay, .js-curtain-close', this.hideCurtain.bind(this))
        .on('mouseleave', '.js-hover-curtain-target', this.hideCurtain.bind(this))
        .on('mouseup', this.hideAll.bind(this));
};

Curtain.prototype = {
    /**
     * Detect method which need to use
     *
     * @param e
     */
    moveCurtain: function (e) {
        var element = $(e.currentTarget);

        if (element.hasClass('flag-closed')) {
            this.showCurtain(element);
        } else if (element.data('rel') === 'header-brand') {
            window.location.href = element.attr('href');
        } else {
            this.hideCurtain(element);
        }

        return false;
    },

    /**
     * Hide All Targets
     *
     * @param e
     */
    hideAll: function (e) {
        var target = $(this.data.targetClass);
        var trigger = $(this.data.triggerClass);

        if (!target.is(e.target) &&
            !trigger.is(e.target) &&
            target.has(e.target).length === 0) {

            this.hideCurtain();
        }
    },

    /**
     * Show curtain
     *
     * @param {jQuery|HTMLElement} element
     */
    showCurtain: function (element) {
        this.hideCurtain();

        this.getRelation(element, 'trigger')
            .stop().addClass('flag-opened')
            .stop().removeClass('flag-closed');

        this.getRelation(element, 'target')
            .find('> *')
            .stop().fadeIn(this.data.effectSpeed * 1.5)
            .end()
            .stop().slideDown(this.data.effectSpeed);

        this.getRelation(element, 'overlay')
            .fadeIn(this.data.effectSpeed);
    },

    /**
     * Show curtain by data-rel
     * @param {string} curtainRelation
     */
    setShown: function(curtainRelation) {
        if (curtainRelation) {
            var $currentTarget = $('.js-curtain-target').filter('[data-rel="' + curtainRelation + '"]').first();
            this.showCurtain($currentTarget);
        }
    },

    /**
     * Close all
     */
    hideCurtain: function () {
        $(this.data.triggerClass)
            .stop().addClass('flag-closed')
            .stop().removeClass('flag-opened');

        $(this.data.targetClass)
            .stop().slideUp(this.data.effectSpeed)
            .find('> *')
            .stop().fadeOut(this.data.effectSpeed);

        $(this.data.overlayClass + ':visible')
            .fadeOut(this.data.effectSpeed);

        return false;
    },

    /**
     * Get elements by data-attribute
     *
     * @param {jQuery|HTMLElement} element
     * @param {string} classId
     * @returns {jQuery}
     */
    getRelation: function (element, classId) {
        var rel = this.data[classId + 'Rel'] || 'rel',
            relation = $(element).data(rel);

        if (relation) {
            return $(this.data[classId + 'Class']).filter('[data-' + rel + '="' + relation + '"]');
        } else if (classId === 'overlay') {
            return $(element).find(this.data[classId + 'Class']);
        }

        return $();
    }
};

$(function() {
    window.curtain = new Curtain();
});

})(jQuery);
