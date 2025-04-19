import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const styles = {
    loginContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '80px',
        paddingBottom: '80px'
    },
    loginCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        padding: '30px'
    }
};

function Login() {
    console.log(localStorage.getItem('userType'));
    console.log(localStorage.getItem('userId'));
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3300/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    localStorage.clear();
                    // Store user ID and type in localStorage
                    localStorage.setItem('userId', data.user._id);
                    localStorage.setItem('userType', data.user.userType);
                    
                    // Check user type and redirect accordingly
                    if (data.user.userType === 'Customer') {
                        navigate('/'); // Redirect to home page for customers
                    } else if (data.user.userType === 'Office Owner') {
                        navigate('/owner-dashboard'); // Redirect to owner dashboard for owners
                    }
                } else {
                    setErrors({ ...errors, login: data.message }); // Show error message
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div style={styles.loginContainer} className="d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div style={styles.loginCard}>
                            <h2 className="text-center mb-4">Login to RenTech</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                                {errors.login && <div className="text-danger">{errors.login}</div>}
                                <div className="text-center mt-3">
                                    <a href="#" className="text-decoration-none">Forgot password?</a>
                                </div>
                            </form>
                            <hr className="my-4" />
                            <div className="text-center">
                                <p className="mb-0">Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;