; (function($) {
	$.fn.tap = function(cb) {
		this.each(function() {
			var $this = $(this),
				startX, endX,
				startY, endY;
			$this.on("touchstart",function(event) {
				var touch = event.originalEvent.touches[0];
				startX = touch.pageX;
				startY = touch.pageY;
			});
			$this.on("touchend",function(event) {
				event = event.originalEvent;
				var touch = event.changedTouches[0];
				endX = touch.pageX;
				endY = touch.pageY;
				if ((Math.abs(endX - startX) < 6) && (Math.abs(endY - startY) < 6) ) {
					cb(event, this);
				}
			})
		});
		return this;
	};
})(jQuery);