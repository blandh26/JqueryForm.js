/*
 * JqueryForm.js表单赋值，传入一个json对象，为form赋值
 * 作者：bland26
 * https://github.com/blandh26/JqueryForm.js
 *1、此方法能赋值一般所有表单。
 *2、此插件现在只接收json赋值，不考虑到其他的来源数据
 *3、对于特殊的textarea，比如CKEditor,kindeditor...，他们的赋值有提供不同的自带方法，这里不做统一，
 * 如果项目中有用到，不能正确赋值，请单独赋值
 * 注：name 都要小写 不支持大写和大小写混用！
 * 更新日志：
 * 2018-09-25：select value值 支持大小写，但是不支持大小写混用
 * 2018-10-26：支持时间插件。
 * 2018-11-01：时间格式化部分加验证 null 不做格式化
 * 2018-11-20：支持checkbox、新增一个获取表单 包括checkbox 和redio 、重置界面功能新增
 * 2018-11-21：当前时间加减js方法新增
 * 2018-11-22：支持disabled属性取值。
 * 2018-11-27：获取表单添加2个方法。Get_FormArray 和 Get_FormOneArray
 * 2018-12-11：Get_FormOneArray_List、Get_Form_List方法新增 可以用class 选多个表单数据 推荐用Get_FormOneArray_List
 */
(function ($) {
    $.fn.extend({
        //赋值表单
        Set_Form: function (options) {
            //默认参数
            var defaults = {
                jsonValue: "",
                isDebug: false //是否需要调试，这个用于开发阶段，发布阶段请将设置为false，默认为false,true将会把name value打印出来
            }
            //设置参数
            var setting = $.extend({}, defaults, options);
            var form = this;
            jsonValue = setting.jsonValue;
            //如果传入的json字符串，将转为json对象
            if ($.type(setting.jsonValue) === "string") {
                jsonValue = $.parseJSON(jsonValue);
            }
            //如果传入的json对象为空，则不做任何操作
            if (!$.isEmptyObject(jsonValue)) {
                var debugInfo = "";
                $.each(jsonValue, function (key, value) {
                    //是否开启调试，开启将会把name value打印出来
                    if (setting.isDebug) {
                        alert("name:" + key + "; value:" + value);
                        debugInfo += "name:" + key + "; value:" + value + " || ";
                    }
                    var formField = form.find("[name='" + key.toLowerCase() + "']");
                    if ($.type(formField[0]) === "undefined") {
                        if (setting.isDebug) {
                            alert("can not find name:[" + key + "] in form!!!"); //没找到指定name的表单
                        }
                    } else {
                        var fieldTagName = formField[0].tagName.toLowerCase();
                        if (fieldTagName == "input") {
                            if (formField.attr("type") == "radio") {
                                $("input:radio[name='" + key.toLowerCase() + "'][value='" + value + "']").attr("checked", "checked");
                            } else if (formField.attr("type") == "checkbox") {
                                if (value == "1" || value == "true" || value == "True") {
                                    $("input:checkbox[name='" + key.toLowerCase() + "']").prop("checked", "checked");
                                } else {
                                    $("input:checkbox[name='" + key.toLowerCase() + "']").prop("checked", "");
                                }
                            } else if (formField.attr("format") != "" && formField.attr("format") != undefined && formField.attr("format") != null) {
                                if (value != null) {
                                    value = value.toLowerCase().replace("t", " ")
                                    switch (formField.attr("fromat").toLowerCase()) {
                                        case "yyyy-mm-dd":
                                            formField.val(value.match(/\d{4}-\d{2}-\d{2}/g));
                                            break;
                                        case "dd:hh:mm":
                                            formField.val(value.match(/\d{2}:\d{2}:\d{2}/g));
                                            break;
                                        case "yyyy-mm-dd dd:hh:mm":
                                            formField.val(value.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g));
                                            break;
                                    }
                                }
                            } else {
                                formField.val(value);
                            }
                        } else if (fieldTagName == "select") {
                            if (!isNaN(value)) {
                                formField.val(value); //数字
                            } else {
                                formField.val(value.toLowerCase()); //小写赋值
                                formField.val(value.toUpperCase()); //大写赋值
                            }
                        } else if (fieldTagName == "textarea") {
                            formField.val(value);
                        } else {
                            formField.val(value);
                        }
                    }
                })
                if (setting.isDebug) {
                    alert(debugInfo);
                }
            }
            return form; //返回对象，提供链式操作
        },
        //获取表单数据 ftopicno=&amp;ftopicname=&amp;supnamecn=&amp;createtime_strat=
        Get_Form: function () {
            var list = this.serializeArray();
            var $radio = $('input[type=radio],input[type=checkbox]', this);
            var temp = {};
            $.each($radio, function () {
                if (!temp.hasOwnProperty(this.name)) {
                    if ($("input[name='" + this.name + "']:checked").length == 0) {
                        temp[this.name] = "";
                        list.push({
                            name: this.name,
                            value: ""
                        });
                    }
                }
            });
            var disabledlist = $('input[disabled=disabled]', this);
            for (var i = 0; i < disabledlist.length; i++) {
                list.push({
                    name: disabledlist[i].name,
                    value: disabledlist[i].value
                });
            }
            return jQuery.param(list);
        },
        //获取表单数据OneArray {"name":"ftopicno","value":"","value":""}
        Get_FormOneArray: function () {
            var list = this.serializeArray();
            var $radio = $('input[type=radio],input[type=checkbox]', this);
            var temp = {};
            $.each($radio, function () {
                if (!temp.hasOwnProperty(this.name)) {
                    if ($("input[name='" + this.name + "']:checked").length == 0) {
                        temp[this.name] = "";
                        list.push({
                            name: this.name,
                            value: ""
                        });
                    }
                }
            });
            var disabledlist = $('input[disabled=disabled]', this);
            for (var i = 0; i < disabledlist.length; i++) {
                list.push({
                    name: disabledlist[i].name,
                    value: disabledlist[i].value
                });
            }
            var onejson = {};
            for (var i = 0; i < list.length; i++) {
                if (list[i].value == "" || list[i].value == "null" || list[i].value == "undefined" || list[i].value == null || list[i].value == undefined) {
                    onejson[list[i].name] = null;
                } else {
                    onejson[list[i].name] = list[i].value;
                }
            }
            let selectList = $("select");
            for (var i = 0; i < selectList.length; i++) {
                onejson[$("select")[i].id] = $("select")[i].value;
            }
            return onejson;
        },
        //获取表单数据Array [{"name":"ftopicno","value":""},{"name":"ftopicname","value":""}]
        Get_FormArray: function () {
            var list = this.serializeArray();
            var $radio = $('input[type=radio],input[type=checkbox]', this);
            var temp = {};
            $.each($radio, function () {
                if (!temp.hasOwnProperty(this.name)) {
                    if ($("input[name='" + this.name + "']:checked").length == 0) {
                        temp[this.name] = "";
                        list.push({
                            name: this.name,
                            value: ""
                        });
                    }
                }
            });
            var disabledlist = $('input[disabled=disabled]', this);
            for (var i = 0; i < disabledlist.length; i++) {
                list.push({
                    name: disabledlist[i].name,
                    value: disabledlist[i].value
                });
            }
            for (var i = 0; i < list.length; i++) {
                if (list[i].value == "" || list[i].value == "null" || list[i].value == "undefined" || list[i].value == null || list[i].value == undefined) {
                    list[i].value = null;
                }
            }
            return list;
        },
        //获取表单数据 ftopicno=&amp;ftopicname=&amp;supnamecn=&amp;createtime_strat= 中间‖隔开2个表单
        Get_Form_List: function () {
            var formlist = this;
            var strlist = "";
            for (var i = 0; i < formlist.length; i++) {
                var list = $("#" + formlist[i].id).serializeArray();
                var $radio = $('input[type=radio],input[type=checkbox]', this);
                var temp = {};
                $.each($radio, function () {
                    if (!temp.hasOwnProperty(this.name)) {
                        if ($("input[name='" + this.name + "']:checked").length == 0) {
                            temp[this.name] = "";
                            list.push({
                                name: this.name,
                                value: ""
                            });
                        }
                    }
                });
                var disabledlist = $('input[disabled=disabled]', this);
                for (var j = 0; j < disabledlist.length; j++) {
                    list.push({
                        name: disabledlist[j].name,
                        value: disabledlist[j].value
                    });
                }
                if (strlist == "") {
                    strlist = jQuery.param(list);
                } else {
                    strlist += "‖" + jQuery.param(list);
                }
            }
            return strlist;
        },
        //获取表单数据Get_FormOneArray_List {"name":"ftopicno","value":"","value":""}
        Get_FormOneArray_List: function () {
            var formlist = this;
            var templist = [];
            for (var i = 0; i < formlist.length; i++) {
                var list = $("#" + formlist[i].id).serializeArray();
                var $radio = $('input[type=radio],input[type=checkbox]', this);
                var temp = {};
                $.each($radio, function () {
                    if (!temp.hasOwnProperty(this.name)) {
                        if ($("input[name='" + this.name + "']:checked").length == 0) {
                            temp[this.name] = "";
                            list.push({
                                name: this.name,
                                value: ""
                            });
                        }
                    }
                });
                var disabledlist = $('input[disabled=disabled]', this);
                for (var j = 0; j < disabledlist.length; j++) {
                    list.push({
                        name: disabledlist[j].name,
                        value: disabledlist[j].value
                    });
                }
                var onejson = {};
                for (var k = 0; k < list.length; k++) {
                    if (list[k].value == "" || list[k].value == "null" || list[k].value == "undefined" || list[k].value == null || list[k].value == undefined) {
                        onejson[list[k].name] = null;
                    } else {
                        onejson[list[k].name] = list[k].value;
                    }
                }
                templist.push(onejson);
            }
            return templist;
        },
        //重置表单包含 redio和checkbox
        ReSet: function () {
            this[0].reset();
            var $list = $('input[type=radio],input[type=checkbox]', this);
            var temp = {};
            $.each($list, function () {
                if (!temp.hasOwnProperty(this.name)) {
                    $("input[name='" + this.name + "']:checked").prop('checked', '');
                }
            });
            var $hiddenlist = $('input[type=hidden]', this);
            var hiddentemp = {};
            var selector = this.selector;
            $.each($hiddenlist, function () {
                if (!hiddentemp.hasOwnProperty(this.name)) {
                    $(selector + " input[name='" + this.name + "']").val('');
                }
            });
        }
    });
    //获取时间 根据上前时间月日加减方法
    function today(type, operator, value) {
        var today = new Date();
        switch (type) {
            case "m":
                if (operator == "-") {
                    today.setMonth(today.getMonth() - parseInt(value));
                } else if (operator == "+") {
                    today.setMonth(today.getMonth() + parseInt(value));
                }
                break;
            case "d":
                if (operator == "-") {
                    today.setDate(today.getDate() - parseInt(value));
                } else if (operator == "+") {
                    today.setDate(today.getDate() + parseInt(value));
                }
                break;
        }
        var h = today.getFullYear();
        var m = today.getMonth() + 1;
        var d = today.getDate();
        m = m < 10 ? "0" + m : m; // 这里判断月份是否&lt;10,如果是在月份前面加'0'
        d = d < 10 ? "0" + d : d; // 这里判断日期是否&lt;10,如果是在日期前面加'0'
        return h + "-" + m + "-" + d;
    }
})(jQuery)