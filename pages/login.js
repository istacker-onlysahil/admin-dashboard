import { useAuth } from '@/utils/AuthContext';
import { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const enteredUsername = e.target.nameuser.value;
    const enteredPassword = e.target.namepassword.value;
    const expectedUsername = 'sahil';
    const expectedPassword = 'sahil@12';
  
    if (!enteredUsername.trim() || !enteredPassword.trim()) {
      setFormErrors({
        username: !enteredUsername.trim() ? 'Username is required' : '',
        password: !enteredPassword.trim() ? 'Password is required' : '',
      });
      return;
    }
  

    // Clear any previous errors
    setFormErrors({});

    
    try {
      // Check if entered username and password match the expected values
      if (enteredUsername === expectedUsername && enteredPassword === expectedPassword) {
  
        // Show success toast
        toast.success('Successfully logged in!', {
          position: 'top-right',
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          onClose: () => {
            login(enteredUsername , enteredPassword);
          },
        });

      } else {
        // Username or password did not match
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      // Show error toast
      toast.error('Login failed! Please Retry.', {
        position: 'top-right',
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <section className="bg-gray-50 h-screen flex flex-col justify-center">
      <div className="w-full lg:w-4/12 mx-auto px-5 md:px-32 lg:px-12 pt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0 px-2 lg:px-0">
          <div className="rounded-t mb-0 px-4 md:px-12 py-6">
            <div className="text-center mb-3">
              <h1 className="text-xl font-bold leading-none select-none">
                <span className="text-yellow-700">Scrap</span>Flow
              </h1>
            </div>
          </div>
          <div className="flex-auto px-4 md:px-12 py-10 pt-0">
            <form onSubmit={handleLogin}>
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="nameuser"  // Add name attribute
                  className={`border-0 px-3 py-3 active:ring ring-yellow-200 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow outline-none w-full ease-linear transition-all duration-150 ${formErrors.username && 'border-red-500'}`}
                  placeholder="Username"
                />
                {formErrors.username && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>
                )}
              </div>
              <div className="relative rounded w-full shadow mb-0 active:ring ring-yellow-200 bg-white flex items-center">
                <input
                  type={`${showPassword ? 'text' : 'password'}`}
                  name="namepassword"  // Add name attribute
                  className={`w-[85%] border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white text-sm rounded outline-none ease-linear transition-all duration-150 ${formErrors.password && 'border-red-500'}`}
                  placeholder="Password"
                />
                <div className="flex justify-center items-center w-[15%]">
                  <IoIosEye className={`cursor-pointer text-2xl text-gray-500 ${showPassword && 'hidden'}`} onClick={() => setShowPassword(!showPassword)} />
                  <IoIosEyeOff className={`cursor-pointer text-2xl text-gray-700 ${!showPassword && 'hidden'}`} onClick={() => setShowPassword(!showPassword)} />
                </div>
                </div>
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                )}

              <div className="text-center mt-12">
                <button className="group relative h-12 w-full overflow-hidden rounded-lg bg-gray-800 text-lg transition-none duration-[750ms] shadow-md hover:shadow-green-100" type="submit">
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-yellow-100 to-yellow-400 transition-all duration-[650ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-white font-semibold transition-all group-hover:text-gray-800 duration-500 group-hover:font-bold">Login</span>
                </button>
              </div>
            </form>
            <div className="text-center mt-5"></div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>

  );
};

export default Login;
