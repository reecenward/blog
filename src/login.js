// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API_ENDPOINT from './utils/api';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); 

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API_ENDPOINT}/login`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         // Successful login, redirect to the /edit page
//         navigate('/edit');
//       } else {
//         // Failed login, handle errors
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username:
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINT from './utils/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to store and display errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/edit');
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
