// JavaScript Document
function login() {
	if ($('#account').val().length == 0) {
		alert ("请输入您的用户名");
		return;
	}else if ($('#password').val().length == 0) {
		alert ("请输入您的密码");
		return;
	}else if ($('#captcha').val().length == 0) {
		alert ("请输入您的验证码");
		return;
	} 
	$.ajax ({
		url:		"/memberships/login.json",
		type:		"POST",
		dataType:	"json",
		data:		{
			nickname:		$('#account').val(),
			password:		$.sha256 (
								$.sha256 ($('#account').val() + $('#password').val())
								+ $('#captcha').val()),
			captcha:		$('#captcha').val(),
			captcha_key:	$('#captcha_key').val()
		}
	}).done (function (resp) {
		if (parseInt (resp.status) == 1)
			//location.reload();
			location.href = "/气之购/在线订购";
		else if (parseInt (resp.status) == 2) {
			$(".authenticationtd").load ('/%E6%B0%94%E4%B9%8B%E5%AE%B6/%E6%88%91%E7%9A%84%E5%B8%90%E6%88%B7 .simple_captcha');
			$('#loginerr').html ("验证码错误");
		} else {
			$(".authenticationtd").load ('/%E6%B0%94%E4%B9%8B%E5%AE%B6/%E6%88%91%E7%9A%84%E5%B8%90%E6%88%B7 .simple_captcha');
			$('#loginerr').html ("登录信息错误");
		}
	}).fail (function() {
		$('#loginerr').html ("请求发送失败，请稍候再试");
		$(".authenticationtd").load ('/%E6%B0%94%E4%B9%8B%E5%AE%B6/%E6%88%91%E7%9A%84%E5%B8%90%E6%88%B7 .simple_captcha');
	});
}

function register() {
	 if ($('#username').val().length <6 || $('#username').val().length >12) {
		alert ("请输入6-12位的用户名");
		return;
	 }else if ($('#password').val().length <6 || $('#password').val().length >12) {
		alert ("请输入6-12位的密码");
		return;
	 } else if ($('#identification').val().length == 0) {
		alert ("请再次输入您的密码");
		return;
	 } else if ($('#identification').val() != $('#password').val()) {
		alert ("两次输入的密码不同");
		return;
	 } else if ($('#name').val().length == 0){
	 	alert ("请输入您的姓名");
		return;
	 } else if ($('#mobile').val().length == 0){
	 	alert ("请输入您的手机号码");
		return;
	 }else if ($('#mobile').val().length != 11){
	 	alert ("请输入您的手机号码");
		return;
	 }else if ($('#telephone03').val().length == 0){
	 	alert ("请输入您的电话号码");
		return;
	 } else if ($('#email').val().length == 0){
	 	alert ("请输入您的邮箱");
		return;
	 } else if ($('#province').val().length == 0){
	 	alert ("请输入收件人的省");
		return;
	 } else if ($('#city').val().length == 0){
	 	alert ("请输入收件人的市");
		return;
	 } else if ($('#district').val().length == 0){
	 	alert ("请输入收件人的县/区");
		return;
	 } else if ($('#postalcode').val().length == 0){
	 	alert ("请输入收件人的邮编");
		return;
	 } else if ($('#address').val().length == 0){
	 	alert ("请输入收件人的具体地址");
		return;
	 } else if ($('#captcha').val().length == 0){
	 	alert ("请输入您的验证码");
		return;
	 } 
	 
	var membership = { 
		"addr" : $('#address').val(),
		"city" : $('#city').val(),
		"district" : $('#district').val(),
		"email" : $('#email').val(),
		"gender" : $('#sex option:selected').val(),
		"mobile" : $('#mobile').val(),
		"nickname" : $('#username').val(),
		"password" : $.sha256 ($('#username').val() + $('#password').val()),
		"phone" : $('#telephone01').val() + '-' + $('#telephone02').val() + '-' + $('#telephone03').val(),
		"postal" : $('#postalcode').val(),
		"province" : $('#province').val(),
		"username" : $('#name').val()
	}
	
	$.ajax ({
		url:		"/memberships.json",
		type:		"POST",
		dataType:	"json",
		data:		{
			membership : membership,
			captcha:		$('#captcha').val(),
			captcha_key:	$('#captcha_key').val()
		}
	}).done (function (resp) {
		if (parseInt (resp.status) == 1)
			location.href = "/气之家/注册成功";
		else {
			if (resp.description != null)
				alert (resp.description);
			else
				alert ("请求失败，请再检查一遍您的输入并稍候再试");
		}
	}).fail (function() {
		alert ("请求发送失败，请稍候再试");
	});
}

function disableAddrInput(){
	$('#address').prop('disabled', true);
	$('#city').prop('disabled', true);
	$('#district').prop('disabled', true);
	$('#mobile').prop('disabled', true);
	$('#member_id').prop('disabled', true);
	$('#telephone01').prop('disabled', true);
	$('#telephone02').prop('disabled', true);
	$('#telephone03').prop('disabled', true);
	$('#postalcode').prop('disabled', true);
	$('#province').prop('disabled', true);
	$('#consignee_name').prop('disabled', true);
	
}

function enableAddrInput(){

	$('#address').val("");
	$('#city').val("");
	$('#district').val("");
	$('#mobile').val("");
	$('#telephone01').val("");
	$('#telephone02').val("");
	$('#telephone03').val("");
	$('#postalcode').val("");
	$('#province').val("");
	$('#consignee_name').val("");
	
	$('#address').prop('disabled', false);
	$('#city').prop('disabled', false);
	$('#district').prop('disabled', false);
	$('#mobile').prop('disabled', false);
	$('#telephone01').prop('disabled', false);
	$('#telephone02').prop('disabled', false);
	$('#telephone03').prop('disabled', false);
	$('#postalcode').prop('disabled', false);
	$('#province').prop('disabled', false);
	$('#consignee_name').prop('disabled', false);
	
	$('#saveNewAddressDiv').css("display","block"); 
}
function getProductData(){
	$.ajax ({
			url: "/products/"+window.location.search.split('=')[1]+".json",
			type: "GET",
			dataType: "json",
	}).done (function (resp)
	{
	var product_url = resp.images[0] == null? "" :resp.images[0].urls.product;
				if ($('#product_pic').length)
					$('#product_pic').prop ('src',product_url.replace('/spree/products/','/products/picture/'));
				var name = resp.name == null ? "" : resp.name;
				$('#product_name').val(name);
				$('#product_name').prop('disabled', true);
				var price = resp.price == null ? "" : resp.price;
				$('#price').val(price);
				$('#price').prop('disabled', true);
				$('#Sub-total').prop('disabled', true);
				$('#total').prop('disabled', true);
				$("#num").val('1');
				displayTotalPrice();
	}).fail (function() {
		alert ("产品信息获取失败，请稍候再试");
	});
}
function loadUserData(){
	$.ajax ({
			url: "/memberships/1.json",
			type: "GET",
			dataType: "json",
		}).done (function (resp) {
			$('#address').val(resp.addr);
			$('#city').val(resp.city);
			$('#district').val(resp.district);
			$('#mobile').val(resp.mobile);
			$('#member_id').val(resp.id);
			var telephone = resp.phone.split("-");
			$('#telephone01').val(telephone[0]);
			$('#telephone02').val(telephone[1]);
			$('#telephone03').val(telephone[2]);
			$('#postalcode').val(resp.postal);
			$('#province').val(resp.province);
			$('#consignee_name').val(resp.username);
			disableAddrInput();
			
			/*if($("#existedAddressTab tbody").find("tr").length>1){
			$("#existedAddressTab tbody tr:not(:eq(0))").remove(); //保留table表的第一行
			}*/
			var n = resp.addresses.length;
			if ( typeof resp.addresses.length == "undefined"){
				var address = resp.addresses.addr == null ? "" : resp.addresses.addr;
				var province = resp.addresses.province == null ? "" : resp.addresses.province;	
				var city = resp.addresses.city == null ? "" : resp.addresses.city;
				var district = resp.addresses.district == null ? "" : resp.addresses.district;
				var postal = resp.addresses.postal == null ? "" : resp.addresses.postal;
				var username = resp.addresses.username == null ? "" : resp.addresses.username;				
				var mobile = resp.addresses.mobile == null ? "" : resp.addresses.mobile;
				if ($('#existedAddressTab tbody tr:first-child #receiverTd').length)
					$('#existedAddressTab tbody tr:first-child #receiverTd').html (username);
				if ($('#existedAddressTab tbody tr:first-child #districtTd').length)
					$('#existedAddressTab tbody tr:first-child #districtTd').html (province+"/"+city+"/"+district);
				if ($('#existedAddressTab tbody tr:first-child #detailAddrTd').length)
					$('#existedAddressTab tbody tr:first-child #detailAddrTd').html (address);
				if ($('#existedAddressTab tbody tr:first-child #postalTd').length)
					$('#existedAddressTab tbody tr:first-child #postalTd').html (postal);
				if ($('#existedAddressTab tbody tr:first-child #phoneTd').length)
					$('#existedAddressTab tbody tr:first-child #phoneTd').html (mobile);
				return;			
			}
			
			for(var i=0;i<n;i++){
				
				if(i != 0 )
					$( "#existedAddressTab tbody tr:first-child").clone(true).prependTo( "#existedAddressTab" );
					
					var address = resp.addresses[i].addr == null ? "" : resp.addresses[i].addr;
					var province = resp.addresses[i].province == null ? "" : resp.addresses[i].province;	
					var city = resp.addresses[i].city == null ? "" : resp.addresses[i].city;
					var district = resp.addresses[i].district == null ? "" : resp.addresses[i].district;
					var postal = resp.addresses[i].postal == null ? "" : resp.addresses[i].postal;
					var username = resp.addresses[i].username == null ? "" : resp.addresses[i].username;				
					var mobile = resp.addresses[i].mobile == null ? "" : resp.addresses[i].mobile;
					
					if ($('#existedAddressTab tbody tr:first-child #receiverTd').length)
						$('#existedAddressTab tbody tr:first-child #receiverTd').html (username);
					if ($('#existedAddressTab tbody tr:first-child #districtTd').length)
						$('#existedAddressTab tbody tr:first-child #districtTd').html (province+"/"+city+"/"+district);
					if ($('#existedAddressTab tbody tr:first-child #detailAddrTd').length)
						$('#existedAddressTab tbody tr:first-child #detailAddrTd').html (address);
					if ($('#existedAddressTab tbody tr:first-child #postalTd').length)
						$('#existedAddressTab tbody tr:first-child #postalTd').html (postal);
					if ($('#existedAddressTab tbody tr:first-child #phoneTd').length)
						$('#existedAddressTab tbody tr:first-child #phoneTd').html (mobile);	
			}
			
			$('.selectLabel').click(function(){
				var par = $(this).parent().parent();
				var consignee = par.find ('#receiverTd').html();
				var mobile = par.find ('#phoneTd').html();
				var district = par.find ('#districtTd').html();
				var address = par.find ('#detailAddrTd').html();
				var postal = par.find ('#postalTd').html();
				
				var districtArray=district.split('/');
				$('#address').val(address);
				$('#province').val(districtArray[0]);
				$('#city').val(districtArray[1]);
				$('#district').val(districtArray[2]);
				$('#mobile').val(mobile);
				$('#postalcode').val(postal);
				$('#consignee_name').val(consignee);
				
				$('#telephone01').val("");
				$('#telephone02').val("");
				$('#telephone03').val("");
				disableAddrInput();
			});
			
		}).fail (function() {
		alert ("用户信息获取失败，请稍候再试");
	});;
}

function order() {
	if ($('#num').val().length == 0) {
		alert ("请输入您的订购数量");
		return;
	 } else if ($('#price').val().length == 0) {
		alert ("请输入单价");
		return;
	 } else if ($('#coupon').val().length == 0&&document.getElementById("discount").selectedIndex==0)
	 {
		alert ("请输入优惠折扣");
		return;
	 } else if ($('#consignee_name').val().length == 0) {
		alert ("请输入收件人姓名");
		return;
	 } else if ($('#mobile').val().length == 0) {
		alert ("请输入收件人手机号码");
		return;
	 } /*else if ($('#telephone03').val().length == 0) {
		alert ("请输入收件人固话号码");
		return;
	 }*/
	else if ($('#province').val().length == 0){
	 	alert ("请输入收件人的省");
		return;
	 } else if ($('#city').val().length == 0){
	 	alert ("请输入收件人的市");
		return;
	 } else if ($('#district').val().length == 0){
	 	alert ("请输入收件人的县/区");
		return;
	 } else if ($('#postalcode').val().length == 0){
	 	alert ("请输入收件人的邮编");
		return;
	 } else if ($('#address').val().length == 0){
	 	alert ("请输入收件人的具体地址");
		return;
	 }else if(document.getElementById("invoice").selectedIndex==0){
	 if ($('#invoice_head').val().length == 0&& document.getElementById("invoice_type").selectedIndex==1){
	 	alert ("请输入发票抬头");
		return;
		}
	  if ($('#invoice_address').val().length == 0){
	 	alert ("请输入发票地址");
		return;
		} 
	 }else if ($('#captcha').val().length == 0) {
		alert ("请输入您的验证码");
		return;
	}
	var order = { 
		"addr" : $('#address').val(),
		"billing" : $('#invoice_address').val(),
		"city" : $('#city').val(),
		"coupon" : $('#coupon').val(),
		"district" : $('#district').val(),
		"discount" : $('#discount').val(),
		"invoice_title" : $('#invoice_head').val(),
		"mobile" : $('#mobile').val(),
		"need_invoice" : $('#invoice').val(),
		"payment" : $('#payment option:selected').val(),
		"phone" : $('#telephone01').val() + '-' + $('#telephone02').val() + '-' + $('#telephone03').val(),
		"postal" : $('#postalcode').val(),
		"productid" : window.location.search.split('=')[1],
		"province" : $('#province').val(),
		"quantity" : $('#num').val(),
		"username" : $('#consignee_name').val()
	};
	
	$.ajax ({
		url:		"/orders.json",
		type:		"POST",
		dataType:	"json",
		data:		{
			order : order,
			captcha:		$('#captcha').val(),
			captcha_key:	$('#captcha_key').val()
		}
	}).done (function (resp) {
		if (parseInt (resp.status) == 1)
			location.href = "/气之购/订单生成";
		else {
			if (resp.description != null)
				alert (resp.description);
			else
				alert ("请求失败，请再检查一遍您的输入并稍候再试");
			$(".authenticationtd").load ('/%E6%B0%94%E4%B9%8B%E8%B4%AD/%E9%A2%84%E8%AE%A2%E5%8D%95 .simple_captcha');
		}
	}).fail (function() {
		alert ("请求发送失败，请稍候再试");
		$(".authenticationtd").load ('/%E6%B0%94%E4%B9%8B%E8%B4%AD/%E9%A2%84%E8%AE%A2%E5%8D%95 .simple_captcha');
	});
}
function createNewAddress(){
	if ($('#consignee_name').val().length == 0) {
		alert ("请输入收件人姓名");
		return;
	 } else if ($('#mobile').val().length == 0) {
		alert ("请输入收件人手机号码");
		return;
	}else if ($('#province').val().length == 0){
	 	alert ("请输入收件人的省");
		return;
	 } else if ($('#city').val().length == 0){
	 	alert ("请输入收件人的市");
		return;
	 } else if ($('#district').val().length == 0){
	 	alert ("请输入收件人的县/区");
		return;
	}else if ($('#postalcode').val().length == 0){
	 	alert ("请输入收件人的邮编");
		return;
	 } else if ($('#address').val().length == 0){
	 	alert ("请输入收件人的具体地址");
		return;
	 }
	var addrDetails = {
			"addr" : $('#address').val(),
			"city" : $('#city').val(),
			"district" : $('#district').val(),
			"mobile" : $('#mobile').val(),
			"phone" : $('#telephone01').val() + '-' + $('#telephone02').val() + '-' + $('#telephone03').val(),
			"postal" :  $('#postalcode').val(),
			"province" : $('#province').val(),
			"username" : $('#consignee_name').val()
		};
		$.ajax ({
		url:		"/memberships/1/addresses.json",
		type:		"POST",
		dataType:	"json",
		data:		{
			address : addrDetails,
		}
		}).done (function (resp) {
			alert("保存地址成功");
			$('#useNewAddrChk').attr("checked",false);
			$('#saveNewAddressDiv').css("display","none");
			//数据插到表格中
			if($('#existedAddressTab tbody tr:first-child #receiverTd').html()=='')
			{
				$('#existedAddressTab tbody tr:first-child #receiverTd').html ($('#consignee_name').val());
				$('#existedAddressTab tbody tr:first-child #districtTd').html ($('#province').val()+'/'+$('#city').val()+'/'+$('#district').val());
				$('#existedAddressTab tbody tr:first-child #detailAddrTd').html ($('#address').val());
				$('#existedAddressTab tbody tr:first-child #postalTd').html ($('#postalcode').val());
				$('#existedAddressTab tbody tr:first-child #phoneTd').html ($('#mobile').val());
			}
			else
			{
				$( "#existedAddressTab tbody tr:first-child").clone(true).prependTo( "#existedAddressTab" );
				$('#existedAddressTab tbody tr:first-child #receiverTd').html ($('#consignee_name').val());
				$('#existedAddressTab tbody tr:first-child #districtTd').html ($('#province').val()+'/'+$('#city').val()+'/'+$('#district').val());
				$('#existedAddressTab tbody tr:first-child #detailAddrTd').html ($('#address').val());
				$('#existedAddressTab tbody tr:first-child #postalTd').html ($('#postalcode').val());
				$('#existedAddressTab tbody tr:first-child #phoneTd').html ($('#mobile').val());
			}
		}).fail (function() {
		alert ("请求发送失败，请稍候再试");
		});
		
}

//function gotoby(){
	$(".saveinformation").click (function(){
		var sku = $(this).parent().find ('#productid').val();
		location.href = "/气之购/预订单?sku="+sku;
	});
//}

function displayTotalPrice()
{
	if($("#num").val()!=""){
		var totalPrice = $('#price').val()*$("#num").val();
		//alert(totalPrice);
		$("#Sub-total").val(totalPrice);
		$('#total').val('');
	}
}

function whetherUseDiscount()
{
var discountSelecter = document.getElementById("discount"); //selectid
var index = discountSelecter.selectedIndex; // 选中索引
	if(index==1)
	{
		$('#coupon').prop('disabled', true);
		if($("#Sub-total").val()!="")
		{
			$("#total").val($("#Sub-total").val());
		}
		else
		{
			$("#total").val("");
		}
	}
	else
	{
		$('#coupon').prop('disabled', false);
		$("#total").val("");
	}
}

function whetherNeedInvoice()
{
	var invoiceSelecter = document.getElementById("invoice"); //selectid
	var index = invoiceSelecter.selectedIndex; // 选中索引
	if(index==1)
	{
		$('#invoice_type').prop('disabled', true);
		$('#invoice_head').prop('disabled', true);
		$('#invoice_address').prop('disabled', true);
	}
	else
	{
		$('#invoice_type').prop('disabled', false);
		$('#invoice_head').prop('disabled', false);
		$('#invoice_address').prop('disabled', false);
	}
}
function checkDiscount()
{
	if(document.getElementById("discount").selectedIndex==0)
	{
		if($('#coupon').val()!='')
		{
			$('#total').val($('#Sub-total').val());
		}else
		{
			$('#total').val('');
		}
	}
}
function personalOrCompany()
{
	var invoiceTypeSelecter = document.getElementById("invoice_type"); //selectid
	var index = invoiceTypeSelecter.selectedIndex; // 选中索引
	if(index==0)
	{
		$('#invoice_head').prop('disabled', true);
	}
	else
	{
		$('#invoice_head').prop('disabled', false);
	}
}
