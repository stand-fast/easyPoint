var curPage;        //当前页数
var totalItem;      //总记录数
var totalPage;      //总页数
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
	  var data_content = json.HistoryAnnouncement;
	  totalItem = json.totalItem;
	  curPage = json.page;
   	  if(totalItem%6==0){			//每页6条数据
		totalPage = parseInt(totalItem/6);
			}
	  else{
			totalPage = parseInt(totalItem/6)+1;
			}
	  var data_html = "";
	  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		 if(array['type']==1){
			array['type']="小程序"
		}
		if(array['type']==2){
			array['type']="商家"
		}
		data_html += "<table><tr><td  colspan='6'>"+array['announcement']+"</td><td>"+array['type']+"</td><td>"+array['underTime']+"</td></tr></table>";
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
//页面加载时初始化分页50   9     5
turnPage(1);
//接上服务器后删掉
getPageBar()
function turnPage(page){
	curPage=page;
	getPageBar();
	var json = {"HistoryAnnouncement":[
	{"announcement":"广金","type":"1","underTime":"2019-07-10"},{"announcement":"广金肇庆","type":"2","underTime":"2019-02-10"}
	],"totalItem":"21","page":"1"
	};
    //$("#data-area").empty();       //移除原来的分页数据
	var data_content = json.HistoryAnnouncement;
	totalItem = json.totalItem;
	curPage = json.page;
	if(totalItem%6==0){			//每页6条数据
		totalPage = parseInt(totalItem/6);
	}
	else{
		totalPage = parseInt(totalItem/6)+1;
	}
	var data_html = "";
	$.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		 if(array['type']==1){
			array['type']="小程序"
		}
		if(array['type']==2){
			array['type']="商家"
		}
		data_html += "<table><tr><td  colspan='6'>"+array['announcement']+"</td><td>"+array['type']+"</td><td>"+array['underTime']+"</td></tr></table>";
	  });
	$("#data-area").append(data_html);
};