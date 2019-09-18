var curPage;        //当前页数
var totalItem;      //总记录数
var totalPage;      //总页数

turnPage(1);
function check(deposit){
	function isInteger(obj) {
		 return obj%1 === 0
		}
	if($('#location').val()==""){
			alert('车辆类型不能为空');
			return false
		}
	if(deposit==""){
			alert('定金不能为空');
			return false
		}
	else if(isNaN(Number(deposit,))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('定金不是数字!');
			return false
		}
	else if(isInteger(deposit)==false){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('座位数不是整数!');
			return false
		}
	else if(deposit<0){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('定金不能为负数');
			return false
		}
	return true
}
//提交按钮
$("#submitCommittee").click(function(){
	var location=$('#location').val();
	var deposit=$('#deposit').val();
	if(check(deposit)==true){
		if(confirm("车辆类型 : "+location+"\r定金 : "+ deposit)){
			$.ajax({
			type: "post",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"vehicleType":location,
			"deposit":deposit,
			},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(json){
				if (json.success){  //修改成功
				   alert("添加车辆类型成功") //修改成功处理代码...
				}else {  //修改失败
				   alert("添加车辆类型失败") //修改失败处理代码...
				}
			}
		});
		
		}else{
			console.log("你取消了添加");
		}
	}
})
function deleteCommittee(vehicleTypeId){
	if(confirm("确定删除该车辆类型?")){
		console.log("删除该车辆类型:vehicleTypeId为:"+vehicleTypeId);
		$.ajax({
		type: 'POST',
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {'vehicleTypeId':vehicleTypeId},
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
//正式已添加车辆类型部分
function turnPage(page)
{
  $.ajax({
	type: 'POST',
	url: commentDataUrl,     //这里是请求的后台地址，自己定义
	data: {'pageNum':page},
	dataType: 'json',
	beforeSend: function() {
	  $("#data-area").append("加载中...");
	},
	success: function(json) {
	  console.log("请求第"+page+"页车辆类型数据");
	  $("#data-area").empty();       //移除原来的分页数据
	  var dataContent=json.dataContent;
	  totalItem = json.totalItem;
	  curPage = json.page;
	  if(totalItem%4==0){			//每页4条数据
	  	  totalPage = parseInt(totalItem/4);
	  }
	  else{
		  totalPage = parseInt(totalItem/4)+1;
	  }
	  var data_html = "";
	  $.each(dataContent,function(index,array){  
		data_html+="<ul class='VehicleContent'><li class='VehicleType'>"+array['vehicleType']+"</li><li class='deposit'>"+array['deposit']+"</li><li class='deleteButton'><a href='javaScript:deleteCommittee("+array['vehicleTypeId']+")'>删除</a></li></ul>"
	});
	  $("#centent").append(data_html);
	},
	complete: function() {    //添加分页按钮栏
	  getPageBar();
	},
	error: function() {
	  alert("数据加载失败");
	}
  });
}

function getPageBar()
{	
  if(curPage > totalPage) {
	curPage = totalPage;
  }
  if(curPage < 1) {
	curPage = 1;
  }
  var pageBar = "<ul class=\'pages\'>";
  //显示的页码按钮(5个)
  var start,end;
  if(totalPage <= 5) {
	start = 1;
	end = totalPage;
  } else {
	if(curPage-2 <= 0) {
		start = 1;
		end = 5;
	} else {
		if(totalPage-curPage < 2) {
			start = totalPage - 4;
			end = totalPage;
		} else {
			start = curPage - 2;
			end = curPage + 2;
		}
	}
  }
  for(var i=start;i<=end;i++) {
	if(i == curPage) {
		pageBar += "<li class='page-item'><a href='javascript:turnPage("+i+")'>"+"<button class='select'>"+i+"</button></a></li>";
	} else {
		pageBar += "<li class='page-item'><a href='javascript:turnPage("+i+")'>"+"<button>"+i+"</button></a></li>";
	}
  }
  pageBar += "</ul>";
  document.getElementById('pageBar').innerHTML=pageBar;
}


//测试部分
getPageBar();
function turnPage(page){ 
	console.log("请求第"+page+"页车辆类型数据");
	$("#centent").empty();       //移除原来的分页数据
	curPage=page;
	getPageBar();
	var json={dataContent:[{"vehicleType":"14座商务座","deposit":"200","vehicleTypeId":"123123132123"},{"vehicleType":"14座商务座","deposit":"200","vehicleTypeId":"123123132123"},{"vehicleType":"14座商务座","deposit":"200","vehicleTypeId":"123123132123"},{"vehicleType":"14座商务座","deposit":"200","vehicleTypeId":"123123132123"}
	],"totalItem":"10","page":"1"}; //测试数据
	var dataContent=json.dataContent;
	totalItem = json.totalItem;
	curPage = json.page;
	if(totalItem%4==0){			//每页4条数据
		totalPage = parseInt(totalItem/4);
	}
	else{
		totalPage = parseInt(totalItem/4)+1;
	}
	var data_html = "";
	$.each(dataContent,function(index,array){  
		data_html+="<ul class='VehicleContent'><li class='VehicleType'>"+array['vehicleType']+"</li><li class='deposit'>"+array['deposit']+"</li><li class='deleteButton'><a href='javaScript:deleteCommittee("+array['vehicleTypeId']+")'>删除</a></li></ul>"
	});
	$("#centent").append(data_html);
};


