function $(obj,flag){
	if(flag==undefined){
		return document.querySelector(obj);
	}else if(flag==true){
		return document.querySelectorAll(obj);
	}
}


var kw;
var kh;
function resize(){
	kw=document.documentElement.clientWidth;
	kh=document.documentElement.clientHeight;
};
resize();
window.addEventListener('resize',resize);
var box=$('.box');
var inner=$('.inner');
var start=$('.start');
var board=$('.board');
var logo=$('.board>img');
var menu=$('.menu');
var mask=$('.mask');
var all=$('.menu>span',true);
var eraser=$('.eraser');

menu.style.height=(kh-40)+'px';
box.style.width=kw+'px';
box.style.height=kh+'px';
inner.style.width=(kw-40)+'px';
inner.style.height=(kh-40)+'px';
mask.style.height=(kh-120)+'px';
start.addEventListener('click',function(){
	menu.style.width='150px';
	menu.style.left='0';
})
for(var i=0;i<all.length;i++){
	all[i].addEventListener('click',function(){
		for(var j=0;j<all.length;j++){
			all[j].style.backgroundColor='transparent';
			all[j].style.color='';		
		};
		this.style.backgroundColor='#1F2152';
		this.style.color='#ccc';	
	})
}
// 新建
all[0].addEventListener('click',function(){
	logo.style.opacity='0';
	all[6].style.backgroundColor='#1F2152';
	all[6].style.color='#ccc';
	board.style.backgroundColor='#fafafa';
	if(document.querySelectorAll('canvas').length==0){
		var canvas=document.createElement('canvas');
		var obj=canvas.getContext('2d');
		canvas.width=mask.offsetWidth;
		canvas.height=kh-120;
		board.appendChild(canvas);
		var tu=new draw(canvas,obj,mask,eraser);
		tu.change();
		// 删除
		all[1].addEventListener('click',function(){
			logo.style.opacity='1';
			board.removeChild(canvas);
			board.style.backgroundColor='#cbcbcb';
		})
		// 保存
		all[2].addEventListener('click',function(){
			var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
			window.location.href=image;
			logo.style.opacity='1';
			board.removeChild(canvas);
			board.style.backgroundColor='#cbcbcb';
		})
		// 后退
		all[3].addEventListener('click',function(){
			tu.fanhui();
		})
		// 前进
		all[4].addEventListener('click',function(){
			tu.huifu();
		})
		// pencil
		all[5].addEventListener('click',function(){
			tu.type='pencil';
			tu.change();
		})
		// line
		all[6].addEventListener('click',function(){
			tu.type='line';
			tu.change();
		})
		// rect
		all[7].addEventListener('click',function(){
			tu.type='rect';
			tu.change();
		})
		// triangle
		all[8].addEventListener('click',function(){
			tu.type='triangle';
			tu.change();
		})
		// arc
		all[9].addEventListener('click',function(){
			tu.type='arc';
			tu.change();
		})
		// 粗细
		all[10].addEventListener('click',function(){
			var cuxi = this.querySelector('input');
			cuxi.onchange = function () {
                tu.lineWidth = this.value;
            }
		})
		// ploygon
		all[11].addEventListener('click',function(){
			tu.type='ploygon';
			tu.change();
			var pnum = this.querySelector('input');
			pnum.onchange = function () {
                tu.ploygonnum = this.value;
            }
		})
		// angle
		all[12].addEventListener('click',function(){
			tu.type='angle';
			tu.change();
			var anum = this.querySelector('input');
			anum.onchange = function () {
                tu.anglenum = this.value;
            }
		})
		// text
		all[13].addEventListener('click',function(){
			var color=this.querySelector('input');
			color.onchange = function () {
                tu.color3 = this.value;
            }
			tu.type='text';
			tu.change();
		})
		// fillcolor
		all[14].addEventListener('click',function(){
			var color=this.querySelector('input');
			color.onchange = function () {
                tu.color2 = this.value;
            }
			tu.style='fill';
		})
		// strokecolor
		all[15].addEventListener('click',function(){
			var color=this.querySelector('input');
			color.onchange = function () {
                tu.color1 = this.value;
            }
			tu.style='stroke';
		})
		// fillstrokecolor
		all[16].addEventListener('click',function(){        
			tu.style='fillstroke';
		})
		// 橡皮
		all[17].addEventListener('click',function(){        
			tu.type='xp';
		})
	}

})


	