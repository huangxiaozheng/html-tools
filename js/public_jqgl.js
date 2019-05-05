$(".btn").on("touchstart",function(){
    $(this).css({"opacity":0.5});
    $(this).on("touchend",function(){
        $(this).css({"opacity":1});
    })
});

$(function(){
	
	eventDis();
	eventDisimgs();
    var display = $(".display");
    $.each(display,function(index,value){
        var offsetTop = $(value).offset().top;
        var $index = index+1;
        if($index<display.length){
            var NextTop = display.eq(index+1).offset().top;
            var Height = NextTop - offsetTop;
            var Hei = $(value).outerHeight()/2;
            $(value).next("em").css({"height":Height -Hei})
        }
    });
    $(".bj-move").find("b").animate({"height":"70%"},1000);
});
function eventDis(){
	 var display = $(".end-img-width");
	    $.each(display,function(index,value){
	        var height = $(value).outerWidth()-8;
	        $(value).height(height);
	    });
}

function eventDisimgs(){
	
	 /*var display = $(".img-width");
	 var height = display.eq(0).outerWidth();
	    $.each(display,function(index,value){
	        $(value).height(height);
	    });*/
}
var winHei = $(window).height();
function selectType(obj){
    var Text = $(obj).data('text');
    $("textarea").attr("placeholder","请输入"+Text+"理由");
    $(".content-one").hide();
    $(".content-tow").fadeIn(300);
    var box =  $(".content-tow");
    var hei = box.height();
    var top = (winHei /2) - (hei/2);
    box.css("top",top);
}
function closeSelect(){
    $(".none").fadeOut(300);
}

function ImgBoxShow(){
    $(".imgBox").fadeIn(300);
}
function ImgBoxHide(){
    $(".imgBox").fadeOut(300);
}
function imgBox(obj){
    ImgBoxShow();
    $("#hit").attr("src",$(obj).attr("src"));
    var reqAnimationFrame = (function () {
        return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    var el = document.querySelector("#hit");

    var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);
    var START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);
    var ticking = false;
    var transform;
    var timer;

    var mc = new Hammer.Manager(el);

    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

    mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    mc.add(new Hammer.Tap());

    mc.on("panstart panmove", onPan);
    mc.on("rotatestart rotatemove", onRotate);
    mc.on("pinchstart pinchmove", onPinch);
    mc.on("swipe", onSwipe);
    $("#hit").on("click", onTap);
    mc.on("doubletap", onDoubleTap);

    mc.on("hammer.input", function(ev) {
        if(ev.isFinal) {
            resetElement();
        }
    });

    var scale = 1,rx= 0,ry = 0;
    function resetElement() {
        el.className = 'animate';
        transform = {
            translate: { x: START_X, y: START_Y },
            scale: scale,
            angle: 0,
            rx: rx,
            ry: ry,
            rz: 0
        };

        requestElementUpdate();
    }

    function updateElementTransform() {
        scale = transform.scale;
        if(scale>2){
            scale = 2;
        }else if(scale < 0.8){
            scale = 0.8;
        }
        var value = [
            'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
            'scale(' + scale + ', ' + scale + ')',
            'rotate3d('+ 0 +','+ 0 +','+ 0 +','+  0 + 'deg)'
        ];

        rx = transform.translate.x;
        ry = transform.translate.y;
        value = value.join(" ");
        el.style.webkitTransform = value;
        el.style.mozTransform = value;
        el.style.transform = value;
        ticking = false;
    }

    function requestElementUpdate() {
        if(!ticking) {
            reqAnimationFrame(updateElementTransform);
            ticking = true;
        }
    }
    function onPan(ev) {
        el.className = '';
        transform.translate = {
            x: START_X + ev.deltaX,
            y: START_Y + ev.deltaY
        };
        requestElementUpdate();
    }

    var initScale = 1;
    function onPinch(ev) {
        if(ev.type == 'pinchstart') {
            initScale = transform.scale || 1;
        }

        el.className = '';
        transform.scale = initScale * ev.scale;

        requestElementUpdate();
    }

    var initAngle = 0;
    function onRotate(ev) {
        if(ev.type == 'rotatestart') {
            initAngle = transform.angle || 0;
        }

        el.className = '';
        transform.rz = 1;
        transform.angle = initAngle + ev.rotation;
        requestElementUpdate();
    }

    function onSwipe(ev) {
        var angle = 50;
        transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
        transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
        transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 300);
        requestElementUpdate();

    }

    function onTap(ev) {
        transform.rx = 1;
        transform.angle = 25;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 200);
        requestElementUpdate();
        ImgBoxHide();

    }

    function onDoubleTap(ev) {
        transform.rx = 1;
        transform.angle = 80;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 500);
        requestElementUpdate();
    }

    resetElement();
}