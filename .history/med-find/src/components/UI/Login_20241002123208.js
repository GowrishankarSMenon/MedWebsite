import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUserName }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
    
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                phoneNumber,
                password,
            });
    
            console.log('Response Data:', response.data);
    
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userName', response.data.user_name); // Store userName correctly
    
                setUserName(response.data.user_name); // Set the username in state
                console.log('Logged in as:', response.data.user_name);
                console.log('Token:', response.data.token);
                navigate('/dashboard'); // Navigate to the dashboard
            } else {
                setErrorMessage('Login failed, please check your credentials');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error); // Log the error for debugging
            setErrorMessage('Error occurred during login. Please try again.');
        }
    };
    

    return (
        <div className="login-container p-8">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-lg mb-2">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-lg mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
