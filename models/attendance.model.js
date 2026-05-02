import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student is required"]
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course is required"]
  },
  semester: {
    type: String,
    required: [true, "Semester is required"]
  },
  date: {
    type: Date,
    required: [true, "Date is required"]
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    default: "Present"
  }
}, { timestamps: true })

// एउटै student को एउटै date मा एकपटक मात्र
attendanceSchema.index({ student: 1, date: 1 }, { unique: true })

const Attendance = mongoose.model("Attendance", attendanceSchema)
export default Attendance