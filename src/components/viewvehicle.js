import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const styles = {
    officeImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '0.375rem'
    },
    vehicleImage: {
        height: '250px',
        objectFit: 'cover',
    }
};

function VehicleCard({ vehicle }) {
    const customerId = localStorage.getItem('userId');
    const [customerData, setCustomerData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [reservationData, setReservationData] = useState({
        customerId: customerId || '',
        firstName: '',
        lastName: '',
        drivingLicense: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const customerId = localStorage.getItem('userId');
        if (localStorage.getItem('userType') === 'Customer' && customerId) {
            const fetchCustomerData = async () => {
                try {
                    const response = await fetch(`http://localhost:3300/api/users/${customerId}`);
                    const data = await response.json();
                    setCustomerData(data);
                    // Update reservationData with fetched customer data
                    setReservationData(prevData => ({
                        ...prevData,
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        drivingLicense: data.licenseNumber || '' // Assuming licenseNumber exists in customer data
                    }));
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                }
            };

            fetchCustomerData();
        }
    }, []); // Empty dependency array ensures this runs only on mount

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationData({ ...reservationData, [name]: value });
    };

    const handleReserve = async () => {
        const customerId = localStorage.getItem('userId'); // Ensure customerId is defined here
        if (vehicle.status === 'Available') {
            // Log reservation data before sending
            console.log('Reservation Data:', reservationData);
    
            // Send reservation data to the backend
            try {
                const response = await fetch('http://localhost:3300/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customerId: customerId, // Include customerId here
                        ...reservationData,
                        vehicleId: vehicle._id, // Ensure vehicleId is passed
                    }),
                });
    
                const responseData = await response.json(); // Parse the response
    
                if (response.ok) {
                    alert('Reservation successful! Waiting for confirmation.');
                    setShowModal(false); // Close modal
                } else {
                    console.error('Reservation error:', responseData); // Log the error response
                    alert(`Failed to reserve the vehicle: ${responseData.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error reserving vehicle:', error);
                alert('An error occurred while reserving the vehicle.');
            }
        } else {
            alert('The vehicle is not available for reservation.');
        }
    };

    return (
        <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
                <img src={`http://localhost:3300/uploads/${vehicle.image}`} className="card-img-top" alt={vehicle.vehicleName} />
                <div className="card-body">
                    <h5 className="card-title">{vehicle.vehicleName}</h5>
                    <p className="card-text">
                        <i className="bi bi-gear-fill me-2"></i>Automatic
                        <i className="bi bi-people-fill ms-3 me-2"></i>4 Seats
                        <i className="bi bi-fuel-pump-fill ms-3 me-2"></i>Mogas 95
                        <i className='bi'></i>{vehicle.status === 'Available' ? <i className="bi bi-check-circle-fill text-success ms-3"></i> : <i className="bi bi-x-circle-fill text-danger ms-3"></i>}
                        <div className='d-flex justify-content-between align-items-center'>
                        <span className='h5 mb-0'>{vehicle.dailyRate} Rials/Day</span>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => setShowModal(true)} 
                            disabled={vehicle.status !== 'Available' || localStorage.getItem('userType') !== 'Customer'}
                        >
                            Reserve Now
                        </button>
                        </div>
                    </p>
                    {/* Reservation Modal */}
                    {showModal && (
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Reserve Vehicle</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input type="text" className="form-control" name="firstName" value={reservationData.firstName} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" className="form-control" name="lastName" value={reservationData.lastName} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Driving License</label>
                                                <input type="text" className="form-control" name="drivingLicense" value={reservationData.drivingLicense} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Start Date</label>
                                                <input type="date" className="form-control" name="startDate" onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">End Date</label>
                                                <input type="date" className="form-control" name="endDate" onChange={handleInputChange} />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                        <button type="button" className="btn btn-primary" onClick={handleReserve}>Reserve</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

function ViewVehicle() {
    const { ownerId } = useParams(); // Get ownerId from URL
    const [vehicles, setVehicles] = useState([]); // Initialize with an empty array
    const [fitchedOffice, setFitchedOffice] = useState({});

    useEffect(() => {
        const fetchOffice = async () => {
            try {
                const response = await fetch(`http://localhost:3300/api/offices/${ownerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch office');
                }
                const data = await response.json();
                console.log('Fetched Office:', data); // Log the fetched office
                setFitchedOffice(data); // Set the fetched office to state
            } catch (error) {
                console.error('Error fetching office:', error);
            }
        };

        fetchOffice(); // Call the fetch function
    }, [ownerId]); // Dependency on ownerId




    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(`http://localhost:3300/api/vehicles/${ownerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch vehicles');
                }
                const data = await response.json();
                console.log('Fetched Vehicles:', data); // Log the fetched vehicles
                setVehicles(data); // Set the fetched vehicles to state
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles(); // Call the fetch function
    }, [ownerId]); // Dependency on ownerId


    return (
        <div>

            {/* Display office details */}
            <div className="row m-5 shadow-sm p-4 mb-5 bg-light rounded">
    <div className="col-md-6">
        <img 
            src={`http://localhost:3300/uploads/${fitchedOffice.officeImage}`} 
            className="img-fluid rounded shadow" 
            alt="Office Image" 
            style={{ height: '300px', objectFit: 'cover' }} // Adjust height and fit
        />
    </div>
    <div className="col-md-6 d-flex flex-column justify-content-center">
        <h2 className="mb-4 text-dark">{fitchedOffice.officeName}</h2>
        <div className="mb-4">
            <p style={{ fontSize: '18px' }} className="text-muted">
                <i className="bi bi-geo-alt-fill me-2"></i>{fitchedOffice.location}
            </p>
            <p style={{ fontSize: '18px' }} className="text-muted">
                <i className="bi bi-telephone-fill me-2"></i>+968 {/*fitchedOffice.ownerId.phone*/}
            </p>
            <p style={{ fontSize: '18px' }} className="text-muted">
                <i className="bi bi-clock-fill me-2"></i>{fitchedOffice.operatingHours}
            </p>
            <p style={{ fontSize: '18px' }} className="text-muted">
                <i className="bi bi-envelope-fill me-2"></i>{/*fitchedOffice.ownerId.email*/}
            </p>
        </div>
    </div>
</div>


            {/* Display available vehicles */}
        <div className="container py-5">
            <h3 className="mb-4">Available Vehicles</h3>
            <div className="row g-4"> 
                {vehicles.map(vehicle => (
                        <VehicleCard key={vehicle._id} vehicle={vehicle} />
                    ))
                }
            </div>
        </div>
        </div>
    );
}

export default ViewVehicle;