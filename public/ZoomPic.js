function ZoomPic () {
	this.initialize.apply(this, arguments);
}

ZoomPic.prototype = {
	initialize : function (id) {
		var _this = this;
		this.wrapDOM = typeof id === "string" ? document.getElementById(id) : id;
		this.oUl = this.wrapDOM.getElementsByTagName("ul")[0];
		this.aLis = this.wrapDOM.getElementsByTagName("li");
		this.prev = this.wrapDOM.getElementsByTagName("span")[0];
		this.next = this.wrapDOM.getElementsByTagName("span")[1];
		this.timer = 1000;
		this.aSort = [];
		this.iCenter = 2;
		this._doPrev = function () {
			return _this.doPrev.apply(_this);
		};
		this._doNext = function () {
			return _this.doNext.apply(_this);
		};
		this.options = [
			// 轮播图片大小
			{width:416, height:520, top:40, left:0, zIndex:1},
			{width:448, height:560, top:20, left:180, zIndex:2},
			{width:480, height:600, top:0, left:360, zIndex:3},
			{width:448, height:560, top:20, left:572, zIndex:2},
			{width:416, height:520, top:40, left:784, zIndex:1},
		];
		for (var i = 0; i < this.aLis.length; i++) {
			this.aSort[i] = this.aLis[i];
		}
		this.aSort.unshift(this.aSort.pop()); // 把最后一个li 放到开头
		this.setUp();
		this.addEvent(this.prev, "click", this._doPrev);
		this.addEvent(this.next, "click", this._doNext);
		this.doImgClick();
		// 轮播频率
		this.timer = setInterval(function () {
			_this.doNext();
		}, 2000);
		this.wrapDOM.onmouseenter = function () {
			// console.log(_this)
			clearInterval(_this.timer);
		};
		this.wrapDOM.onmouseleave = function () {
			// console.log(2)
			_this.timer = setInterval(function () {
				_this.doNext();
			}, 3000);	
		};
	},
	doPrev : function () {
		this.aSort.unshift(this.aSort.pop());
		this.setUp();
	},
	doNext : function () {
		this.aSort.push(this.aSort.shift());
		this.setUp();
	},
	doImgClick : function () {
		var _this = this;
		for (var i = 0; i < this.aSort.length; i++) {
			this.aSort[i].onclick = function() {
				if (this.index > _this.iCenter) {
					for (var i = 0; i < (this.index - _this.iCenter); i++) {
						_this.aSort.push(_this.aSort.shift());
					}
					_this.setUp();
				} else if(this.index < _this.iCenter) {
					for (var i = 0; i < (_this.iCenter - this.index); i++) {
						_this.aSort.unshift(_this.aSort.pop());
					}
					_this.setUp();
				}
			};
		}
	},
	setUp : function () {
		var _this = this;
		// var i = 0;
		for (var j = 0; j < this.aSort.length; j++) {
			this.oUl.appendChild(this.aSort[j]);
		}
		for (var i = 0; i < this.aSort.length; i++) {
			this.aSort[i].index = i;
			if(i < 5) {
				this.css(this.aSort[i], "display", "block");
				this.doMove(this.aSort[i], this.options[i], function() {
					_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {opacity:100}, function() {
						_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {opacity:100}, function() {
							_this.aSort[_this.iCenter].onmouseover = function() {
								_this.doMove(this.getElementsByTagName("div")[0], {bottom:0});
							};
							_this.aSort[_this.iCenter].onmouseout = function() {
								_this.doMove(this.getElementsByTagName("div")[0], {bottom:-100});
							};
						});
					});
				});
			} else {
				this.css(this.aSort[i], "display", "none");
				this.css(this.aSort[i], "width", 0);
				this.css(this.aSort[i], "height", 0);
				this.css(this.aSort[i], "top", 37);
				this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2);
			}
			if(i < this.iCenter || i > this.iCenter) {
				this.css(this.aSort[i].getElementsByTagName("img")[0], "opacity", 100);
				this.aSort[i].onmouseover = function() {
					_this.doMove(this.getElementsByTagName("img")[0], {opacity:100});	
				};
				this.aSort[i].onmouseout = function() {
					_this.doMove(this.getElementsByTagName("img")[0], {opacity:100});
				};
				this.aSort[i].onmouseout();
			} else {
				this.aSort[i].onmouseover = this.aSort[i].onmouseout = null;
			}
		}		
	},
	addEvent : function(oElement, sEventType, fnHandler) {
		return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler);
	},
	css : function(oElement, attr, value) {
		if(arguments.length == 2) {
			return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr];
		} else if(arguments.length == 3) {
			switch(attr) {
				case "width":
				case "height":
				case "top":
				case "left":
				case "bottom":
					oElement.style[attr] = value + "px";
					break;
				case "opacity" :
					oElement.style.filter = "alpha(opacity=" + value + ")";
					oElement.style.opacity = value / 100;
					break;
				default :
					oElement.style[attr] = value;
					break;
			}	
		}
	},
	doMove : function(oElement, oAttr, fnCallBack) {
		var _this = this;
		if(oElement) {
			clearInterval(oElement.timer);
		} else {
			return;
		}
		oElement.timer = setInterval(function() {
			var bStop = true;
			for(var property in oAttr) {
				var iCur = parseFloat(_this.css(oElement, property));
				property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
				var iSpeed = (oAttr[property] - iCur) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur != oAttr[property]) {
					bStop = false;
					_this.css(oElement, property, iCur + iSpeed);
				}
			}
			if(bStop) {
				clearInterval(oElement.timer);
				fnCallBack && fnCallBack.apply(_this, arguments);
			}
		}, 30);
	}
};
// window.onload = function () {
// 	new ZoomPic("focus_Box");
// };