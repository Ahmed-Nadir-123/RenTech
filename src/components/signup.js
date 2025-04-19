import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        licenseNumber: '',
        officeName: '',
        location: '',
        officeImage: '',
        operatingHours: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [userType, setUserType] = useState('Customer'); // Default to Customer
    const [isOwner, setIsOwner] = useState(false); // Track if user is an Office Owner

    const validateForm = () => {
        const newErrors = {};
        
        // First Name validation
        if (userType !== 'Office Owner') {
            if (!formData.firstName) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName) {
                newErrors.lastName = 'Last name is required';
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        // Password validation
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm Password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{8,}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Valid phone number is required';
        }

        // License validation for customers
        if (userType === 'Customer') {
            if (!formData.licenseNumber.trim()) {
                newErrors.licenseNumber = 'License number is required';
            }    
        }

        // Office fields validation for owners
        if (userType === 'Office Owner') {
            if (!formData.officeName.trim()) {
                newErrors.officeName = 'Office name is required';
            }
            if (!formData.location.trim()) {
                newErrors.location = 'Location is required';
            }
            // Office image validation for owners
            if (userType === 'Office Owner') {
                if (!formData.officeImage) {
                    newErrors.officeImage = 'Office image is required'; // Check if officeImage is set
                }
            }
            if (!formData.operatingHours.trim()) {
                newErrors.operatingHours = 'Operating hours are required';
            }
        }

        // Terms agreement validation
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUserTypeChange = (e) => {
        const selectedType = e.target.value;
        setUserType(selectedType);
        setIsOwner(selectedType === 'Office Owner');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formDataToSubmit = new FormData(); // Use FormData for file uploads
            formDataToSubmit.append('firstName', formData.firstName);
            formDataToSubmit.append('lastName', formData.lastName);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('password', formData.password);
            formDataToSubmit.append('phone', formData.phone);
            formDataToSubmit.append('userType', userType);
            formDataToSubmit.append('licenseNumber', formData.licenseNumber);
            formDataToSubmit.append('officeName', formData.officeName);
            formDataToSubmit.append('location', formData.location);
            formDataToSubmit.append('operatingHours', formData.operatingHours);
            formDataToSubmit.append('officeImage', formData.officeImage); // Append the file
    
            try {
                const response = await fetch('http://localhost:3300/api/signup', {
                    method: 'POST',
                    body: formDataToSubmit, // Send FormData
                });
                const data = await response.json();
    
                if (response.ok) {
                    // If the signup is successful, navigate to the login page
                    navigate('/login');
                } else {
                    // If there's an error (like email already exists), show an alert
                    alert(data.error || 'An unexpected error occurred. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
   
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                officeImage: file // Directly set the file object
            }));
        }
    };

    return (
        <div className="container-fluid min-vh-100" style={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.pexels.com/photos/1231643/pexels-photo-1231643.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '80px 0'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4">Create Account</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">User Type</label>
                                        <select 
                                            className="form-select"
                                            name="userType"
                                            value={userType}
                                            onChange={handleUserTypeChange}
                                        >
                                            <option value="Customer">Customer</option>
                                            <option value="Office Owner">Office Owner</option>
                                        </select>
                                    </div>
                                    
                                    <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className={`form-label ${userType === 'Office Owner' ? 'd-none' : ''}`}>First Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.firstName ? 'is-invalid' : ''} ${userType === 'Office Owner' ? 'd-none' : ''}`}
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className={`form-label ${userType === 'Office Owner' ? 'd-none' : ''}`}>Last Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.lastName ? 'is-invalid' : ''} ${userType === 'Office Owner' ? 'd-none' : ''}`}
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                    </div>

                                    <div className={`mb-3 ${userType === 'Office Owner' ? '' : 'd-none'}`}>
                                        <label className="form-label">Office Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.officeName ? 'is-invalid' : ''}`}
                                            name="officeName"
                                            value={formData.officeName}
                                            onChange={handleChange}
                                        />
                                        {errors.officeName && <div className="invalid-feedback">{errors.officeName}</div>}
                                    </div>

                                    <div className={`mb-3 ${userType === 'Office Owner' ? '' : 'd-none'}`}>
                                        <label className="form-label">Location</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                        />
                                        {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                                    </div>

                                    <div className={`mb-3 ${userType === 'Office Owner' ? '' : 'd-none'}`}>
                                        <label className="form-label">Office Image</label>
                                        <input
                                            type="file"
                                            className={`form-control ${errors.officeImage ? 'is-invalid' : ''}`}
                                            name="officeImage" // This should match the name used in multer middleware
                                            accept="image/*" // Accept only image files
                                            onChange={handleImageChange} // Handle file change
                                        />
                                        {errors.officeImage && <div className="invalid-feedback">{errors.officeImage}</div>}
                                    </div>
                                    <div className={`mb-3 ${userType === 'Office Owner' ? '' : 'd-none'}`}>
                                        <label className="form-label">Operating Hours</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.operatingHours ? 'is-invalid' : ''}`}
                                            name="operatingHours"
                                            value={formData.operatingHours}
                                            onChange={handleChange}
                                        />
                                        {errors.operatingHours && <div className="invalid-feedback">{errors.operatingHours}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className={`form-label ${userType === 'Office Owner' ? 'd-none' : ''}`}>Driver's License Number</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.licenseNumber ? 'is-invalid' : ''} ${userType === 'Office Owner' ? 'd-none' : ''}`}
                                            name="licenseNumber"
                                            value={formData.licenseNumber}
                                            onChange={handleChange}
                                        />
                                        {errors.licenseNumber && <div className="invalid-feedback">{errors.licenseNumber}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className={`form-check-input ${errors.agreeToTerms ? 'is-invalid' : ''}`}
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label">
                                                I agree to the terms and conditions
                                            </label>
                                            {errors.agreeToTerms && <div className="invalid-feedback">{errors.agreeToTerms}</div>}
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 mb-3">
                                        Sign Up
                                    </button>

                                    <div className="text-center">
                                        Already have an account? <Link to="/login">Login here</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;