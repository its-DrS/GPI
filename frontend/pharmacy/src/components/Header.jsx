import { useState } from 'react';
import { Menu, X, ChevronDown, User, ShoppingCart, Bell, Search } from 'lucide-react';


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const toggleProfileDropdown = () => {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };
  
    return (
      <>
        <header className="header">
          <nav className="nav-container">
            <div className="nav-content">
              {/* Logo Section */}
              <div className="logo-container">
                <a href="#" className="logo">
                  <div className="logo-icon">N</div>
                  <span className="logo-text">NavBar</span>
                </a>
              </div>
  
              {/* Search Bar - Visible on Desktop */}
              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search anything..." 
                />
                <Search size={16} className="search-icon" />
              </div>
  
              {/* Navigation Links - Desktop */}
              <div className="nav-links">
                <a href="#" className="nav-link active">Home</a>
                <a href="#" className="nav-link">Products</a>
                <a href="#" className="nav-link">Services</a>
                <a href="#" className="nav-link">About</a>
                <a href="#" className="nav-link">Contact</a>
              </div>
  
              {/* Profile and Feature Icons - Desktop */}
              <div className="features-container">
                <button className="icon-button">
                  <Bell size={20} />
                  <span className="notification-badge">3</span>
                </button>
                
                <button className="icon-button">
                  <ShoppingCart size={20} />
                  <span className="notification-badge">2</span>
                </button>
                
                {/* Profile Dropdown */}
                <div className="profile-container">
                  <button 
                    className="profile-button"
                    onClick={toggleProfileDropdown}
                  >
                    <div className="avatar">
                      <User size={18} />
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`chevron ${isProfileDropdownOpen ? 'open' : ''}`} 
                    />
                  </button>
                  
                  <div className={`dropdown-menu ${isProfileDropdownOpen ? 'open' : ''}`}>
                    <a href="#" className="dropdown-item">
                      <User size={16} className="dropdown-item-icon" />
                      Your Profile
                    </a>
                    <a href="#" className="dropdown-item">
                      <Bell size={16} className="dropdown-item-icon" />
                      Notifications
                    </a>
                    <a href="#" className="dropdown-item">
                      <ShoppingCart size={16} className="dropdown-item-icon" />
                      Your Orders
                    </a>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item">
                      <X size={16} className="dropdown-item-icon" />
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
  
              {/* Mobile menu button */}
              <button 
                className="mobile-menu-button"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
  
          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            {/* Mobile Profile Section */}
            <div className="mobile-profile">
              <div className="avatar">
                <User size={18} />
              </div>
              <div className="mobile-profile-info">
                <div className="mobile-profile-name">User Name</div>
                <div className="mobile-profile-email">user@example.com</div>
              </div>
            </div>
  
            {/* Mobile Search */}
            <div style={{ marginTop: '1rem', position: 'relative' }}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search anything..." 
              />
              <Search size={16} className="search-icon" />
            </div>
  
            {/* Mobile Feature Icons */}
            <div className="mobile-features">
              <a href="#" className="mobile-icon-button">
                <Bell size={20} />
                <span className="mobile-icon-text">Alerts</span>
                <span className="notification-badge">3</span>
              </a>
              <a href="#" className="mobile-icon-button">
                <ShoppingCart size={20} />
                <span className="mobile-icon-text">Cart</span>
                <span className="notification-badge">2</span>
              </a>
              <a href="#" className="mobile-icon-button">
                <User size={20} />
                <span className="mobile-icon-text">Profile</span>
              </a>
            </div>
  
            <div className="mobile-divider"></div>
  
            {/* Mobile Navigation Links */}
            <a href="#" className="mobile-nav-link active">Home</a>
            <a href="#" className="mobile-nav-link">Products</a>
            <a href="#" className="mobile-nav-link">Services</a>
            <a href="#" className="mobile-nav-link">About</a>
            <a href="#" className="mobile-nav-link">Contact</a>
          </div>
        </header>
      </>
    );
  }