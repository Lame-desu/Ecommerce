"use client";

import { IoPersonOutline } from "react-icons/io5";
import UserInfo from "./UserInfo";
import { useState } from "react";

function ProfileIcon({ session }: { session: any }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div>
      <div>
        <button
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className="hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer "
        >
          <IoPersonOutline />
        </button>

        {isProfileOpen && (
          <div className="absolute right-3 top-full bg-white z-[900] rounded-sm">
            <UserInfo session={session} setIsProfileOpen={setIsProfileOpen} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileIcon;
