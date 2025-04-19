import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';
import Office from './models/office.js';
import multer from 'multer';
import bodyParser from 'body-parser';
import path from 'path';
import Vehicle from './models/Vehicle.js';
import Reservation from './models/reserve.js';

const app = express();
const port = 3300;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    }
});

// Set limits for file uploads (e.g., 5MB)
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

const __dirname = "C:/Users/ZoomStore/Desktop/advance web/projectlast/server";
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Increase limit for URL-encoded payloads
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to MongoDB
mongoose.connect('mongodb://ahmednader2003331:ahmednader2003331@projectcluster-shard-00-00.c94ue.mongodb.net:27017,projectcluster-shard-00-01.c94ue.mongodb.net:27017,projectcluster-shard-00-02.c94ue.mongodb.net:27017/projectDB?ssl=true&replicaSet=atlas-bn1dhh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=projectcluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Routes   
app.get('/', (req, res) => {
    res.send('This is the server for the project');
});





app.post('/api/signup', upload.single('officeImage'), async (req, res) => {
    const { firstName, lastName, email, password, phone, userType, licenseNumber, officeName, location, operatingHours } = req.body;

    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const officeImage = req.file.filename; // Get the file path

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists. Please try another email.' });
        }

        const newUser = new User({ firstName, lastName, email, password, phone, userType, licenseNumber });
        await newUser.save();

        if (userType === 'Office Owner') {
            const newOffice = new Office({
                officeName,
                location,
                officeImage, // Use the saved file path
                operatingHours,
                ownerId: newUser._id // Link office to the user
            });
            await newOffice.save();
        }

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored password
        if (user.password !== password) { // Direct comparison
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', user });
        // No redirection here; handled in the frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Fetch all offices with user data
app.get('/api/offices', async (req, res) => {
    try {
        const offices = await Office.find().populate('ownerId', 'email phone'); // Populate user data
        res.status(200).json(offices); // Send the offices data back to the client
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
});

//fitch an office details by ownerId
app.get('/api/offices/:ownerId', async (req, res) => {
    try {
        const office = await Office.findOne({ ownerId: req.params.ownerId }).populate('ownerId', 'email phone');
        console.log('Fetched Office:', office);
        if (!office) {
            return res.status(404).json({ error: 'Office not found' });
        }
        res.status(200).json(office);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.post('/api/vehicles', upload.single('image'), async (req, res) => {
    const { vehicleName, model, status, dailyRate,ownerId } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
    }

    const vehicleImage = req.file.filename; // Save only the filename

    const newVehicle = new Vehicle({
        vehicleName,
        model,
        status,
        dailyRate,
        ownerId,
        image: vehicleImage, // Save the image path
    });

    try {
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/vehicles/:ownerId', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ ownerId: req.params.ownerId }); // Fetch vehicles by ownerId
        console.log('Fetched Vehicles:', vehicles);
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/api/vehicles/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { vehicleName, model, status, dailyRate } = req.body;

    try {
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Update vehicle fields
        vehicle.vehicleName = vehicleName;
        vehicle.model = model;
        vehicle.status = status;
        vehicle.dailyRate = dailyRate;

        // Update image if a new one is uploaded
        if (req.file) {
            vehicle.image = req.file.filename; // Save only the filename
        }

        await vehicle.save();
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.delete('/api/vehicles/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Office Details
app.put('/api/offices/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
        const updatedOffice = await Office.findOneAndUpdate({ ownerId }, req.body, { new: true });
        if (!updatedOffice) {
            return res.status(404).json({ error: 'Office not found' });
        }
        res.json(updatedOffice);
    } catch (error) {
        console.error('Error updating office details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update User Details
app.put('/api/users/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;
    const { email, phone } = req.body; // Adjust based on your user model fields
    try {
        const updatedUser = await User.findByIdAndUpdate(ownerId, { email, phone }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch Office Details
app.get('/api/offices/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
        const officeDetails = await Office.findOne({ ownerId });
        if (!officeDetails) {
            return res.status(404).json({ error: 'Office not found' });
        }
        res.json(officeDetails);
    } catch (error) {
        console.error('Error fetching office details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch User Details
app.get('/api/users/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
        const userDetails = await User.findById(ownerId);
        if (!userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Reserve Vehicle
// API endpoint to create a reservation
app.post('/api/reservations', async (req, res) => {
    const { customerId, firstName, lastName, drivingLicense, vehicleId, startDate, endDate } = req.body;

    try {
        // Fetch the vehicle to get the owner's ID
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        const newReservation = new Reservation({
            customerId,
            firstName,
            lastName,
            drivingLicense,
            vehicleId,
            ownerId: vehicle.ownerId, // Add the owner's ID from the vehicle
            startDate,
            endDate,
            status: 'Pending' // Default status
        });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get customer data by id
app.get('/api/users/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
        const customer = await User.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// API endpoint to update user data by ID
app.put('/api/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { firstName, lastName, email, phone, licenseNumber } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            email,
            phone,
            licenseNumber
        }, { new: true }); // Return the updated document

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(400).json({ error: error.message });
    }
});



//reservation handling in dashboard
//fitch the reservations by ownerId that stored in a local storage also log the data
app.get('/api/reservations/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
        const reservations = await Reservation.find({ ownerId }).populate('vehicleId','vehicleName');
        console.log(reservations);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// API endpoint to approve a reservation
app.put('/api/reservations/:reservationId/approve', async (req, res) => {
    const reservationId = req.params.reservationId;

    try {
        const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: 'Approved' }, { new: true })
            .populate('vehicleId', 'vehicleName'); // Populate vehicle details
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Update vehicle status to unavailable
        await Vehicle.findByIdAndUpdate(reservation.vehicleId, { status: 'Unavailable' });

        res.status(200).json(reservation);
    } catch (error) {
        console.error('Error approving reservation:', error);
        res.status(500).json({ error: error.message });
    }
});


// API endpoint to decline a reservation
app.put('/api/reservations/:reservationId/decline', async (req, res) => {
    const reservationId = req.params.reservationId;

    try {
        const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: 'Declined' }, { new: true });
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Update vehicle status to available
        await Vehicle.findByIdAndUpdate(reservation.vehicleId, { status: 'Available' });

        res.status(200).json(reservation);
    } catch (error) {
        console.error('Error declining reservation:', error);
        res.status(500).json({ error: error.message });
    }
});

// API endpoint to complete a reservation
app.put('/api/reservations/:reservationId/complete', async (req, res) => {
    const reservationId = req.params.reservationId;

    try {
        const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: 'Completed' }, { new: true })
            .populate('vehicleId', 'vehicleName'); // Populate vehicle details
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Update vehicle status to available
        await Vehicle.findByIdAndUpdate(reservation.vehicleId, { status: 'Available' });

        res.status(200).json(reservation);
    } catch (error) {
        console.error('Error completing reservation:', error);
        res.status(500).json({ error: error.message });
    }
});


// Fetch customer recent reservations
app.get('/api/customersReservations/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
        const reservations = await Reservation.find({ customerId }).populate('vehicleId', 'vehicleName dailyRate'); // Populate vehicle details
        console.log(reservations);
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: error.message });
    }
});