document.getElementById('submit').onclick=submit;

var now = new Date();
var year = now.getFullYear(); //得到年份
var month = now.getMonth()+1;//得到月份
var date = now.getDate();//得到日期
if(month<10){
	month="0"+month;
}
if(date<10){
	date="0"+date;
}
var time =year + "-" + month + "-" + date;
$('departureDay').min=time;

function addLoadEvent(func) {
 var oldonload = window.onload;
 if (typeof window.onload != 'function') {
 window.onload = func;
 } else {
 window.onload = function() {
  oldonload();
  func();
 }
 }
}
function prepareInputsForHints() {
 var inputs = document.getElementsByTagName("input");
 for (var i=0; i<inputs.length; i++){
  if (inputs[i].parentNode.getElementsByTagName("span")[0]) {
   inputs[i].onfocus = function () {
	this.parentNode.getElementsByTagName("span")[0].style.display = "inline";
   }
   inputs[i].onblur = function () {
	this.parentNode.getElementsByTagName("span")[0].style.display = "none";
   }
  }
 }
 var selects = document.getElementsByTagName("select");
 for (var k=0; k<selects.length; k++){
  if (selects[k].parentNode.getElementsByTagName("span")[0]) {
   selects[k].onfocus = function () {
	this.parentNode.getElementsByTagName("span")[0].style.display = "inline";
   }
   selects[k].onblur = function () {
	this.parentNode.getElementsByTagName("span")[0].style.display = "none";
   }
  }
 }
}
addLoadEvent(prepareInputsForHints);


function check(smallint,price){
	function isInteger(obj) {
		 return obj%1 === 0
		}
	if($('departurePlace').value==$('destination').value){
			alert('出发地和目的地不能相同');
			return false
	}
	else if($('departureDay').value<time){
			alert('出发日期不能为空或者以前时间');
			return false
	}
	else if(smallint==''){
			alert('座位数不能为空!');
			return false
		}
	else if(isNaN(Number(smallint,))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('座位数不是数字!');
			return false
		}
	else if(isInteger(smallint)==false){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('座位数不是整数!');
			return false
		}
	else if(smallint<=0){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('座位数不能小于或等于0');
			return false
		}
	else if(price==''){
			alert('售价不能为空!');
			return false
		}
	else if(isNaN(Number(price,))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('售价不是数字!');
			return false
		}
	else if(price<0){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('售价不能为负数');
			return false
		}
	return true
}

function submit(){
	var departurePlace=$('#departurePlace').val();
	var destination=$('#destination').val();
	var departureDay=$('#departureDay').val();
	var departureTime=$('#departureTime').val();
	var smallint=$('#smallint').val();
	var price=$('#price').val();
	var type=$('#type').val();
	var middletype;
	if(type==1){
		middletype="否";
	}
	if(type==2){
		middletype="是";
	}
	if(check(smallint,price)==true){
		if(confirm("出发地 : "+departurePlace+"\r"+"目的地 ："+destination+"\r"+"出发日期 : "+departureDay+"\r"+"出发时间 : "+departureTime+"\r"+"座位数 : "+smallint+"\r"+"售价 : "+price+"\r"+"预售 : "+middletype)){
			$.ajax({
			type: "post",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"departurePlace":departurePlace,
			"destination":destination,
			"departureDay":departureDay,
			"epartureTime":departureTime,
			"smallint":smallint,
			"price":price,
			"type":type},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(msg){
				if (msg.success){  //修改成功
				   alert("添加车辆成功") //修改成功处理代码...
				}else {  //修改失败
				   alert("添加车辆失败") //修改失败处理代码...
				}
			}
		});
		
		}else{
			alert("你取消了提交")
		}
	}
	
		

}
