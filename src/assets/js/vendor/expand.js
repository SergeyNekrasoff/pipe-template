window.$ = window.jQuery = require('jquery');
import $ from 'jQuery'

;(function($) {
    /**
     * Plugin to expand element
     */

    var cssTrigger = '.js-expand-trigger',
        cssTarget = '.js-expand-target',
        cssHide = '.js-expand-hide';

    /**
     * Get target
     *
     * @param e
     * @returns {*|jQuery}
     */
    function getTarget(e) {
        var relation = getRelation(e);

        if (relation) {
            return $(cssTarget).filter('[data-rel="' + relation + '"]');
        }

        console.error('You did not set attribute "data-rel" to your "expand" element');
        return false;
    }

    /**
     * Get Relation
     *
     * @param e
     * @returns {boolean}
     */
    function getRelation(e) {
        return $(e.currentTarget).data('rel') || false;
    }

    /**
     * It is preffered use "data-namespace" attribute to set namespaces for expand groups.
     * Namespaces must be unique for each expand group
     */
    function onExpandTriggerClick(e) {
        var relation = getRelation(e),
            namespace = $(e.currentTarget).data('expandnamespace') || false,
            namespaceFilter = namespace ? '[data-expandnamespace = '+ namespace +']' : ':not([data-expandnamespace])',
            $target = getTarget(e).filter(namespaceFilter),
            $trigger = $(cssTrigger).filter('[data-rel = '+relation+']').filter(namespaceFilter),
            $allTriggers = $(cssTrigger).filter(namespaceFilter),
            $allTargets = $(cssTarget).filter(namespaceFilter),
            $expandHide = $trigger.find('.js-expand-hide');



        if ($trigger.is('.flag-active')) {
            $trigger.removeClass('flag-active');
            $target.removeClass('flag-active');

            $expandHide.show();
        } else {
          $allTriggers.removeClass('flag-active');
          $allTargets.removeClass('flag-active');

          $expandHide.hide();
          $trigger.addClass('flag-active');
          $target.addClass('flag-active');
        }

        return false;
    }

    /**
     * Close all opened expand elements
     */
    function closeAllExpands() {
      $(cssTrigger).removeClass('flag-active');
      $(cssTarget).removeClass('flag-active');
      $(cssHide).show();
    }

    $(document)
      .on('click', cssTrigger, onExpandTriggerClick)
      .on('click', '.js-popup-close', closeAllExpands);

})(jQuery);
