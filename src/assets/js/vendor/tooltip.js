;(function($){
    $.fn.tooltip = function(options) {
        var $this = this,
            parent = options.parent;

        $this.hide();
        jQuery(parent).hover(
            function() {
                $this.show();
            },
            function() {
                $this.hide();
            }
        );
    };
})(jQuery);
