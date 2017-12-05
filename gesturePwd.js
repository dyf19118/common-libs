// add some comments
function GesturePwd(config) {
	this.config = {
		size: 3,
		circleColor: "#FFFFFF",
		defaultColor: "#4C94F3",
		activeColor: "#4C94F3",
		successColor: "#00BD55",
		errorColor: "#FA4B68",
		lineWidth: 2,
		minPointsRequired: 4,
		delay: 500
	};
	if (config && typeof config === "object") {
		for (var p in config) {
			this.config[p] = config[p];
		}
	}
	this.initCanvas();
};
GesturePwd.prototype.initCanvas = function() {
	var canvas = document.createElement("canvas");
	if (!canvas.getContext) {
		throw new Error("canvas is not supported in your browser!");
	} else {
		// canvas大小设置，事件绑定
		canvas.id = "canvas";
		canvas.width = canvas.height = Math.min(window.screen.width, 480);
		// 事件绑定
		var _this = this;
		canvas.addEventListener("touchstart", function(event) {
			event.preventDefault();
			var touch = event.touches[0];
				startPoint = _this.inCircle({
					x: (touch.pageX - _this.canvas.offsetLeft) / _this.r,
					y: (touch.pageY - _this.canvas.offsetTop) / _this.r
				});
			if (startPoint && !_this.bOnValidate) {
				_this.bOnDrag = true;
				_this.drawCenter(startPoint);
			}
		});
		canvas.addEventListener("touchmove", function(event) {
			event.preventDefault();
			if (_this.bOnDrag) {
				var touch = event.changedTouches[0];
				_this.update({
					x: (touch.pageX - _this.canvas.offsetLeft) / _this.r,
					y: (touch.pageY - _this.canvas.offsetTop) / _this.r
				});
			}
		});
		canvas.addEventListener("touchend", function(event) {
			event.preventDefault();
			if (_this.bOnDrag) {
				_this.update();
				_this.validate();
				_this.bOnDrag = false;
			}
		});
		this.canvas = canvas;
		// 参数绑定
		this.TYPE = {
			SETTING_VALIDATION: 1,
			VALIDATION: 2
		};
		this.type = this.TYPE.SETTING_VALIDATION;
		this.ctx = canvas.getContext("2d");
		this.points = [];
		this.paths = [];
		this.r = canvas.width / (4 * this.config.size);
		this.bOnDrag = false;
		this.bOnValidate = false;
		this.init();
	}
};
GesturePwd.prototype.setType = function(type) {
	this.type = type;
};
GesturePwd.prototype.getType = function() {
	return this.type;
};
GesturePwd.prototype.getPwd = function() {
	var pwd = "";
	for (var i in this.paths) {
		pwd += this.paths[i].index;
	}
	return pwd;
};
GesturePwd.prototype.drawCircle = function(point) {
	this.ctx.beginPath();
	this.ctx.arc(point.x * this.r, point.y * this.r, this.r, 0, 2 * Math.PI);
	this.ctx.fill();
};
GesturePwd.prototype.drawCenter = function(point) {
	this.ctx.beginPath();
	this.ctx.arc(point.x * this.r, point.y * this.r, this.r / 3, 0, 2 * Math.PI);
	this.ctx.fill();
};
GesturePwd.prototype.drawArrow = function(sPoint, ePoint) {
	var d = Math.sqrt((sPoint.x - ePoint.x) * (sPoint.x - ePoint.x) + (sPoint.y - ePoint.y) * (sPoint.y - ePoint.y)),
		ratio = (2 / 3) / d,
		startX = (sPoint.x + ratio * (ePoint.x - sPoint.x)) * this.r,
		startY = (sPoint.y + ratio * (ePoint.y - sPoint.y)) * this.r;
	var cosA = (ePoint.y - sPoint.y) / d,
		sinA = (ePoint.x - sPoint.x) / d,
		cos45 = Math.cos(Math.PI / 4),
		sin45 = Math.sin(Math.PI / 4),
		offsetX = 8 * (cosA * cos45 + sinA * sin45),
		offsetY = 8 * (sinA * cos45 - cosA * sin45);
	this.ctx.beginPath();
	this.ctx.moveTo(startX, startY);
	this.ctx.lineTo(startX - offsetY, startY - offsetX);
	this.ctx.moveTo(startX, startY);
	this.ctx.lineTo(startX - offsetX, startY + offsetY);
	this.ctx.stroke();
};
GesturePwd.prototype.drawLine = function(sPoint, ePoint) {
	this.ctx.beginPath();
	this.ctx.moveTo(sPoint.x * this.r, sPoint.y * this.r);
	this.ctx.lineTo(ePoint.x * this.r, ePoint.y * this.r);
	this.ctx.stroke();
};
GesturePwd.prototype.inCircle = function(point) {
	for ( i = 0 ; i < this.points.length ; i++ ) {
		var center = this.points[i];
		if ((center.x - point.x) * (center.x - point.x) + (center.y - point.y) * (center.y - point.y) < 1) {
			// 返回当前路径圆，并加入路径中
			this.points.splice(i, 1);
			this.paths.push(center);
			return center;
		}
	}
	return false;
};
// 统一绘制
GesturePwd.prototype.makeCircles = function(init) {
	this.ctx.fillStyle = this.config.circleColor;
	for ( i = 0 ; i < this.config.size ; i++ ) {
		// 行
		for ( j = 0 ; j < this.config.size ; j++ ) {
			// 列
			var point = {
					x: 2 + j * 4,
					y: 2 + i * 4,
					index: i * this.config.size + j
				};
			this.drawCircle(point);
			init && this.points.push(point);
		}
	}
};
GesturePwd.prototype.makeCenters = function() {
	this.ctx.fillStyle = this.config.activeColor;
	for ( var i = 0 ; i < this.paths.length; i++ ) {
		// 划圆
		this.drawCenter(this.paths[i]);
	}
};
GesturePwd.prototype.makeArrows = function() {
	this.ctx.strokeStyle = this.config.activeColor;
	this.ctx.lineWidth = this.config.lineWidth;
	for ( var i = 1 ; i < this.paths.length; i++ ) {
		// 划箭头
		this.drawArrow(this.paths[i - 1], this.paths[i]);
	}
};
GesturePwd.prototype.makeLines = function() {
	this.ctx.strokeStyle = this.config.activeColor;
	this.ctx.lineWidth = this.config.lineWidth;
	for ( var i = 1 ; i < this.paths.length; i++ ) {
		// 划线
		this.drawLine(this.paths[i - 1], this.paths[i]);
	}
}
GesturePwd.prototype.init = function() {
	this.makeCircles(true);
};
GesturePwd.prototype.update = function(currPoint) {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	if (currPoint) {
		if (!(nextPoint = this.inCircle(currPoint))) {
			this.drawLine(this.paths[this.paths.length - 1], currPoint);
		}
	}
	this.makeLines();
	this.makeCircles();
	this.makeArrows();
	this.makeCenters();
};
GesturePwd.prototype.reset = function() {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.points = [];
	this.paths = [];
	this.config.activeColor = this.config.defaultColor;
	this.init();
};
GesturePwd.prototype.validate = function() {
	this.bOnValidate = true;
	switch(this.type) {
		case this.TYPE.VALIDATION:
			if (this.onComplete && typeof this.onComplete === "function") {
				this.onComplete.call(this);
			}
			break;
		case this.TYPE.SETTING_VALIDATION:
			if (this.pwd) {
				if (this.pwd === this.getPwd()) {
					if (this.onComplete && typeof this.onComplete === "function") {
						this.onComplete.call(this);
					}
				} else {
					// 两次输入密码不一致
					this.config.activeColor = this.config.errorColor;
					if (this.onError && typeof this.onError === "function") {
						this.onError.call(this, "两次输入密码不一致");
					}
				}
			} else {
				if (this.paths.length < this.config.minPointsRequired) {
					this.config.activeColor = this.config.errorColor;
					if (this.onError && typeof this.onError === "function") {
						this.onError.call(this, "至少连接" + this.config.minPointsRequired + "个点");
					}
				} else {
					this.pwd = this.getPwd();
				}
			}
			break;
	}
	this.update();
	var _this = this;
	setTimeout(function() {
		_this.reset();
		_this.bOnValidate = false;
	}, this.config.delay);
};
module.exports = GesturePwd;
