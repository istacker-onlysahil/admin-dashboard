import React from 'react'

const NoFound = ({onResetSearch}) => {
  return (<>


      <div className="w-96 mx-auto">
        <div className="bg-white rounded-3xl mt-36 p-9 w-full flex flex-col items-center justify-center">
        
    
    {/* Column-1 */}
      <div className=" mb-8 max-w-lg flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">
          Notes<span className="text-4x ml-2 text-yellow-400">Not</span> Found
        </h2>
        <p className="visible mx-0 mt-3 mb-0 text-sm leading-relaxed text-center text-slate-400">
          The Note you are searching for is either deleted or edited.
        </p>
      </div>
      <div className="text-center lg:text-left">
        <button onClick={onResetSearch} className="block visible py-4 px-8 mb-4 shadow-lg font-semibold tracking-wide leading-none text-white bg-gray-800 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block transition-all duration-300 shadow-gray-400 hover:bg-red-500 hover:shadow-red-300">
          Exit
        </button>
      </div>
    


        </div>
      </div>

    </>)
}

export default NoFound