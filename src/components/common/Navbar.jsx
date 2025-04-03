import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Authcontext";

export default function Navbar() {
  const { logoutUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const firstUsername = user.username.charAt(0).toUpperCase();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm shadow-sky-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO + Menu burger */}
        <div className="flex items-center space-x-4">
          <label className="btn btn-circle swap swap-rotate lg:hidden">
            {/* Checkbox cachée qui contrôle l'état */}
            <input type="checkbox" onChange={() => setIsOpen(!isOpen)} checked={isOpen} />

            {/* Icône hamburger */}
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* Icône de fermeture */}
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>

          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            janguXayma
          </span>
        </div>

        {/* MENU NAVIGATION */}
        <ul
          className={`menu menu-horizontal px-2 lg:flex ${
            isOpen ? "flex flex-col absolute bg-white shadow-md w-full left-0 top-16 p-4 rounded-lg" : "hidden lg:flex"
          }`}
        >
          <li>
            <Link to={"/dashboard"} className="text-lg">
              Dashboard
            </Link>
          </li>
          <li>
            <details>
              <summary className="text-lg">Cours</summary>
              <ul className="p-2">
                <li>
                  <Link to={"/info1"}>Info 1</Link>
                </li>
                <li>
                  <Link to={"/info2"}>Info 2</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to={"/about"} className="text-lg">
              A Propos
            </Link>
          </li>
        </ul>

        {/* Profil utilisateur */}
        <div className="relative">
          <div className="dropdown dropdown-center dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center w-10 h-10 rounded-full text-white text-xl font-bold"
            >
              {firstUsername}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-md absolute right-0 mt-2"
            >
              <li>
                <Link to={"/profile"} className="mb-2">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logoutUser} className="btn btn-secondary mt-3 md:mt-0">
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
