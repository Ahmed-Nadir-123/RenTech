import mongoose from 'mongoose';

const officeSchema = new mongoose.Schema({
    officeName: { type: String, required: true },
    location: { type: String, required: true },
    officeImage: { type: String, required: true },
    operatingHours: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Office = mongoose.model('Office', officeSchema,"offices");

export default Office;