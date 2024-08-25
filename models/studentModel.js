const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    studentid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    studentname: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    pob: {
      type: String,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please add a price"],
      trim: true,
    },
    fathername: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    mothername: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,s
    },
    motherjob: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
      },
    image: {
      type: Object,
      default: {},
    },
  },
    timestamps: true,
  });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
