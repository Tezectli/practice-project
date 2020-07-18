# upload

::: tip
这个模块用于放置含多媒体/文件上传功能的请求。
:::

::: danger 注意
因为 axios [**本身的的一个BUG**](https://github.com/axios/axios/issues/362),这些请求没有使用统一的封装。
:::

## uploadPictures

用于上传图片

| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| uploadPictures(file,classId) | file,classId | 教师 | `POST` |

已使用组件：`UploadFile`。


## addActivityWall

教师发活动墙

| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
|  addActivityWall(content,fileList) | content,fileList | 教师 | `POST` |

已使用组件：`AddActivityWall`。


## uploadTeachPlan

用于上传教案

| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| uploadTeachPlan(file, classId) | file, classId | 教师 | `POST` |

已使用页面：`UploadTeachPlan`。

## uploadTeachResource

用于教师上传教学资源

| 使用                | 参数            | 范围 | 类型 |
| ------------------- |:-------------: | ---: | ---: |
| uploadTeachResource(file, classId, isShare) | file, classId, isShare | 教师 | `POST` |

已使用页面：`UploadTeachResource`。
