; (function($) {
	$.fn.extend({
		alert : function(text, bError, complete) {
			var $this = $(this);
			$this.find(".alert-window-info").text(text);
			bError && $this.addClass("failed");
			$this.ajustToCenter().fadeIn(250);
			setTimeout(function() {
				$this.fadeOut(250, function() {
					complete && complete();
					$this.removeClass("failed");
				});
			}, 2000);
		},
		ajustToCenter : function() {
			var $this = $(this);
			return $this.css({
				"top" : function() {
					return $("body").scrollTop() + $(window).height() / 2 - $this.height() / 2;
				},
				"margin" : "0 auto"
			});
		},
		open : function(title, desc, callback) {
			var $this = $(this);
			title && $this.find(".alert-title").text(title);
			desc && $this.find(".alert-desc").text(desc);
			$this.show();
			callback && typeof callback === "function" && callback();
			return $this;
		},
		close: function() {
			return $(this).hide();
		},
		bindTouchHandler : function(selector, handler, cb) {
			var obj = {};
			this.each(function() {
				var $this = $(this),
					type = obj.toString.call(selector).match(/\[object (\w+)\]/)[1].toLowerCase(),
					bHandheld = /mobile|windows phone|ios|android/i.test(navigator.userAgent),
					clickEvent = bHandheld ? "touchend" : "click";
				if (type === "object") {
					for (var s in selector) {
						var hd = selector[s];
						$this.find(s).on(clickEvent, {$elem: $this}, hd);
					}
				} else if (type === "string") {
					$this.find(selector).on(clickEvent, {$elem: $this}, handler);
				}
			});
			return this;
		}
	});
})(jQuery);