import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      minLength: 3,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      minLength: 3,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"], // Email validation,
    },
    role: { type: String, required: true },
    department: { type: String, required: true },
    telephone: { type: String, required: true },
    profilePicture: {
      url: {
        type: String,
        required: true,
      },
      altText: { type: String },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
