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
	  console.log("请求租车订单第"+page+"页数据");
	  $("#data-area").empty();       //移除原来的分页数据
	  var data_content=json.CarRentalOrder;
	  totalItem = json.totalItem;
	  curPage = json.page;
	  if(totalItem%11==0){			//每页11条数据
		totalPage = parseInt(totalItem/11);
	  }
	  else{
		totalPage = parseInt(totalItem/11)+1;
	  }
	  var data_html = "";
	  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单
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
			data_html += "<div class='containerRentalOrder'><ul><li title="+array['departurePlace']+">"+array['departurePlace']+"</li><li title="+array['destination']+">"+array['destination']+"</li class='RentalOrderCenter'><li class='RentalOrderCenter'>"+array['travelNum']+"</li><li>"+array['departureTime']+"</li><li class='RentalOrderCenter'>无</li><li>"+array['vehicleType']+"</li><li class='RentalOrderCenter'>"+array['isInsurance']+"</li><li class='RentalOrderCenter'>"+array['username']+"</li><li>"+array['phone']+"</li><li class='RentalOrderCenter'>"+array['status']+"</li><li class='RentalOrderCenter'><a href='vehicle-information-entry.html?tourismId="+array['tourismId']+"'>进入</a></li></ul></div>"; 
		}
		else{
			data_html += "<div class='containerRentalOrder'><ul><li title="+array['departurePlace']+">"+array['departurePlace']+"</li><li title="+array['destination']+">"+array['destination']+"</li class='RentalOrderCenter'><li class='RentalOrderCenter'>"+array['travelNum']+"</li><li>"+array['departureTime']+"</li><li>"+array['backTime']+"</li><li>"+array['vehicleType']+"</li><li class='RentalOrderCenter'>"+array['isInsurance']+"</li><li class='RentalOrderCenter'>"+array['username']+"</li><li>"+array['phone']+"</li><li class='RentalOrderCenter'>"+array['status']+"</li><li class='RentalOrderCenter'><a href='vehicle-information-entry.html?tourismId="+array['tourismId']+"'>进入</a></li></ul></div>"; 
		}
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
//页面加载时初始化分页
turnPage(1);
function CarRentalStatement(RentalCarId){
	if(confirm("确定是否结单")){
		alert("租车ID:"+RentalCarId+"结单（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"RentalCarId":RentalCarId},//提交的数据
				dataType: "json",//返回的数据类型格式
				success: function(msg){
					if (msg.success){  //修改成功
					   alert("结单成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("结单失败") //修改失败处理代码...
					}
				}
			});
	}else{
		alert("你取消了结单");
	}
}
//接上服务器后删掉
getPageBar()
function turnPage(page){
	console.log("请求租车订单第"+page+"页数据");
    $("#data-area").empty();       //移除原来的分页数据
	curPage=page;  
	getPageBar();
	var json = {"CarRentalOrder":[
	{"departurePlace":"广州市区广州市区广州市区","destination":"广金广金广金广金广金广金广金广金","travelNum":"50","departureTime":"2019-07-10 14:01","isBack":"1","backTime":"2019-07-11 14:01","username":"肖奈","phone":"13045612312","vehicleType":"53座豪华大巴","isInsurance":"1","status":"1","tourismId":"123132"},
	],"totalItem":"20","page":"1"
	};  //测试数据   每页11条数据
	var data_content=json.CarRentalOrder;
	totalItem = json.totalItem;
	curPage = json.page;
	if(totalItem%11==0){			//每页11条数据
		totalPage = parseInt(totalItem/11);
	}
	else{
		totalPage = parseInt(totalItem/11)+1;
	}
	var data_html = "";
	$.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单
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
			data_html += "<div class='containerRentalOrder'><ul><li title="+array['departurePlace']+">"+array['departurePlace']+"</li><li title="+array['destination']+">"+array['destination']+"</li class='RentalOrderCenter'><li class='RentalOrderCenter'>"+array['travelNum']+"</li><li>"+array['departureTime']+"</li><li class='RentalOrderCenter'>无</li><li>"+array['vehicleType']+"</li><li class='RentalOrderCenter'>"+array['isInsurance']+"</li><li class='RentalOrderCenter'>"+array['username']+"</li><li>"+array['phone']+"</li><li class='RentalOrderCenter'>"+array['status']+"</li><li class='RentalOrderCenter'><a href='vehicle-information-entry.html?tourismId="+array['tourismId']+"'>进入</a></li></ul></div>"; 
		}
		else{
			data_html += "<div class='containerRentalOrder'><ul><li title="+array['departurePlace']+">"+array['departurePlace']+"</li><li title="+array['destination']+">"+array['destination']+"</li class='RentalOrderCenter'><li class='RentalOrderCenter'>"+array['travelNum']+"</li><li>"+array['departureTime']+"</li><li>"+array['backTime']+"</li><li>"+array['vehicleType']+"</li><li class='RentalOrderCenter'>"+array['isInsurance']+"</li><li class='RentalOrderCenter'>"+array['username']+"</li><li>"+array['phone']+"</li><li class='RentalOrderCenter'>"+array['status']+"</li><li class='RentalOrderCenter'><a href='vehicle-information-entry.html?tourismId="+array['tourismId']+"'>进入</a></li></ul></div>"; 
		}
	});
	$("#data-area").append(data_html);
};