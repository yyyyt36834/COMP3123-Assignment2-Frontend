import React, { useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import SessionContext from '../Contexts/Context';


export default function Login() {

    const navigate = useNavigate();
    // const { value, setValue } = useContext(SessionContext);

    const [userInput, setUserInput] = React.useState(
        {
            email: '',
            password: ''
        }
    );

    // // if the user is logged in, redirect them to the dashboard screen
    // if (value.isAuthenticated) {
    //     navigate('/dashboard');
    // }


    // Check if the user is already logged in   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/dashboard'); 
        }
      }, []);


    const handleLogin = async (userInput) => {
        try {
            const response = await axios.post('http://backend:5000/api/v1/user/login', userInput);
            if (response.data.message === "login succesuful") {

                // Set the authenticated state to true
                //setValue({ isAuthenticated: true });

                localStorage.setItem('token', response.data.token);

                console.log('Login successful:', response.data);
                alert('Login successful');
                navigate('/dashboard'); 
            } else {
                console.log('Login failed:', response.data);
                alert('Login failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Something went wrong' + error.message);
        }
    };

    return (
        <div className='centered-container'>Login
            <input
                type="text"
                onChange={(e) => setUserInput({ ...userInput, email: e.target.value })} 
                placeholder="Email address"
            />
            <input
                type="password"
                onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                placeholder="Password"
            />
            <button onClick={() => handleLogin(userInput)}>Login</button>
            <p>
                Don't have an account?
                <br/><button onClick={() =>navigate('/signup')}>Sign Up</button> 
            </p>        
        </div>
    )
}
