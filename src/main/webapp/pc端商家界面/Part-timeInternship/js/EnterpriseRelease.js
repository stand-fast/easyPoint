var LocString=String(window.document.location.href);
function GetQueryString(str){
var rs=new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString),tmp;
if(tmp=rs)return tmp[2];
return "没有这个参数";
}
var internshipId=GetQueryString("internshipId");
console.log("ID："+internshipId);
if(internshipId=="没有这个参数"){
}
else{
	console.log("根据internshipId请求数据");	
	
	/*测试部分 */
	var json = {"dataContent":[
	{"jobName":"移动公司实习生","jobContent":"负责在上菜区将菜品及时摆出，保证出餐窗口的整洁干净，及时跟进顾客的饮食情况，在结账窗口对顾客的菜品消费进行数目结账","jobSettle":"日结","jobSalary":"130/天","jobPlace":"广东省广州市天河区龙洞迎福路527号广东金融学院北苑饭堂二楼","jobDate":"2019-07-31到2019-08-07","jobTime":"10:00-15:00","publishTime":"2019-07-20","recruitNum":"21","welfare":"爱神的箭卡时间看","sex":"不限","requirement":"asdhasjkhdkasjhd就打算开发和接口","legalPerson":"肖奈","phone":"13501212354","companyIntroduce":"发货就肯定会接口"},
	],"dataType":"3"           //dataType值为1时候为 我的保存 页面的值,此时界面的值可以更改,dataType值为2时候为 我的发布 页面的值,此时界面的值不可以更改,
	}
	var content=json.dataContent[0];
	var dataType=json.dataType;
	if(dataType==2){       	   //dataType值为1时候为 我的保存 页面的值,dataType值为2时候为 我的审核 页面的值,dataType值为3时候为 我的审核 页面的值
		$("#stateJudgment").empty(); 
		var data_html = "<button id='delete' class='Part-timeButton save'>删除</button> <button id='uploadReview' class='Part-timeButton uploadReview'>重新审核</button>";
		$("#stateJudgment").append(data_html);
	}
	if(dataType==3){       	   //dataType值为1时候为 我的保存 页面的值,dataType值为2时候为 我的审核 页面的值,dataType值为3时候为 我的审核 页面的值
		$("#stateJudgment").empty(); 
		var data_html = "<button id='Shelves' class='Part-timeButton save'>下架</button> <button id='ReAudit' class='Part-timeButton uploadReview'>重新审核</button>";
		$("#stateJudgment").append(data_html);
	}
	
	if(content.jobSettle=="日结"){
		content.jobSettle=1;
	}
	else if(content.jobSettle=="月结"){
		content.jobSettle=2;
	}
	if(content.jobSalary.split('/')[1]=="天"){
		content.JobWagesType="2"
	}
	else if(content.jobSalary.split('/')[0]=="小时"){
		content.JobWagesType="1"
	}
	if(content.sex=="男"){
		content.sex=1;
	}
	else if(content.sex=="女"){
		content.sex=2;
	}
	else if(content.sex=="不限"){
		content.sex=3;
	}
	$('#JobTitle').val(content.jobName);
	$('#WorkContent').val(content.jobContent);
	$("input[name='JobType'][value="+content.jobSettle+"]").prop("checked",true); 
	//$('input[name="JobType"]:checked').val();
	$('#Wages').val(content.jobSalary.split('/')[0]);
	$("input[name='JobWagesType'][value="+content.JobWagesType+"]").prop("checked",true); 
	$('#WorkPlace').val(content.jobPlace);
	$('#departureDayBegin').val(content.jobDate.split("到")[0]);
	$('#departureDayEnd').val(content.jobDate.split("到")[1]);
	$('#departureTimeBegin').val(content.jobTime.split("-")[0]);
	$('#departureTimeEnd').val(content.jobTime.split("-")[1]);
	$('#Hiring').val(content.recruitNum);
	$('#WelfareTreatment').val(content.welfare);
	$("input[name='GenderRequirement'][value="+content.sex+"]").prop("checked",true); 
	$('#JobRequirements').val(content.requirement);
	$('#ContactsPeople').val(content.legalPerson);
	$('#ContactsPhone').val(content.phone);
	$('#CompanyIntroduction').val(content.companyIntroduce);
	
	/*正式部分
	$.ajax({
			type: "get",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"merchantId":merchantId,
			"partTimeJobId":partTimeJobId,
			},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(json){
				var content=json.dataContent[0];
				var dataType=json.dataType;
				if(dataType==2){        //dataType值为2时候为 我的发布 页面的值,此时界面的值不可以更改,只有下架功能
					$("#stateJudgment").empty(); 
					var data_html = "<button id='Shelves' class='Part-timeButton Shelves'>下架</button>";
					$("#stateJudgment").append(data_html);
				}
				if(content.jobSettle=="日结"){
					content.jobSettle=1;
				}
				else if(content.jobSettle=="月结"){
					content.jobSettle=2;
				}
				if(content.jobSalary.split('/')[1]=="天"){
					content.JobWagesType="2"
				}
				else if(content.jobSalary.split('/')[0]=="小时"){
					content.JobWagesType="1"
				}
				if(content.sex=="男"){
					content.sex=1;
				}
				else if(content.sex=="女"){
					content.sex=2;
				}
				else if(content.sex=="不限"){
					content.sex=3;
				}
				$('#JobTitle').val(content.jobName);
				$('#WorkContent').val(content.jobContent);
				$("input[name='JobType'][value="+content.jobSettle+"]").prop("checked",true); 
				//$('input[name="JobType"]:checked').val();
				$('#Wages').val(content.jobSalary.split('/')[0]);
				$("input[name='JobWagesType'][value="+content.JobWagesType+"]").prop("checked",true); 
				$('#WorkPlace').val(content.jobPlace);
				$('#departureDayBegin').val(content.jobDate.split("到")[0]);
				$('#departureDayEnd').val(content.jobDate.split("到")[1]);
				$('#departureTimeBegin').val(content.jobTime.split("-")[0]);
				$('#departureTimeEnd').val(content.jobTime.split("-")[1]);
				$('#deadline').val(content.endTime);
				$('#Hiring').val(content.recruitNum);
				$('#WelfareTreatment').val(content.welfare);
				$("input[name='GenderRequirement'][value="+content.sex+"]").prop("checked",true); 
				$('#JobRequirements').val(content.requirement);
				$('#ContactsPeople').val(content.legalPerson);
				$('#ContactsPhone').val(content.phone);
				$('#CompanyIntroduction').val(content.companyIntroduce);
			}
	})
	*/
}
$("#delete").click(function(){
	if(confirm("确定是否删除")){
	console.log("实习ID:"+internshipId+"删除（接上数据库后删除）");  
	$.ajax({
		type: "post",  //数据提交方式（post/get）
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {
		"merchantId":merchantId,
		"internshipId":internshipId},//提交的数据
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
		console.log("你取消了删除");
	}
})
$("#Shelves").click(function(){
	if(confirm("下架会清除该兼职所有通过用户的数据,确定是否下架")){
	console.log("实习ID:"+internshipId+"下架（接上数据库后删除）");  
	$.ajax({
		type: "post",  //数据提交方式（post/get）
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {
		"merchantId":merchantId,
		"internshipId":internshipId},//提交的数据
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
		console.log("你取消了下架");
	}
})
function check(Hiring){
	function isInteger(obj) {
		 return obj%1 === 0
	}
	if($('#JobTitle').val()==""){
			alert('岗位名称不能为空');
			return false
	}
	else if(WorkContent=$('#WorkContent').val()==""){
			alert('工作内容不能为空');
			return false
	}
	else if($('input[name="JobType"]:checked').val()==undefined){
			alert('工作类型不能为空!');
			return false
		}
	else if($('#Wages').val()==""){
		alert('工资不能为空');
		return false
	}
	
	else if($('input[name="JobWagesType"]:checked').val()==undefined){
		alert('工资类型不能为空');
		return false
	}
	
	else if($('#WorkPlace').val()==""){
		alert('工作地点不能为空');
		return false
	}
	else if($('#departureDayBegin').val()==""){
		alert('实习起始日期不能为空');
		return false
	}
	else if($('#departureDayEnd').val()==""){
		alert('实习终止日期不能为空');
		return false
	}	
	else if($('#departureDayBegin').val()>$('#departureDayEnd').val()){
		alert('实习日期有错误');
		return false
	}
	else if($('#departureTimeBegin').val()==""){
		alert('实习起始时间不能为空');
		return false
	}
	else if($('#departureTimeEnd').val()==""){
		alert('实习终止时间不能为空');
		return false
	}	
	else if($('#departureTimeBegin').val()>$('#departureTimeEnd').val()){
		alert('实习时间有错误');
		return false
	}	
	else if(isNaN(Number(Hiring,))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('招聘人数不是数字!');
			return false
		}
	else if(isInteger(Hiring)==false){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('招聘人数不是整数!');
			return false
		}
	else if(Hiring<=0){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('招聘人数不能小于或等于0');
			return false
		}	
	else if($('#WelfareTreatment').val()==""){
			alert('福利待遇不能为空');
			return false
		}
	else if($('#JobRequirements').val()==""){
			alert('任职要求不能为空');
			return false
	}		 
	else if($('input[name="GenderRequirement"]:checked').val()==undefined){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			alert('性别要求不能为空');
			return false
		}
	else if($('#ContactsPeople').val()==""){  
			alert('联系人不能为空');
			return false
		}
	else if($('#ContactsPhone').val()==""){  
			alert('联系电话不能为空');
			return false
	}
	else if($('#ContactsPhone').val().length!=11){  
			alert('联系电话有误');
			return false
	}
	else if($('#CompanyIntroduction').val()==""){  
			alert('公司介绍不能为空');
			return false
		}
	return true
	}
	
	$(function(){
	//保存部分
	$('#save').click(function(){
		var JobTitle=$('#JobTitle').val();
		var WorkContent=$('#WorkContent').val();
		var JobType=$('input[name="JobType"]:checked').val();  
		var Wages=$('#Wages').val();
		var JobWagesType=$('input[name="JobWagesType"]:checked').val()
		var WorkPlace=$('#WorkPlace').val();
		var departureDayBegin=$('#departureDayBegin').val();
		var departureDayEnd=$('#departureDayEnd').val();
		var departureTimeBegin=$('#departureTimeBegin').val();
		var departureTimeEnd=$('#departureTimeEnd').val();
		var Hiring=$('#Hiring').val();
		var WelfareTreatment=$('#WelfareTreatment').val();
		var GenderRequirement=$('input[name="GenderRequirement"]:checked').val(); 
		var JobRequirements=$('#JobRequirements').val();
		var ContactsPeople=$('#ContactsPeople').val();
		var ContactsPhone=$('#ContactsPhone').val();
		var CompanyIntroduction=$('#CompanyIntroduction').val();
		
		if(JobType==1)
			JobType="日结";
		else if(JobType==2)
			JobType="月结";
			
		if(JobWagesType==1)
			Wages=Wages+"/小时"
		else if(JobWagesType==2)
			Wages=Wages+"/天"
			
		if(GenderRequirement==1)
			GenderRequirement="男";
		else if(GenderRequirement==2)
			GenderRequirement="女";
		else if(GenderRequirement==3)
			GenderRequirement="不限";
			
		if(check(Hiring)==true){
			if(confirm("岗位名称:"+JobTitle+"\r工作内容:"+WorkContent+"\r工作类型:"+JobType+"\r工资:"+Wages+"\r工作地点:"+ WorkPlace+"\r实习日期:"+departureDayBegin+" 至 "+departureDayEnd+"\r实习时间:"+departureTimeBegin+" 至 "+departureTimeEnd+"\r招聘人数:"+Hiring+"人\r福利待遇:"+WelfareTreatment+"\r性别要求:"+GenderRequirement+"\r任职要求:"+JobRequirements+"\r联系人:"+ContactsPeople+"\r联系电话:"+ContactsPhone+"\r公司介绍:"+CompanyIntroduction)){
				var jobDate=departureDayBegin+"-"+departureDayEnd;
				var jobTime=departureTimeBegin+"-"+departureTimeEnd;
				$.ajax({
					type: "post",  //数据提交方式（post/get）
					url: commentDataUrl,     //这里是请求的后台地址，自己定义
					data: {
					"internshipId":internshipId,    //如果internshipId的值为undefined时候，创建一个internshipId,如果不为为undefined时候往internshipId更改信息
					"jobName":JobTitle,
					"jobContent":destination,
					"jobSettle":JobType,
					"jobSalary":Wages,
					"jobPlace":WorkPlace,
					"jobDate":jobDate,
					"jobTime":jobTime,
					"recruitNum":Hiring,
					"welfare":WelfareTreatment,				
					"sex":GenderRequirement,
					"requirement":JobRequirements,
					"legalPerson":ContactsPeople,
					"phone":ContactsPhone,
					"companyIntroduce":CompanyIntroduction,
					},//提交的数据
					dataType: "json",//返回的数据类型格式
					success: function(msg){
						if (msg.success){  //修改成功
						   alert("保存发布成功") //修改成功处理代码...
						}else {  //修改失败
						   alert("保存发布失败") //修改失败处理代码...
						}
					}
				})
			}else{
				console.log("你取消了保存");
			}
		}
	})
	
	//上传审核部分
	$('#uploadReview').click(function(){
		var JobTitle=$('#JobTitle').val();
		var WorkContent=$('#WorkContent').val();
		var JobType=$('input[name="JobType"]:checked').val();  
		var Wages=$('#Wages').val();
		var JobWagesType=$('input[name="JobWagesType"]:checked').val()
		var WorkPlace=$('#WorkPlace').val();
		var departureDayBegin=$('#departureDayBegin').val();
		var departureDayEnd=$('#departureDayEnd').val();
		var departureTimeBegin=$('#departureTimeBegin').val();
		var departureTimeEnd=$('#departureTimeEnd').val();
		var Hiring=$('#Hiring').val();
		var WelfareTreatment=$('#WelfareTreatment').val();
		var GenderRequirement=$('input[name="GenderRequirement"]:checked').val(); 
		var JobRequirements=$('#JobRequirements').val();
		var ContactsPeople=$('#ContactsPeople').val();
		var ContactsPhone=$('#ContactsPhone').val();
		var CompanyIntroduction=$('#CompanyIntroduction').val();
		
		if(JobType==1)
			JobType="日结";
		else if(JobType==2)
			JobType="月结";
			
		if(JobWagesType==1)
			Wages=Wages+"/小时"
		else if(JobWagesType==2)
			Wages=Wages+"/天"
			
		if(GenderRequirement==1)
			GenderRequirement="男";
		else if(GenderRequirement==2)
			GenderRequirement="女";
		else if(GenderRequirement==3)
			GenderRequirement="不限";
			
		if(check(Hiring)==true){
			if(confirm("岗位名称:"+JobTitle+"\r工作内容:"+WorkContent+"\r工作类型:"+JobType+"\r工资:"+Wages+"\r工作地点:"+ WorkPlace+"\r实习日期:"+departureDayBegin+" 至 "+departureDayEnd+"\r实习时间:"+departureTimeBegin+" 至 "+departureTimeEnd+"\r招聘人数:"+Hiring+"人\r福利待遇:"+WelfareTreatment+"\r性别要求:"+GenderRequirement+"\r任职要求:"+JobRequirements+"\r联系人:"+ContactsPeople+"\r联系电话:"+ContactsPhone+"\r公司介绍:"+CompanyIntroduction)){
				var jobDate=departureDayBegin+"-"+departureDayEnd;
				var jobTime=departureTimeBegin+"-"+departureTimeEnd;
				$.ajax({
					type: "post",  //数据提交方式（post/get）
					url: commentDataUrl,     //这里是请求的后台地址，自己定义
					data: {
					"internshipId":internshipId,    //如果internshipId的值为undefined时候，创建一个internshipId,如果不为为undefined时候往internshipId更改信息
					"jobName":JobTitle,
					"jobContent":destination,
					"jobSettle":JobType,
					"jobSalary":Wages,
					"jobPlace":WorkPlace,
					"jobDate":jobDate,
					"jobTime":jobTime,
					"recruitNum":Hiring,
					"welfare":WelfareTreatment,				
					"sex":GenderRequirement,
					"requirement":JobRequirements,
					"legalPerson":ContactsPeople,
					"phone":ContactsPhone,
					"companyIntroduce":CompanyIntroduction,
					},//提交的数据
					dataType: "json",//返回的数据类型格式
					success: function(msg){
						if (msg.success){  //修改成功
						   alert("上传审核成功") //修改成功处理代码...
						}else {  //修改失败
						   alert("上传审核失败") //修改失败处理代码...
						}
					}
				})
			}else{
				console.log("你取消了上传审核");
			}
		}
	})
	
	//重新审核部分
	$('#ReAudit').click(function(){
		var JobTitle=$('#JobTitle').val();
		var WorkContent=$('#WorkContent').val();
		var JobType=$('input[name="JobType"]:checked').val();  
		var Wages=$('#Wages').val();
		var JobWagesType=$('input[name="JobWagesType"]:checked').val()
		var WorkPlace=$('#WorkPlace').val();
		var departureDayBegin=$('#departureDayBegin').val();
		var departureDayEnd=$('#departureDayEnd').val();
		var departureTimeBegin=$('#departureTimeBegin').val();
		var departureTimeEnd=$('#departureTimeEnd').val();
		var Hiring=$('#Hiring').val();
		var WelfareTreatment=$('#WelfareTreatment').val();
		var GenderRequirement=$('input[name="GenderRequirement"]:checked').val(); 
		var JobRequirements=$('#JobRequirements').val();
		var ContactsPeople=$('#ContactsPeople').val();
		var ContactsPhone=$('#ContactsPhone').val();
		var CompanyIntroduction=$('#CompanyIntroduction').val();
		
		if(JobType==1)
			JobType="日结";
		else if(JobType==2)
			JobType="月结";
			
		if(JobWagesType==1)
			Wages=Wages+"/小时"
		else if(JobWagesType==2)
			Wages=Wages+"/天"
			
		if(GenderRequirement==1)
			GenderRequirement="男";
		else if(GenderRequirement==2)
			GenderRequirement="女";
		else if(GenderRequirement==3)
			GenderRequirement="不限";
			
		if(check(Hiring)==true){
			if(confirm("重新审核会清除该实习所有通过用户的数据"+"\r岗位名称:"+JobTitle+"\r工作内容:"+WorkContent+"\r工作类型:"+JobType+"\r工资:"+Wages+"\r工作地点:"+ WorkPlace+"\r实习日期:"+departureDayBegin+" 至 "+departureDayEnd+"\r实习时间:"+departureTimeBegin+" 至 "+departureTimeEnd+"\r招聘人数:"+Hiring+"人\r福利待遇:"+WelfareTreatment+"\r性别要求:"+GenderRequirement+"\r任职要求:"+JobRequirements+"\r联系人:"+ContactsPeople+"\r联系电话:"+ContactsPhone+"\r公司介绍:"+CompanyIntroduction)){
				var jobDate=departureDayBegin+"-"+departureDayEnd;
				var jobTime=departureTimeBegin+"-"+departureTimeEnd;
				$.ajax({
					type: "post",  //数据提交方式（post/get）
					url: commentDataUrl,     //这里是请求的后台地址，自己定义
					data: {
					"internshipId":internshipId,    //如果internshipId的值为undefined时候，创建一个internshipId,如果不为为undefined时候往internshipId更改信息
					"jobName":JobTitle,
					"jobContent":destination,
					"jobSettle":JobType,
					"jobSalary":Wages,
					"jobPlace":WorkPlace,
					"jobDate":jobDate,
					"jobTime":jobTime,
					"recruitNum":Hiring,
					"welfare":WelfareTreatment,				
					"sex":GenderRequirement,
					"requirement":JobRequirements,
					"legalPerson":ContactsPeople,
					"phone":ContactsPhone,
					"companyIntroduce":CompanyIntroduction,
					},//提交的数据
					dataType: "json",//返回的数据类型格式
					success: function(msg){
						if (msg.success){  //修改成功
						   alert("上传审核成功") //修改成功处理代码...
						}else {  //修改失败
						   alert("上传审核失败") //修改失败处理代码...
						}
					}
				})
			}else{
				console.log("你取消了上传审核");
			}
		}
	})
	
})