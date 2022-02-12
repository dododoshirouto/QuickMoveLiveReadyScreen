// https://mymp.dodoneko.site/new/scripts/ref.js
if (typeof String.prototype.format == 'undefined') String.prototype.format = function (...val) {
    var output = this;
    for (let i = 0; i < val.length; i = (0 | i + 1)) {
        output = output.split('$' + (i + 1)).join(val[i]);
    }
    return output;
}
if (typeof queryAddEventListeners == 'undefined') function queryAddEventListeners(elemsarr, action, func) {
    let acs = action.trim().split(' ');
    for (let i = 0; i < elemsarr.length; i = (0 | i + 1)) {
        for (let ii = 0; ii < acs.length; ii = (0 | i + 1)) {
            elemsarr[i].addEventListener(acs[ii], func);
        }
    }
}
if (typeof Math.normalizedRandom == 'undefined') Math.normalizedRandom = function (normalize = 3) {
    let rnd = 0;
    for (let i = 0; i < Math.abs(normalize); i = (0 | i + 1)) {
        rnd += Math.random();
    }
    rnd /= Math.abs(normalize);
    return (normalize < 0 ? Math.ceil(rnd * 2) / 2 - rnd + Math.floor(rnd * 2) / 2 : rnd);
}




lite = true;



function setGlitchSizeEvent() {
    for (let i = 0; i < document.querySelectorAll('.glitch_base').length; i = (0 | i + 1)) { setGlitchSize(document.querySelectorAll('.glitch_base')[0]); }
    queryAddEventListeners(document.querySelectorAll('.glitch_base'), 'load', ev => { setGlitchSize(ev.target); });
}
function setGlitchSize(img) {
    let base = img.parentElement;
    base.style.height = base.getElementsByClassName('glitch_overlay')[0].style.height = Math.round(img.offsetHeight) + 'px';
    base.style.width = base.getElementsByClassName('glitch_overlay')[0].style.width = Math.round(img.offsetWidth) + 'px';
}

// $1 : 画像アドレス
// $2 : imgのclass
// $3 : imgのwidth
// $4 : imgのheight
// $5 : id
// glitch_html_text = '<div class="glitch_root $2" style="width:$3px;height:$4px;"><img class="glitch_base glitch_red" src="$1"><img class="glitch_base glitch_blue" src="$1"><img class="glitch_base" src="$1"><div class="glitch_overlay"  style="width:$3px;height:$4px;"><img class="glitch_sub glitch_red" src="$1"><img class="glitch_sub glitch_blue" src="$1"><img class="glitch_sub" src="$1"><div class="glitch_mask"></div></div></div>';
if (!lite) glitch_html_text = '<div class="glitch_root $2" style="width:$3px;height:$4px;" id="$5"><img class="glitch_base" src="$1"></img><img class="glitch_base glitch_red" src="$1"></img><img class="glitch_base glitch_blue" src="$1"></img><div class="glitch_overlay" style="width:$3px;height:$4px;"></img><img class="glitch_sub" src="$1"></img><img class="glitch_sub glitch_red" src="$1"></img><img class="glitch_sub glitch_blue" src="$1"></img><div class="glitch_mask"></div></div></div>';
else glitch_html_text = '<div class="glitch_root $2" style="width:$3px;height:$4px;" id="$5"><img class="glitch_base" src="$1"></img><div class="glitch_overlay" style="width:$3px;height:$4px;"></img><img class="glitch_sub" src="$1"></img><div class="glitch_mask"></div></div></div>';

function setGlitchHTML() {
    let glitch_elems = document.querySelectorAll('.glitch');
    for (let i = 0; i < glitch_elems.length; i = (0 | i + 1)) {
        let img_src = glitch_elems[i].src;
        let img_classes = glitch_elems[i].className;
        let width = glitch_elems[i].clientWidth;
        let height = glitch_elems[i].clientHeight;
        glitch_elems[i].outerHTML = glitch_html_text.split('img').join(glitch_elems[i].tagName).format(img_src, img_classes, Math.round(glitch_elems[i].offsetWidth), Math.round(glitch_elems[i].offsetHeight), glitch_elems[i].id, Math.round(width), Math.round(height));
    }

    setSvgFilter();
    setGlitchAnimation();
}

function glitchAnimation(glitch_elem) {
    if (lite) {
        var base = glitch_elem.querySelector('.glitch_base');
        var sub = glitch_elem.querySelector('.glitch_sub');
    } else {
        var base_red = glitch_elem.querySelector('.glitch_base.glitch_red');
        var base_blue = glitch_elem.querySelector('.glitch_base.glitch_blue');
        var sub_red = glitch_elem.querySelector('.glitch_sub.glitch_red');
        var sub_blue = glitch_elem.querySelector('.glitch_sub.glitch_blue');
    }
    let overlay = glitch_elem.querySelector('.glitch_overlay');
    let mask = glitch_elem.querySelector('.glitch_mask');

    let misreg = Math.pow(Math.normalizedRandom(), 2) * (Math.random() < 0.3 ? -0.5 : 1);
    if (!lite) {
        var chromatic = Math.pow(Math.normalizedRandom(2), 1.5);
        base_red.style.left = -chromatic * 2 + '%';
        base_blue.style.left = chromatic * 3 + '%';
    }

    let is_not_glitch = Math.random() < 0.5;
    if (is_not_glitch) {
        if (lite) base.style.filter = sub.style.filter = ['url(\'#filter_glitch_1\')', 'url(\'#filter_glitch_2\')', 'url(\'#filter_glitch_3\')', 'none'][Math.floor(Math.random() * 3)];
        else base_red.style.left = sub_red.style.left = base_blue.style.left = sub_blue.style.left = '0px';
        overlay.style.opacity = 0;
    } else {
        if (Math.random() < 0.5) mask.style.backgroundPosition = '0% $1%'.format(Math.random() * 100);
        if (Math.random() < 0.3) {
            let maskNm = Math.floor(Math.random() * 4) + 1;
            mask.style.backgroundImage = "url('glitch/mask_$1.png')".format(maskNm);
        }
        overlay.style.left = misreg * 10 + '%';
        if (!lite) {
            sub_red.style.left = -(chromatic + misreg) * 2 + '%';
            sub_blue.style.left = (chromatic + misreg) * 3 + '%';
        }
        overlay.style.opacity = 1;
    }

    setTimeout(_ => { glitchAnimation(glitch_elem); }, Math.pow(Math.random(), 5) * 500 * (is_not_glitch ? 3 : 1) + (is_not_glitch && Math.random() < 0.8 ? 500 : 50));
}
function setGlitchAnimation() {
    let glitch_elems = document.querySelectorAll('div.glitch_root');
    for (let i = 0; i < glitch_elems.length; i = (0 | i + 1)) { glitchAnimation(glitch_elems[i]); }
}

function setSvgFilter() {
    if (typeof glitch_css !== 'undefined') return;
    document.body.innerHTML += '<link id="glitch_css" rel="stylesheet" href="glitch/glitch.css"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter id="filter_red"><feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter id="filter_green"><feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter id="filter_blue"><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" /></filter></defs></svg>';
    document.body.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter id="filter_glitch_1"><feColorMatrix type="matrix" in="SourceGraphic" result="red" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/><feColorMatrix type="matrix" in="SourceGraphic" result="green" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"/><feColorMatrix type="matrix" in="SourceGraphic" result="blue" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"/><feOffset dx="3.5" dy="0"/><feBlend in="red" mode="screen"/><feOffset dx="-2" dy="0"/><feBlend in="green" mode="screen"/></filter><filter id="filter_glitch_2"><feColorMatrix type="matrix" in="SourceGraphic" result="red" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/><feColorMatrix type="matrix" in="SourceGraphic" result="green" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"/><feColorMatrix type="matrix" in="SourceGraphic" result="blue" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"/><feOffset dx="-1.5" dy="0"/><feBlend in="red" mode="screen"/><feOffset dx="2.5" dy="0"/><feBlend in="green" mode="screen"/></filter><filter id="filter_glitch_3"><feColorMatrix type="matrix" in="SourceGraphic" result="red" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/><feColorMatrix type="matrix" in="SourceGraphic" result="green" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"/><feColorMatrix type="matrix" in="SourceGraphic" result="blue" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"/><feOffset dx="3" dy="0"/><feBlend in="red" mode="screen"/><feOffset dx="-5" dy="0"/><feBlend in="green" mode="screen"/></filter></defs></svg>';
}

//debug
function setGlitchAllImg() {
    let a = document.querySelectorAll('img:not(.glitch_base):not(.glitch_sub)');
    for (let i = 0; i < a.length; i++) { a[i].classList.add('glitch'); }
    setGlitchHTML();
}