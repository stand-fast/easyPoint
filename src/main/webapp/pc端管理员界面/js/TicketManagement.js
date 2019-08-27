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
	  $("#data-area").empty();       //移除原来的分页数据
	  var data_content=json.TicketManagement;
	  totalItem = json.totalItem;
	  curPage = json.page;
	  totalPage = parseInt(totalItem/4)+1;
	  var data_html = "";
	  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		if(array['type']==1){
			array['type']="正在售卖"
		}
		if(array['type']==2){
			array['type']="预售"
		}
		data_html += "<div class='Shelf'><table><tr><td>"+array['departurePlace']+"</td>"+"<td>"+array['destination']+"</td>"+"<td>"+array['departureTime']+"</td>"+"<td>"+array['seatSurplus']+"</td>"+"<td>"+array['price']+"</td>"+"<td>"+array['type']+"</td><td><a href='PurchaseDetails.html?ticketId="+array['ticketId']+" '>详情</a></td><td><a href='javascript:ShelvesSubmit("+array['ticketId']+")'>下架</a></td></tr></table></div>";
	  });
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


//下架部分
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
	  $("#data-areaSecond").empty();       //移除原来的分页数据
	  var data_content=json.offTheShelf;
	  totalItemSecond = json.totalItem;
	  curPageSecond  = json.page;
	  totalPageSecond  = parseInt(totalItem/3)+1;
	  var data_html = "";
	  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的
		if(array['type']==1){
			array['type']="售卖"
		}
		if(array['type']==2){
			array['type']="预售"
		}
		data_html += "<div class='Shelf'><table><tr><td>"+array['departurePlace']+"</td>"+"<td>"+array['destination']+"</td>"+"<td>"+array['departureTime']+"</td>"+"<td>"+array['seatSurplus']+"</td>"+"<td>"+array['price']+"</td>"+"<td>"+array['type']+"</td><td><a href='PurchaseDetails.html?ticketId="+array['ticketId']+" '>详情</a></td><td>已下架</td></tr></table></div>";
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
function PurchaseDetails(ticketId){
	alert(ticketId);
}
turnPage(1);
turnPageSecond(1);

function ShelvesSubmit(ticketId){
	if(confirm("确定是否下架")){
		alert("车票ID:"+ticketId+"下架（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"ticketId":ticketId},//提交的数据
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
		alert("你取消了下架")
	}
}
//接上服务器后删掉
getPageBar();
function turnPage(page){ 
	$("#data-area").empty();       //移除原来的分页数据
	curPage=page;
	getPageBar();
	var json = {"TicketManagement":[
	{"departurePlace":"广金","destination":"广金","departureTime":"2019-07-10","seatSurplus":"23","phone":"13045612312","price":"150","type":"2","ticketId":"123132"},
	],"totalItem":"10","page":"1"
	};  //测试数据
	var data_content=json.TicketManagement;
	totalItem = json.totalItem;
	curPage = json.page;
	totalPage = parseInt(totalItem/4)+1;
	var data_html = "";
	$.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		if(array['type']==1){
			array['type']="正在售卖"
		}
		if(array['type']==2){
			array['type']="预售"
		}
	data_html += "<div class='Shelf'><table><tr><td>"+array['departurePlace']+"</td>"+"<td>"+array['destination']+"</td>"+"<td>"+array['departureTime']+"</td>"+"<td>"+array['seatSurplus']+"</td>"+"<td>"+array['price']+"</td>"+"<td>"+array['type']+"</td><td><a href='PurchaseDetails.html?ticketId="+array['ticketId']+" '>详情</a></td><td><a href='javascript:ShelvesSubmit("+array['ticketId']+")'>下架</a></td></tr></table></div>";
	  });
	$("#data-area").append(data_html);
};
getPageBarSecond();
function turnPageSecond(pageSecond){
	 $("#data-areaSecond").empty();       //移除原来的分页数据
	curPageSecond=pageSecond;
	getPageBarSecond();
	var json = {"offTheShelf":[
	{"departurePlace":"广金","destination":"广金","departureTime":"2019-07-10","seatSurplus":"23","phone":"13045612312","price":"150","type":"1","ticketId":"123132"},
	],"totalItem":"10","page":"1"
	};  //测试数据
	var data_content=json.offTheShelf;
	totalItemSecond = json.totalItem;
	curPageSecond  = json.page;
	totalPageSecond  = parseInt(totalItem/3)+1;
	var data_html = "";
	$.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		if(array['type']==1){
			array['type']="售卖"
		}
		if(array['type']==2){
			array['type']="预售"
		}
	data_html += "<div class='Shelf'><table><tr><td>"+array['departurePlace']+"</td>"+"<td>"+array['destination']+"</td>"+"<td>"+array['departureTime']+"</td>"+"<td>"+array['seatSurplus']+"</td>"+"<td>"+array['price']+"</td>"+"<td>"+array['type']+"</td><td><a href='PurchaseDetails.html?ticketId="+array['ticketId']+" '>详情</a></td><td>已下架</td></tr></table></div>";
	  });
	$("#data-areaSecond").append(data_html);
};