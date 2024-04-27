import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "Please provide an user"],
        },
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "plans",
            required: [true, "Please provide a plan"],
        },
        paymentStatus: {
            type: String,
            required: false,
            allowNull: true,
            default: null,
        },
        paymentTime: {
            type: Date,
            required: false,
            allowNull: true,
            default: null,
        },
        phonepeAmount: {
            type: Number,
            required: false,
            allowNull: true,
            default: null,
        },
        providerRefID: {
            type: String,
            required: false,
            allowNull: true,
            default: null,
        },
        confirmationId: {
            type: String,
            required: false,
            allowNull: true,
            default: null,
        },
        transactionId: {
            type: String,
            required: false,
            allowNull: true,
            default: null,
        },
        merchantId: {
            type: String,
            required: false,
            allowNull: true,
            default: null,
        },
        checksum: {
            type: String,
            required: false,
            allowNull: true,
            default: null,
        },
    },
    {
        timestamps: true
    }
);

const Order = mongoose.models.orders || mongoose.model('orders', OrderSchema);

export default Order;