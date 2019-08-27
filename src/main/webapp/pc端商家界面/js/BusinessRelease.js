var LocString=String(window.document.location.href);
function GetQueryString(str){
var rs=new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString),tmp;
if(tmp=rs)return tmp[2];
return "没有这个参数";
}
var partTimeJobId=GetQueryString("partTimeJobId");
console.log("ID："+partTimeJobId);
if(partTimeJobId=="没有这个参数"){
}
else{
	console.log("根据partTimeJobId请求数据");	
	/*
	var json = {"dataContent":[
	{"username":"肖奈","gender":"男","phone":"13512313212","jobName":":移动公司实习生","jobContent":":负责在上菜区将菜品及时摆出，保证出餐窗口的整洁干净，及时跟进顾客的饮食情况，在结账窗口对顾客的菜品消费进行数目结账","partTimeJobId":"23323674863278","openId":"fhasdass-jakdhjs213124jkfa"},
	]
  	};
	var dataContent=json.dataContent;
	console.log(dataContent);
	console.log(dataContent[0].username);
	$.ajax({
			type: "get",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"merchantId":merchantId,
			"partTimeJobId":partTimeJobId,
			},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(json){
				console.log(json.dataContent[0]);
				var content=json.dataContent[0];
				$('#JobTitle').val(content.jobName);
				$('#WorkContent').val(content.jobContent);
				
				$('input[name="JobType"]:checked').val(content.jobSettle);
				
				$('#Wages').val(content.jobSalary);
				
				$('input[name="JobWagesType"]:checked').val(content.)
				
				$('#WorkPlace').val(content.jobPlace);
				
				$('#departureDayBegin').val(content.);
				$('#departureDayEnd').val(content.endTime);
				$('#departureTimeBegin').val(content.);
				$('#departureTimeEnd').val(content.);
				
				$('#Hiring').val(content.recruitNum);
				$('#WelfareTreatment').val(content.welfare);
				
				$('input[name="GenderRequirement"]:checked').val(content.sex); 
				
				$('#JobRequirements').val(content.requirement);
				$('#ContactsPeople').val(content.legalPerson);
				$('#ContactsPhone').val(content.phone);
				$('#CompanyIntroduction').val(content.companyIntroduce);
					"jobDate":jobDate,
					"jobTime":jobTime,
					
			}
	})
	*/
}
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
		alert('兼职起始日期不能为空');
		return false
	}
	else if($('#departureDayEnd').val()==""){
		alert('兼职终止日期不能为空');
		return false
	}	
	else if($('#departureDayBegin').val()>$('#departureDayEnd').val()){
		alert('兼职日期有错误');
		return false
	}
	else if($('#departureTimeBegin').val()==""){
		alert('兼职起始时间不能为空');
		return false
	}
	else if($('#departureTimeEnd').val()==""){
		alert('兼职终止时间不能为空');
		return false
	}	
	else if($('#departureTimeBegin').val()>$('#departureTimeEnd').val()){
		alert('兼职时间有错误');
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
			if(confirm("岗位名称:"+JobTitle+"\r工作内容:"+WorkContent+"\r工作类型:"+JobType+"\r工资:"+Wages+"\r工作地点:"+ WorkPlace+"\r兼职日期:"+departureDayBegin+" 至 "+departureDayEnd+"\r兼职时间:"+departureTimeBegin+" 至 "+departureTimeEnd+"\r招聘人数:"+Hiring+"人\r福利待遇:"+WelfareTreatment+"\r性别要求:"+GenderRequirement+"\r任职要求:"+JobRequirements+"\r联系人:"+ContactsPeople+"\r联系电话:"+ContactsPhone+"\r公司介绍:"+CompanyIntroduction)){
				var jobDate=departureDayBegin+"-"+departureDayEnd;
				var jobTime=departureTimeBegin+"-"+departureTimeEnd;
				$.ajax({
					type: "post",  //数据提交方式（post/get）
					url: commentDataUrl,     //这里是请求的后台地址，自己定义
					data: {
					"jobName":JobTitle,
					"jobContent":destination,
					"jobSettle":JobType,
					"jobSalary":Wages,
					"jobPlace":WorkPlace,
					"jobDate":jobDate,
					"jobTime":jobTime,
					"endTime":departureDayEnd,
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
			if(confirm("岗位名称:"+JobTitle+"\r工作内容:"+WorkContent+"\r工作类型:"+JobType+"\r工资:"+Wages+"\r工作地点:"+ WorkPlace+"\r兼职日期:"+departureDayBegin+" 至 "+departureDayEnd+"\r兼职时间:"+departureTimeBegin+" 至 "+departureTimeEnd+"\r招聘人数:"+Hiring+"人\r福利待遇:"+WelfareTreatment+"\r性别要求:"+GenderRequirement+"\r任职要求:"+JobRequirements+"\r联系人:"+ContactsPeople+"\r联系电话:"+ContactsPhone+"\r公司介绍:"+CompanyIntroduction)){
				var jobDate=departureDayBegin+"-"+departureDayEnd;
				var jobTime=departureTimeBegin+"-"+departureTimeEnd;
				$.ajax({
					type: "post",  //数据提交方式（post/get）
					url: commentDataUrl,     //这里是请求的后台地址，自己定义
					data: {
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