var LocString=String(window.document.location.href);
function GetQueryString(str){
var rs=new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString),tmp;
if(tmp=rs)return tmp[2];
return "没有这个参数";
}
var internshipId=GetQueryString("internshipId");
console.log("ID："+internshipId);


$(function(){
	//测试部分
	  $("#data-area").empty();       //移除原来的数据
	  var json = {"dataContent":[
		{"username":"肖奈","gender":"男","phone":"13512313212","jobName":":移动公司实习生","jobContent":":负责在上菜区将菜品及时摆出，保证出餐窗口的整洁干净，及时跟进顾客的饮食情况，在结账窗口对顾客的菜品消费进行数目结账","internshipId":"23323674863278","openId":"fhasdass-jakdhjs213124jkfa"},
		]
	  }; 
	  var dataContent=json.dataContent;
	  var data_html = "";
	  $.each(dataContent,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		array['openId']='"'+array['openId']+'"';
		array['internshipId']='"'+array['internshipId']+'"';
		data_html += "<div class='MyPreservation-model'><div class='model-JobTitle-salary'><div class='model-username'>用户姓名:"+array['username']+"</div><div class='model-usergender'>性别:"+array['gender']+"</div><div class='model-userphone'>联系电话:"+array['phone']+"</div></div><div class='model-WorkPlace-Deadline'><div class='model-JobTitle'>岗位名称:"+array['jobName']+"</div><div class='model-JobContent'>工作内容:"+array['jobContent']+"</div></div><div class='model-Button-container'><a href=''><button class='model-Button'>查看简历</button></a></div></div>"
		});
	  $("#data-area").append(data_html);
	/*正式部分
	$.ajax({
		type: 'POST',
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {'internshipId':internshipId},
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
			array['internshipId']='"'+array['internshipId']+'"';
			data_html += "<div class='MyPreservation-model'><div class='model-JobTitle-salary'><div class='model-username'>用户姓名:"+array['username']+"</div><div class='model-usergender'>性别:"+array['gender']+"</div><div class='model-userphone'>联系电话:"+array['phone']+"</div></div><div class='model-WorkPlace-Deadline'><div class='model-JobTitle'>岗位名称:"+array['jobName']+"</div><div class='model-JobContent'>工作内容:"+array['jobContent']+"</div></div><div class='model-Button-container'><a href=''><button class='model-Button'>查看简历</button></a></div></div>"
			});
		  $("#data-area").append(data_html);
		},
		error: function() {
		  console.log("数据加载失败");
		}
	  });
	 */
})