var LocString=String(window.document.location.href);
function GetQueryString(str){
var rs=new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString),tmp;
if(tmp=rs)return tmp[2];
return "没有这个参数";
}
var committeeId=GetQueryString("committeeId");
console.log("乡会订单ID："+committeeId);

function check(){
	if($('#location').val()==""){
			alert('上下车地点不能为空');
			return false
	}
	return true
}

function deletePalace(subscript){
	if(confirm("确定删除该同乡会第"+(subscript+1)+"个上下车地点")){
		console.log("确定删除该同乡会第"+(subscript+1)+"个上下车地点");
		$.ajax({
		type: 'POST',
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {
			'committeeId':committeeId,
			'subscript':subscript,
		},
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
	var json={"committee":"丰顺同乡会","committeeId":"123123123","CommitteePalace":["撒谎的卡萨丁","三安光电哈撒给","阿塞拜疆的噶数据"]}
	$("#centent").empty();
	var dataContent=json.CommitteePalace;
	var submitCommittee="submitCommittee";
	var data_html = "<h1>"+json.committee+"</h1><div class='addCommittee'><ul><label>上下车地点:</label><input id='location' type='text'/></ul><input  class='modelButton submitCommittee' id='submitCommittee' type='submit' value='添加' /></div><h1>已添加上下车地点</h1><div  class='contents'>"
	for(var i=0;i<dataContent.length;i++){
		data_html +="<ul><li>"+dataContent[i]+"</li><a href='javaScript:deletePalace("+i+")'>删除</a></ul>"
	}
	data_html +="</div>"
	$("#centent").append(data_html);
	/*正式部分
	$.ajax({
	type: 'POST',
	url: commentDataUrl,     //这里是请求的后台地址，自己定义
	data:{"committeeId":committeeId
	},
	dataType: 'json',
	success: function(json) {
		$("#centent").empty();
	 	var dataContent=json.CommitteePalace;
		var submitCommittee="submitCommittee";
		var data_html = "<h1>"+json.committee+"</h1><div class='addCommittee'><ul><label>上下车地点:</label><input id='location' type='text'/></ul><input  class='modelButton submitCommittee' id='submitCommittee' type='submit' value='添加' /></div><h1>已添加上下车地点</h1><div  class='contents'>"
		for(var i=0;i<dataContent.length;i++){
			data_html +="<ul><li>"+dataContent[i]+"</li><a href='javaScript:deletePalace("+i+")'>删除</a></ul>"
		}
		data_html +="</div>"
		$("#centent").append(data_html);
  	 }	
   })
   */
	
	//提交按钮
	$("#submitCommittee").click(function(){
	var location1=$('#location').val();
	if(check()==true){
		if(confirm("上下车地点 : "+location1)){
			$.ajax({
			type: "post",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"location1":location1,
			},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(json){
				if (json.success){  //修改成功
				   alert("添加上下车地点成功") //修改成功处理代码...
				}else {  //修改失败
				   alert("添加上下车地点失败") //修改失败处理代码...
				}
			}
		});
		
		}else{
			console.log("你取消了提交");
		}
	}
	})
})

