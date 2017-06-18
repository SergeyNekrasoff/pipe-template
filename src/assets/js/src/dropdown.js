;(function($) {
    /**
     * Plugin to tab element
     */

    var cssTrigger = '.ojs-tab-trigger',
        cssTarget = '.ojs-tab-target';

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

        console.error('You did not set attribute "data-rel" to your "Tab" element');
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
     * It is preffered use "data-namespace" attribute to set namespaces for tab groups.
     * Namespaces must be unique for each tab group
     */
    function onTabTriggerClick(e) {
        var relation = getRelation(e),
            namespace = $(e.currentTarget).data('tabnamespace') || false,
            namespaceFilter = namespace ? '[data-tabnamespace = '+namespace+']' : ':not([data-tabnamespace])',
            $target = getTarget(e).filter(namespaceFilter),
            $trigger = $(cssTrigger).filter('[data-rel = '+relation+']').filter(namespaceFilter),
            $allTriggers = $(cssTrigger).filter(namespaceFilter),
            $allTargets = $(cssTarget).filter(namespaceFilter);

        if ($trigger.is('[data-toggle]') && $trigger.is('.flag-active')) {
            $allTriggers.removeClass('flag-active');
            $allTargets.removeClass('flag-active');
        } else {
            $allTriggers.removeClass('flag-active');
            $allTargets.removeClass('flag-active');

            $trigger.addClass('flag-active');
            $target.addClass('flag-active');
        }

        Gevent.publish('tab:activated', {namespace: namespace, target: relation});

        return false;
    }

    $(document).on('click', cssTrigger, onTabTriggerClick);

})(jQuery);
