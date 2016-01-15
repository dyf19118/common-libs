; (function($) {
	$.fn.tap = function(cb) {
		this.each(function() {
			// adapt pc or mobile
			var $this = $(this),
				bHandheld = /mobile|windows phone|ios|android/i.test(navigator.userAgent);
			if (!bHandheld) {
				$this.on("click", function(event) {
					cb.call(this, event, this);
				});
			} else {
				var	startX, endX,
					startY, endY;
				$this.on("touchstart", function(event) {
					var touch = event.originalEvent.touches[0];
					startX = touch.pageX;
					startY = touch.pageY;
				});
				$this.on("touchend", function(event) {
					event = event.originalEvent;
					// 判断该动作是否由用户点击触发
					if (typeof cb !== "function") {
						return;
					}
					if (event) {
						var touch = event.changedTouches[0];
						endX = touch.pageX;
						endY = touch.pageY;
						if ((Math.abs(endX - startX) < 6) && (Math.abs(endY - startY) < 6) ) {
							// 第三个参数兼容旧版本
							cb.call(this, event, this);
						}
					} else {
						cb.call(this, event, this);
					}
				})
			}
		});
		return this;
	};
})(jQuery);