function id(id) {
    return document.getElementById(id);
}

function view() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        return {
            w: document.documentElement.clientWidth || document.body.clientWidth,
            h: document.documentElement.clientHeight || document.body.clientHeight
        }
    }
}

function bind() {
    if (window.addEventListener) {
        return function(ele, type, fn) {
            ele.addEventListener(type, fn);
        }
    } else if (window.attachEvent) {
        return function(ele, type, fn) {
            ele.attachEvent("on" + type, function() {
                fn.call(ele, window.event);
            });
        }
    } else {
        return function(ele, type, fn) {
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

var addEvent = bind();

function init() {
    var oWelcome = id('welcome');
    var iStart = new Date().getTime();
    var bImgLoad = true;
    var bTime = false;
    var iTimer = null;
    addEvent(oWelcome, 'webkitTransitionEnd', end);
    addEvent(oWelcome, 'transitionend', end);
    iTimer = setInterval(function() {
        if (new Date().getTime() - iStart >= 4000) {
            bTime = true;
        }
        if (bImgLoad && bTime) {
            clearInterval(iTimer);
            oWelcome.style.opacity = 0;
        }
    }, 1000);

    function end() {
        removeClass(oWelcome, 'pageShow');
    }
}

function fnTab() {
    var oTabPic = id('tabPic');
    var oPicList = id('picList');
    var aNav = oTabPic.getElementsByTagName("a");
    var iNow = 0;
    var iX = 0;
    var iW = view().w;
    var oTimer = null;
    var iStartX = 0;
    var iStartTouchX = 0;
    addEvent(document, 'touchmove', function (ev) {
        ev.preventDefault();
    });
    addEvent(oPicList, 'touchstart', fnstart);
    addEvent(oPicList, 'touchmove', fnmove);
    addEvent(oPicList, 'touchend', fnend);
    function fnstart(ev) {
        clearInterval(oTimer);
        oPicList.style.webkitTransition = oPicList.style.transition = 'none';
        ev = ev.changedTouches[0];
        iStartTouchX = ev.pageX;
        iStartX = iX;
    }
    function fnmove(ev) {
        ev = ev.changedTouches[0];
        var disX = ev.pageX - iStartTouchX;
        iX = iStartX + disX;
        oPicList.style.webkitTransform = oPicList.style.transform = 'translateX(' + iX + 'px)';
    }
    function fnend() {
        iNow = iX / iW ;
        iNow = -Math.round(iNow);
        if(iNow < 0) {
            iNow = 0;
        }
        if(iNow > aNav.length - 1) {
            iNow = aNav.length - 1
        }
        tab();
        auto();
    }
    auto();
    fnScore();
    function auto() {
        oTimer = setInterval(function() {
            iNow++;
            iNow = iNow % aNav.length;
            tab();
        }, 2000);
    }

    function tab() {
        iX = -iNow * iW;
        oPicList.style.transition = '0.5s';
        oPicList.style.webkitTransform = oPicList.style.transform = "translateX(" + iX + "px)";
        for (var i = 0, len = aNav.length; i < len; i++) {
            removeClass(aNav[i], 'active');
        }
        addClass(aNav[iNow], 'active')
    }
}

function fnScore() {
    var oScore = id('score');
    var aLi = oScore.querySelectorAll("li");
    var aScore = ['太差了，再也不来了', '差强人意', '一般般', '很好，感觉很直', '体验太棒了']
    for(var i = 0, len = aLi.length; i < len; i ++) {
        fnStar(aLi[i]);
    }
    function fnStar(oLi) {
        var aNav = oLi.querySelectorAll('a');
        var oInput = oLi.querySelector('input');
        for(var i = 0, len = aNav.length; i < len; i ++) {
            aNav[i].dataset.index = i;
            addEvent(aNav[i], 'touchstart', function () {
                var index = this.dataset.index;
                for(var j = 0, len = aNav.length; j < len; j ++) {
                    if(aNav[j].dataset.index <= index) {
                        addClass(aNav[j], 'active');
                    } else {
                        removeClass(aNav[j], 'active');
                    }
                }
                oInput.value = aScore[index];
            });
        }
    }
}
