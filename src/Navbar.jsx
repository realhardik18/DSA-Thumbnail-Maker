function Navbar() {
  return (
      <div className="navbar bg-base-100 px-4">
          <div className="flex-1">
              <a className="btn btn-ghost text-xl sm:text-2xl">DSA Thumbnail Maker</a>
          </div>
          <div className="flex-none">
              {/* Hidden on larger screens, displays dropdown on smaller screens */}
              <div className="dropdown dropdown-end sm:hidden">
                  <label tabIndex={0} className="btn btn-ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                  </label>
                  <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a href="https://x.com/realhardik18">Made By Realhardik18</a></li>
                      <li><a href="https://github.com/realhardik18/dsa-thumbnail-maker">Source Code</a></li>
                  </ul>
              </div>
              {/* Displays as a horizontal menu on larger screens */}
              <ul className="menu menu-horizontal px-1 hidden sm:flex">
                  <li><a href="https://x.com/realhardik18">Made By Realhardik18</a></li>
                  <li><a href="https://github.com/realhardik18/dsa-thumbnail-maker">Source Code</a></li>
              </ul>
          </div>
      </div>
  );
}

export default Navbar;
