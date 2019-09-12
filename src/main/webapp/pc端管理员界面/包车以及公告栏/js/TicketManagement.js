var curPage;        //当前页数
var totalItem;      //总记录数
var totalPage;      //总页数

var curPageSecond;        //当前页数
var totalItemSecond;      //总记录数
var totalPageSecond;      //总页数
//获取分页数据
$(function(){
	console.log("加载完成");
});
//正在上架正式部分
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
	  console.log("请求第"+page+"页上架数据");
	  $("#data-area").empty();       //移除原来的分页数据
	  var data_content=json.TicketManagement;
	  totalItem = json.totalItem;
	  curPage = json.page;
	  if(totalItem%4==0){			//每页4条数据
	  	totalPage = parseInt(totalItem/4);
	  }
	  else{
	   	totalPage = parseInt(totalItem/4)+1;
	  }
	  var data_html = "";
	  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		if(array['type']==1){
			data_html += "<div class='OnTheShelf'><ul><li>"+array['ruralCommittee']+"</li><li title='"+array['departurePlace']+"'>"+array['departurePlace']+"</li><li title='"+array['departurePlace']+"'>"+array['destination']+"</li><li>"+array['departureTime']+"</li><li>"+array['ReleaseTime']+"</li><li class='CenterVertically'>正式</li><li class='CenterVertically'>"+array['price']+"</li><li class='CenterVertically'>"+array['seatSurplus']+"</li><li class='CenterVertically'><a href='PurchaseDetails.html?ticketId="+array['ticketId']+"'>购票详情</a></li><li class='CenterVertically'><a href='VehicleEntry.html?tourismId="+array['ticketId']+"'>车辆信息</a></li><li class='CenterVertically'><a href='javaScript:ShelvesSubmit("+array['ticketId']+")'>下架</a></li></ul></div>";
		}
		if(array['type']==2){
			data_html += "<div class='OnTheShelf'><ul><li>"+array['ruralCommittee']+"</li><li title='"+array['departurePlace']+"'>"+array['departurePlace']+"</li><li title='"+array['departurePlace']+"'>"+array['destination']+"</li><li>"+array['departureTime']+"</li><li>"+array['ReleaseTime']+"</li><li class='CenterVertically'>预售</li><li class='CenterVertically'>"+array['price']+"</li><li class='CenterVertically'>"+array['seatSurplus']+"</li><li class='CenterVertically'><a href='PurchaseDetails.html?ticketId="+array['ticketId']+"'>购票详情</a></li><li class='CenterVertically'><a href='javaScript:notifyShelves("+array['ticketId']+")'>通知上架</a></li><li class='CenterVertically'><a href='javaScript:ShelvesSubmit("+array['ticketId']+")'>下架</a></li></ul></div>";
		}
	  })
	  $("#data-area").append(data_html);
	},
	complete: function() {    //添加分页按钮栏
	  getPageBar();
	},
	error: function() {
	  alert("数据加载失败");
	}
  });
}
//获取分页条（分页按钮栏的规则和样式根据自己的需要来设置）
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


//下架正式部分
function turnPageSecond(page)
{
  $.ajax({
	type: 'POST',
	url: commentDataUrl,     //这里是请求的后台地址，自己定义
	data: {'pageNum':page},
	dataType: 'json',
	beforeSend: function() {
	  $("#data-areaSecond").append("加载中...");
	},
	success: function(json) {
	  console.log("请求第"+pageSecond+"页已下架数据");
	  $("#data-areaSecond").empty();       //移除原来的分页数据
	  var data_content=json.TicketManagement;
	  totalItemSecond = json.totalItem;
	  curPageSecond = json.page;
	  if(totalItemSecond%3==0){			//每页3条数据
	  	  totalPageSecond = parseInt(totalItemSecond/3);
	  }
	  else{
		  totalPageSecond = parseInt(totalItemSecond/3)+1;
	  }
	  var data_html = "";
	  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		data_html += "<div class='OnTheShelf'><ul><li>"+array['ruralCommittee']+"</li><li title='"+array['departurePlace']+"'>"+array['departurePlace']+"</li><li title='"+array['destination']+"'>"+array['destination']+"</li><li>"+array['departureTime']+"</li><li>"+array['ReleaseTime']+"</li><li class='CenterVertically'>"
		if(array['type']==1){
			data_html +="正式</li><li class='CenterVertically'>"+array['price']+"</li><li class='CenterVertically'>"+array['seatSurplus']+"</li><li class='CenterVertically'><a href='PurchaseDetails.html?ticketId="+array['ticketId']+"'>购票详情</a></li><li class='CenterVertically'><a href='VehicleEntry.html?tourismId="+array['ticketId']+"'>车辆信息</a></li><li class='CenterVertically'><a href='javaScript:deleteTicket("+array['ticketId']+")'>删除</a></li></ul></div>";
		}
		if(array['type']==2){
			data_html +="预售</li><li class='CenterVertically'>"+array['price']+"</li><li class='CenterVertically'>"+array['seatSurplus']+"</li><li class='CenterVertically'><a href='PurchaseDetails.html?ticketId="+array['ticketId']+"'>购票详情</a></li><li class='CenterVertically'>无</li><li class='CenterVertically'><a href='javaScript:deleteTicket("+array['ticketId']+")'>删除</a></li></ul></div>";
		}
	  });
	 $("#data-areaSecond").append(data_html);
	},
	complete: function() {    //添加分页按钮栏
	  getPageBarSecond();
	},
	error: function() {
	  alert("数据加载失败");
	}
  });
}
function getPageBarSecond()
{	
  if(curPageSecond > totalPageSecond) {
	curPageSecond = totalPageSecond;
  }
  if(curPageSecond < 1) {
	curPageSecond = 1;
  }
  var pageBar = "<ul class=\'pages\'>";
  //显示的页码按钮(5个)
  var start,end;
  if(totalPageSecond <= 5) {
	start = 1;
	end = totalPageSecond;
  } else {
	if(curPageSecond-2 <= 0) {
		start = 1;
		end = 5;
	} else {
		if(totalPageSecond-curPageSecond < 2) {
			start = totalPageSecond - 4;
			end = totalPageSecond;
		} else {
			start = curPageSecond - 2;
			end = curPageSecond + 2;
		}
	}
  }
  for(var i=start;i<=end;i++) {
	if(i == curPageSecond) {
		pageBar += "<li class='page-item'><a href='javascript:turnPageSecond("+i+")'>"+"<button class='select'>"+i+"</button></a></li>";
	} else {
		pageBar += "<li class='page-item'><a href='javascript:turnPageSecond("+i+")'>"+"<button>"+i+"</button></a></li>";
	}
  }
  pageBar += "</ul>";
  document.getElementById('pageBarSecond').innerHTML=pageBar;
}
//页面加载时初始化分页
turnPage(1);
turnPageSecond(1);

function ShelvesSubmit(ticketId){
	if(confirm("确定是否下架")){
		alert("包车ID:"+ticketId+"下架（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"ticketId":ticketId},//提交的数据
				dataType: "json",//返回的数据类型格式
				success: function(json){
					if (json.success){  //修改成功
					   alert("下架成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("下架失败") //修改失败处理代码...
					}
				}
			});
	}else{
		console.log("你取消了下架")
	}
}
function deleteTicket(ticketId){
	if(confirm("确定是否删除")){
		alert("包车ID:"+ticketId+"删除（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"ticketId":ticketId},//提交的数据
				dataType: "json",//返回的数据类型格式
				success: function(json){
					if (json.success){  //修改成功
					   alert("下架成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("下架失败") //修改失败处理代码...
					}
				}
			});
	}else{
		console.log("你取消了下架")
	}
}
function notifyShelves(ticketId){
	if(confirm("确定是否通知用户并上架")){
		alert("包车ID:"+ticketId+"通知用户并上架（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"ticketId":ticketId},//提交的数据
				dataType: "json",//返回的数据类型格式
				success: function(json){
					if (json.success){  //修改成功
					   alert("通知用户并上架成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("通知用户并上架失败") //修改失败处理代码...
					}
				}
			});
	}else{
		console.log("你取消了通知用户并上架")
	}
}


//正在上架测试部分,接上服务器后删掉
getPageBar();
function turnPage(page){ 
	console.log("请求第"+page+"页上架数据");
	$("#data-area").empty();       //移除原来的分页数据
	curPage=page;
	getPageBar();
	var json = {"TicketManagement":[
	{"ruralCommittee":"丰顺同乡会","departurePlace":"广金","destination":"广金","departureTime":"2019-07-10 14:00","ReleaseTime":"2019-06-10 22:00","type":"1","seatSurplus":"13","price":"150","ticketId":"123132"},{"ruralCommittee":"丰顺同乡会","departurePlace":"广金","destination":"广金","departureTime":"2019-07-10 14:00","ReleaseTime":"2019-06-10 22:00","type":"2","seatSurplus":"13","price":"150","ticketId":"123132"},
	],"totalItem":"10","page":"1"
	};  //测试数据
	var data_content=json.TicketManagement;
	totalItem = json.totalItem;
	curPage = json.page;
	if(totalItem%5==0){			//每页5条数据
		totalPage = parseInt(totalItem/5);
	}
	else{
		totalPage = parseInt(totalItem/5)+1;
	}
	var data_html = "";
	$.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		if(array['type']==1){
			data_html += "<div class='OnTheShelf'><ul><li>"+array['ruralCommittee']+"</li><li title='"+array['departurePlace']+"'>"+array['departurePlace']+"</li><li title='"+array['departurePlace']+"'>"+array['destination']+"</li><li>"+array['departureTime']+"</li><li>"+array['ReleaseTime']+"</li><li class='CenterVertically'>正式</li><li class='CenterVertically'>"+array['price']+"</li><li class='CenterVertically'>"+array['seatSurplus']+"</li><li class='CenterVertically'><a href='PurchaseDetails.html?ticketId="+array['ticketId']+"'>购票详情</a></li><li class='CenterVertically'><a href='VehicleEntry.html?tourismId="+array['ticketId']+"'>车辆信息</a></li><li class='CenterVertically'><a href='javaScript:ShelvesSubmit("+array['ticketId']+")'>下架</a></li></ul></div>";
		}
		if(array['type']==2){
			data_html += "<div class='OnTheShelf'><ul><li>"+array['ruralCommittee']+"</li><li title='"+array['departurePlace']+"'>"+array['departurePlace']+"</li><li title='"+array['departurePlace']+"'>"+array['destination']+"</li><li>"+array['departureTime']+"</li><li>"+array['ReleaseTime']+"</li><li class='CenterVertically'>预售</li><li class='CenterVertically'>"+array['price']+"</li><li class='CenterVertically'>"+array['seatSurplus']+"</li><li class='CenterVertically'><a href='PurchaseDetails.html?ticketId="+array['ticketId']+"'>购票详情</a></li><li class='CenterVertically'><a href='javaScript:notifyShelves("+array['ticketId']+")'>通知上架</a></li><li class='CenterVertically'><a href='javaScript:ShelvesSubmit("+array['ticketId']+")'>下架</a></li></ul></div>";
		}
		
	  });
	$("#data-area").append(data_html);
};

//下架测试部分,接上服务器后删掉
getPageBarSecond();
function turnPageSecond(pageSecond){
	console.log("请求第"+pageSecond+"页已下架数据");
	$("#data-areaSecond").empty();       //移除原来的分页数据
	curPageSecond=pageSecond;
	getPageBarSecond();
	var json = {"TicketManagement":[
	{"ruralCommittee":"丰顺同乡会","departurePlace":"广金","destination":"广金","departureTime":"2019-07-10 14:00","ReleaseTime":"2019-06-10 22:00","type":"2","seatSurplus":"13","price":"150","ticketId":"123132"},
	],"totalItem":"10","page":"1"
	};  //测试数据
	var data_content=json.TicketManagement;
	totalItemSecond = json.totalItem;
	curPageSecond = json.page;
	if(totalItemSecond%3==0){			//每页3条数据
		totalPageSecond = parseInt(totalItemSecond/3);
	}
	else{
		totalPageSecond = parseInt(totalItemSecond/3)+1;
	}
	var data_html = "";
	$.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		data_html += "<div class='OnTheShelf'><ul><li>"+array['ruralCommittee']+"</li><li title='"+array['departurePlace']+"'>"+array['departurePlace']+"</li><li title='"+array['destination']+"'>"+array['destination']+"</li><li>"+array['departureTime']+"</li><li>"+array['ReleaseTime']+"</li><li class='CenterVertically'>"
		if(array['type']==1){
			data_html +="正式</li><li class='CenterVertically'>"+array['price']+"</li><li class='CenterVertically'>"+array['seatSurplus']+"</li><li class='CenterVertically'><a href='PurchaseDetails.html?ticketId="+array['ticketId']+"'>购票详情</a></li><li class='CenterVertically'><a href='VehicleEntry.html?tourismId="+array['ticketId']+"'>车辆信息</a></li><li class='CenterVertically'><a href='javaScript:deleteTicket("+array['ticketId']+")'>删除</a></li></ul></div>";
		}
		if(array['type']==2){
			data_html +="预售</li><li class='CenterVertically'>"+array['price']+"</li><li class='CenterVertically'>"+array['seatSurplus']+"</li><li class='CenterVertically'><a href='PurchaseDetails.html?ticketId="+array['ticketId']+"'>购票详情</a></li><li class='CenterVertically'>无</li><li class='CenterVertically'><a href='javaScript:deleteTicket("+array['ticketId']+")'>删除</a></li></ul></div>";
		}
	 });
	$("#data-areaSecond").append(data_html);
};