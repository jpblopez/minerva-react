import React, { useState } from 'react';
import {
  AiOutlineClose as Close,
  AiOutlineHome as Home,
  AiOutlineSetting as Settings,
  AiOutlineSync as Process,
  AiOutlineLayout as Model,
} from 'react-icons/ai';
import { BiBrain as Analyze } from 'react-icons/bi';

import { NavLink } from 'react-router-dom';

const sidebarClass =
  'fixed md:relative top-0 min-h-screen bg-gray-800 text-white w-1/3 md:w-1/6 flex flex-col transform duration-300 ease-out flex-shrink-0';

const computeClass = (open) =>
  sidebarClass + (open ? ' translate-x-0' : ' -translate-x-full');

// todo add a placeholder avatar

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false);
    setTimeout(() => setOpen(true), 1000); // remove this later
  };

  return (
    <>
      <div className={computeClass(open)}>
        <Close
          size={20}
          className="mx-4 mt-4 mb-3 cursor-pointer md:hidden"
          onClick={close}
        />
        <div>
          <NavLink
            to="/dashboard"
            className="flex flex-row gap-3 pl-4 py-2 text-gray-400 sidebar-link"
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/preprocessing"
            className="flex flex-row gap-3 pl-4 py-2 text-gray-400 sidebar-link"
          >
            <Process size={20} />
            <span>Preprocessing</span>
          </NavLink>
          <NavLink
            to="/model-building"
            className="flex flex-row gap-3 pl-4 py-2 text-gray-400 sidebar-link"
          >
            <Model size={20} />
            <span>Model Building</span>
          </NavLink>
          <NavLink
            to="/analyze"
            className="flex flex-row gap-3 pl-4 py-2 text-gray-400 sidebar-link"
          >
            <Analyze size={20} />
            <span>Analyze</span>
          </NavLink>
          <NavLink
            to="/settings"
            className="flex flex-row gap-3 pl-4 py-2 text-gray-400 sidebar-link"
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
