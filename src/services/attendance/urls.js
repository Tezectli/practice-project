import baseUrl from '../baseUrl'
export default {
    getTeacherCourseTime: (classId,day)=>{return baseUrl + `/teacher/getTeacherCourseTime/${classId}/${day}`},
    getStudentsAttendance: (classId,day,time)=>{return baseUrl + `/teacher/getStudentsAttendance/${classId}/${day}/${time}`},
    getAttendanceByClassId:(classId)=>{return baseUrl + `/teacher/getAttendanceByClassId/${classId}`},
    deleteEvaluation:baseUrl+'/teacher/deleteEvaluation'
}