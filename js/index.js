function id(id) {
    return document.getElementById(id);
}

function view() {
	if(window.innerWidth) {
		return {
			w : window.innerWidth,
			h : window.innerHeight
		}
	} else {
		return {
			w : document.documentElement.clientWidth || document.body.clientWidth,
			h : document.documentElement.clientHeight || document.body.clientHeight
		}
	}
}

function bind() {
	if (window.addEventListener) {
		return function (ele, type, fn) {
			ele.addEventListener(type, fn);
		}
	} else if (window.attachEvent) {
		return function (ele, type, fn) {
			ele.attachEvent("on" + type, function () {
				fn.call(ele, window.event);
			});
		}
	} else {
		return function (ele, type, fn) {
			ele["on" + type] = fn;
		}
	}
}

function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function init() {
    var oWelcome = id('welcome');
    var iStart = new Date().getTime();
    var bImgLoad = true;
    var bTime = false;
    var iTimer = null;
    var addEvent = bind();
    addEvent(oWelcome, 'webkitTransitionEnd', end);
    addEvent(oWelcome, 'transitionend', end);
    iTimer = setInterval(function () {
        if(new Date().getTime() - iStart >= 4000) {
            bTime = true;
        }
        if(bImgLoad && bTime) {
            clearInterval(iTimer);
            oWelcome.style.opacity = 0;
        }
    }, 1000);
    function end() {
        removeClass(oWelcome, 'pageShow');
    }
}
