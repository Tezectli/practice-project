# login

::: tip
这个模块用于放置登录功能的相关请求。
:::

## getProvince

用于获取全部省份

| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| getProvince() | 无 | 通用 | `GET` |

已使用组件：`LocationPicker`。


## getCity

用于获取对应省份的城市列表

| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| getCity(province) | province | 通用 | `GET` |

已使用组件：`LocationPicker`。


## getSchool

用于获取对应省市的学校列表

| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| getSchool(province,city) | province,city | 通用 | `GET` |

已使用组件：`LocationPicker`。

## teacherLogin

用于教师登录

| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| teacherLogin(teacherName,password,orgId) | teacherName,password,orgId | 教师 | `POST` |

已使用页面：`Login`。

## studentLogin

::: danger 注意
这个请求没有使用统一的封装，它的 500/200/10 都会被视为通过。
:::

用于学生登录，当`data.code`返回`10`的时候代表当前页面在微信打开，且该账号尚未绑定微信。

| 使用                | 参数            | 范围 | 类型 |
| ---------------- |:-------------: | ---: | ---: |
| studentLogin(studentName,password,orgId) | studentName,password,orgId | 学生 | `POST` |

已使用页面：`Login`。

## modifyTeacherPassword

用于修改教师的密码。

| 使用                | 参数            | 范围 | 类型 |
| ---------------- |:-------------: | ---: | ---: |
|  modifyTeacherPassword(oldPassword,newPassword) | oldPassword,newPassword | 教师 | `POST` |

已使用组件：`UserCell`。

## bindWechat

::: tip
参数type只可以传`1`或`2`。`1`代表绑定，`2`代表不绑定。
:::

用于在学生首次登录时将微信与当前账号绑定。

| 使用                | 参数            | 范围 | 类型 |
| ---------------- |:-------------: | ---: | ---: |
|  bindWechat(type) | type | 学生 | `POST` |

已使用页面：`Login`。

## getAccountInfo

用于获取学生已绑定的微信账号信息。

| 使用                | 参数            | 范围 | 类型 |
| ---------------- |:-------------: | ---: | ---: |
| getAccountInfo() | 无 | 学生 | `GET` |

已使用页面：`PickRole`。

## studentQuickLogin

用于学生通过微信的已绑定账号进行快速登录

| 使用                | 参数            | 范围 | 类型 |
| ---------------- |:-------------: | ---: | ---: |
| studentQuickLogin(orgId,studentId,studentName)| orgId,studentId,studentName | 学生 | `POST` |

已使用组件：`AccountContact`。