import React, { useEffect, useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { IoIosSave } from "react-icons/io";


const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) {
      return title;
    }
    return title.substring(0, maxLength) + '...';
  };

const BasicCard = ({ card, onDelete, onUpdate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCard, setEditedCard] = useState({ ...card });
  const [hasChanges, setHasChanges] = useState(false); // Track changes

  useEffect(() => {
    // Check for changes whenever editedCard is updated
    const isDifferent = JSON.stringify(card) !== JSON.stringify(editedCard);
    setHasChanges(isDifferent);
  }, [editedCard, card]);

  const truncatedTitle = truncateTitle(card.title, 19); // Change 20 to your desired max length
  const truncatedDeleteTitle = truncateTitle(card.title, 25); // Change 20 to your desired max length
  const truncatedDescription = `${card.description.split(' ').slice(0, 16).join(' ')}...`;

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteNote/${card._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onDelete(card._id);
        setDeleteModal(false);
        toast.success('Deleted successfully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/editNote/${editedCard._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedCard),
        });

        if (response.ok) {
            console.log('Note edited successfully');
            onUpdate(); // Invoke the onUpdate callback without passing editedCard
            toast.success('Edited successfully', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            setOpenModal(false);
            setHasChanges(false); // Reset changes after successful edit
        } else {
            console.error('Failed to edit note');
        }
    } catch (error) {
        console.error('Error editing note:', error);
    }
};


const handleSave = () => {
    // Handle save action when there are changes
    if (hasChanges) {
      handleEdit();
    }
  };

  const handleCancel = () => {
    setEditedCard({ ...card }); // Reset editedCard to original values
    setEditMode(false);
    setHasChanges(false); // Reset changes when canceling
};


  return (
    <>
      <div className={`p-4 ${card.category === 'Level 3' ? 'bg-green-200' : 'bg-yellow-200'} shadow-md shadow-gray-200 rounded-xl flex flex-col items-start justify-between hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out select-none group`}>
        <div className="font-bold text-xl text-gray-800 leading-none">
          {truncatedTitle}
        </div>
        <p className='text-gray-600 my-3 leading-[1.2rem] h-full text-sm'>{truncatedDescription}</p>
        <div className='w-full flex items-center justify-between'>
          <button
            type="button"
            className=" group inline-flex hover:bg-gray-700 hover:shadow-md hover:shadow-gray-400 items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-white text-sm font-semibold transition-all"
            onClick={() => setOpenModal(true)}
          >
            Open
          </button>
          <button className='bg-white transition-all text-red-400 hover:bg-red-500 hover:text-white p-[2%] rounded-xl group-hover:flex hidden' onClick={() => setDeleteModal(true)}><MdDelete /></button>
        </div>
      </div>

      {/* view/edit button modal  */}
      <div className={`fixed bg-black/70 flex items-center justify-center h-screen w-screen top-0 left-0 transition-all duration-200 ease-in ${openModal ? 'scale-100 rounded-none' : 'scale-0 rounded-lg'} z-10`}>

        {openModal &&

          <div className={`bg-white w-[50vw] h-auto rounded-3xl p-8 transition-all duration-1000 ease-in-out`}>
            <div className="px-3 w-full h-full flex flex-col justify-between">

              {/* first row viewmode */}
              {!editMode && <div className="mb-8 w-[91%]">
                <h2 className="mb-4 text-2xl font-bold text-left">
                  {card.title}
                </h2>
                <p className="visible mx-0 mt-3 mb-0 text-md leading-relaxed text-left text-gray-600 overflow-auto">
                  {card.description}
                </p>
                <p className='mt-5 text-lg'><span className='font-semibold'>Password:</span> {card.password}</p>
                <p className='mt-5 text-lg'><span className='font-semibold'>Category:</span> {card.category}</p>
              </div>}

              {/* first row editmode */}
              {editMode && <div className="w-[91%]">

                <input
                  required
                  type="text"
                  name="title"
                  autoFocus
                  value={editedCard.title}
                  placeholder="Enter Title"
                  className="mb-4 text-2xl font-bold text-black w-full pb-2 ease-in-out transform transition-all focus:border-yellow-300 focus:border-b-[3px] outline-none border-b-2 border-gray-400/50"
                  onChange={(e) => {
                    setEditedCard({ ...editedCard, title: e.target.value });
                    setHasChanges(true); // Set changes when the title changes
                  }}                
                />

                <textarea
                  required
                  name="description"
                  placeholder="Enter Description"
                  value={editedCard.description}
                  className=" text-black placeholder-gray-600 w-full px-4 py-3 h-32 mt-2 text-base  transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200/70 focus:bg-yellow-50 dark:focus:bg-gray-800 focus:outline-none resize-none focus:ring-1 ring-gray-400"
                  onChange={(e) => {
                    setEditedCard({ ...editedCard, description: e.target.value });
                    setHasChanges(true); // Set changes when the title changes
                  }}                
                />

                <div className="w-[110%] flex items-center justify-between">

                  <div className="w-1/2 flex flex-col">

                    <div className="flex items-center text-lg">
                      <span className='font-bold mr-2'>Password&nbsp;: </span>
                      <input
                        required
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={editedCard.password}
                        className="text-gray-800 placeholder-gray-800 w-full px-4 py-2.5 text-base transition duration-500 ease-in-out transform mt-2 border-transparent rounded-lg bg-gray-200/70 focus:bg-yellow-50 dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
                        onChange={(e) => {
                            setEditedCard({ ...editedCard, password: e.target.value });
                            setHasChanges(true); // Set changes when the title changes
                          }}                
                />
                    </div>

                    <div className="flex items-center text-lg">
                      <span className='font-bold mr-2'>Category&nbsp;: </span>
                      <select
                        required
                        name="category"
                        value={editedCard.category}
                        className="text-gray-800 placeholder-gray-600 w-full px-4 py-2.5 mt-3 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200/70 focus:bg-yellow-50 dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
                        onChange={(e) => {
                            setEditedCard({ ...editedCard, category: e.target.value });
                            setHasChanges(true); // Set changes when the title changes
                          }}                
                        >
                        <option value="" disabled selected>
                          Category
                        </option>
                        <option value="Level 1">Level 1</option>
                        <option value="Level 2">Level 2</option>
                        <option value="Level 3">Level 3</option>
                        <option value="Level 4">Level 4</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-1/2 flex justify-end pt-12">
                    <button
                      className="py-4 px-8 mr-3 shadow-lg shadow-gray-200/75 font-bold hover:font-semibold leading-none text-dark-800 bg-gray-400/45 cursor-pointer scale-90 hover:bg-gray-400/65 rounded-xl transition-all duration-300 hover:shadow-gray-300 "
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    {hasChanges && <button
                    className="py-4 px-8 shadow-lg shadow-green-300/75 font-bold hover:font-semibold leading-none text-dark-800 bg-green-400 text-white cursor-pointer scale-90 hover:bg-green-500/80 rounded-xl transition-all duration-300 hover:shadow-green-300 flex"
                    onClick={handleSave}
                  >
                    Save&nbsp;<IoIosSave />
                  </button>}
                  </div>

                </div>

              </div>
              }

              {/* second row */}
              <div className="flex justify-end">
                {!editMode && <>
                  <button
                    className="py-4 px-8 mr-3 shadow-lg shadow-gray-200/75 font-bold hover:font-semibold leading-none text-dark-800 bg-gray-400/45 cursor-pointer scale-90 hover:bg-gray-400/65 rounded-xl transition-all duration-300 hover:shadow-gray-300 "
                    onClick={() => { setOpenModal(false); setEditMode(false) }}
                  >
                    Close
                  </button>

                  <button
                    className="py-4 px-8 shadow-lg shadow-yellow-300/75 font-bold hover:font-semibold leading-none text-dark-800 bg-yellow-300 cursor-pointer scale-90 hover:bg-yellow-400/85 rounded-xl transition-all duration-300 hover:shadow-yellow-300 flex"
                    onClick={()=>setEditMode(true)}
                  >
                    Edit&nbsp;<MdModeEditOutline />
                  </button>
                </>}
              </div>
            </div>
          </div>
        }
      </div>

      {/* delete button modal  */}
      <div className={`fixed bg-black/75 flex items-center justify-center h-screen w-screen top-0 left-0 transition-all duration-200 ease-in ${deleteModal ? 'scale-100 rounded-none' : 'scale-0 rounded-lg'} z-10`}>

        {deleteModal &&

          <div className={`bg-white w-[36vw] h-[32vh] rounded-3xl px-6 py-5 transition-all duration-1000 ease-in-out`}>
            <div className="px-3 w-full h-full flex flex-col justify-between ">
              <div className="b mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left mt-10">
                <h2 className="mb-4 text-xl font-semibold text-left">
                  Are you sure you want to permanently delete this &#x2774; <span className='text-red-500 font-semibold'>{truncatedDeleteTitle}</span> &#x2775; note.
                </h2>
              </div>
              <div className="flex justify-end">
                <button
                  className="block visible py-4 px-8 -mr-2 shadow-lg shadow-gray-300 font-bold text-white hover:font-semibold leading-none text-dark-800 scale-75 bg-gray-400/75 cursor-pointer hover:bg-gray-500/75 rounded-xl transition-all duration-300 hover:shadow-gray-200 "
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="block visible py-4 px-8 shadow-lg font-bold text-white hover:font-semibold tracking-wide leading-none text-dark-800 scale-75 cursor-pointer bg-red-500 rounded-xl transition-all duration-300 shadow-red-400 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default BasicCard;
