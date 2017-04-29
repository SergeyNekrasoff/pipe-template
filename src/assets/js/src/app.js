/*!
 * App
 * [Date here]
 * Sborka Project
 */

// Note: Use 'search & replace' to rename 'App' to current project name an delete this note
var App = new (function App() {

    this.dom = {
        $window: $(window),
        $document: $(document)
    };

    this.env = {
        mobileMode: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };

    this.modules = {};
    this.utils = {};

    // Base inits here:
    CSSPlugin.defaultTransformPerspective = 300;

    // DOM-Ready inits:
    var self = this;
    $(function() {
        self.dom.$body = $('body');
        self.dom.$html = $('html');

        // Modules init here
        self.modules.SVGSprites.init();
    });
})();

App.modules.SVGSprites = {
    init: function() {
        var self = this;
        $.get('media/svg/sprite.svg', function(data) {
            $('<div style="width:0; height:0; overflow:hidden"></div>').prependTo(App.dom.$body).html(self.serializeXml(data.documentElement));
        });
    },
    serializeXml: function(xmldom) {
        if (typeof XMLSerializer != 'undefined') {
            return (new XMLSerializer()).serializeToString(xmldom);
        } else {
            return $(xmldom).html();
        }
    }
};
