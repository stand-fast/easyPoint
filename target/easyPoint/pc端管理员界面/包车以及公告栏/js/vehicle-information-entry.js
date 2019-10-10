var LocString = String(window.document.location.href);

function GetQueryString(str) {
	var rs = new RegExp("(^|)" + str + "=([^/&]*)(/&|$)", "gi").exec(LocString),
		tmp;
	if (tmp = rs) return tmp[2];
	return "没有这个参数";
}
var travelOrderId = GetQueryString("travelOrderId");
console.log("车票订单ID：" + travelOrderId);
var reg = /^[1][3458]\d{9}$/; //验证手机号码  
function submitInformation() {
	if ($('#license_plate_number').val() == "") {
		alert('车牌号不能为空');
		return false
	} else if ($('#vehicle_type').val() == "") {
		alert('车辆类型不能为空');
		return false
	} else if (color = $('#color').val() == "") {
		alert('车身颜色不能为空');
		return false
	} else if ($('#driver_name').val() == "") {
		alert('司机姓名不能为空');
		return false
	} else if (!reg.test($('#driver_phone').val())) {
		alert('司机联系方式有误');
		return false
	} else {
		var licensePlateNumber = $('#license_plate_number').val();
		var vehicleType = $('#vehicle_type').val();
		var color = $('#color').val();
		var driverName = $('#driver_name').val();
		var driverPhone = $('#driver_phone').val();
		if (confirm("车牌号 : " + licensePlateNumber + "\r" + "车辆类型 ：" + vehicleType + "\r" + "车身颜色 : " + color + "\r" + "司机姓名 : " + driverName + "\r" + "司机联系方式 : " + driverPhone)) {
			$.ajax({
				type: "post", //数据提交方式（post/get）
				url: 'http://easypoint.club/easyPoint/addDriverInfoToTourismOrder', //这里是请求的后台地址，自己定义
				data: {
					"travelOrderId": travelOrderId,
					"licensePlateNumber": licensePlateNumber,
					"vehicleType": vehicleType,
					"color": color,
					"driverName": driverName,
					"driverPhone": driverPhone,
				}, //提交的数据
				dataType: "json", //返回的数据类型格式
				success: function (json) {
					console.log(json);
					if (json.code == 200) {
						console.log("租车订单安排车辆信息成功");
					} else if (json.code == 201) {
						console.log("安排车辆信息失败");
					}
				}
			});

		} else {
			console.log("你取消了提交")
		}
	}
}

function CarRentalStatement(travelOrderId) {
	if (confirm("确定是否结单")) {
		$.ajax({
			type: "post", //数据提交方式（post/get）
			url: 'http://easypoint.club/finishTourismOrder',
			data: {
				"travelOrderId": '11'
			}, //提交的数据
			dataType: "json", //返回的数据类型格式
			success: function (json) {
				if (json.code == 200) {
					console.log("结单成功")
				} else if (json.code == 400) {
					console.log("结单失败");
				}
			}
		});
	} else {
		console.log("你取消了结单");
	}
}

$(function () {
	$.ajax({
		type: 'POST',
		url: 'http://easypoint.club/findDriverInfo',
		data: {
			'travelOrderId': "10"
		},
		dataType: 'json',
		success: function (json) {
			if (json.code == 200) {
				var dataContent = json.data;
				console.log("查询车辆信息成功");
				console.log(dataContent);
				$('#license_plate_number').val(dataContent.licensePlateNumber);
				$('#vehicle_type').val(dataContent.vehicleType);
				$('#color').val(dataContent.color);
				$('#driver_name').val(dataContent.driverName);
				$('#driver_phone').val(dataContent.driverPhone);
			} else if (json.code == 400) {
				console.log("该订单还未安排车辆");
			}
		}
	})
})