/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppHeader.css";

const AppHeader = ({ authenticated, onLogout }) => {
  return (
    <>
      <header aria-label="Page Header" className="main_header">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-gray-900 sm:text-xl">
                <Link to="/" className="text-3xl text-white" >
                  Foodies
                </Link>
              </h1>
            </div>
            <div className="flex items-center justify-end gap-4">
              <nav className="app-nav  text-white">
                {authenticated ? (
                  <ul>
                    {/* <li>
                      <NavLink to="/users">Users</NavLink>
                    </li> */}
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <li>
                      <a onClick={onLogout}>Logout</a>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to="/signup">Signup</NavLink>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
