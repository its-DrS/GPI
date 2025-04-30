import { Clock, Phone, MapPin, ArrowRight, Calendar, Pill, FileText, ShoppingBag } from 'lucide-react';

// SVG cross icon for pharmacy theme
const CrossIcon = () => (
    <svg className="cross-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
      <path d="M9 3v6H3v6h6v6h6v-6h6V9h-6V3z"/>
    </svg>
  );
  
export default function PharmacyHeroSection() {
    return (
      <>
        <section className="hero-section">
          {/* Background Shapes */}
          <div className="bg-shape bg-shape-1"></div>
          <div className="bg-shape bg-shape-2"></div>
          
          {/* Pharmacy Cross Icons */}
          <div className="bg-cross bg-cross-1">
            <CrossIcon />
          </div>
          <div className="bg-cross bg-cross-2">
            <CrossIcon />
          </div>
          
          <div className="hero-container">
            <div className="hero-content">
              {/* <span className="hero-tag">Open 24/7</span> */}
              <h1 className="hero-title">
                Your <span>health</span> is our priority
              </h1>
              <p className="hero-description">
                We provide quality healthcare services and medications with personalized 
                care to ensure your wellbeing. Visit us today or use our online services.
              </p>
              
              <div className="hero-actions">
                <button className="primary-button">
                  Refill Prescription
                  <ArrowRight size={16} className="icon" />
                </button>
                <button className="secondary-button">
                  Book Consultation
                </button>
              </div>
              
              <div className="pharmacy-info">
                <div className="info-item">
                  <div className="info-icon">
                    <Clock size={18} />
                  </div>
                  <div className="info-text">
                    <strong>Working Hours</strong>
                    24/7 Emergency Service
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={18} />
                  </div>
                  <div className="info-text">
                    <strong>Call Us</strong>
                    (123) 456-7890
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="info-text">
                    <strong>Location</strong>
                    123 Health Street, Medical City
                  </div>
                </div>
              </div>
              
              <div className="hero-services">
                <div className="service-card">
                  <div className="service-icon">
                    <Pill size={20} />
                  </div>
                  <div className="service-text">
                    Prescription Refills
                  </div>
                </div>
                
                <div className="service-card">
                  <div className="service-icon">
                    <ShoppingBag size={20} />
                  </div>
                  <div className="service-text">
                    Home Delivery
                  </div>
                </div>
                
                <div className="service-card">
                  <div className="service-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="service-text">
                    Vaccination Services
                  </div>
                </div>
                
                <div className="service-card">
                  <div className="service-icon">
                    <FileText size={20} />
                  </div>
                  <div className="service-text">
                    Health Consultations
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hero-image">
              <div className="hero-image-wrapper">
                <div className="image-placeholder">
                    <img src="../../public/hero.jpg" alt="hero" />
                </div>
                
                {/* Floating Cards for Visual Interest */}
                <div className="floating-card card-1">
                  <div className="card-icon prescription">
                    <FileText size={20} />
                  </div>
                  <div className="card-content">
                    <h4>E-Prescriptions</h4>
                    <p>Upload & refill online</p>
                  </div>
                </div>
                
                <div className="floating-card card-2">
                  <div className="card-icon delivery">
                    <ShoppingBag size={20} />
                  </div>
                  <div className="card-content">
                    <h4>Free Delivery</h4>
                    <p>For orders over $25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }