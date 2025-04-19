import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    vehicleName: { type: String, required: true },
    model: { type: String, required: true },
    status: { type: String, enum: ['Available', 'Unavailable'], required: true },
    dailyRate: { type: Number, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true }, // Path to the image file
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema,"vehicles");

export default Vehicle;