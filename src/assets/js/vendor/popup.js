;(function ($) {
    'use strict';

    window.Popup = {
        /**
         * Show popup by data-rel
         * @param {string} popupRelation
         */
        setShown: function (popupRelation) {
            const currentTarget = $('.js-popup-target').filter('[data-rel=' + popupRelation + ']');

            hideAllPopups();
            currentTarget.fadeIn(200);
        }
    };

    /**
     * Hide all popups
     */
    function hideAllPopups() {
        $('.js-popup-target').fadeOut(200);
    }

    /**
     * Set login layer active
     */
    function showLoginLayer() {
        $('.js-popup-box').addClass('display-none');
        $('.js-popup-box').removeClass('display-none');
    }

    /**
     * Show popup
     * @param {Object} e
     */
    function showPopup(e) {
        e.preventDefault();

        $('body').addClass('scroll-disable');

        const currentTrigger = $(e.currentTarget),
            relation = currentTrigger.data('rel'),
            currentTarget = $('.js-popup-target').filter(`[data-rel=${relation}]`);

        if (currentTarget) {
            hideAllPopups();
            currentTarget.fadeIn(200);
        }
    }

    /**
     * Hide current popup
     * @param {Object} e
     */
    function hidePopup(e) {
        e.preventDefault();

        $('body').removeClass('scroll-disable');

        const currentButton = $(e.currentTarget),
            currentLayer = currentButton.closest('.js-popup-target');

        currentLayer.fadeOut(200);
    }

    $(document)
        .on('click.popup', '.js-popup-trigger', showPopup)
        .on('click.popup', '.js-popup-close', hidePopup);

})(jQuery);
