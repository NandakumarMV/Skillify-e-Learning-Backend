import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const tutorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    qualificationPdf: {
      type: String,
    },
    experience: {
      type: String,
      required: true,
    },
    rating: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rate: {
          type: Number,
        },
      },
    ],
    about: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    tutorImageUrl: {
      type: String,
    },
    tutorImageName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

tutorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

tutorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;
