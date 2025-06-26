# JqueryForm.js - jQuery 폼 처리 플러그인
## 소개
JqueryForm.js는 다음과 같은 핵심 기능을 제공하는 가벼운 jQuery 폼 처리 플러그인입니다.
- 폼 데이터 자동 입력
- 다중 포맷 데이터 수집
- 스마트 폼 재설정
- 날짜 처리 도구
- 다중 폼 지원
- 디버그 모드

## 설치
```
<!-- Import jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Import JqueryForm plug-in -->
<script src="path/to/jquery.form.js"></script>
```
## 핵심 기능
### 1. 폼 할당 Set_Form()
다양한 입력 유형을 지원하는 폼 요소의 데이터를 자동으로 입력합니다.
```
$('#myForm').Set_Form({
jsonValue: {
username: "张三",
email: "zhangsan@example.com",
성별: "남성",
생년월일: "1990-05-15"
},
isDebug: true
});
```
| 매개변수 | 유형 | 설명 | 기본값 |
| -------- | -------- | -------- | -------- |
| jsonValue | 객체 | 양식 데이터 객체 | 필수 |
| isDebug | 부울 | 디버그 모드 전환 | false |
| jsonValue | 객체 | 양식 데이터 객체 | 필수 |

지원되는 양식 요소 유형:
| 요소 유형 | 지원 | 특별 지침 |
| -------- | -------- | -------- |
| input[type=text] | ✅ | 직접 할당 |
| input[type=radio] | ✅ | 값을 정확히 일치시켜야 함 |
| input[type=checkbox] | ✅ | 부울로 변환된 값 |
| input[type=date] | ✅ | 형식 속성을 설정해야 함 |
| select | ✅ | 지원 사례 매칭 |
| textarea | ✅ | 직접 할당 |
### 2. 데이터 수집 방법
다양한 데이터 수집 방법 제공:
```
// 직렬화된 문자열 가져오기
const formData = $('#myForm').Get_Form();
// 출력: "name=张三&email=zhangsan@example.com"

// JSON 객체 가져오기
const jsonData = $('#myForm').Get_FormOneArray();
// 출력: {name: "张三", email: "zhangsan@example.com"}

// 필드 배열 가져오기
const fieldArray = $('#myForm').Get_FormArray();
// 출력: [{name: "name", value: "张三"}, ...]
### 3. 다중 폼 처리
동시에 여러 폼 처리 지원:
// 여러 폼의 직렬화된 문자열 가져오기
const multiData = $('.forms').Get_Form_List();
// 출력: "name=张三‖email=zhangsan@example.com"
// 여러 폼의 JSON 객체 배열 가져오기
const multiJson = $('.forms').Get_FormOneArray_List();
// 출력: [{name: "张三"}, {email: "zhangsan@example.com"}]
```
### 4. 폼 재설정 ReSet()
폼 재설정(라디오 및 체크박스 포함):
$('#myForm').ReSet();
### 5. 날짜 처리 도구
날짜 계산 메서드 제공:
```
// 3개월 후 날짜 가져오기
const futureDate = today('m', '+', 3);
// 출력: "2023-11-15"

// 7일 전 날짜 가져오기
const pastDate = today('d', '-', 7);
// 출력: "2023-08-08"
## 사용 예시
### 기본 폼 연산
// 폼 할당
$('#userForm').Set_Form({
jsonValue: {
username: "李四",
gender: "female",
join_date: "2023-01-15"
}
});

// 폼 데이터 가져오기
const userData = $('#userForm').Get_FormOneArray();
console.log(userData);

// 양식 재설정
$('#userForm').ReSet();

날짜 필드 처리
input type="text" name="birthdate" fromat="yyyy-mm-dd"
$('#myForm').Set_Form({
jsonValue: {
birthdate: "2023-08-15T12:30:45" // "2023-08-15"로 자동 변환
}
});
```
## 참고
- 필드 명명 규칙
- 모든 필드 이름은 소문자를 사용해야 합니다.
- 대소문자를 혼합하여 명명하는 것은 지원되지 않습니다.

예: 사용자 이름(✓) 사용자 이름(✗)
## 날짜 형식
다음 형식을 지원합니다.
```
<input type="text" name="birthdate" fromat="yyyy-mm-dd">
```
yyyy-mm-dd, dd:hh:mm, yyyy-mm-dd dd:hh:mm
## 디버그 모드
Set_Form({ isDebug: true }); // 모든 필드 할당 프로세스 표시




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
```
<!--  引入 jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- 引入 JqueryForm 插件 -->
<script src="path/to/jquery.form.js"></script>
```
## 核心功能
### 1. 表单赋值 Set_Form()
为表单元素自动填充数据，支持各种输入类型：
```
$('#myForm').Set_Form({
    jsonValue: {
        username: "张三",
        email: "zhangsan@example.com",
        gender: "male",
        birthdate: "1990-05-15"
    },
    isDebug: true
});
```
| 参数 | 类型 | 说明 | 默认值 |
| -------- | -------- | -------- | -------- |
| jsonValue | Object | 表单数据对象     | 必填     |
| isDebug | Boolean | 调试模式开关     | false     |
| jsonValue | Object | 表单数据对象     | 必填     |
			
支持的表单元素类型：
| 元素类型 | 支持情况 | 特殊说明 |
| -------- | -------- | -------- |
| input[type=text]	     | ✅	     | 直接赋值     |
| input[type=radio]	     | ✅	     | 需要精确匹配value值     |
| input[type=checkbox]	     | ✅	     | 值转换为布尔值     |
| input[type=date]	     | ✅	     | 需设置format属性     |
| select     | ✅	     | 支持大小写匹配     |	
| textarea     | ✅	     | 直接赋值     |	
### 2. 数据获取方法
提供多种数据获取方式：
```
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
```
### 4. 表单重置 ReSet()
重置表单（包含 radio 和 checkbox）：
$('#myForm').ReSet();
### 5. 日期处理工具
提供日期计算方法：
```
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
```
## 注意事项
- 字段命名规范
- 所有字段名必须使用小写字母
- 不支持大小写混合命名
  
示例：username（✓） userName（✗）
## 日期格式化
支持以下格式：
```
<input type="text" name="birthdate" fromat="yyyy-mm-dd">
```
yyyy-mm-dd、dd:hh:mm、yyyy-mm-dd dd:hh:mm
## 调试模式
Set_Form({ isDebug: true }); // 显示所有字段赋值过程
