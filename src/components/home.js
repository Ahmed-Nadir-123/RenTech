import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

// Add CSS styles
const styles = {
    heroSection: {
        position: 'relative',
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '600px'
    }
};

function Home() {
    useEffect(() => {
        const animateValue = (obj, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateValue(counter, 0, target, 2000);
                    });
                    observer.disconnect();
                }
            });
        });

        const statsSection = document.querySelector('.statistics-section');
        if (statsSection) {
            observer.observe(statsSection);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section d-flex align-items-center" style={styles.heroSection}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 text-white">
                            <h1 className="display-4 fw-bold mb-4">Find Your Perfect Rental Car</h1>
                            <p className="lead mb-4">Discover our wide range of vehicles across multiple locations. Book easily and drive away with confidence.</p>
                            <a href="offices.html" className="btn btn-primary btn-lg">Browse Our Locations</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center display-6 mb-5">Why Choose Us</h2>
                    <div className="row g-4">
                        <div className="col-md-3">
                            <div className="text-center">
                                <i className="bi bi-shield-check text-primary display-5 mb-3"></i>
                                <h5>Safe & Reliable</h5>
                                <p className="text-muted">All our vehicles are regularly maintained and sanitized.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <i className="bi bi-clock text-primary display-5 mb-3"></i>
                                <h5>24/7 Support</h5>
                                <p className="text-muted">Our customer service team is always ready to assist you.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <i className="bi bi-cash-stack text-primary display-5 mb-3"></i>
                                <h5>Competitive Pricing</h5>
                                <p className="text-muted">We offer the best rates in the market.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <i className="bi bi-gear text-primary display-5 mb-3"></i>
                                <h5>Quality Service</h5>
                                <p className="text-muted">Our team is dedicated to providing you with the best experience.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Car Categories Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center display-6 mb-5">Our Vehicle Categories</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500" className="card-img-top" alt="Economy Car" style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Economy</h5>
                                    <p className="card-text text-muted">Perfect for city driving and fuel efficiency</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <img src="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=500" className="card-img-top" alt="SUV" style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">SUV</h5>
                                    <p className="card-text text-muted">Spacious and comfortable for family trips</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500" className="card-img-top" alt="Luxury" style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Luxury</h5>
                                    <p className="card-text text-muted">Premium vehicles for special occasions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            

            {/* About Us Section */}
            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <img src="https://images.unsplash.com/photo-1560177112-fbfd5fde9566?w=800" alt="About Us" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-lg-6">
                            <h2 className="display-6 mb-4">About RenTech</h2>
                            <p className="lead mb-4">We're revolutionizing the car rental experience with technology-driven solutions and a customer-first approach.</p>
                            <div className="mb-4">
                                <h5 className="text-primary">Our Mission</h5>
                                <p className="text-muted">To provide convenient, reliable, and accessible car rental services through innovative technology, ensuring every journey begins with trust and confidence.</p>
                            </div>
                            <div className="mb-4">
                                <h5 className="text-primary">Our Vision</h5>
                                <p className="text-muted">To become the leading technology-driven car rental platform, setting new standards in customer service, vehicle quality, and rental experience.</p>
                            </div>
                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                        <span>Wide Vehicle Selection</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                        <span>Easy Booking Process</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                        <span>Flexible Rental Terms</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                        <span>Competitive Pricing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            {/* Testimonials Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center display-6 mb-5">What Our Customers Say</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" className="rounded-circle mx-auto d-block mb-3" alt="Sarah Johnson" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                                    <div className="d-flex justify-content-center mb-3">
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                    </div>
                                    <p className="text-muted text-center mb-2">"Excellent service! The booking process was smooth, and the car was in perfect condition. Will definitely use RenTech again."</p>
                                    <h6 className="text-center mb-0">Sarah Johnson</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" className="rounded-circle mx-auto d-block mb-3" alt="Michael Chen" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                                    <div className="d-flex justify-content-center mb-3">
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                    </div>
                                    <p className="text-muted text-center mb-2">"Great selection of vehicles and competitive prices. The staff was very helpful and professional."</p>
                                    <h6 className="text-center mb-0">Michael Chen</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" className="rounded-circle mx-auto d-block mb-3" alt="Emma Davis" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                                    <div className="d-flex justify-content-center mb-3">
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                    </div>
                                    <p className="text-muted text-center mb-2">"The 24/7 support came in handy during my trip. They were quick to respond and very helpful."</p>
                                    <h6 className="text-center mb-0">Emma Davis</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Statistics Section */}
             <section className="py-5 statistics-section">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-3">
                            <div className="text-center">
                                <i className="bi bi-car-front text-primary display-5 mb-3"></i>
                                <h2 className="display-5 fw-bold mb-2"><span className="counter" data-target="500">0</span>+</h2>
                                <p className="text-muted mb-0">Vehicles Available</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <i className="bi bi-people text-primary display-5 mb-3"></i>
                                <h2 className="display-5 fw-bold mb-2"><span className="counter" data-target="10000">0</span>+</h2>
                                <p className="text-muted mb-0">Happy Customers</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <i className="bi bi-geo-alt text-primary display-5 mb-3"></i>
                                <h2 className="display-5 fw-bold mb-2"><span className="counter" data-target="25">0</span>+</h2>
                                <p className="text-muted mb-0">Locations</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="text-center">
                                <i className="bi bi-trophy text-primary display-5 mb-3"></i>
                                <h2 className="display-5 fw-bold mb-2"><span className="counter" data-target="98">0</span>%</h2>
                                <p className="text-muted mb-0">Satisfaction Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center display-6 mb-5">Frequently Asked Questions</h2>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="accordion" id="faqAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                            What documents do I need to rent a car?
                                        </button>
                                    </h2>
                                    <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            You'll need a valid driver's license, credit card, and proof of insurance. International customers may need additional documentation.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                            Is there a security deposit required?
                                        </button>
                                    </h2>
                                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes, we require a security deposit which varies depending on the vehicle type. The deposit is fully refundable upon return of the vehicle in its original condition.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                            What is your cancellation policy?
                                        </button>
                                    </h2>
                                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Cancellations made 24 hours before the pickup time are fully refundable. Late cancellations may incur a fee.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           
        </div>
    );
}

export default Home;