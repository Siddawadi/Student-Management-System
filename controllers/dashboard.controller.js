import Student from "../models/student.model.js"
import { Course } from "../models/course.model.js"
import Attendance from "../models/attendance.model.js"
import Fee from "../models/fee.model.js"

export const getDashboardStats = async (req, res) => {
  try {
    // 🔹 Simple counts
    const totalStudents = await Student.countDocuments()
    const totalCourses = await Course.countDocuments()

    // 🔹 Attendance %
    const totalAttendance = await Attendance.countDocuments()
    const present = await Attendance.countDocuments({ status: "Present" })

    const attendancePercentage =
      totalAttendance === 0
        ? 0
        : Math.round((present / totalAttendance) * 100)

    // 🔹 Total revenue (simple sum)
    const fees = await Fee.find({ status: "paid" })

    const totalRevenue = fees.reduce((sum, fee) => {
      return sum + (fee.amount || 0)
    }, 0)

    res.json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        attendancePercentage,
        totalRevenue
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Dashboard error",
      error: error.message
    })
  }
}