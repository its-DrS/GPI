import { useEffect, useState } from 'react';
import Header from './Header';
import Hero from './Hero'
function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));  // Parse the stored user data
    } else {
      // Redirect to login if no user data is found
      window.location.href = '/';
    }
  }, []);

  return (
    <>
    <Header/>;
    <Hero />;
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          {/* You can display other user info here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
}

export default Dashboard;
