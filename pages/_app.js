import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { AuthProvider, useAuth } from "@/utils/AuthContext";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Login from "./login";




const App = ({ Component, pageProps }) => {
    return (
      <AuthProvider>
        <AppContent {...{ Component, pageProps }} />
      </AuthProvider>
    );
  };


  const AppContent = ({ Component, pageProps }) => {

    const [sideBarOpen , setSidebarOpen] = useState(false);

    const closeSidebarcallback = () => {
        setSidebarOpen(false);
    };

    const [authenticationChecked, setAuthenticationChecked] = useState(false);
    const { user } = useAuth();

  // Assuming you have an asynchronous function for checking authentication state
  const checkAuthentication = async () => {
    // Simulate an asynchronous authentication check
    await new Promise((resolve) => setTimeout(resolve, 0));
    setAuthenticationChecked(true);
  };

  useEffect(() => {
    checkAuthentication();
  }, []); // Run this effect only once on mount





    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
            </Head>


       
            {authenticationChecked ? (
        // Render the content only when the authentication state is checked
        <>
          {!user ? (
            <Login />
          ) : (
       
        <div className="flex">

        <div className={`${sideBarOpen?'translate-x-[0%] md:translate-x-0 w-[80vw]':'-translate-x-[100%] md:translate-x-0 w-0'} lg:w-[20vw] h-screen bg-red-500 transition-all duration-500 `}>
                <Sidebar closeSidebar={closeSidebarcallback} />
        </div>


        <div className={`${sideBarOpen?'w-[20vw] overflow-y-hidden opacity-50':'w-[100vw] z-10 md:z-0 overflow-y-auto'} lg:overflow-y-auto transition-all duration-500 lg:w-[80vw] h-screen bg-yellow-50 bg-png bg-cover`}>

          <div className="bg-yellow-50 m-4 p-2 sticky top-0 rounded-md inline-block md:hidden">
        {!sideBarOpen
        ?
        <GiHamburgerMenu className='text-2xl text-gray-800' onClick={()=>setSidebarOpen(true)}/>
        :
        <ImCross className='text-lg' onClick={()=>setSidebarOpen(false)}/>
      }
      </div>


                <Component {...pageProps} />
        </div>

        </div>
     )}
     </>
   ) : (
     // Render a loading state or placeholder while checking authentication
     <></>
   )}
 </>
);
};

export default App;