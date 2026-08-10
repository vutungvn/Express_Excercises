import Employee from "../models/Employee.js";
import AppError from "../utils/AppError.js";

export const getEmployees = (req, res, next) => {
  try {
    const employees = Employee.getAll();
    return res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

export const createEmployee = (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(new AppError("Vui lòng nhập đầy đủ name và email", 400));
    }

    const existingEmployee = Employee.findByEmail(email);
    if (existingEmployee) {
      return next(new AppError("Email đã tồn tại", 409));
    }

    const newEmployee = Employee.create({ name, email });
    return res.status(201).json({
      success: true,
      data: newEmployee,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = Employee.findById(id);

    if (!employee) {
      return next(new AppError("Không tìm thấy nhân viên", 404));
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = Employee.findById(id);

    if (!employee) {
      return next(new AppError("Không tìm thấy nhân viên", 404));
    }

    if (!req.file) {
      return next(new AppError("Vui lòng chọn file ảnh để upload", 400));
    }

    const avatarUrl = `/uploads/${req.file.filename}`; // /uploads/Branch.png
    const updatedEmployee = Employee.updateAvatar(id, avatarUrl);

    return res.status(200).json({
      message: "Upload thành công",
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};
