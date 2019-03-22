
			var hj=document.getElementById('hj');
		var leader=0;//运动的当前值.
		var target=0;//运动的目标值
		timer=null;
		//1--检测页面滚动,显示返回按钮
				window.onscroll=function(){
					//滚动一定距离,显示按钮
				if(scroll().top>=200){
					hj.style.display='block';
				}else{
					hj.style.display='none';
			}
				leader=scroll().top;
		}
				
				hj.onclick=function(){
					clearInterval(timer)
				timer=setInterval(function(){
					var step=(target-leader)/10;
					
					step=step>0?Math.ceil(step):Math.floor(step);
					leader=leader+step;
				window.scrollTo(0,leader);
				if(leader==0){
					clearInterval(timer)
				}
				},30)
			}
				
//创建swiper对象
        	var mySwper=new Swiper('.swiper-container',{
        		autoplay:1000,//自动运行
        		loop:true,//循环运行
        		speed:500,//设置速度
        		pagination:'.swiper-pagination',//显示分页
        		paginationClickable:true,//分页能够点击切换图片
        		nextButton:'.swiper-button-next',//前按钮激活
        		prevButton:'.swiper-button-prev',//后按钮激活
        		//effect:'fade'//效果:淡入淡出
        		//effect:'cube'//效果:立方体
        		effect:'coverflow'//效果:立体景深
        	});