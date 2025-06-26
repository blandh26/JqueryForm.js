#  JqueryForm.js - jQuery 表单处理插件
##  简介
JqueryForm.js 是一个轻量级 jQuery 表单处理插件，提供以下核心功能：
- 表单数据自动填充
- 多格式数据获取
- 智能表单重置
- 日期处理工具
- 多表单支持
- 调试模式

## 安装
<!--  引入 jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- 引入 JqueryForm 插件 -->
<script src="path/to/jquery.form.js"></script>

## 核心功能
### 1. 表单赋值 Set_Form()
为表单元素自动填充数据，支持各种输入类型：
$('#myForm').Set_Form({
    jsonValue: {
        username: "张三",
        email: "zhangsan@example.com",
        gender: "male",
        birthdate: "1990-05-15"
    },
    isDebug: true
});

| 参数 | 类型 | 说明 | 默认值 |
| -------- | -------- | -------- |
| jsonValue     | Object     | 表单数据对象     | 必填     |
| isDebug     | Boolean     | 调试模式开关     | false     |
| jsonValue     | Object     | 表单数据对象     | 必填     |
			
支持的表单元素类型：
| 元素类型 | 支持情况 | 特殊说明 |
| -------- | -------- | -------- |
| input[type=text]	     | ✅	直接赋值     | Text     |
| input[type=radio]	     | ✅	需要精确匹配value值     | Text     |
| input[type=checkbox]	     | ✅	值转换为布尔值     | Text     |
| input[type=date]	     | ✅	需设置format属性     | Text     |
| select     | ✅	支持大小写匹配     | Text     |	
| textarea     | ✅	直接赋值     | Text     |	
### 2. 数据获取方法
提供多种数据获取方式：
// 获取序列化字符串
const formData = $('#myForm').Get_Form();
// 输出: "name=张三&email=zhangsan@example.com"

// 获取JSON对象
const jsonData = $('#myForm').Get_FormOneArray();
// 输出: {name: "张三", email: "zhangsan@example.com"}

// 获取字段数组
const fieldArray = $('#myForm').Get_FormArray();
// 输出: [{name: "name", value: "张三"}, ...]
### 3. 多表单处理
支持同时处理多个表单：
// 获取多个表单的序列化字符串
const multiData = $('.forms').Get_Form_List();
// 输出: "name=张三‖email=zhangsan@example.com"

// 获取多个表单的JSON对象数组
const multiJson = $('.forms').Get_FormOneArray_List();
// 输出: [{name: "张三"}, {email: "zhangsan@example.com"}]
### 4. 表单重置 ReSet()
重置表单（包含 radio 和 checkbox）：
$('#myForm').ReSet();
### 5. 日期处理工具
提供日期计算方法：

// 获取3个月后的日期
const futureDate = today('m', '+', 3);
// 输出: "2023-11-15"

// 获取7天前的日期
const pastDate = today('d', '-', 7);
// 输出: "2023-08-08"
## 使用示例
### 基本表单操作
// 表单赋值
$('#userForm').Set_Form({
    jsonValue: {
        username: "李四",
        gender: "female",
        join_date: "2023-01-15"
    }
});

// 获取表单数据
const userData = $('#userForm').Get_FormOneArray();
console.log(userData);

// 重置表单
$('#userForm').ReSet();
日期字段处理
input type="text" name="birthdate" fromat="yyyy-mm-dd"
$('#myForm').Set_Form({
    jsonValue: {
        birthdate: "2023-08-15T12:30:45" // 自动转换为 "2023-08-15"
    }
});
## 注意事项
- 字段命名规范
- 所有字段名必须使用小写字母
- 不支持大小写混合命名
示例：username（✓） userName（✗）
## 日期格式化
支持以下格式：
<input type="text" name="birthdate" fromat="yyyy-mm-dd">
yyyy-mm-dd、dd:hh:mm、yyyy-mm-dd dd:hh:mm
## 调试模式
Set_Form({ isDebug: true }); // 显示所有字段赋值过程
