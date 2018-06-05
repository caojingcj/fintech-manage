/**
 * 常用公共方法
 * @author qierkang xyqierkang@163.com
 * @date 2017-6-13 PM 9:29:21
 */
var ek = $.extend({}, ek);/* 全局变量 */

/**
 *全局初始化绑定checkbox>name 
 *
 *$(document).on('change','input[name=btSelectAll]',function(event){
		var checkedNum = $("input[name='btSelectItem']:checked").length; 
		if(checkedNum == 0){
			$("#btn_delete").attr("disabled",true);
		}else{
			$("#btn_delete").attr("disabled",false);
		}
	});
 */
//$(document).on('change','.bs-checkbox > input[name=btSelectItem]');
//$(document).on('change','.bs-checkbox > input[name=btSelectAll]');

/**
 * 生成UUID
 */
ek.random4 = function() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
ek.UUID = function() {
	return (ek.random4() + ek.random4() + "-" + ek.random4() + "-" + ek.random4() + "-" + ek.random4() + "-" + ek.random4() + ek.random4() + ek.random4());
};

/**
 * 获取url参数
 */
ek.getUrlParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
};

ek.getList = function(value) {
	if (value) {
		var values = [];
		var t = value.split(',');
		for ( var i = 0; i < t.length; i++) {
			values.push('' + t[i]);/* 避免將ID当成数字 */
		}
		return values;
	} else {
		return [];
	}
};

/**
 *  判断浏览器是否是IE且版本小于8 */
ek.isLessThanIe8 = function() {
	return ($.browser.msie && $.browser.version < 8);
};

//初始化 销毁表格
function destroyBsTable() {
	$('#bsTable').bootstrapTable('destroy');
}

//格式化数据
function responseHandler(sourceData) { 
	return sourceData.code == "000000"?{"total": sourceData.data.totalcount,"rows":sourceData.data.dataList==null?sourceData.data:sourceData.data.dataList}:{"total": 0,"rows":[]};
}
/*文本框校验*/
function bsFormValidator(formId){
	$('#'+formId).bootstrapValidator('validate');
	$('#'+formId).data('bootstrapValidator').validate();
	return $('#'+formId).data('bootstrapValidator').isValid();
}

$(function(){
//作废 火狐不支持 暂时可以不用
//回车事件
//	$("body").keydown(function() {
//        if (event.keyCode == "13") {//keyCode=13是回车键
//        	$('#bsTable').bootstrapTable('refresh');
//        }
//    });
	//esc事件
//	$("body").keydown(function() {
//        if (event.keyCode == "27") {//keyCode=27是esc
//        	return false;
//        }
//    });
	
//radio初始化
//$(".i-checks").iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green",});
});


//关闭模态框执行一些清空操作
ek.clearModal=function(modalId,formId,hiddenId){
	if(hiddenId!=null&&hiddenId!=''&& modalId!=null&&modalId!=''){
		$('#'+modalId).modal('hide');
		$(':input[name!="'+hiddenId+'"]','#'+formId).val('').removeAttr('checked').removeAttr('selected');

	}else{
		$(':input','#'+formId).val('').removeAttr('checked').removeAttr('selected');
	}
	
}
//初始化查询控件
ek.btnSearch=function(){
	var oTable = new TableInit();
	oTable.Init();
}

/*日期格式化*/
ek.formatDateTime=function(now) {
	if(now!=null&now!=''){
		var timestamp4 = new Date(now);
		return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
	}
	return '-';
}
ek.formatDate=function(now) {
	if(now!=null&now!=''){
		var timestamp4 = new Date(now);
		return timestamp4.toLocaleDateString().replace(/\//g, "-");
	}
	return '-';
}
/**
 * ajax download
 * @param url 路径
 * @param paramMap 参数HashMap
 * @returns {String} formId
 */
var ajaxDownloadFile = function(url,paramMap){
	var token = new Date().getTime();
	var formId = 'ajaxDownload_'+token;
	var form = $('<form style="display:none" target="" method="post">'); 
	form.attr('id',formId);   
	form.attr('action',url);
	if(paramMap != null && paramMap.size() > 0){
		var keys = paramMap.keys();
		for(var i = 0 ; i < keys.length ; i++){ 
			input0 = $('<input type="hidden">'); 
			input0.attr('name',keys[i]); 
			input0.attr('value',paramMap.get(keys[i])); 
			form.append(input0);
		} 
	}
	$('body').append(form);
	form.submit(); 
	return formId;
};

function HashMap(){
	var size = 0;/** Map 大小 * */
	var entry = new Object();/** 对象 * */
	this.put = function(key, value){/** 存 * */
		if (!this.containsKey(key)){
			size++;
		}
		entry[key] = value;
	};
	this.get = function(key){/** 取 * */
		if (this.containsKey(key)){
			return entry[key];
		}else{
			return null;
		}
	};
	this.remove = function(key){/** 删除 * */
		if (delete entry[key]){
			size--;
		}
	};
	this.containsKey = function(key){/** 是否包含 Key * */
		return (key in entry);
	};
	this.containsValue = function(value){/** 是否包含 Value * */
		for (var prop in entry){
			if (entry[prop] == value){
				return true;
			}
		}
		return false;
	};
	this.values = function(){/** 所有 Value * */
		var values = [];
		for (var prop in entry){
			values.push(entry[prop]);
		}
		return values;
	};
	this.keys = function(){/** 所有 Key * */
		var keys = [];
		for (var prop in entry){
			keys.push(prop);
		}
		return keys;
	};
	this.size = function(){/** Map Size * */
		return size;
	};
}
/**
 * 獲得專案根目錄
 * 使用方法：sy.bp();
 */
ek.bp = function() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
};

//事件处理对象
//绑定事件按钮
ek.EventUtil = {
 // 添加事件监听 
 add: function(element, type, callback){
  if(element.addEventListener){
   element.addEventListener(type, callback, false);
  } else if(element.attachEvent){
   element.attachEvent('on' + type, callback);
  } else {
   element['on' + type] = callback;
  }
 },
  
 // 移除事件监听
 remove: function(element, type, callback){
    
  if(element.removeEventListener){
   element.removeEventListener(type, callback, false);
  } else if(element.detachEvent){
   element.detachEvent('on' + type, callback);
  } else {
   element['on' + type] = null;
  }
  
 },
 // 跨浏览器获取 event 对象
 getEvent: function(event){
  return event ? event : window.event;
 },
  
 // 跨浏览器获取 target 属性
 getTarget: function(event){
    
  return event.target || event.srcElement;
 },
  
 // 阻止事件的默认行为
 preventDefault: function(event){
   
  if(event.preventDefault){
   event.preventDefault();
  } else {
   event.returnValue = false;
  }
 },
  
 // 阻止事件流或使用 cancelBubble
 stopPropagation: function(){
    
  if(event.stopPropagation){
   event.stopPropagation();
  } else {
   event.cancelBubble = true;
  }
 }
  
};

ek.ajaxDownloadFile = function(url,paramMap){
	var token = new Date().getTime();
	var formId = 'ajaxDownload_'+token;
	var form = $('<form style="display:none" target="" method="post">'); 
	form.attr('id',formId);   
	form.attr('action',url);
	if(paramMap != null && paramMap.size() > 0){
		var keys = paramMap.keys();
		for(var i = 0 ; i < keys.length ; i++){ 
			input0 = $('<input type="hidden">'); 
			input0.attr('name',keys[i]); 
			input0.attr('value',paramMap.get(keys[i])); 
			form.append(input0);
		}
	}
	$('body').append(form);
	form.submit(); 
	return formId;
};
