import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
    officesContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '80px',
        paddingBottom: '80px'
    },
    officeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardImage: {
        height: '250px',
        objectFit: 'cover',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px'
    },
    cardBody: {
        marginTop: 'auto'
    }
};

function OfficeCard({ office, onSelect }) {
    return (
        <div className="col-md-6 col-lg-3 mb-4">
            <div className="card" style={styles.officeCard}
                 onClick={() => onSelect(office)}
                 onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                 onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={`http://localhost:3300/uploads/${office.officeImage}`} className="card-img-top" alt={office.officeName} style={styles.cardImage} />
                <div className="card-body" style={styles.cardBody}>
                    <h5 className="card-title">{office.officeName}</h5>
                    <p className="card-text">
                        <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                        {office.location}
                    </p>
                    <p className="card-text">
                        <i className="bi bi-telephone-fill text-primary me-2"></i>
                        {office.ownerId.phone} {/* Display phone number from User */}
                    </p>
                    <p className="card-text">
                        <i className="bi bi-envelope-fill text-primary me-2"></i>
                        {office.ownerId.email} {/* Display email from User */}
                    </p>
                    <p className="card-text">
                        <i className="bi bi-clock-fill text-primary me-2"></i>
                        Operating Hours:<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {office.operatingHours}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Offices() {
    const navigate = useNavigate();
    const [offices, setOffices] = useState([]);

    const handleOfficeSelect = (office) => {
        navigate(`/vehicles/${office.ownerId._id}`); // Ensure you're using the correct property
    };

    useEffect(() => {
        const fetchOffices = async () => {
            const response = await fetch('http://localhost:3300/api/offices'); // Ensure you have this endpoint
            const data = await response.json();
            setOffices(data);
        };

        fetchOffices();
    }, []);

    return (
        <div style={styles.officesContainer}>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center text-white">
                        <h1 className="display-4 mb-3">Our Offices</h1>
                        <p className="lead">Find a RenTech location near you</p>
                    </div>
                </div>
                <div className="row">
                    {offices.map(office => (
                        <OfficeCard 
                            key={office._id} 
                            office={office}
                            onSelect={handleOfficeSelect}
                        />
                    ))}
                </div>
                <div className="row mt-5">
                    <div className="col-12 text-center text-white">
                        <h3>Need Help?</h3>
                        <p className="mb-4">Contact our 24/7 customer support</p>
                        <button className="btn btn-primary btn-lg">
                            <i className="bi bi-headset me-2"></i>
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Offices;