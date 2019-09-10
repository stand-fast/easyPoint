function check(smallint,price){
	if($('#location1').val()==""){
			alert('同乡会名称不能为空');
			return false
	}
	return true
}
//提交按钮
$("#submitCommittee").click(function(){
	var location1=$('#location1').val();
	if(check()==true){
		if(confirm("同乡会名称 : "+location1)){
			$.ajax({
			type: "post",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"location1":location1,
			},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(json){
				if (json.success){  //修改成功
				   alert("添加同乡会成功") //修改成功处理代码...
				}else {  //修改失败
				   alert("添加同乡会失败") //修改失败处理代码...
				}
			}
		});
		
		}else{
			console.log("你取消了提交");
		}
	}
})
function deleteCommittee(committeeId){
	if(confirm("确定删除该同乡会?")){
		console.log("删除同乡会,committeeId为:"+committeeId);
		$.ajax({
		type: 'POST',
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {'committeeId':committeeId},
		dataType: 'json',
		success: function(json) {
			if(json.success){
				alert("删除成功");
			}	
		  }
		})
	}
	else{
		console.log("你取消了删除")
	}
}
$(function(){
	//测试部分
	var json={dataContent:[{"committee":"丰顺同乡会","committeeId":"123123123"},{"committee":"汕头同乡会","committeeId":"53123123"},{"committee":"普宁同乡会","committeeId":"6123123"},
	]};
	$("#centent").empty();
	var dataContent=json.dataContent;
	var data_html = "";
	$.each(dataContent,function(index,array){  
		data_html+="<ul><li>"+array['committee']+"</li><a href='addLocation.html?committeeId="+array['committeeId']+"'>添加上下车地点</a><a href='javaScript:deleteCommittee("+array['committeeId']+")'>删除</a></ul>"
	});
	$("#centent").append(data_html);
	/*正式部分
	$.ajax({
	type: 'POST',
	url: commentDataUrl,     //这里是请求的后台地址，自己定义
	dataType: 'json',
	success: function(json) {
	 	$("#centent").empty();
		var dataContent=json.dataContent;
		var data_html = "";
		$.each(dataContent,function(index,array){  
			data_html+="<ul><li>"+array['committee']+"</li><a href='addLocation.html?committeeId="+array['committeeId']+"'>添加上下车地点</a><a href='javaScript:deleteCommittee("+array['committeeId']+")'>删除</a></ul>"
		});
		$("#centent").append(data_html);
  	 }	
   })
   */

})

