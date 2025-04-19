import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        licenseNumber: ''
    });
    const [createDate, setCreateDate] = useState('');
    const [rentalHistory, setRentalHistory] = useState([]);

    const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3300/api/users/${userId}`);
                const data = await response.json();
                setUserData(data);
                setFormData({
                    firstName: data.firstName || '', // Default to empty string if undefined
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    licenseNumber: data.licenseNumber || ''
                });
                setCreateDate(data.createdAt || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchRentalHistory = async () => {
            try {
                const response = await fetch(`http://localhost:3300/api/customersReservations/${userId}`);
                const data = await response.json();
                setRentalHistory(data);
                console.log('Rental history data:', data);
            } catch (error) {
                console.error('Error fetching rental history:', error);
            }
        };

        fetchRentalHistory();
        fetchUserData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3300/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                setUserData(formData); // Update local state with new data
                setIsEditing(false); // Close the edit form
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // Defensive check for initials
    const initials = userData.firstName && userData.lastName ? 
        `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}` : '';

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            {/*display initials within a circle background*/}
                            <div className="rounded-circle bg-primary text-white mb-3 m-auto d-flex align-items-center justify-content-center" style={{width:'6rem', height:'6rem', fontSize:'2.5rem'}}>{initials}</div>
                            <h4 className="mb-1">{userData.firstName} {userData.lastName}</h4>
                            <p className="text-muted mb-3">Member since {createDate.slice(0, 10)}</p>
                            <div className="d-grid">
                                <button className="btn btn-outline-primary mb-2" onClick={() => setIsEditing(true)}>
                                    <i className="bi bi-pencil-square me-2"></i>Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display user information */}
                <div className="col-md-8">
                    <div className='card border-0 shadow-sm p-4 mb-3'>
                    <h5>Personal Information</h5>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <p className="mb-0 text-muted">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="mb-0">{userData.firstName} {userData.lastName}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <p className="mb-0 text-muted">Email</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="mb-0">{userData.email}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <p className="mb-0 text-muted">Phone</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="mb-0">{userData.phone}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <p className="mb-0 text-muted">License Number</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="mb-0">{userData.licenseNumber}</p>
                        </div>
                    </div>
                    
                    {isEditing && (
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Profile</h5>
                                        <button type="button" className="btn-close" onClick={() => setIsEditing(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Phone</label>
                                                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Close</button>
                                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                    {/* Rental History */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Recent Rentals</h5>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Vehicle</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Status</th>
                                            <th>Daily Rate</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rentalHistory.map(rental => (
                                            <tr key={rental._id}>
                                                <td>{rental.vehicleId ? rental.vehicleId.vehicleName : 'N/A'}</td>
                                                <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                                                <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                                                {/* if the status is approved, display a green badge,if the status is declined display a red badge ,otherwise display a yellow badge */}
                                                <td><span className={`badge ${rental.status === 'Approved' ? 'bg-success' : rental.status === 'Declined' ? 'bg-danger' : 'bg-warning'}`}>{rental.status}</span></td>
                                                <td>{rental.vehicleId.dailyRate} Rials</td>
                                                <td>{(rental.vehicleId.dailyRate * (new Date(rental.endDate) - new Date(rental.startDate)) / (1000 * 60 * 60 * 24)).toFixed(2)} Rials</td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;