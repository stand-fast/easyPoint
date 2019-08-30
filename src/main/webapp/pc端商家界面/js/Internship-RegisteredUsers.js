function via(openId,internshipId){
	if(confirm("确定是否通过")){
	console.log("用户ID:"+openId+"通过实习id:"+internshipId+"（接上数据库后删除）");  
	$.ajax({
		type: "post",  //数据提交方式（post/get）
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {
		"openId":openId,
		"internshipId":internshipId},//提交的数据
		dataType: "json",//返回的数据类型格式
		success: function(msg){
			if (msg.success){  //修改成功
			   alert("通过成功") //修改成功处理代码...
			}else {  //修改失败
			   alert("通过失败") //修改失败处理代码...
			}
		}
	});
	}else{
		console.log("你取消了通过");
	}
}
function notvia(openId,internshipId){
	if(confirm("确定是否不通过")){
	console.log("用户ID:"+openId+"不通过实习id:"+internshipId+"（接上数据库后删除）");  
	$.ajax({
		type: "post",  //数据提交方式（post/get）
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {
		"openId":openId,
		"internshipId":internshipId},//提交的数据
		dataType: "json",//返回的数据类型格式
		success: function(msg){
			if (msg.success){  //修改成功
			   alert("不通过成功") //修改成功处理代码...
			}else {  //修改失败
			   alert("不通过失败") //修改失败处理代码...
			}
		}
	});
	}else{
		console.log("你取消了不通过");
	}
}
$(function(){
//测试部分
 //$("#data-area").empty();       //移除原来的数据
  var json = {"dataContent":[
	{"username":"肖奈","gender":"男","phone":"13512313212","jobName":":移动公司实习生","jobContent":":负责在上菜区将菜品及时摆出，保证出餐窗口的整洁干净，及时跟进顾客的饮食情况，在结账窗口对顾客的菜品消费进行数目结账","internshipId":"23323674863278","openId":"fhasdass-jakdhjs213124jkfa"},
	]
  }; 
  var dataContent=json.dataContent;
  var data_html = "";
  $.each(dataContent,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
	array['openId']='"'+array['openId']+'"';
	array['internshipId']='"'+array['internshipId']+'"';
	data_html += "<div class='MyPreservation-model'><div class='model-JobTitle-salary'><div class='model-username'>用户姓名:"+array['username']+"</div><div class='model-usergender'>性别:"+array['gender']+"</div><div class='model-userphone'>联系电话:"+array['phone']+"</div></div><div class='model-WorkPlace-Deadline'><div class='model-JobTitle'>岗位名称:"+array['jobName']+"</div><div class='model-JobContent'>工作内容:"+array['jobContent']+"</div></div><div class='model-Button-container'><a href=''><button class='model-Button'>查看简历</button></a><a href='javaScript:via(" +array['openId']+ ","+array['internshipId']+")'><button class='model-Button'>通过</button></a><a href='javaScript:notvia("+array['openId']+","+array['internshipId']+")'><button class='model-Button'>不通过</button></a></div></div>"
	});
	$("#data-area").append(data_html);

/*正式部分
$.ajax({
	type: 'POST',
	url: commentDataUrl,     //这里是请求的后台地址，自己定义
	data: {'merchantId':merchantId},
	dataType: 'json',
	beforeSend: function() {
	  $("#data-area").append("加载中...");
	},
	success: function(json) {
	  $("#data-area").empty();       //移除原来的数据
	 var dataContent=json.dataContent;
	 var data_html = "";
	 $.each(dataContent,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		array['openId']='"'+array['openId']+'"';
		array['partTimeJobId']='"'+array['partTimeJobId']+'"';
		data_html += "<div class='MyPreservation-model'><div class='model-JobTitle-salary'><div class='model-username'>用户姓名:"+array['username']+"</div><div class='model-usergender'>性别:"+array['gender']+"</div><div class='model-userphone'>联系电话:"+array['phone']+"</div></div><div class='model-WorkPlace-Deadline'><div class='model-JobTitle'>岗位名称:"+array['jobName']+"</div><div class='model-JobContent'>工作内容:"+array['jobContent']+"</div></div><div class='model-Button-container'><a href='javaScript:via(" +array['openId']+ ","+array['partTimeJobId']+")'><button class='model-Button'>通过</button></a><a href='javaScript:notvia("+array['openId']+","+array['partTimeJobId']+")'><button class='model-Button'>不通过</button></a></div></div>"
	});
		$("#data-area").append(data_html);
	},
	error: function() {
	  console.log("数据加载失败");
	}
  });
 */
})
	