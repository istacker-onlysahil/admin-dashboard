import FormNotes from "@/components/FormNotes";
import BasicCard from "@/components/tools/BasicCard";
import NoFound from "@/components/tools/NoFound";
import React, { useEffect, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Notes = () => {

  const [formModal, setFormModal] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);


  const handleNoteDelete = async (deletedNoteId) => {
    // Filter out the deleted note from the current state
    const updatedCardsData = cardsData.filter((card) => card._id !== deletedNoteId);
    setCardsData(updatedCardsData);
  };


  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getAllNotes');
        const data = await response.json();
        setCardsData(data.data);
        setLoading(false); // Set loading to false when data fetching is complete
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Error fetching notes', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that the effect runs only once


  const updateCardsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getAllNotes");
      const data = await response.json();
      setCardsData(data.data);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const handleNoteUpdate = async () => {
    await updateCardsData();
  };

  const handleFormCloseBtn = () => {
    setFormModal(false);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <main className="max-w-screen-xl mx-auto h-screen bg-opacity-25 overflow-hidden">
        <ToastContainer />

        <div className="h-auto mb-[.3rem] mt-5 flex justify-between px-10 items-center">

          {/* Sort by */}
          <button className="bg-yellow-50 border-2 border-yellow-300 py-3 px-5 text-yellow-800 font-bold rounded-xl shadow-md hover:bg-yellow-300 hover:shadow-gray-300 hover:text-white hover:font-semibold opacity-0" disabled>
            Add Note
          </button>

          {/* serch bar  */}
          <div className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform transition duration-500 ">
            <div className="flex bg-gray-100 p-4 w-auto space-x-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input className="bg-gray-100 w-72 outline-none" type="text" placeholder="Search by Title ..." value={searchQuery} onChange={handleSearchChange} />
            </div>
            <button className="bg-yellow-300 py-3 px-5 text-gray-900 font-bold rounded-xl shadow-md hover:bg-gray-800 hover:shadow-gray-300 hover:text-white hover:font-semibold">
              Search
            </button>
          </div>

          {/* add note */}
          <button className="bg-yellow-50 border-2 border-gray-600 py-3 px-5 text-gray-800 font-bold rounded-xl shadow-lg shadow-yellow-50 hover:bg-gray-800 hover:shadow-gray-300 hover:text-white hover:font-semibold flex items-center group" onClick={() => setFormModal(!formModal)}>
            {!formModal ? <>
              <AiFillFileAdd className="text-xl" />&nbsp;Note
            </>
              :
              <div className="w-6 h-6 mx-4 rounded-full animate-spin
              border-4 border-dashed border-gray-800 group-hover:border-white group-hover:border-t-transparent border-t-transparent"></div>
            }
          </button>
        </div>



        {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : filteredCards.length > 0 ? (
        <div className="overflow-auto h-auto bg-opacity-25 px-10 pt-12 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {filteredCards.map((card, index) => (
            <BasicCard key={index} card={card} onDelete={handleNoteDelete} onUpdate={handleNoteUpdate} />
          ))}
        </div>
      ) : (
        <NoFound onResetSearch={()=>setSearchQuery('')} />
      )}



      </main>


      {/* Modal Element  */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[50vh] flex items-center bg-white px-8 py-16 transform ${formModal ? 'translate-y-0 shadow-[-30px_10px_20px_0px_#1e1e1e]' : 'translate-y-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
          } transition-transform duration-300 ease-in-out`}
      >

        {/* left column */}
        <div className="w-1/3 ml-24 h-full flex flex-col justify-center items-start mr-auto">
          <h2 className="mb-4 text-3xl font-bold">
            Exclusive Agency For
            <span className="text-4xl mx-2 text-yellow-400 leading-relaxeds">
              Technology
            </span>
            Provide Solution
          </h2>
          <p className="mx-0 mt-3 mb-0 text-sm leading-relaxed text-slate-400">
            Helping you maximize operations management with digitization
          </p>
          <div className="text-center lg:text-left mt-6">
            <button
              className="block py-4 px-8 mb-4 shadow-lg shadow-red-300 font-bold text-white hover:font-semibold tracking-wide leading-none text-dark-800 bg-red-400 cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block hover:bg-red-500 rounded-xl transition-all duration-300 hover:shadow-red-400"
              onClick={() => setFormModal(!formModal)}
            >
              Close
            </button>
          </div>
        </div>

        {/* right column */}

        <div className="w-1/3 flex items-start mr-24 h-full">
          <div className="flex flex-col">
            <FormNotes formCloseBtn={handleFormCloseBtn} updateCardsData={updateCardsData} />
          </div>
        </div>

      </div>

    </>
  );
};

export default Notes;
