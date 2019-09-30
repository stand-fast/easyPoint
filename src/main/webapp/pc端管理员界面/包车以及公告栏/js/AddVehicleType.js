jQuery.support.cors = true;
var curPage;        //当前页数
var totalPage;      //总页数

$(function(){
 $.ajax({
	type: 'get',
	url: "http://easypoint.club/getTotalPageAndFirstVehicleInfoList",     
	dataType: 'json',
	beforeSend:function() {
	  $("#centent").append("加载中...");
	},
	success: function(json) {
	  if(json.code == 200){
	  	console.log("查询总页数和车辆类型成功");
		$("#centent").empty();       //移除原来的分页数据
	    console.log(json.data);
	    var dataContent=json.data.vehicleInfoList; 
	    totalPage = json.data.totalPage;
	    curPage = 1;
		getMessage(dataContent);
	  }else if(json.code == 201){
	  	alert("暂无车辆类型数据，请管理员添加");
	  }
	},
	complete: function() {    //添加分页按钮栏
	  getPageBar();
	},
	error: function() {
	  console.log("数据加载失败");
	}
  });
})

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
			url: "http://easypoint.club/easyPoint/addNewVehicleInfo",     //这里是请求的后台地址，自己定义
			data: {
			"vehicleType":location,
			"deposit":deposit,
			},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(json){
				console.log(json)
				if(json.code == 200){
					console.log("添加类型类型成功");
				}else if(json.code == 400){
					alert("该车辆类型已存在,请重新输入");
				}
			},
			fail:function(json){
				console.log(json);
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
function getMessage(data){
	var data_html = "";
	$.each(data,function(index,array){  
	  data_html+="<ul class='VehicleContent'><li class='VehicleType'>"+array['vehicleType']+"</li><li class='deposit'>"+array['deposit']+"</li><li class='deleteButton'><a href='javaScript:deleteCommittee("+array['vehicleTypeId']+")'>删除</a></li></ul>"
});
	$("#centent").append(data_html);
}

//正式已添加车辆类型部分
function turnPage(page)
{
  $.ajax({
	type: 'get',
	url: "http://easypoint.club/findListPageNumVehicleInfo",     
	data: {'pageNum':page},
	dataType: 'json',
	success: function(json) {
	  if(json.code == 200){
	    console.log(json);
		$("#centent").empty();       //移除原来的分页数据
	    console.log(json.data);
	    console.log("查询第"+page+"页车辆类型数据");
	    var dataContent=json.data; 
	    curPage = page;
		getMessage(dataContent);
	  }else if(json.code == 201){
	  	console.log("已经加载完全部数据");
	  }
	},
	complete: function() {    //添加分页按钮栏
	  getPageBar();
	},
	error: function() {
	  console.log("数据加载失败");
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



