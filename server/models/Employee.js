import mongoose from 'mongoose';

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
      match: [/.+\@.+\..+/, 'Please enter a valid email'], // Email validation,
    },
    role: {
      en: { type: String, required: true },
      de: { type: String, required: true },
    },
    department: {
      en: { type: String, required: true },
      de: { type: String, required: true },
    },
    telephone: { type: String, required: true },
    profilePicture: {
      url: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp&s=200',
      },
  public_id: { type: String },
      altText: {
        type: String,
        default: 'Default profile picture',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
