// LoginRegister.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// If you have access to React Icons or similar icon library, you can import and use them

export default function AuthSystem() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    profile_img: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    // Validate email (for registration)
    if (!isLogin && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate confirm password (for registration)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate additional fields for registration
    if (!isLogin) {
      if (!formData.first_name.trim()) {
        newErrors.first_name = 'First name is required';
      }
      
      if (!formData.last_name.trim()) {
        newErrors.last_name = 'Last name is required';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{8}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Show loading state
    setIsLoading(true);

    const endpoint = isLogin ? 'http://127.0.0.1:8000//auth/login' : 'http://127.0.0.1:8000/auth/register';

    const requestData = isLogin
      ? { username: formData.username, password: formData.password }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone
        };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log("Server response:", data);
        if (data.user) {
          // Save the user data to localStorage (e.g., token, user info)
          localStorage.setItem('user', JSON.stringify(data.user)); // Adjust this according to your response
          localStorage.setItem('accesToken', data.access); // Save the token if applicable
          localStorage.setItem('refreshToken', data.refresh);
          // Show success message briefly before redirecting
          setIsSubmitted(true);
          setTimeout(() => {
            // Redirect to the dashboard
            navigate('/dashboard');
          }, 1500);
        } else {
          setErrors({ server: data.message || 'Something went wrong, please try again' });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrors({ server: 'Error connecting to server. Please try again.' });
      });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
      phone: '',
      profile_img: '',
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">
              <svg className="checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="success-title">
              {isLogin ? 'Login Successful!' : 'Registration Successful!'}
            </h2>
            <p className="success-message-text">
              {isLogin
                ? 'You have been successfully logged in. Redirecting to dashboard...'
                : 'Your account has been created. Redirecting to dashboard...'}
            </p>
          </div>
        ) : (
          <>
            <div className="form-header">
              <h2 className="form-title">
                {isLogin ? 'Sign in to your account' : 'Create a new account'}
              </h2>
            </div>
            <div className="form-body">
              {errors.server && (
                <div className="server-error">
                  <p>{errors.server}</p>
                </div>
              )}
              <div className="form-inputs">
                <div className="input-group">
                  <label htmlFor="username" className="visually-hidden">
                    Username
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </span>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={errors.username ? 'input-field error' : 'input-field'}
                      placeholder="Username"
                    />
                  </div>
                  {errors.username && (
                    <p className="error-message">{errors.username}</p>
                  )}
                </div>

                {!isLogin && (
                  <>
                    <div className="input-group">
                      <label htmlFor="email" className="visually-hidden">
                        Email address
                      </label>
                      <div className="input-with-icon">
                        <span className="input-icon">
                          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </span>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? 'input-field error' : 'input-field'}
                          placeholder="Email address"
                        />
                      </div>
                      {errors.email && (
                        <p className="error-message">{errors.email}</p>
                      )}
                    </div>
                    
                    <div className="name-fields">
                      <div className="input-group half">
                        <label htmlFor="first_name" className="visually-hidden">
                          First Name
                        </label>
                        <div className="input-with-icon">
                          <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            autoComplete="given-name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className={errors.first_name ? 'input-field error' : 'input-field'}
                            placeholder="First Name"
                          />
                        </div>
                        {errors.first_name && (
                          <p className="error-message">{errors.first_name}</p>
                        )}
                      </div>

                      <div className="input-group half">
                        <label htmlFor="last_name" className="visually-hidden">
                          Last Name
                        </label>
                        <div className="input-with-icon">
                          <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            autoComplete="family-name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className={errors.last_name ? 'input-field error' : 'input-field'}
                            placeholder="Last Name"
                          />
                        </div>
                        {errors.last_name && (
                          <p className="error-message">{errors.last_name}</p>
                        )}
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="phone" className="visually-hidden">
                        Phone Number
                      </label>
                      <div className="input-with-icon">
                        <span className="input-icon">
                          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </span>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={errors.phone ? 'input-field error' : 'input-field'}
                          placeholder="Phone Number"
                        />
                      </div>
                      {errors.phone && (
                        <p className="error-message">{errors.phone}</p>
                      )}
                    </div>
                  </>
                )}

                <div className="input-group">
                  <label htmlFor="password" className="visually-hidden">
                    Password
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </span>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? 'input-field error' : 'input-field'}
                      placeholder="Password"
                    />
                  </div>
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                </div>

                {!isLogin && (
                  <div className="input-group">
                    <label htmlFor="confirmPassword" className="visually-hidden">
                      Confirm Password
                    </label>
                    <div className="input-with-icon">
                      <span className="input-icon">
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </span>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={errors.confirmPassword ? 'input-field error' : 'input-field'}
                        placeholder="Confirm Password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="error-message">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="forgot-password-container">
                  <button 
                    onClick={() => navigate('/forgot-password')}
                    className="forgot-password-link">
                    Forgot your password?
                  </button>
                </div>
              )}

              <div className="submit-button-container">
                <button
                  onClick={handleSubmit}
                  className={`submit-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      <span>{isLogin ? 'Signing in...' : 'Signing up...'}</span>
                    </>
                  ) : (
                    <>
                      <span className="button-icon">
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          {isLogin ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                          )}
                        </svg>
                      </span>
                      {isLogin ? 'Sign in' : 'Sign up'}
                      <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="form-footer">
              <p className="toggle-text">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="toggle-link"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}