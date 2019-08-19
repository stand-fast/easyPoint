var LocString=String(window.document.location.href);
function GetQueryString(str){
var rs=new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString),tmp;
if(tmp=rs)return tmp[2];
return "没有这个参数";
}
var tourism_id=GetQueryString("tourism_id");
console.log("车票订单ID："+tourism_id);

function submitInformation(){
	var license_plate_number=$('#license_plate_number').val();
	var vehicle_type=$('#vehicle_type').val();
	var color=$('#color').val();
	var driver_name=$('#driver_name').val();
	var driver_phone=$('#driver_phone').val();
	if(confirm("车牌号 : "+license_plate_number+"\r"+"车辆类型 ："+vehicle_type+"\r"+"车身颜色 : "+color+"\r"+"司机姓名 : "+driver_name+"\r"+"司机联系方式 : "+driver_phone)){
		$.ajax({
		type: "post",  //数据提交方式（post/get）
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {
		"tourism_id":tourism_id,
		"license_plate_number":license_plate_number,
		"vehicle_type":vehicle_type,
		"color":color,
		"driver_name":driver_name,
		"driver_phone":driver_phone,
		},//提交的数据
		dataType: "json",//返回的数据类型格式
		success: function(msg){
			if (msg.success){  //修改成功
			   alert("提交车辆信息成功") //修改成功处理代码...
			}else {  //修改失败
			   alert("提交车辆信息失败") //修改失败处理代码...
			}
		}
		});
	
	}else{
		alert("你取消了提交")
	}
}
function CarRentalStatement(){
	if(confirm("确定是否结单")){
		alert("租车ID:"+tourism_id+"结单（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"tourism_id":tourism_id},//提交的数据
				dataType: "json",//返回的数据类型格式
				success: function(msg){
					if (msg.success){  //修改成功
					   alert("结单成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("结单失败") //修改失败处理代码...
					}
				}
			});
	}else{
		alert("你取消了结单");
	}
}

$(function(){
//	$.ajax({
//	type: 'POST',
//	url: commentDataUrl,     //这里是请求的后台地址，自己定义
//	data: {'tourism_id':tourism_id},
//	dataType: 'json',
//	success: function(json) {
//		$('#license_plate_number').val(json.license_plate_number);
//		$('#vehicle_type').val(json.vehicle_type);
//		$('#color').val(json.color);
//		$('#driver_name').val(json.driver_name);
//		$('#driver_phone').val(json.driver_phone);
	
})