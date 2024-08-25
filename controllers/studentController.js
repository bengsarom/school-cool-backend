const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel")
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Create student
const createStudent = asyncHandler(async (req, res) => {
  const { studentid, studentname, gender, dob, pob, address, fathername, mothername, image } = req.body;

  //   Validation
  if (!studentid || !studentname || !gender || !dob || !pob || !address || !fathername || !mothername || !image) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const student = await Student.create({
    user: req.user.id,
    studentid,
    studentname,
    gender,
    dob,
    pob,
    address,
    image: fileData,
  });

  res.status(201).json(student);
});

// Get all Student
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(students);
});

// Get single Student
const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  // if product doesnt exist
  if (!student) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match student to its user
  if (student.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(student);
});

// Delete Student
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  // if student doesnt exist
  if (!student) {
    res.status(404);
    throw new Error("student not found");
  }
  // Match student to its user
  if (student.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await student.remove();
  res.status(200).json({ message: "Student deleted." });
});

// Update Student
const updateStudent = asyncHandler(async (req, res) => {
  const { studentid, studentname, gender, dob, pob, address, fathername, mothername, image } = req.body;
  const { id } = req.params;

  const student = await Student.findById(id);

  // if student doesnt exist
  if (!Student) {
    res.status(404);
    throw new Error("student not found");
  }
  // Match product to its user
  if (student.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "school App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Student
  const updateStudent = await Student.findByIdAndUpdate(
    { _id: id },
    {
      studentid,
    studentname,
    gender,
    dob,
    pob,
    address,
    image: Object.keys(fileData).length === 0 ? student?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedStudent);
});

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
};
