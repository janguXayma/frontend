import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Authcontext';

export default function() {
    const {logoutUser} = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const firstUsername = user.username.charAt(0).toUpperCase();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-sm shadow-sky-200">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* LOGO + Menu burger */}
                <div className="flex items-center space-x-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        janguXayma
                    </span>
                </div>

                {/* MENU (Hidden on mobile) */}
                <ul className={`menu menu-horizontal px-2 lg:flex ${isOpen ? "flex flex-col absolute bg-white shadow-md w-full left-0 top-12 p-4 rounded-lg" : "hidden"}`}>
                    <li><a className='text-lg'>Dashboard</a></li>
                    <li>
                        <details>
                            <summary className='text-lg'>Cours</summary>
                            <ul className="p-2">
                                <li><a>Info 1</a></li>
                                <li><a>Info 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a className='text-lg'>A Propos</a></li>
                </ul>

                {/* Profil utilisateur */}
                <div className="relative">
                    <div className="dropdown dropdown-center dropdown-hover">
                        <div tabIndex={0} role="button"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center w-10 h-10 rounded-full text-white text-xl font-bold">
                            {firstUsername}
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-md absolute right-0 mt-2">
                            <li><Link to={"/profile"} className='mb-2'>Profile</Link></li>
                            <li>
                                <button onClick={logoutUser} className="btn btn-secondary mt-3 md:mt-0">Déconnexion</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
  );
}
