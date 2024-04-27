import mongoose from "mongoose";
import User from "./models/user.js";
import Plan from "./models/plan.js";
import Order from "./models/order.js";
import Form from "./models/form.js";
import Mail from "./models/mail.js";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;