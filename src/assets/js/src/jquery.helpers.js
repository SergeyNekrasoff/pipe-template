// JQ helpers
(function( $ ) {
	var $body = $('body');
	$(function(){
		$body = $('body');
	})
	$.fn.outerClick = function( handler ){
		var self = this;
		$body.mousedown(function( e ){
			var $target = $(e.target);
			if($target.is(self)){
				return;
			}
			if(self.has($target).length){
				return;
			}
			handler(e);
		})
	return this;
	}
}( jQuery ));