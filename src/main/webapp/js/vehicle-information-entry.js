var LocString=String(window.document.location.href);
function GetQueryString(str){
var rs=new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString),tmp;
if(tmp=rs)return tmp[2];
return "û���������";
}
var tourism_id=GetQueryString("tourism_id");
console.log("��Ʊ����ID��"+tourism_id);

function submitInformation(){
	var license_plate_number=$('#license_plate_number').val();
	var vehicle_type=$('#vehicle_type').val();
	var color=$('#color').val();
	var driver_name=$('#driver_name').val();
	var driver_phone=$('#driver_phone').val();
	if(confirm("���ƺ� : "+license_plate_number+"\r"+"�������� ��"+vehicle_type+"\r"+"������ɫ : "+color+"\r"+"˾������ : "+driver_name+"\r"+"˾����ϵ��ʽ : "+driver_phone)){
		$.ajax({
		type: "post",  //�����ύ��ʽ��post/get��
		url: commentDataUrl,     //����������ĺ�̨��ַ���Լ�����
		data: {
		"tourism_id":tourism_id,
		"license_plate_number":license_plate_number,
		"vehicle_type":vehicle_type,
		"color":color,
		"driver_name":driver_name,
		"driver_phone":driver_phone,
		},//�ύ������
		dataType: "json",//���ص��������͸�ʽ
		success: function(msg){
			if (msg.success){  //�޸ĳɹ�
			   alert("�ύ������Ϣ�ɹ�") //�޸ĳɹ��������...
			}else {  //�޸�ʧ��
			   alert("�ύ������Ϣʧ��") //�޸�ʧ�ܴ������...
			}
		}
		});
	
	}else{
		alert("��ȡ�����ύ")
	}
}
function CarRentalStatement(){
	if(confirm("ȷ���Ƿ�ᵥ")){
		alert("�⳵ID:"+tourism_id+"�ᵥ���������ݿ��ɾ����");  
		$.ajax({
				type: "post",  //�����ύ��ʽ��post/get��
				url: commentDataUrl,     //����������ĺ�̨��ַ���Լ�����
				data: {
				"tourism_id":tourism_id},//�ύ������
				dataType: "json",//���ص��������͸�ʽ
				success: function(msg){
					if (msg.success){  //�޸ĳɹ�
					   alert("�ᵥ�ɹ�") //�޸ĳɹ��������...
					}else {  //�޸�ʧ��
					   alert("�ᵥʧ��") //�޸�ʧ�ܴ������...
					}
				}
			});
	}else{
		alert("��ȡ���˽ᵥ");
	}
}// JavaScript Document