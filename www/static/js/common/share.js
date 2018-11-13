var ua = navigator.userAgent.toLowerCase();
document.oncontextmenu = function (e) {
    e.preventDefault();
};

mqq.ui.setTitleButtons({
    right: {
        title: " ",
		callback: function () {return;}
    }
});
function isVip(){
	if(adurl==""){
		return true;
	}else{
		return false;
	} 
}

function ck() {
    if(!isVip()){
        setTimeout(function () {
            mqq.ui.setTitleButtons({
                right: {
                    title: "鍏嶈垂鍒朵綔",
                    callback: function () {
                        window.location.href = adurl;
                    }
                }
            });
        }, 1000);
    }
}
function show() {
   
    if(!isVip()){
        setTimeout(function () {
            mqq.ui.setTitleButtons({
                right: {
                    title: "鍏嶈垂鍒朵綔",
                    callback: function () {
                        window.location.href = adurl;
                    }
                }
            });
        }, 1000);
    }
}
function autoJump(qrcode) {

    var openSchemeLink = document.getElementById("openSchemeLink");
    var a = "alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=";
    var jumpUrl = "";
    var isAlipay = true;
    if (qrcode.indexOf('alipay') !== -1||qrcode.indexOf('taobao') !== -1||qrcode.indexOf('tb') !== -1||qrcode.indexOf('ALIPAY') !== -1) {
        jumpUrl = a + qrcode;
    } else {
        isAlipay = false;
        jumpUrl = qrcode;
    }
    //openSchemeLink.href = jumpUrl;
    if (isMobileQQ()) {
        if (isIos()) {
            openSchemeLink.dispatchEvent(customClickEvent());
        } else {
            mqq.invoke("ui", "openUrl", {
                url: jumpUrl,
                target: 2,
                style: 0
            });
        }
    } else {
        location.href = qrcode;
    }
}
function isWeixin() {
    if (/micromessenger/.test(ua)) {
        return true;
    } else {
        return false;
    }
}
function isMobileQQ() {
    if (/mobile/.test(ua) && /qq/.test(ua)) {
        return true;
    } else {
        return false;
    }
}

function isIos() {
    if (/iphone|ipad|ipod/.test(ua)) {
        return true;
    } else {
        return false;
    }
}


function customClickEvent() {
    var clickEvt;
    if (window.CustomEvent) {
        clickEvt = new window.CustomEvent('click', {
            canBubble: true,
            cancelable: true
        });
    } else {
        clickEvt = document.createEvent('Event');
        clickEvt.initEvent('click', true, true);
    }

    return clickEvt;
}