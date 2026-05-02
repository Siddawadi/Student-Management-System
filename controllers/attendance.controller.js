import customError from "../middlewares/error.handler.middleware.js";
import Attendance from "../models/attendance.model.js";

export const Add = async (req, res, next) => {
    try {
        const { student, course, semester, date, status } = req.body  // ← semester थपियो

        if (!student || !course || !semester || !date || !status) {
            throw new customError("All fields are required", 400)
        }

        const att = await Attendance.create({ student, course, semester, date, status })  // ← semester थपियो
        
        res.status(201).json({
            message: "Attendance marked successfully",
            status: "success",
            data: att
        })
    } catch (error) {
        next(error)
    }
}

export const getByDate = async (req, res, next) => {
  try {
    const { date } = req.query

    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    const records = await Attendance.find({ 
      date: { $gte: startDate, $lte: endDate }
    })
    .populate("student", "first_name last_name email")
    .populate("course", "cname code")

    if (!records.length) {
      throw new customError("No attendance records found for this date", 404)
    }

    res.status(200).json({
      message: "Attendance records found",
      status: "success",
      data: records
    })

  } catch (error) {
    next(error)
  }
}


export const getByStudent = async (req, res, next) => {
  try {
    const { id } = req.params

    const records = await Attendance.find({ student: id })
      .populate("student", "first_name last_name email")
      .populate("course", "cname code")

    if (!records.length) {
      throw new customError("No attendance records found for this student", 404)
    }

    res.status(200).json({
      message: "Attendance records found",
      status: "success",
      data: records
    })

  } catch (error) {
    next(error)
  }
}



export const getById = async (req, res, next) => {
  try {
    const { id } = req.params

    const record = await Attendance.findById(id)
      .populate("student", "first_name last_name email")
      .populate("course", "cname code")

    if (!record) {
      throw new customError("Attendance record not found", 404)
    }

    res.status(200).json({
      message: "Attendance record found",
      status: "success",
      data: record
    })

  } catch (error) {
    next(error)
  }
}
// 1. Course, Semester, Date अनुसार
export const FindAttendance = async (req, res, next) => {
    try {
        const { course, semester, date } = req.query

        if (!course || !semester || !date) {
            throw new customError("All fields are required", 400)
        }

        
        const startDate = new Date(date)
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date(date)
        endDate.setHours(23, 59, 59, 999)

        const attendance = await Attendance.find({
            course,
            date: { $gte: startDate, $lte: endDate }
        })
        .populate('student', 'first_name last_name phone semester')
        .populate('course', 'name')

       
        const filtered = attendance.filter(
            (att) => att.student.semester === semester
        )

        res.status(200).json({
            message: "Attendance fetched successfully",
            status: "success",
            data: filtered
        })

    } catch (error) {
        next(error)
    }
}


export const FindAllAttendance = async (req, res, next) => {
    try {
        const attendance = await Attendance.find()
            .populate('student', 'first_name last_name phone semester')
            .populate('course', 'name')

        res.status(200).json({
            message: "All attendance fetched successfully",
            status: "success",
            data: attendance
        })

    } catch (error) {
        next(error)
    }
}
export const DeleteOne = async (req, res, next) => {
    try {
        const { id } = req.params
        await Attendance.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted successfully", status: "success" })
    } catch (error) {
        next(error)
    }
}

export const DeleteAll = async (req, res, next) => {
    try {
        const { course, semester, date } = req.query

        const startDate = new Date(date)
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date(date)
        endDate.setHours(23, 59, 59, 999)

        await Attendance.deleteMany({
            course,
            semester,
            date: { $gte: startDate, $lte: endDate }
        })

        res.status(200).json({ message: "All records deleted", status: "success" })
    } catch (error) {
        next(error)
    }
}