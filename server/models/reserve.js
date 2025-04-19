import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    drivingLicense: { type: String, required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // New field for owner ID
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Declined'], default: 'Pending' },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema,'reservations');
export default Reservation;