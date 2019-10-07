function UploadReview(partTimeJobId){
	if(confirm("确定是否重新审核")){
		console.log("兼职ID:"+partTimeJobId+"上传审核（接上数据库后删除）");  
		$.ajax({
			type: "post",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"merchantId":merchantId,
			"partTimeJobId":partTimeJobId},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(msg){
				if (msg.success){  //修改成功
				   alert("重新审核成功") //修改成功处理代码...
				}else {  //修改失败
				   alert("重新审核失败") //修改失败处理代码...
				}
			}
		});
	}else{
		console.log("你取消了重新审核");
	}
}
function Delete(partTimeJobId){
	if(confirm("确定是否删除")){
		console.log("兼职ID:"+partTimeJobId+"删除（接上数据库后删除）");  
		$.ajax({
			type: "post",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"merchantId":merchantId,
			"partTimeJobId":partTimeJobId},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(msg){
				if (msg.success){  //修改成功
				   alert("删除成功") //修改成功处理代码...
				}else {  //修改失败
				   alert("删除失败") //修改失败处理代码...
				}
			}
		});
	}else{
		console.log("你取消了删除");
	}
}
function Reason(partTimeJobId){
	//测试部分
	var json = {"Reason":"打发士大夫艰苦士大夫艰苦划时代附件客户啊实打实打算"}; 
	alert(json.Reason) 
	/*正式部分
	$.ajax({
		type: "post",  //数据提交方式（post/get）
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {
		"merchantId":merchantId,
		"partTimeJobId":partTimeJobId},//提交的数据
		dataType: "json",//返回的数据类型格式
		success: function(json){
			   alert(json.Reason) 
		}
	});
	*/
}
$(function(){
	//测试部分
	  $("#data-area").empty();       //移除原来的数据
	  var json = {"dataContent":[
		{"jobName":"移动公司实习生","jobSalary":"80/天","jobSettle":"月结","jobPlace":"广东省广州市天河区龙洞迎福路527号广东金融学院北苑饭堂二楼","endTime":"2019-7-21","partTimeJobId":"23323674863278","OrderStatus":"2"},{"jobName":"移动公司实习生","jobSalary":"80/天","jobSettle":"月结","jobPlace":"广东省广州市天河区龙洞迎福路527号广东金融学院北苑饭堂二楼","endTime":"2019-7-21","partTimeJobId":"23323674863278","OrderStatus":"1"}],"dataType":"2",
	  }; 
	  var dataContent=json.dataContent;
	  var data_html = "";
	  $.each(dataContent,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		if(array['OrderStatus']==1){
			array['OrderStatus']="正在审核";
		}
		else if(array['OrderStatus']==2){
			array['OrderStatus']="审核未通过";
		}
		data_html += "<div class='MyPreservation-model'><div class='model-JobTitle-salary'><div class='model-JobTitle'>"+array['jobName']+"</div><div class='model-salary'>￥"+array['jobSalary']+"</div><div class='model-salary'>"+array['jobSettle']+"</div></div><div class='model-WorkPlace-Deadline'><div class='model-WorkPlace'>工作地点:"+array['jobPlace']+"</div><div class='model-Deadline' style='color:#FF0000;'>"+array['OrderStatus']+"</div></div><div class='model-Button-container'><a href='BusinessRelease.html?partTimeJobId="+array['partTimeJobId']+"'><button class='model-Button'>查看详情</button></a><a href='javaScript:UploadReview("+array['partTimeJobId']+")'><button class='model-Button'>重新审核</button></a><a href='javaScript:Delete("+array['partTimeJobId']+")'><button class='model-Button'>删除</button></a>" 
		 if(array['OrderStatus']=="审核未通过"){
			 data_html += "<a href='javaScript:Reason("+array['partTimeJobId']+")'><button class='model-Button'>查看原因</button></a></div></div>"
			}
		 else{
			data_html += "</div></div>"
		 	}
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
			if(array['OrderStatus']==1){
				array['OrderStatus']="正在审核";
			}
			else if(array['OrderStatus']==2){
				array['OrderStatus']="审核未通过";
			}
			data_html += "<div class='MyPreservation-model'><div class='model-JobTitle-salary'><div class='model-JobTitle'>"+array['jobName']+"</div><div class='model-salary'>￥"+array['jobSalary']+"</div><div class='model-salary'>"+array['jobSettle']+"</div></div><div class='model-WorkPlace-Deadline'><div class='model-WorkPlace'>工作地点:"+array['jobPlace']+"</div><div class='model-Deadline' style='color:#FF0000;'>"+array['OrderStatus']+"</div></div><div class='model-Button-container'><a href='BusinessRelease.html?partTimeJobId="+array['partTimeJobId']+"'><button class='model-Button'>查看详情</button></a><a href='javaScript:UploadReview("+array['partTimeJobId']+")'><button class='model-Button'>重新审核</button></a><a href='javaScript:Delete("+array['partTimeJobId']+")'><button class='model-Button'>删除</button></a>" 
			 if(array['OrderStatus']=="审核未通过"){
				 data_html += "<a href='javaScript:Reason("+array['partTimeJobId']+")'><button class='model-Button'>查看原因</button></a></div></div>"
				}
			 else{
				data_html += "</div></div>"
				}
		});
		$("#data-area").append(data_html);
		},
		error: function() {
		  console.log("数据加载失败");
		}
	  });
	 */
})
	