# common

::: tip
这个模块用于放置多个页面常用功能的相关请求。
:::

## getWeekInfo

用于获取周次信息。


| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| getWeekInfo() | 无 | 教师 | `GET` |


已使用组件：`WeekPicker`。


## getTeachClass

获取教师上课的班级，不包含调课/代课等特殊情况。


| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| getTeachClass() | 无 | 教师 | `GET` |


已使用组件：`TeachClassPicker`。

##  getAllClass

获取教师在课的班级，包含调课/代课等一切情况。


| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
|  getAllClass() | 无 | 教师 | `GET` |


已使用组件：`TeachClassPicker`。

##  getClassStudent

获取教师在课的班级，包含调课/代课等一切情况。


| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
|  getClassStudent(classId) | classId | 教师 | `GET` |


已使用组件：`StudentPicker`，`StudentGridSelector`。

## searchClassStudent

查询班级某个对应学生


| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
|  searchClassStudent | classId,studentName | 教师 | `GET` |


已使用组件：`StudentGridSelector`。

##  getStudentClass

获取学生在课的班级


| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
|   getStudentClass() | 无 | 学生 | `GET` |


已使用组件：`Student/ClassPicker`。

