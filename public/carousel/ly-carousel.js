;
(function($){
	// function Carousel({width,height,aImg,duration,speed,type,isAutoPlay}){
	function Carousel(options){
		this.width = options.width;  // 轮播图宽度
		this.height = options.height;  // 轮播图高度
		this.aImg = options.aImg;  // 存放轮播图片的数组 [{src:img1,href:url1},{src:img2,href:url2}]
		this.len = options.aImg.length;  // 轮播图片数量
		this.duration = options.duration || 1000;  // 轮播图切换频率  默认1000ms
		this.animateSpeed = options.speed || 500;  // 轮播动画的速度 默认500ms
		this.type = options.type || "fade";  // 轮播图类型（滑动、淡入淡出） 默认为淡入淡出
		this.isAutoPlay =  options.isAutoPlay;  // 是否自动轮播
		this.timer = null;  // 轮播定时器
		this.currIndex = null;  // 当前轮播图片索引
		this.nextIndex = null;  // 下一张轮播图片索引
		this.lis = null;  // 所有的轮播图片盒子
		this.ul = null;  // 轮播图盒子的父元素
		this.circles = null;  // 所有的轮播标识小圆点
		this.circleNextIndex = null;  // 下一格小圆点索引
		this.carousel = null;  // 轮播图容器 ul的父元素
		this.left = null;  // 向左翻页
		this.right = null;  // 向右翻页
	}
	Carousel.prototype = {
		constructor : Carousel,
		init : function(container){
			var liHtml = "",
				iHtml = "",
				_html = "";
			for(var i = 0; i < this.len; i++){
				this.aImg[i].href = this.aImg[i].href || "#";
				liHtml += '<li>' +
						'<a href="' + this.aImg[i].href + '">' +
							'<img class="swiperStyle" src="' + this.aImg[i].src + '" alt="加载失败" />' +
						'</a>' +
					'</li>';
				iHtml += '<i></i>';
			}
			// _html = `
			// 	<div class="carousel">
			// 		<ul class="imgs">
			// 			${liHtml}
			// 		</ul>
			// 		<div class="pages">${iHtml}</div>
			// 		<div class="toLeft">&lt;</div>
			// 		<div class="toRight">&gt;</div>
			// 	</div>
			// `;
			_html = '<div class="carousel">' +
					'<ul class="imgs">' + liHtml + '</ul>' +
					'<div class="pages">' + iHtml + '</div>' +
					'<div class="toLeft">&lt;</div>' +
					'<div class="toRight">&gt;</div>' +
				'</div>';
			$(container).html(_html);
			// 动态更改盒子高度
			// this.height *= this.width / 1920;
			$('.swiperStyle').width(this.width);
			$('.swiperStyle').height(this.height);
			this.carousel = $(".carousel",container).css({
				width : this.width,
				height : this.height,
				overflow : (this.type === "fade" ? "visible" : "hidden"),
				position : "relative"
			});
			this.ul = $(".imgs",container).css({
				width : (this.type === "fade" ? this.width : this.width * this.len),
				height : this.height,
				position : (this.type === "fade" ? "static" : "absolute")
			});
			this.lis = $(".imgs li",container).css({
				width : this.width,
				height : this.height
			});
			var length = this.len;
			if(this.type === "fade"){
				this.lis.css({
					position : "absolute",
					left : 0,
					top : 0,
					display : "none"
				}).first().show();
				this.currIndex = 0;
				this.nextIndex = 1;
			} else {
				this.lis.css("float","left");
				this.ul.append(this.lis.first().clone())
					   .prepend(this.lis.last().clone());
				this.len += 2;
				this.ul.css({
					width : this.width * this.len,
					left : -1 * this.width
				});
				this.currIndex = 1;
				this.nextIndex = 2;
			}
			this.circles = $(".pages",container).children("i");
			var marginleft = parseInt(this.circles.css("margin-left")),
				circlewidth = parseInt(this.circles.css("width")),
				paddingvalue = (this.width - (marginleft * 2 + circlewidth) * length) / 2;
				// console.log(marginleft,circlewidth,paddingvalue,this.width,length)
			$(".pages",container).css({
				width : this.width,
				paddingLeft : paddingvalue
			});
			this.circles.first().addClass("current");
			this.left = $(".toLeft",container);
			this.right = $(".toRight",container);
			if(this.isAutoPlay)
				this.autoPlay();
			this.registerEventListener();
		},
		autoPlay : function(){
			var _this = this;
			this.timer = setInterval(function () {
				_this.move();
			},this.duration);
		},
		move : function(){
			if(this.type === "fade")
				this.fade();
			else
				this.slide();
		},
		fade : function(){
			// 当前图片淡出
			this.lis.eq(this.currIndex).stop().fadeOut(this.speed);
			// 下一张图片淡入
			this.lis.eq(this.nextIndex).stop().fadeIn(this.speed);
			// 当前图片对应小圆点重置
			this.circles.eq(this.currIndex).removeClass("current");
			this.circles.eq(this.nextIndex).addClass("current");
			// 更新待操作图片索引
			this.currIndex = this.nextIndex;
			this.nextIndex++;
			// 如果轮播到最后一张图片，则重置下一张图片的索引为0，即下一张显示第一张图片
			if(this.nextIndex >= this.len )
				this.nextIndex = 0;
		},
		slide : function(){
			// 计算轮播定位终值
			var _left = -1 * this.width * this.nextIndex;
			var _this = this;
			this.ul.stop().animate({
				left : _left
			},this.speed,function () {
				if(_this.nextIndex === _this.len){
					_this.ul.css("left",-1 * _this.width);
					_this.currIndex = 1;
					_this.nextIndex = 2;
				}
				if(_this.currIndex === 0){
					_this.ul.css("left",-1 * _this.width * (_this.len - 2));
					_this.currIndex = _this.len - 2;
					_this.nextIndex = _this.len - 1;
				}
			});
			// 当前图片对应小圆点重置
			// 计算小圆点的索引
			this.circleNextIndex = this.nextIndex - 1;
			if(this.circleNextIndex === this.len - 2)
				this.circleNextIndex = 0;
			if(this.circleNextIndex === -1)
				this.circleNextIndex = this.len - 3;
			this.circles.removeClass("current");
			this.circles.eq(this.circleNextIndex).addClass("current");
			// 更新待操作图片索引
			this.currIndex = this.nextIndex;
			this.nextIndex ++;
		},
		registerEventListener : function(){
			// var that = this;
			// this.circles.mouseenter(function(){
			// 	var index = $(this).index();
			// 	if(that.type === "fade"){
			// 		if(that.currIndex === index)
			// 			return;
			// 		else
			// 			that.nextIndex = index;
			// 	}
			// 	else{
			// 		if(that.currIndex === (index + 1))
			// 			return;
			// 		else
			// 			that.nextIndex = index + 1;
			// 	}
			// 	that.move();
			// });
			var _this = this;
			this.carousel.hover(function () {
				clearInterval(_this.timer);
			},function () {
				_this.autoPlay();
			});
			this.left.click(function () {
				if(_this.type === "fade"){
					_this.nextIndex = _this.currIndex - 1;
					if(_this.nextIndex === -1)
						_this.nextIndex = _this.len - 1;
				} else
					_this.nextIndex = _this.currIndex - 1;
				_this.move();
			});
			this.right.click(function () {
				_this.move();
			});
		}
	};
	$.fn.extend({
		carousel : function(options){
			this.each(function(index,currEle){
				new Carousel(options).init($(currEle));
			});
		}
	});
})(jQuery);
