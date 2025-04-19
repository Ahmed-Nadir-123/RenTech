import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
    infosContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '80px',
        paddingBottom: '80px'
    },
    infoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        height: '100%',
        transition: 'transform 0.3s ease'
    },
    icon: {
        fontSize: '2.5rem',
        color: '#0d6efd',
        marginBottom: '1rem'
    }
};

const rentalInfo = [
    {
        id: 1,
        title: 'Requirements',
        icon: 'bi-file-earmark-text',
        items: [
            'Valid Oman/International driving license',
            'Original passport',
            'Valid Oman visa for residents',
            'Minimum age: 21 years',
            'Credit card for security deposit'
        ]
    },
    {
        id: 2,
        title: 'Rental Policies',
        icon: 'bi-shield-check',
        items: [
            'Minimum rental period: 24 hours',
            'Full insurance coverage available',
            'Fuel policy: Full to Full',
            'Free cancellation up to 24h before pickup',
            'Unlimited mileage on selected vehicles'
        ]
    },
    {
        id: 3,
        title: 'Additional Services',
        icon: 'bi-plus-circle',
        items: [
            'GPS navigation system',
            'Child seats available',
            'Additional driver option',
            'Airport pickup/drop-off',
            '24/7 roadside assistance'
        ]
    },
    {
        id: 4,
        title: 'Payment Options',
        icon: 'bi-credit-card',
        items: [
            'Major credit cards accepted',
            'Debit cards (with restrictions)',
            'Cash payments (selected locations)',
            'Corporate billing available',
            'Advance online payment'
        ]
    }
];

function InfoCard({ info }) {
    return (
        <div className="col-md-6 col-lg-3 mb-4">
            <div className="card" style={styles.infoCard}
                 onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                 onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="card-body text-center">
                    <i className={`bi ${info.icon}`} style={styles.icon}></i>
                    <h5 className="card-title mb-4">{info.title}</h5>
                    <ul className="list-unstyled text-start">
                        {info.items.map((item, index) => (
                            <li key={index} className="mb-2">
                                <i className="bi bi-check2-circle text-primary me-2"></i>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Infos() {
    return (
        <div style={styles.infosContainer}>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center text-white">
                        <h1 className="display-4 mb-3">Rental Information</h1>
                        <p className="lead">Everything you need to know about renting with RenTech</p>
                    </div>
                </div>
                <div className="row">
                    {rentalInfo.map(info => (
                        <InfoCard key={info.id} info={info} />
                    ))}
                </div>
                <div className="row mt-5">
                    <div className="col-12 text-center text-white">
                        <h3>Have Questions?</h3>
                        <p className="mb-4">Our customer service team is here to help</p>
                        <button className="btn btn-primary btn-lg">
                            <i className="bi bi-chat-dots me-2"></i>
                            Chat with Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Infos;