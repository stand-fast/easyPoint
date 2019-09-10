$(function(){
	console.log("加载完成");
});
//正式部分 请求小程序公告
/*
$(function(){
	$.ajax({
		type: 'POST',
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {'CurrentAnnouncement':1}, //这里是请求的后台数据类型，自己定义
		dataType: 'json',
		beforeSend: function() {
		  $("#data-area").append("加载中...");
		},
		success: function(json) {
		  $("#data-area").empty();       //移除原来的分页数据
		  var data_content = json.dataContent;
		  var data_html = "";
		  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
			data_html += "<ul><li class='data-area-Announce'><input value='"+array["SmallProgramFirst"]+"' id='First'></li></ul><ul><li class='data-area-Announce'><input value='"+array["SmallProgramSecond"]+"' id='Second'></li></ul><ul><li class='data-area-Announce'><input value='"+array["SmallProgramThree"]+"' id='Three'></li></ul>";
		  });
		  $("#data-area").append(data_html);
		},
		error: function() {
		  console.log("小程序公告数据加载失败");
		}
	  });
});
*/

//正式部分 请求商家公告
/*
$(function(){
	$.ajax({
		type: 'POST',
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {'CurrentAnnouncement':1}, //这里是请求的后台数据类型，自己定义
		dataType: 'json',
		beforeSend: function() {
		  $("#data-area").append("加载中...");
		},
		success: function(json) {
		  var json = {"dataContent":"广广金的广金的广金的广金的广金的广金的金"};  //测试数据
		  var data_content = json.dataContent;
		  var data_html = "";
		  data_html +="<div class='SubmitAnnouncement'><a href='javaScript:SubmitSmallProgram()'>确认发布</a></div><h1>商家公告</h1><ul><li class='data-area-Announce'><input value='"+data_content+"' id='Merchant'></li></ul><div class='SubmitAnnouncement'><a href='javaScript:SubmitMerchant()'>确认发布</a></div>";
		  $("#data-area").append(data_html);
		},
		error: function() {
		  console.log("商家公告数据加载失败");
		}
	  });
});
*/
function SubmitSmallProgram(){
	var First=$('#First').val();
	var Second=$('#Second').val();
	var Three=$('#Three').val();
	var SmallProgram=[];
	SmallProgram.push(First);
	SmallProgram.push(Second)
	SmallProgram.push(Three);
	if(confirm("确定是否提交小程序公告")){
		alert("已提交（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"SmallProgram":SmallProgram},//提交的数据,自己定义
				dataType: "json",//返回的数据类型格式
				success: function(json){
					if (json.success){  //修改成功
					   alert("小程序公告发布成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("小程序公告发布失败") //修改失败处理代码...
					}
				}
			});
	}else{
		console.log("你取消了发布")
	}
}
function SubmitMerchant(){
	var Merchant=$('#Merchant').val();
	if(confirm("确定是否提交商家公告")){
		alert("已提交（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"Merchant":Merchant},//提交的数据,自己定义
				dataType: "json",//返回的数据类型格式
				success: function(json){
					if (json.success){  //修改成功
					   alert("商家公告发布成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("商家公告发布失败") //修改失败处理代码...
					}
				}
			});
	}else{
		console.log("你取消了发布")
	}
}


//小程序公告请求测试数据
$(function(){
		  $("#data-area").empty();       //移除原来的分页数据
		  var json = {"dataContent":[{"SmallProgramFirst":"广金的广金的广金的广金的广金的","SmallProgramSecond":"广金的广金的广金的广金的广金的","SmallProgramThree":"广金的广金的广金的广金的广金的"}]};  //测试数据
		  var data_content = json.dataContent;
		  var data_html = "";
		  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
			data_html += "<ul><li class='data-area-Announce'><input value='"+array["SmallProgramFirst"]+"' id='First'></li></ul><ul><li class='data-area-Announce'><input value='"+array["SmallProgramSecond"]+"' id='Second'></li></ul><ul><li class='data-area-Announce'><input value='"+array["SmallProgramThree"]+"' id='Three'></li></ul>";
		  });
		  $("#data-area").append(data_html);
})
//商家公告请求测试数据
$(function(){
		  var json = {"dataContent":"广广金的广金的广金的广金的广金的广金的金"};  //测试数据
		  var data_content = json.dataContent;
		  var data_html = "";
		  data_html +="<div class='SubmitAnnouncement'><a href='javaScript:SubmitSmallProgram()'>确认发布</a></div><h1>商家公告</h1><ul><li class='data-area-Announce'><input value='"+data_content+"' id='Merchant'></li></ul><div class='SubmitAnnouncement'><a href='javaScript:SubmitMerchant()'>确认发布</a></div>";
		  $("#data-area").append(data_html);
})



