import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  purchasedCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
      price: {
        type: Number,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Orders = mongoose.model("Orders", orderSchema);
export default Orders;
