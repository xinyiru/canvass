function draw(canvas,obj,mask,eraser){
	this.canvas=canvas;
	this.obj=obj;
	this.lineWidth=1;
	this.mask=mask;
	this.restore=[];
	this.history=[];
	this.type='line';
	this.style='stroke';
	this.anglenum=5;
    this.ploygonnum=5;
    this.color1='#000';
    this.color2='#000';
    this.color3='#000';
    this.font='20px arial';
    this.eraser=eraser;
    draw.prototype.init=function(){
        this.obj.font=this.font;
        this.obj.lineWidth=this.lineWidth;
	}
	draw.prototype.change=function(){
        var that=this;
        if(this.type!='xp'){
            this.eraser.style.display='none';
        }
        if(this.type=='text'){
            that.init();
            that[that.type]();
        }
        else{
            this.mask.onmousedown=function(e) {
                that.init();
                var x = e.offsetX + 0.5;
                var y = e.offsetY + 0.5;
                if(that.type=='pencil'){
                    that.obj.beginPath();
                    that.obj.moveTo(x, y);
                    that.obj.fillStyle = that.color;
                    that.obj.strokeStyle = that.color;
                    that[that.type]();
                }
                else{
                    that.mask.onmousemove = function (e) {
                        that.obj.clearRect(0, 0, that.canvas.width, that.canvas.height);
                        if (that.history.length != 0) {
                            that.obj.putImageData(that.history[that.history.length - 1], 0, 0, 0, 0, that.canvas.width, that.canvas.height)
                        }
                        var m = e.offsetX + 0.5;
                        var n = e.offsetY + 0.5;
                        that[that.type](x,y,m,n);
                    }
                }
                that.mask.onmouseup = function () {
                    that.history.push(that.obj.getImageData(0, 0, that.canvas.width, that.canvas.height));
                    this.onmousemove = null;
                    this.onmouseup = null;
                }
            }
        }
    }

    draw.prototype.line=function(x1,y1,x2,y2){
        this.obj.beginPath();
        this.obj.moveTo(x1,y1);
        this.obj.lineTo(x2,y2);
        this.obj.closePath();
        this.obj.strokeStyle=this.color1;
        this.obj[this.style]();
    }

    draw.prototype.rect=function(x1,y1,x2,y2) {
        this.obj.beginPath();
        this.obj.rect(x1, y1, x2 - x1, y2 - y1);
        this.obj.closePath();
        if(this.style == 'stroke') {
            this.obj.strokeStyle = this.color1;
            this.obj[this.style]();
        }
        if (this.style == 'fill') {
            this.obj.fillStyle = this.color2;
            this.obj[this.style]();
        }
        if (this.style == 'fillstroke') {
            this.obj.strokeStyle = this.color1;
            this.obj.fillStyle = this.color2;
            this.obj.fill();
            this.obj.stroke();
        }
    }

    draw.prototype.triangle=function(x1,y1,x2,y2){
        this.obj.beginPath();
        this.obj.moveTo(x1,y1);
        this.obj.lineTo(x2,y2);
        this.obj.lineTo(x1,y2);
        this.obj.closePath();
        if (this.style == 'stroke') {
            this.obj.strokeStyle = this.color1;
            this.obj[this.style]();
        }
        if (this.style == 'fill') {
            this.obj.fillStyle = this.color2;
            this.obj[this.style]();
        }
        if (this.style == 'fillstroke') {
            this.obj.strokeStyle = this.color1;
            this.obj.fillStyle = this.color2;
            this.obj.fill();
            this.obj.stroke();
        }
    }

    draw.prototype.arc=function(x1,y1,x2,y2){
        var r=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        this.obj.beginPath();
        this.obj.arc(x1,y1,r,0,2*Math.PI);
        this.obj.closePath();
        if (this.style == 'stroke') {
            this.obj.strokeStyle = this.color1;
            this.obj[this.style]();
        }
        if (this.style == 'fill') {
            this.obj.fillStyle = this.color2;
            this.obj[this.style]();
        }
        if (this.style == 'fillstroke') {
            this.obj.strokeStyle = this.color1;
            this.obj.fillStyle = this.color2;
            this.obj.fill();
            this.obj.stroke();
        }
    }
    draw.prototype.pencil=function(){
        var that=this;
        this.mask.onmousemove=function(e){
            var dx= e.offsetX+0.5;
            var dy= e.offsetY+0.5;
            that.obj.clearRect(0,0,that.canvas.width,that.canvas.height);
            if(that.history.length!=0){
                that.obj.putImageData(that.history[that.history.length-1],0,0,0,0,that.canvas.width,that.canvas.height)
            }
            that.obj.lineTo(dx,dy);
            that.obj.stroke();

        }
    }
    draw.prototype.ploygon=function(x1,y1,x2,y2){
        var ag=(360/this.ploygonnum)*(Math.PI/180);
        var r=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        this.obj.beginPath();
        for (var i = 0; i < this.ploygonnum; i++) {
            this.obj.lineTo(x1+Math.cos(i*ag)*r,y1+Math.sin(i*ag)*r);
        }
        this.obj.closePath();
        if (this.style == 'stroke') {
            this.obj.strokeStyle = this.color1;
            this.obj[this.style]();
        }
        if (this.style == 'fill') {
            this.obj.fillStyle = this.color2;
            this.obj[this.style]();
        }
        if (this.style == 'fillstroke') {
            this.obj.strokeStyle = this.color1;
            this.obj.fillStyle = this.color2;
            this.obj.fill();
            this.obj.stroke();
        }
    }

    draw.prototype.angle=function(x1,y1,x2,y2){
        var ag=(360/this.anglenum/2)*(Math.PI/180);
        var r=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        var r1=r/3;
        this.obj.beginPath();
        for (var i = 0; i < this.anglenum*2; i++) {
            if(i%2==0){
                this.obj.lineTo(x1+Math.cos(i*ag)*r,y1+Math.sin(i*ag)*r);
            }else{
                this.obj.lineTo(x1+Math.cos(i*ag)*r1,y1+Math.sin(i*ag)*r1);
            }
        }
        this.obj.closePath();
        if (this.style == 'stroke') {
            this.obj.strokeStyle = this.color1;
            this.obj[this.style]();
        }
        if (this.style == 'fill') {
            this.obj.fillStyle = this.color2;
            this.obj[this.style]();
        }
        if (this.style == 'fillstroke') {
            this.obj.strokeStyle = this.color1;
            this.obj.fillStyle = this.color2;
            this.obj.fill();
            this.obj.stroke();
        }
    }
    draw.prototype.text=function(){
            var that=this;
            this.mask.ondblclick=function(e){
                var ex= e.offsetX;
                var ey= e.offsetY;
                var wenzi=document.createElement('textarea');
                wenzi.className='wenzi';
                wenzi.style.color=that.color3;
                wenzi.style.position='absolute';
                wenzi.style.left=ex+'px';
                wenzi.style.top=ey+'px';
                this.parentNode.appendChild(wenzi);
                setFocus(wenzi);
                wenzi.onmousedown=function(e){
                    var tx= e.clientX-this.offsetLeft;
                    var ty= e.clientY-this.offsetTop;
                    this.onmousemove=function(e){
                        var mx= e.clientX;
                        var my= e.clientY;
                        var c2=my-ty;
                        var c1=mx-tx;
                        var tw=that.canvas.width-parseInt(getStyle(this,'width'));
                        var th=that.canvas.height-parseInt(getStyle(this,'height'));
                        if(c1<=0){
                            c1=0;
                        }
                        if(c1>=tw){
                            c1=tw
                        }
                        if(c2<=0){
                            c2=0
                        }
                        if(c2>=th){
                            c2=th;
                        }
                        wenzi.style.left=c1+'px';
                        wenzi.style.top=c2+'px';
                    }
                    this.onmouseup=function(){
                        this.onmousemove=null;
                        this.onmouseup=null;
                    }
                }
                wenzi.onblur=function(e){
                    var fx=this.offsetLeft;
                    var fy=this.offsetTop;
                    that.obj.fillStyle=that.color3
                    that.obj.fillText(wenzi.value,fx,fy);
                    that.mask.parentNode.removeChild(wenzi);
                    that.history.push(that.obj.getImageData(0,0,that.canvas.width,that.canvas.height));
                }
            }
    }

    draw.prototype.fanhui=function(){
        var historyarr = this.history;
        this.restore.push(historyarr.pop());
        if (historyarr.length == 0) {
            this.obj.clearRect(0, 0, this.canvas.width, this.canvas.height);
            setTimeout(function(){
                alert('没有了')
            },0)
        }
        else {
            this.obj.putImageData(historyarr[historyarr.length - 1], 0, 0, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    draw.prototype.huifu=function(){
        var restorearr = this.restore;
        if (restorearr.length == 0) {
            setTimeout(function(){
                alert('没有了')
            },0)
            return;
        }
        this.obj.putImageData(restorearr[restorearr.length - 1], 0, 0, 0, 0, this.canvas.width, this.canvas.height);
        this.history.push(restorearr.pop());
    }

    draw.prototype.xp=function(){
        this.type='';
        var that=this;
        this.mask.onmousemove=function(e){
            that.eraser.style.display='block';
            var ox=e.offsetX;
            var oy=e.offsetY;
            that.eraser.style.left=ox-15+'px';
            that.eraser.style.top=oy-15+'px';
        }
        this.mask.onmousedown=function(e){
            var px=e.offsetX;
            var py=e.offsetY;
            that.eraser.style.left=px-15+'px';
            that.eraser.style.top=py-15+'px';
            this.onmousemove=function(e){
                px=e.offsetX;
                py=e.offsetY;
                that.eraser.style.left=px-15+'px';
                that.eraser.style.top=py-15+'px';
                that.obj.clearRect(px-15,py-15,30,30);
            }
            this.onmouseup=function(){
                that.history.push(that.obj.getImageData(0, 0, that.canvas.width, that.canvas.height));
                this.onmousemove=null;
                this.onmouseup=null;
            }
        }
    }

    function setFocus(obj){
        if(obj.setSelectionRange){
            setTimeout(function(){
                obj.setSelectionRange(0,0);
                obj.focus();
            },100);
        }else{
            if(obj.createTextRange){
                var range=obj.createTextRange();
                range.collapse(true);
                range.moveEnd("character",0);
                range.moveStart("character",0);
                range.select();
            }
            try{obj.focus();}catch(e){}
        }
    }

    function getStyle(obj,attr) {
        if (window.getComputedStyle) {
            return getComputedStyle(obj,null)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
}
