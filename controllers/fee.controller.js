import customError from "../middlewares/error.handler.middleware.js";
import Fee from "../models/fee.model.js";

export const add = async (req, res, next) => {
    try {
        const { student, amount, course, paidDate, dueDate, status, semester } = req.body

        if (!student || !amount || !paidDate || !dueDate || !status || !course || !semester) {
            throw new customError("please provide all the fields", 404)
        }

        const addFee = await Fee.create({
            student, amount, paidDate, dueDate, status, course, semester
        })

        if (!addFee) {
            throw new customError("couldn't add fee", 404)
        }

        res.status(201).json({
            message: "successfully inserted",
            status: "success",
            data: addFee
        })

    } catch (error) {
        next(error)
    }
}

export const getFeeBySemesterAndCourse = async (req, res, next) => {
    try {
        const { semester, course } = req.body

        if (!semester || !course) {
            throw new customError("Semester and course are required", 400)
        }

        const fees = await Fee.find({ semester, course })
            .populate("course", "name")
            .populate("student", "first_name email last_name")

        if (fees.length === 0) {
            throw new customError("No fee records found", 404)
        }

        res.status(200).json({
            message: "Records fetched successfully",
            status: "success",
            data: fees
        })

    } catch (error) {
        next(error)
    }
}

export const findall = async (req, res, next) => {
    try {
        const find = await Fee.find().populate("student")

        if (find.length === 0) {
            throw new customError("no data found", 404)
        }

        res.status(200).json({
            message: "successfully found",
            status: "success",
            data: find
        })

    } catch (error) {
        next(error)
    }
}

export const deletebyid = async (req, res, next) => {
    try {
        const { id } = req.params

        const del = await Fee.findByIdAndDelete(id)

        if (!del) {
            throw new customError("No fee records found", 404)
        }

        res.status(200).json({
            message: "Records deleted successfully",
            status: "success",
            data: del
        })

    } catch (error) {
        next(error)
    }
}

export const updatebyid = async (req, res, next) => {
    try {
        const { id } = req.params
        const { amount, paidDate, dueDate, status } = req.body

        const find = await Fee.findById(id)

        if (!find) {
            throw new customError("No fee records found", 404)
        }

        if (amount)   { find.amount = amount }
        if (paidDate) { find.paidDate = paidDate }
        if (dueDate)  { find.dueDate = dueDate }
        if (status)   { find.status = status }   // ✅ fixed

        await find.save()

        res.status(200).json({
            message: "Records updated successfully",  // ✅ fixed message
            status: "success",
            data: find
        })

    } catch (error) {
        next(error)
    }
}