var LocString=String(window.document.location.href);
function GetQueryString(str){
var rs=new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString),tmp;
if(tmp=rs)return tmp[2];
return "没有这个参数";
}
var tourismId=GetQueryString("tourismId");
console.log("车票订单ID："+tourismId);

function submitInformation(){
	if($('#license_plate_number').val()==""){
			alert('车牌号不能为空');
			return false
	}
	else if($('#vehicle_type').val()==""){
			alert('车辆类型不能为空');
			return false
	}
	else if(color=$('#color').val()==""){
			alert('车身颜色不能为空');
			return false
	}
	else if($('#driver_name').val()==""){
			alert('司机姓名不能为空');
			return false
	}
	else if($('#driver_phone').val()==""){
			alert('司机联系方式不能为空');
			return false
	}
	else if($('#driver_phone').val().length!=11){
			alert('司机联系方式有误');
			return false
	}
	else{
		var licensePlateNumber=$('#license_plate_number').val();
		var vehicleType=$('#vehicle_type').val();
		var color=$('#color').val();
		var driverName=$('#driver_name').val();
		var driverPhone=$('#driver_phone').val();
		if(confirm("车牌号 : "+license_plate_number+"\r"+"车辆类型 ："+vehicle_type+"\r"+"车身颜色 : "+color+"\r"+"司机姓名 : "+driver_name+"\r"+"司机联系方式 : "+driver_phone)){
			$.ajax({
			type: "post",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"tourismId":tourismId,
			"licensePlateNumber":licensePlateNumber,
			"vehicleType":vehicleType,
			"color":color,
			"driverName":driverName,
			"driverPhone":driverPhone,
			},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(json){
				if (json.success){  //修改成功
				   alert("提交车辆信息成功") //修改成功处理代码...
				}else {  //修改失败
				   alert("提交车辆信息失败") //修改失败处理代码...
				}
			}
			});
		
		}else{
			console.log("你取消了提交")
		}
	}
}
function CarRentalStatement(){
	if(confirm("确定是否下架")){
		console.log("出行ID:"+tourismId+"下架（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"tourismId":tourismId},//提交的数据
				dataType: "json",//返回的数据类型格式
				success: function(json){
					if (json.success){  //修改成功
					   alert("下架成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("下架失败") //修改失败处理代码...
					}
				}
			});
	}else{
		console.log("你取消了下架");
	}
}

$(function(){
	/*
	$.ajax({
	type: 'POST',
	url: commentDataUrl,     //这里是请求的后台地址，自己定义
	data: {'tourism_id':tourism_id},
	dataType: 'json',
	success: function(json) {
	 	var dataContent=json.dataContent;
		$('#license_plate_number').val(dataContent.licensePlateNumber);
		$('#vehicle_type').val(dataContent.vehicleType);
		$('#color').val(dataContent.color);
		$('#driver_name').val(dataContent.driverName);
		$('#driver_phone').val(dataContent.driverPhone);
  }	
  */
})