import React, { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormNotes = ({ formCloseBtn , updateCardsData }) => {

    const [isSubmitting, setIsSubmitting] = useState(false);


    const [formData, setFormData] = useState({
        title: "",
        password: "",
        category: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    
    const handleSubmit = async (e) => {

        e.preventDefault(); // Prevent the default form submission behavior


        try {

            setIsSubmitting(true); // Set isSubmitting to true when starting the submission


            const response = await fetch("https://scrapflow-admin.vercel.app/api/saveNote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Note added successfully");

                // additional logic here after successful submission
                toast.success('Note added successfully', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                updateCardsData();
                // additional logic here after successful submission
                formCloseBtn();
                setFormData({
                    title: "",
                    password: "",
                    category: "",
                    description: "",
                });
            } else {
                console.error("Failed to add note");
                toast.error('Error adding note', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            }
        } catch (error) {
            console.error("Error adding note:", error);
            toast.error('Opps! Please Retry', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        finally {
            setIsSubmitting(false); // Set isSubmitting back to false when the submission is complete
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200/70 focus:bg-yellow-50 dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-200"
            />

            <div className="flex">
                <div className="flex-grow">
                    <input
                        required
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="text-gray-800 placeholder-gray-800 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200/70 focus:bg-yellow-50 dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-200"
                    />
                </div>

                <div className="flex-grow pl-2 w-[10vw]">
                    <select
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="text-gray-800 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200/70 focus:bg-yellow-50 dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-200"
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
            <textarea
                required
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 h-20 mt-2 text-base  transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200/70 focus:bg-yellow-50 dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-200 resize-none"
            />

            {isSubmitting ? (
                <button
                    className="flex justify-center gap-2 items-end mt-5 py-5 px-8 mb-4 w-full shadow-lg font-bold hover:text-white hover:font-semibold tracking-wide leading-none text-dark-800 bg-green-300 sm:mr-3 sm:mb-0 rounded-xl transition-all duration-300 shadow-green-200 text-lg opacity-65" disabled
                >
                    <div className="w-6 h-6 rounded-full animate-spin border-4 border-dashed border-gray-800 group-hover:border-white group-hover:border-t-transparent border-t-transparent"></div>
                </button>
            ) : (
                <button
                    type="submit"
                    className="flex justify-center gap-2 items-end mt-5 py-5 px-8 mb-4 w-full shadow-lg font-bold hover:text-white hover:font-semibold tracking-wide leading-none text-dark-800 bg-yellow-300 cursor-pointer sm:mr-3 sm:mb-0 hover:bg-green-400 rounded-xl transition-all duration-300 hover:shadow-green-200 text-lg"
                    
                >
                    <AiFillFileAdd className="text-xl" />
                    &nbsp;Add Note
                </button>
            )}
            </form>
        </>
    );
};

export default FormNotes;
