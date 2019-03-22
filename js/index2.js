var reg = {
			pwdReg:/^.{6,16}$/,
			emailReg:/^[0-9a-zA-Z]+([-_.][0-9a-zA-Z]+)*@([0-9a-zA-Z]+[-.])+[a-zA-Z]{2,4}$/,
			numReg:/\d/,                //全是数字，弱
			strReg:/[a-zA-Z]/,          //全是字母，中
			tsReg:/[^\u4e00-\u9fa5a-zA-Z0-9]/ //除汉字,数字,字母的其他符号，强
		}
			
			
			function $(id){
				return document.getElementById(id);
			}	
			
			var pwd = $('pwd');
			var pwd2 = $('pwd2');
			var email = $('email');
			var ck = $('ck');
			var btn = $('btn');
				
	pwd.onfocus=pwd.onblur=pwd.onkeyup = function(ev){
	var Event = ev||window.event;
	checkPwd(Event);
}
function checkPwd(Event){
	var type;//事件的类型
	if(Event){
		type = Event.type;
	}
	var value = pwd.value;
	var box = pwd.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '建议使用数字，字母的结合，6-16位';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}

	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='密码不能为空哦！';
		return false;
	}else if(reg.pwdReg.test(value)){
		box.className='box right';
		var level = getPwdLevel(value);
		
		switch(level){
			case 1:
				tip.className='tip ruo';
				span.innerHTML = '建议修改密码';
				break;
			case 2:
				tip.className='tip zhong';
				span.innerHTML = '可以使用';
				break;
			case 3:
				tip.className='tip qiang';
				span.innerHTML = '屌屌的！！';
				break;
		}
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='密码格式错误，6-16位数字与字母的结合';
		return false;
	}
}

function getPwdLevel(value){
	var level=0;
	var numReg = true;
	var strReg = true;
	var tsReg = true;		
	//888jj77_
	for(var i=0;i<value.length;i++){
		if(numReg&&reg.numReg.test(value[i])){
			level++;
			numReg = false;
			continue;
		}
		if(strReg&&reg.strReg.test(value[i])){
			level++;
			strReg = false;
			continue;
		}
		if(tsReg&&reg.tsReg.test(value[i])){
			level++;
			tsReg = false;
		}
	}
	return level;
}

pwd2.onfocus=pwd2.onblur=pwd2.onkeyup = function(ev){
	var Event = ev||window.event;
	checkPwd2(Event);
}
function checkPwd2(Event){
	var type;
	if(Event){
		type = Event.type;
	}
	var value1 = pwd.value;
	var value = pwd2.value;
	var box = pwd2.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];

	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '请再次输入密码';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}

	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='密码不能为空哦！';
		return false;
	}else if(value1==value){
		box.className='box right';
		tip.className='tip hide';
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='两次密码不一致，请重新输入';
		return false;
	}
}

email.onfocus=email.onblur=email.onkeyup = function(ev){
	var Event = ev||window.event;
	checkEmail(Event);
}
function checkEmail(Event){
	var type;
	if(Event){
		type = Event.type;
	}
	var value = email.value;
	var box = email.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '请输入正确的邮箱格式';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}
	
	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='邮箱不能为空哦！';
		return false;
	}else if(reg.emailReg.test(value)){
		box.className='box right';
		tip.className='tip hide';
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='邮箱格式错误';
		return false;
	}
}

function checkData(){
	var box = ck.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	if(ck.checked){
		if(checkPwd()&&checkPwd2()&&checkEmail()){
			alert('信息正确，正在为您跳转。。。。。');
			return true;
		}else{
			alert('填写信息错误，请重新输入');
			return false;
		}
	}else{
		tip.className='tip error';
		span.innerHTML='请同意协议，哦亲！！！';
		return false;
	}
	return false;//默认阻止提交
}
