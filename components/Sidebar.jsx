import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FiLogOut } from "react-icons/fi";


const Sidebar = ({ closeSidebar }) => {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState('');

  useEffect(() => {
    // Update active tag based on the current route
    const path = router.pathname;
    if (path === '/plan') {
      setActiveTag('Plan');
    } else if (path === '/task-list') {
      setActiveTag('Task list');
    } else if (path === '/project') {
      setActiveTag('Project');
    } else if (path === '/tags') {
      setActiveTag('Tags');
    } else {
      setActiveTag('');
    }
  }, [router.pathname]);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    closeSidebar();
  };

  const isTagActive = (tag) => {
    return tag === activeTag;
  };

  return (
<aside className=" bg-white shadow-md h-screen">

    <div className="flex flex-col justify-between h-full">
      <div className="flex-grow">
        <div className="px-4 py-6 text-center border-b">
          <Link href="/" onClick={()=>closeSidebar()}>
          <h1 className="text-xl font-bold leading-none select-none">
            <span className="text-yellow-700">Task Manager</span> App
          </h1>
          </Link>
        </div>
        <div className="p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/plan"
              className={`flex items-center bg-white hover:bg-yellow-100 rounded-xl font-bold text-sm ${
                isTagActive('Plan') ? 'bg-yellow-200 text-yellow-900 hover:bg-yellow-200' : 'text-gray-900'
              } py-3 px-4 cursor-pointer`}
              onClick={() => handleTagClick('Plan')}
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className={`text-lg mr-4 ${isTagActive('Plan') ? 'animate-pulse' : ''} `}
                  viewBox="0 0 16 16"
                >
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                </svg>
                Plan
              </Link>
            </li>
            <li>
            <Link
              href="/task"
              className={`flex items-center bg-white hover:bg-yellow-100 rounded-xl font-bold text-sm ${
                isTagActive('Task list') ? 'bg-yellow-200 text-yellow-900 hover:bg-yellow-200' : 'text-gray-900'
              } py-3 px-4 cursor-pointer`}
              onClick={() => handleTagClick('Task list')}
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className={`text-lg mr-4 ${isTagActive('Task list') ? 'animate-pulse' : ''} `}
                  viewBox="0 0 16 16"
                >
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                </svg>
                Task list
              </Link>
            </li>
            <li>
            <div
              className={`flex items-center bg-white hover:bg-yellow-100 rounded-xl font-bold text-sm ${
                isTagActive('Project') ? 'bg-yellow-200 text-yellow-900 hover:bg-yellow-200' : 'text-gray-900'
              } py-3 px-4 cursor-pointer`}
              onClick={() => handleTagClick('Project')}
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className={`text-lg mr-4 ${isTagActive('Project') ? 'animate-pulse' : ''} `}
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                </svg>
                Projects
              </div>
            </li>
            <li>
            <div
              className={`flex items-center bg-white hover:bg-yellow-100 rounded-xl font-bold text-sm ${
                isTagActive('Tags') ? 'bg-yellow-200 text-yellow-900 hover:bg-yellow-200' : 'text-gray-900'
              } py-3 px-4 cursor-pointer`}
              onClick={() => handleTagClick('Tags')}
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className={`text-lg mr-4 ${isTagActive('Tags') ? 'animate-pulse' : ''} `}
                  viewBox="0 0 16 16"
                >
                  <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
                Tags
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        <button
          type="button"
          className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:bg-red-500 hover:text-white text-sm font-semibold transition"
        >
          <FiLogOut className='text-lg'/>
        </button>{" "}
        <span className="font-bold text-sm ml-2 select-none">Logout</span>
      </div>
    </div>
  </aside>
  )
}

export default Sidebar
