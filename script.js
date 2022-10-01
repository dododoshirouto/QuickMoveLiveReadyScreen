
    var anim = {
        'intv': -100,
        'fps': 60,
        'setIntv': function (func=_=>{}) {
            imgs = Array.from(document.querySelectorAll('[data-z]'));
            anim.stop();
            anim.main();
            anim.intvAfterFunc = func;
            return;
        },
        'intvAfterFunc':()=>{},
        'stop': ()=>{
            if (anim.intv>0) cancelAnimationFrame(anim.intv);
        },
        'main': function(){
            anim.intv = requestAnimationFrame(anim.main);
            if (anim.lastCurrentTime>0) anim.fps = 1000/(Date.now() - anim.lastCurrentTime);
            anim.lastCurrentTime = Date.now();
            if (anim.animId<0) {
                anim.animId = Math.floor(Math.random()*anim.animFuncs.length);
                anim.animTime = 0.0;
                console.log(anim.animId);
            }
            anim.animFuncs[anim.animId].func();

            anim.time += 1000.0/anim.fps;
            anim.animTime += 1000.0/anim.fps;

            // img_red_dust.style.backgroundPositionX = (anim.time/500)%100 +'%';
            anim.intvAfterFunc();
        },
        'time': 0.0,
        'lastCurrentTime': -1,
        'animTime': 0.0,
        'animId': -1,
        'animFuncs': [
            {
                'func': function(){
                    if (anim.animTime<1000.0/anim.fps) { // init
                        for (var i=0; i<imgs.length; i++) { imgs[i].style = ''; }
                        anim.animFuncs[anim.animId].t = randomRange(5000, 15000);
                        for (var i=0; i<imgs.length; i++) { imgs[i].style.transitionDuration = anim.animFuncs[anim.animId].t+'ms'; }
                        var b = randomRange(1, 3.5);
                        var s = randomRange(1, 1.5);
                        var scale = randomRange(1.2, 1.0);
                        var x = randomRange(-10, 10)*(scale-1);
                        var y = randomRange(-10, 10)*(scale-1);
                        setImgsDetail(x, y, scale, b, s, randomRange(0, 2));
                    }
                    if (anim.animTime>500) { // half transition
                        setImgsDetail();
                    }
                    if (anim.animTime>anim.animFuncs[anim.animId].t) { // last
                        anim.animId=-1;
                    }
                },
                't': 8000
            },
            {
                'func': function(){
                    if (anim.animTime<1000.0/anim.fps) { // init
                        anim.animFuncs[anim.animId].t = randomRange(3000, 8000);
                        for (var i=0; i<imgs.length; i++) { imgs[i].style.transitionDuration = anim.animFuncs[anim.animId].t+'ms'; }

                        var s = randomRange(1.1, 2.0);
                        var x = randomRange(-15, 15)*(s-1);
                        var y = randomRange(-15, 15)*(s-1);
                        var b = randomRange(1, 3.5);
                        var fs = randomRange(0.5, 1.5);
                        setImgsDetail(x, y, s, b, fs, randomRange(0, 2));

                    }
                    if (anim.animTime>anim.animFuncs[anim.animId].t/2) { // half
                        setImgsDetail();
                    }
                    if (anim.animTime>anim.animFuncs[anim.animId].t) { // last
                        anim.animId=-1;
                    }
                },
                't': 8000
            },
            {
                'func': function(){
                    if (anim.animTime<1000.0/anim.fps) { // init
                        anim.animFuncs[anim.animId].t = Math.random()*3000+2000;
                        for (var i=0; i<imgs.length; i++) { imgs[i].style.transitionDuration = anim.animFuncs[anim.animId].t+'ms'; }
                        var b = randomRange(0, 5);
                        var s = randomRange(1, 5);
                        var scale = randomRange(1.2, 1.0);
                        var x = randomRange(-10, 10)*(scale-1);
                        var y = randomRange(-10, 10)*(scale-1);
                        setImgsDetail(x, y, scale, b, s, randomRange(0, 2));
                    }
                    if (anim.animTime>anim.animFuncs[anim.animId].t) { // last
                        for (var i=0; i<imgs.length; i++) { imgs[i].style.filter = ''; }
                        anim.animId=-1;
                    }
                },
                't': 10000,
            },
            {
                'func': function(){
                    if (anim.animTime<1000.0/anim.fps) { // init
                        anim.animFuncs[anim.animId].t = Math.random()*2000+1000;
                        for (var i=0; i<imgs.length; i++) { imgs[i].style.transitionDuration = '0ms'; }
                    }
                    if (anim.animFuncs[3].dt<0) {
                        var s = (Math.random()*1.3+1.2);
                        var x = (-25*(s-1) + 50*(s-1)*Math.random());
                        var y = (-25*(s-1) + 50*(s-1)*Math.random());
                        var b = (Math.random()*10) *0.5;
                        var fs = Math.random()*4+1;
                        var c = Math.max(1,Math.random()*3);
                        var p = (Math.random()<0.1? 1:0);
                        setImgsDetail(x, y, s, b, fs, c, p, randomRange(0, 2));
                        anim.animFuncs[3].dt = (Math.pow(Math.random(), 2))*800 + 200;
                    }
                    anim.animFuncs[3].dt -= 1000/anim.fps;
                    if (anim.animTime>anim.animFuncs[anim.animId].t) { // last
                        for (var i=0; i<imgs.length; i++) { imgs[i].style = ''; }
                        anim.animId=-1;
                    }
                },
                't': 3000,
                'dt': -1
            }
        ]
    }
    // window.addEventListener('load',()=>{anim.setIntv();});


    function setImgsDetail(x=0, y=0, scale=1, blur=0, brightness=1, contrast=1, sepia=0, focus=0) {
        for (var i=0; i<imgs.length; i++) {
            imgs[i].style.transform = 'scale('+((1+(scale-1)*(imgs[i].getAttribute('data-z')))*(imgs[i].classList.contains('flip-x')?-1:1))+','+(1+(scale-1)*(imgs[i].getAttribute('data-z')))+') translate('+(x*(imgs[i].getAttribute('data-z'))*(imgs[i].classList.contains('flip-x')?-1:1))+'%,'+(y*(imgs[i].getAttribute('data-z')-0))+'%)';
            imgs[i].style.filter = 'blur('+(blur*(2-scale)*Math.abs(focus-imgs[i].getAttribute('data-z')))+'px) brightness('+(1+(brightness-1)*imgs[i].getAttribute('data-bright'))+') contrast('+(1+(contrast-1)*imgs[i].getAttribute('data-bright'))+') sepia('+sepia+')'+(imgs[i].classList.contains('hue-rotate-72')?' hue-rotate(72deg)':'');
        }
    }


    function randomRange(a, b=0) { return a + (b-a)*(Math.cos(Math.random()*Math.PI)/2+0.5); }


    setTextStrokeDatas = {};
    function setTextStroke(elem, color='red', width=3, w_unit='px', detail=8) {
        let shadow_value = [];
        let rotate = 0;
        const data_index = [color, width, w_unit, detail].join();
        if (!setTextStrokeDatas[data_index]) {
            for(let i=0; i<detail; i=(i+1|0)) {
                shadow_value.push( [
                    (Math.sin(rotate)*width).toFixed(3) + w_unit,
                    (Math.cos(rotate)*width).toFixed(3) + w_unit,
                    color
                ].join(' '));
                rotate += Math.PI * 2 / detail;
            }
            setTextStrokeDatas[data_index] = shadow_value.join(',');
        }

        elem.style.textShadow = setTextStrokeDatas[data_index];
        return setTextStrokeDatas[data_index];
    }