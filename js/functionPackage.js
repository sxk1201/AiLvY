//---前一个兄弟节点
function previousNode(obj){
	if(obj.previousElementSibling){
		return obj.previousElementSibling;//---返回火狐
	}else{
		return obj.previousSibling;//---返回IE678
	}
}
//后一个兄弟节点
function nextNode(obj){
	if(obj.nextElementSibling){
		return obj.nextElementSibling;//---返回火狐
	}else{
		return obj.nextSibling;//---返回IE678
	}
}
//获取所有的兄弟节点，不包括自己
function Siblings(elm){
	var arr = [];
	var nodes = elm.parentNode.children;
	for(var i =0;i<nodes.length;i++) {
		if(nodes[i] !== elm) {
			arr.push(nodes[i]);
	    }
	}
	return arr;
	}

//---第一个子节点
function firstNode(obj){
	if(obj.firstElementChild){
		return obj.firstElementChild;//---返回火狐
	}else{
		return obj.firstChild;//---返回IE678
	}
}
//---最后一个子节点
function lastNode(obj){
	if(obj.lastElementChild){
		return obj.lastElementChild;//---返回火狐
	}else{
		return obj.lastChild;//---返回IE678
	}
}
//---缓冲水平运动函数
function animateLeft(ele,target){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var step = (target - ele.offsetLeft )/10
		step = step>0?Math.ceil(step):Math.floor(step);
		ele.style.left = ele.offsetLeft + step + 'px';
		//---到目标值时清除定时器
		if(Math.abs(target-ele.offsetLeft)<Math.abs(step)){
			ele.style.left = target + 'px';
			clearInterval(ele.timer);
		}	
	},30);
}
//---缓冲垂直运动函数
function animateTop(ele,target){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var step = (target - ele.offsetTop )/10
		step = step>0?Math.ceil(step):Math.floor(step);
		ele.style.top = ele.offsetTop + step + 'px';
		//---到目标值时清除定时器
		if(Math.abs(target-ele.offsetTop)<Math.abs(step)){
			ele.style.top = target + 'px';
			clearInterval(ele.timer);
		}	
	},30);
}
//---缓冲水平垂直运动函数
function animateLeftTop(ele,targetx,targety){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		//水平
		var stepx = (targetx - ele.offsetLeft )/10
		stepx = stepx>0?Math.ceil(stepx):Math.floor(stepx);
		ele.style.left = ele.offsetLeft+ stepx + 'px';
		//---到目标值时清除定时器
		if(Math.abs(targetx-ele.offsetLeft)<Math.abs(stepx)){
			ele.style.left = targetx + 'px';
			clearInterval(ele.timer);
		}	
		//垂直
		var stepy = (targety - ele.offsetTop )/10
		stepy = stepy>0?Math.ceil(stepy):Math.floor(stepy);
		ele.style.top = ele.offsetTop+ stepy + 'px';
		//---到目标值时清除定时器
		if(Math.abs(targety-ele.offsetTop)<Math.abs(stepy)){
			ele.style.top = targety + 'px';
			clearInterval(ele.timer);
		}	
	},10);
}
//---scroll()封装  水平的  垂直的.
function scroll(){
	if(window.pageYOffset != undefined){
		//---火狐/谷歌/ie9+以上支持的
		return {
			"top": window.pageYOffset,
			"left": window.pageXOffset
		};
	}else if(document.compatMode === 'CSS1Compat'){
		//---已经声明DTD,（IE678只认识他）,compatMode渲染模式
		return {
			"top" : document.documentElement.scrollTop,
			"left" : document.documentElement.scrollLeft
		};
	}else{
		//---未声明 DTD（谷歌只认识他）
		return {
			"top" : document.body.scrollTop,
			"left" : document.body.scrollLeft
		};
	}
}
//DOM的三大家族之一clientHeight/width
//可视区的宽高
function client(){
	if(window.innerHeight !== undefined){
		//---火狐/谷歌/ie9+以上支持的
		return {
            "width": window.innerWidth,
            "height": window.innerHeight
        }
	}else if(document.compatMode === "CSS1Compat"){
		//---已经声明DTD,（IE678只认识他）,compatMode渲染模式
        return {
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        }
	}else{
		//---未声明 DTD（谷歌只认识他）
        return {
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        }
	}
}
//---拖拽封装
function Drag(box){
	box.onmousedown = function(ev){
		var ev = ev||window.event;
		//鼠标在盒子中的位置,鼠标就不会乱移动
		var shubiaoX = ev.clientX - this.offsetLeft;
		var shubiaoY = ev.clientY - this.offsetTop;
		
		//按下鼠标,锁定元素，setCapture,
		if(box.setCapture){
			box.setCapture();
		}
		
		document.onmousemove = function(event){
			var ev = event||window.event;
			//水平
			var moveLeft = ev.clientX - shubiaoX;
			if(moveLeft<0){
				moveLeft=0;
			}else if(moveLeft>client().width-box.offsetWidth){
				moveLeft = client().width-box.offsetWidth;
			}
			//垂直
			var moveTop = ev.clientY - shubiaoY;
			if(moveTop<0){
				moveTop=0;
			}else if(moveTop>client().height-box.offsetHeight){
				moveTop = client().height-box.offsetHeight;
			}

			//left = 鼠标在页面中的位置 - 鼠标在盒子中的位置
			box.style.left = moveLeft + 'px';
			box.style.top = moveTop + 'px';
		}
		document.onmouseup = function(){
			//所有事件全清除
			document.onmousemove = null;
			document.onmouseup = null;	
			//解除事件锁定,
			if(box.releaseCapture){
				box.releaseCapture();
			}
			return;//截止
		}
	}
}
//放大镜

function showBig(minbox,minImg,mask,maxbox,maxImg){
  minbox.onmousemove = function(ev) {
	var ev = ev || window.event;
	//蒙版显示
	mask.style.display = "block";
	//maxImg显示
	maxbox.style.display = 'block';

	//蒙版移动类似拖拽
	//	1--鼠标在盒子中的位置已经定了,中间(鼠标在盒子中的位置)
	//	x->蒙版(mask.offsetWidth/2)
	//	y->蒙版(mask.offsetHeight/2)

	//	2--mask在minbox中的位置,确定mask的left和top
	var maskL = ev.clientX - minbox.offsetLeft - mask.offsetWidth / 2;
	var maskT = ev.clientY - minbox.offsetTop - mask.offsetHeight / 2;
	//临界条件
	//水平
	if(maskL <= 0) {
		maskL = 0;
	} else if(maskL >= minbox.offsetWidth - mask.offsetWidth) {
		maskL = minbox.offsetWidth - mask.offsetWidth;
	}

	//垂直
	if(maskT < 0) {
		maskT = 0;
	} else if(maskT >= minbox.offsetHeight - mask.offsetHeight) {
		maskT = minbox.offsetHeight - mask.offsetHeight;
	}

	mask.style.left = maskL + 'px';
	mask.style.top = maskT + 'px';

	//控制移动比例
	var scale = maxImg.offsetWidth / minImg.offsetWidth;
	maxImg.style.left = -maskL * scale + 'px';
	maxImg.style.top = -maskT * scale + 'px';

	minbox.onmouseout = function() {
		mask.style.display = 'none';
		maxbox.style.display = 'none';
	  };
	};
 };







//---动画封装
//json->{left:500}
//animate(div,{left:500,top:500,opacity:50},函数)

function animate(ele,json,fn){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var flag = true;
		for(key in json){
			
			//改变透明度
			if(key==='opacity'){
				var leader = getCssStyle(ele,key)*100||1;
			}else{
				leader = parseInt(getCssStyle(ele,key))||0;
			}
			
			//缓冲运动函数
			var step = (json[key] - leader)/10;
			step = step>0?Math.ceil(step):Math.floor(step);
			leader = leader + step;
			
			//透明度
			if(key==='opacity'){
				ele.style[key] = leader/100;
				ele.style.filter = 'alpha(opacity='+leader+')';
			}else if(key==='z-index'){
				ele.style.zIndex = json[key];
			}else{
				ele.style[key] = leader + 'px';
			}
			
			//---判断所有的属性是否到达目标值
			if(json[key]!==leader){
				flag = false;
			}
		}
		//---所有的已经走完才清除定时器
		if(flag){
			clearInterval(ele.timer);
			//---只要有回调函数，就直接调用
			if(fn){
				fn();
			}
		}
	},20);
}
