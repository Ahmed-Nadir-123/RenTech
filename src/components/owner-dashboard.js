import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const OwnerDashboard = () => {
    
    const [vehicles, setVehicles] = useState([]);
    const [vehicleData, setVehicleData] = useState({
        vehicleName: '',
        model: '',
        status: '',
        dailyRate: '',
        image: null,
    });
    const [isEditing, setIsEditing] = useState(false); // Track if we are editing

    const fetchVehicles = async () => {
        const ownerId = localStorage.getItem('userId'); // Ensure you are using ownerId
        try {
            const response = await fetch(`http://localhost:3300/api/vehicles/${ownerId}`);
            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleVehicleChange = (e) => {
        const { name, value, type, files } = e.target;
        setVehicleData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleVehicleSubmit = async () => {
        const formData = new FormData();
        formData.append('vehicleName', vehicleData.vehicleName);
        formData.append('model', vehicleData.model);
        formData.append('status', vehicleData.status);
        formData.append('dailyRate', vehicleData.dailyRate);
        const ownerId = localStorage.getItem('userId'); // Ensure you are using ownerId
        console.log('Owner ID:', ownerId); // Check if ownerId is retrieved correctly
        formData.append('ownerId', ownerId);
        console.log('Form Data:', Array.from(formData.entries())); // Log all form data entries

        // Append the image only if a new one is uploaded
        if (vehicleData.image) {
            formData.append('image', vehicleData.image);
        }
    
        try {
            let response;
            if (isEditing) {
                // Update existing vehicle
                response = await fetch(`http://localhost:3300/api/vehicles/${vehicleData._id}`, {
                    method: 'PUT',
                    body: formData,
                });
            } else {
                // Create new vehicle
                response = await fetch('http://localhost:3300/api/vehicles', {
                    method: 'POST',
                    body: formData,
                });
            }
    
            if (response.ok) {
                fetchVehicles(); // Refresh the vehicle list
                alert(isEditing ? 'Vehicle updated successfully!' : 'Vehicle added successfully!');
                resetForm();
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'An error occurred while saving the vehicle.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    const resetForm = () => {
        setVehicleData({ vehicleName: '', model: '', status: '', dailyRate: '', image: null });
        setIsEditing(false);
    };

    const handleEditClick = (vehicle) => {
        setVehicleData(vehicle);
        setIsEditing(true);
        const modal = new window.bootstrap.Modal(document.getElementById('addVehicleModal'));
        modal.show();
    };

    const handleDeleteClick = async (vehicleId) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                const response = await fetch(`http://localhost:3300/api/vehicles/${vehicleId}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    fetchVehicles(); // Refresh the vehicle list
                    alert('Vehicle deleted successfully!');
                } else {
                    alert('Failed to delete vehicle.');
                }
            } catch (error) {
                console.error('Error deleting vehicle:', error);
            }
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);




    //Office Details Edit Functions

    const [userData, setUserData] = useState({
        email: '',
        phone: '',
    });

    const [officeData, setOfficeData] = useState({
        officeName: '',
        location: '',
        operatingTime: '',
        phoneNumber: '',
        email: '',
    });
    const [isEditingOffice, setIsEditingOffice] = useState(false);

    const fetchOfficeDetails = async () => {
        const ownerId = localStorage.getItem('userId'); // Ensure you are using ownerId
        try {
            const response = await fetch(`http://localhost:3300/api/offices/${ownerId}`);
            const officeData = await response.json();
            
            // Fetch user details
            const userResponse = await fetch(`http://localhost:3300/api/users/${ownerId}`);
            const userData = await userResponse.json();
    
            if (response.ok && userResponse.ok) {
                setOfficeData(officeData);
                setUserData({
                    email: userData.email,
                    phone: userData.phone,
                });
            } else {
                console.error('Error fetching office or user details:', officeData, userData);
            }
        } catch (error) {
            console.error('Error fetching office details:', error);
        }
    };
    
    const handleOfficeSubmit = async () => {
        
        const ownerId = localStorage.getItem('userId'); // Ensure you are using ownerId
        try {
            // Update office details
            const officeResponse = await fetch(`http://localhost:3300/api/offices/${ownerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(officeData), // Send the updated office data
            });
    
            // Update user details
            const userResponse = await fetch(`http://localhost:3300/api/users/${ownerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    phone: userData.phone, // Ensure this matches your state
                }),
            });
    
            if (officeResponse.ok && userResponse.ok) {
                alert('Office and user details updated successfully!');
                fetchOfficeDetails(); // Refresh the office details
                setIsEditingOffice(false); // Exit editing mode
            } else {
                const officeErrorData = await officeResponse.json();
                const userErrorData = await userResponse.json();
                console.error('Error updating office or user details:', officeErrorData, userErrorData);
            }
        } catch (error) {
            console.error('Error updating office details:', error);
        }
    };


    const handleOfficeChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'phone' || name === 'email') {
            setUserData(prev => ({
                ...prev,
                [name]: value, // Update userData for phone and email
            }));
        } else {
            setOfficeData(prev => ({
                ...prev,
                [name]: value, // Update officeData for other fields
            }));
        }
    };

    

    useEffect(() => {
        fetchOfficeDetails();
    }, []);


    //reservations handling in dashboard

    const [reservations, setReservations] = useState([]);
    const ownerId = localStorage.getItem('userId'); // Assuming the owner's ID is stored in localStorage

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:3300/api/reservations/${ownerId}`);
                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, [ownerId]);


    const handleApprove = async (reservationId) => {
        const response = await fetch(`http://localhost:3300/api/reservations/${reservationId}/approve`, {
            method: 'PUT',
        });
        if (response.ok) {
            const updatedReservation = await response.json();
            // Update the state with the full reservation data
            const updatedReservations = reservations.map(reservation => 
                reservation._id === updatedReservation._id ? updatedReservation : reservation
            );
            setReservations(updatedReservations);
        }
    };
    
    const handleDecline = async (reservationId) => {
        const response = await fetch(`http://localhost:3300/api/reservations/${reservationId}/decline`, {
            method: 'PUT',
        });
        if (response.ok) {
            const updatedReservation = await response.json();
            setReservations(reservations.filter(reservation => reservation._id !== updatedReservation._id));
        }
    };
    
    const handleComplete = async (reservationId) => {
        const response = await fetch(`http://localhost:3300/api/reservations/${reservationId}/complete`, {
            method: 'PUT',
        });
        if (response.ok) {
            const updatedReservation = await response.json();
            // Update the state with the full reservation data
            const updatedReservations = reservations.map(reservation => 
                reservation._id === updatedReservation._id ? updatedReservation : reservation
            );
            setReservations(updatedReservations);
        }
    };

        // State to track the active link
        const [activeLink, setActiveLink] = useState('dashboard');
    
        const handleLinkClick = (link) => {
            setActiveLink(link);
        };


    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-lg-2 bg-light p-3 sidebar">
            <div className="d-flex flex-column mt-5 sticky-top" style={{ paddingTop: '80px' }}>
                <div className="list-group">
                    <a
                        href="#dashboard"
                        className={`list-group-item list-group-item-action ${activeLink === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('dashboard')}
                    >
                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                    </a>
                    <a
                        href="#vehicles"
                        className={`list-group-item list-group-item-action ${activeLink === 'vehicles' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('vehicles')}
                    >
                        <i className="bi bi-car-front me-2"></i>My Vehicles
                    </a>
                    <a
                        href="#office"
                        className={`list-group-item list-group-item-action ${activeLink === 'office' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('office')}
                    >
                        <i className="bi bi-building me-2"></i>Office Details
                    </a>
                    <a
                        href="#reservations"
                        className={`list-group-item list-group-item-action ${activeLink === 'reservations' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('reservations')}
                    >
                        <i className="bi bi-calendar-check me-2"></i>Reservations
                    </a>
                </div>
            </div>
        </div>


                {/* Main Content */}
                <div className="col-lg-10 p-4">
                    {/* Dashboard Section */}
                    <section id="dashboard" className="mb-5" style={{paddingTop: '7%'}}>
                        <h3 className="mb-4">Dashboard Overview</h3>
                        <div className="row g-4 mb-4">
                            <div className="col-md-3">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="text-muted">Active Rentals</h6>
                                        <h3 className="mb-0">12</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="text-muted">Total Vehicles</h6>
                                        <h3 className="mb-0">25</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="text-muted">Monthly Revenue</h6>
                                        <h3 className="mb-0">2,450 OMR</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="text-muted">Average Rating</h6>
                                        <h3 className="mb-0">4.8 <small className="text-muted fs-6">/ 5</small></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Vehicles Section */}
                    <section id="vehicles" className="mb-5" style={{ paddingTop: '7%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3>My Vehicles</h3>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addVehicleModal" onClick={resetForm}>
                                <i className="bi bi-plus-circle me-2"></i>Add New Vehicle
                            </button>
                        </div>
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Vehicle</th>
                                                <th>Model</th>
                                                <th>Status</th>
                                                <th>Daily Rate</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicles.length > 0 ? vehicles.map(vehicle => (
                                                <tr key={vehicle._id}>
                                                    <td>{vehicle.vehicleName}</td>
                                                    <td>{vehicle.model}</td>
                                                    <td><span className={`badge bg-${vehicle.status === 'Available' ? 'success' : 'warning'}`}>{vehicle.status}</span></td>
                                                    <td>{vehicle.dailyRate} OMR</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEditClick(vehicle)}>Edit</button>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(vehicle._id)}>Remove</button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No vehicles found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Add Vehicle Modal */}
                    <div className="modal fade" id="addVehicleModal" tabIndex="-1" aria-labelledby="addVehicleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addVehicleModalLabel">{isEditing ? 'Edit Vehicle' : 'Add Vehicle'}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form id="addVehicleForm">
                                        <div className="mb-3">
                                            <label htmlFor="vehicleName" className="form-label">Vehicle Name</label>
                                            <input type="text" className="form-control" id="vehicleName" name="vehicleName" value={vehicleData.vehicleName} onChange={handleVehicleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="model" className="form-label">Model</label>
                                            <input type="text" className="form-control" id="model" name="model" value={vehicleData.model} onChange={handleVehicleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <select className="form-select" id="status" name="status" value={vehicleData.status} onChange={handleVehicleChange} required>
                                                <option value="">Select Status</option>
                                                <option value="Available">Available</option>
                                                <option value="Unavailable">Unavailable</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="dailyRate" className="form-label">Daily Rate</label>
                                            <input type="number" className="form-control" id="dailyRate" name="dailyRate" value={vehicleData.dailyRate} onChange={handleVehicleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Vehicle Image</label>
                                            <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleVehicleChange} required={isEditing ? false : true} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={isEditing ? handleVehicleSubmit : handleVehicleSubmit}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
        

                    {/* Office Details Section */}
                    <section id="office" className="mb-5" style={{ paddingTop: '7%' }}>
                    <h3>Office Details</h3>
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="officeName" className="form-label">Office Name</label>
                                <input type="text" className="form-control" id="officeName" name="officeName" value={officeData.officeName} onChange={handleOfficeChange} disabled={!isEditingOffice} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" className="form-control" id="location" name="location" value={officeData.location} onChange={handleOfficeChange} disabled={!isEditingOffice} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="operatingTime" className="form-label">Operating Time</label>
                                <input type="text" className="form-control" id="operatingTime" name="operatingTime" value={officeData.operatingHours} onChange={handleOfficeChange} disabled={!isEditingOffice} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={userData.phone} onChange={handleOfficeChange} disabled={!isEditingOffice}  />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={userData.email} onChange={handleOfficeChange} disabled={!isEditingOffice} />
                            </div>
                            <button className="btn btn-primary" onClick={() => setIsEditingOffice(true)}>Edit</button>
                            {isEditingOffice && <button className="btn btn-success mx-5" onClick={handleOfficeSubmit}>Save Changes</button>}
                        </div>
                    </div>
                </section>

                    {/* Reservations Section */}
                    <section id="reservations" className="mb-5" style={{ paddingTop: '7%', paddingBottom: '7%' }}>
            <h3 className="mb-4">Reservations</h3>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Vehicle</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map(reservation => (
                                    <tr key={reservation._id}>
                                        <td>{reservation.firstName} {reservation.lastName}</td>
                                        <td>{reservation.vehicleId ? reservation.vehicleId.vehicleName : 'N/A'}</td>
                                        <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                                        <td>{new Date(reservation.endDate).toLocaleDateString()}</td>
                                        {/*if the status is pending, show the status of approved as success and the status of pending as warning and the status of declined as danger and the status of completed as primary*/}
                                        <td><span className={`badge ${reservation.status === 'Approved' ? 'bg-success' : reservation.status === 'Pending' ? 'bg-warning' : reservation.status === 'Declined' ? 'bg-danger' : 'bg-primary'}`}>{reservation.status}</span></td>
                                        <td>{reservation.status === 'Pending' && (
                                            <>
                                            <button className="btn btn-sm btn-success me-1" onClick={() => handleApprove(reservation._id)}>Approve</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDecline(reservation._id)}>Decline</button>
                                            </>
                                        )}
                                        {reservation.status === 'Approved' && (
                                            <button className="btn btn-sm btn-primary" onClick={() => handleComplete(reservation._id)}>Complete</button>
                                        )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;