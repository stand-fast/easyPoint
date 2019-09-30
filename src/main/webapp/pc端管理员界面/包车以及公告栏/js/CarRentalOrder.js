var curPage;        //当前页数
var totalPage;      //总页数
$(function(){
	console.log("加载完成");
});
//页面加载时初始化分页
$(function(){
	$.ajax({
	type: 'get',
	url: 'http://easypoint.club/getTotalPageAndFirstTourismOrderInfoList',  
	dataType: 'json',
	beforeSend: function() {
	  $("#data-area").append("加载中...");
	},
	success: function(json) {
	  if(json.code == 200){
		  console.log("查询订单页数以及首页订单信息成功");
	      console.log(json.data);
		  $("#data-area").empty();       //移除原来的分页数据
		  var dataContent=json.data.partTourismOrderInfos;
		  totalPage = json.data.totalPage;
		  curPage = 1;
		  getMessage(dataContent); 
	  }else if(json.code == 201){
	  	  console.log("暂无订单信息");
	  }
	},
	complete: function() {    //添加分页按钮栏
	  getPageBar();
	},
	error: function() {
	  alert("数据加载失败");
	}
  });
})
function getMessage(data){
	  var data_html = "";
	  $.each(data,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单
		if(array['isInsurance']=="0"){
			array['isInsurance']="否"
		}
		else if(array['isInsurance']=="1"){
			array['isInsurance']="是"
		}
		if(array['status']=="1"){
			array['status']="未安排"
		}
		else if(array['status']=="2"){
			array['status']="已安排"
		}
		if(array['isBack']=="0"){
			data_html += "<div class='containerRentalOrder'><ul><li title="+array['departurePlace']+">"+array['departurePlace']+"</li><li title="+array['destination']+">"+array['destination']+"</li class='RentalOrderCenter'><li class='RentalOrderCenter'>"+array['travelNum']+"</li><li>"+array['departureTime']+"</li><li class='RentalOrderCenter'>无</li><li>"+array['vehicleType']+"("+array['deposit']+")</li><li class='RentalOrderCenter'>"+array['isInsurance']+"</li><li class='RentalOrderCenter'>"+array['username']+"</li><li>"+array['phone']+"</li><li class='RentalOrderCenter'>"+array['status']+"</li><li class='RentalOrderCenter'><a href='vehicle-information-entry.html?travelOrderId="+array['travelOrderId']+"'>进入</a></li></ul></div>"; 
		}
		else{
			data_html += "<div class='containerRentalOrder'><ul><li title="+array['departurePlace']+">"+array['departurePlace']+"</li><li title="+array['destination']+">"+array['destination']+"</li class='RentalOrderCenter'><li class='RentalOrderCenter'>"+array['travelNum']+"</li><li>"+array['departureTime']+"</li><li>"+array['backTime']+"</li><li>"+array['vehicleType']+"("+array['deposit']+")</li><li class='RentalOrderCenter'>"+array['isInsurance']+"</li><li class='RentalOrderCenter'>"+array['username']+"</li><li>"+array['phone']+"</li><li class='RentalOrderCenter'>"+array['status']+"</li><li class='RentalOrderCenter'><a href='vehicle-information-entry.html?travelOrderId="+array['travelOrderId']+"'>进入</a></li></ul></div>"; 
		}
	  });
	  $("#data-area").append(data_html);
}
function turnPage(page)
{
  $.ajax({
	type: 'get',
	url: 'http://easypoint.club/findListPageNumTourismOrderInfo',     //这里是请求的后台地址，自己定义
	data: {'pageNum':page},
	dataType: 'json',
	success: function(json) {
	  if(json.code == 200) {
		  console.log("查询租车订单第"+page+"页数据");
		  $("#data-area").empty();       //移除原来的分页数据
		  var dataContent=json.data;
		  curPage = page;  
		  console.log(dataContent);
		  getMessage(dataContent); 	  
	  }else if( json.code == 201){
	  	  console.log("数据已经全部加载");
	  }
	  
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