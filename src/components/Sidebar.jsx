import React from 'react';
import { AiFillHome as Home, AiOutlineTwitter as Tweet } from 'react-icons/ai';
import { MdGroupWork } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <>
    <div className="sidebar">
      <NavLink className="discord-button" to="/dashboard">
        <Home size={24} className="text-white" />
      </NavLink>
      <NavLink className="discord-button" to="/tweets">
        <Tweet size={24} className="text-white" />
      </NavLink>
      <NavLink className="discord-button" to="/clusters">
        <MdGroupWork size={24} className="text-white" />
      </NavLink>
    </div>
  </>
);

export default Sidebar;
