import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        description: {
            type: String,
        },
        amount: {
            type: Number,
            required: [true, "Please provide an amount"],
        },
    },
    {
        timestamps: true
    }
);

const Plan = mongoose.models.plans || mongoose.model('plans', PlanSchema);

export default Plan;