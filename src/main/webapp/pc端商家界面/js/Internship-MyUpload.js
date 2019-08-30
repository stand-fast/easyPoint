function Shelves(internshipId){
	if(confirm("确定是否下架")){
	console.log("实习ID:"+internshipId+"下架（接上数据库后删除）");  
	$.ajax({
		type: "post",  //数据提交方式（post/get）
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {
		"merchantId":merchantId,
		"internshipId":internshipId},//提交的数据
		dataType: "json",//返回的数据类型格式
		success: function(msg){
			if (msg.success){  //修改成功
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
	//测试部分
	 $("#data-area").empty();       //移除原来的数据
	  var json = {"dataContent":[
		{"jobName":"移动公司实习生","jobSalary":"80/天","jobSettle":"月结","jobPlace":"广东省广州市天河区龙洞迎福路527号广东金融学院北苑饭堂二楼","endTime":"2019-7-21","internshipId":"23323674863278"},
		]
	  }; 
	  var dataContent=json.dataContent;
	  var data_html = "";
	  $.each(dataContent,function(index,array) {     
		data_html += "<div class='MyPreservation-model'><div class='model-JobTitle-salary'><div class='model-JobTitle'>"+array['jobName']+"</div><div class='model-salary'>￥"+array['jobSalary']+"</div><div class='model-salary'>"+array['jobSettle']+"</div></div><div class='model-WorkPlace-Deadline'><div class='model-WorkPlace'>工作地点:"+array['jobPlace']+"</div><div class='model-Deadline'>"+array['endTime']+"</div>截至</div><div class='model-Button-container'><a href='EnterpriseRelease.html?internshipId="+array['internshipId']+"'><button class='model-Button'>查看详情</button></a><a href='javaScript:Shelves("+array['internshipId']+")'><button class='model-Button'>下架</button></div></div>" 
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
		 $.each(dataContent,function(index,array) {     
			data_html += "<div class='MyPreservation-model'><div class='model-JobTitle-salary'><div class='model-JobTitle'>"+array['jobName']+"</div><div class='model-salary'>￥"+array['jobSalary']+"</div><div class='model-salary'>"+array['jobSettle']+"</div></div><div class='model-WorkPlace-Deadline'><div class='model-WorkPlace'>工作地点:"+array['jobPlace']+"</div><div class='model-Deadline'>"+array['endTime']+"</div>截至</div><div class='model-Button-container'><a href='EnterpriseRelease.html?internshipId="+array['internshipId']+"'><button class='model-Button'>查看详情</button></a><a href='javaScript:Shelves("+array['internshipId']+")'><button class='model-Button'>下架</button></div></div>" 
		});
		$("#data-area").append(data_html);
		},
		error: function() {
		  console.log("数据加载失败");
		}
	  });
	 */
})