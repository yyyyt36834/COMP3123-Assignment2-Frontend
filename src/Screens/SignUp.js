import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {

    const navigate = useNavigate();

    const [user, setUser] = React.useState(
        {
            username: '',
            email: '',
            password: ''
        }
    );

    const handleSignup = async (user) => {
        try {

            if(!validateEmail()){
                alert('Invalid email format');
                return;
            }

            const response = await axios.post('http://backend:5000/api/v1/user/signup', user);

            if (response.data.message === 'User created successfully') {
                console.log('User signed up:', response.data);
                alert('Sign up successful');
            } else {
                console.log('Sign up failed:', response.data);
                alert('Sign up failed: ' + response.data.message);
            }

        } catch (error) {
          console.error('Error during signup:', error);
          alert('Something went wrong! ' + error.message);
        }
      };

      const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(user.email)) {
            return true;
        }
        return false;
      };
      
      // Example usage
    //   const user = {
    //     username: 'johndoe',
    //     email: 'johndoe@example.com',
    //     password: 'securepassword',
    //   };

    return (
    <div>Sign Up
        <input 
            type="text"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"  
        />
        <input 
            type="text"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email address"  
        />
        <input 
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
        />
        <button onClick={() => handleSignup(user)}>Sign Up</button>
        <button onClick={() => navigate('/')}>Login</button>
    </div>
  )
}
