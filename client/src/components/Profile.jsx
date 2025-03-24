import React from "react";

const Profile = () => {
  return (
    <div className="flex items-center gap-6">
      <SearchIcon className="cursor-pointer" />
      <div className="group relative">
        <AccountCircleIcon className="cursor-pointer" />
        <div className="dropdown-menu absolute right-0 hidden rounded-lg bg-white pt-4 text-sm shadow-sm group-hover:block">
          <ul className="flex w-36 flex-col text-gray-700">
            <li className="block cursor-pointer px-4 py-2 hover:bg-gray-100">
              My Profile
            </li>
            <li className="block cursor-pointer px-4 py-2 hover:bg-gray-100">
              Orders
            </li>
            <li className="block cursor-pointer px-4 py-2 hover:bg-gray-100">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
