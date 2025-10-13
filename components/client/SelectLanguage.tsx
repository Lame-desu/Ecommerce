"use client";

import { useEffect, useState } from "react";
import { IoCheckmark, IoChevronDown, IoChevronUp } from "react-icons/io5";

function SelectLanguage({ border }: { border?: boolean }) {
  const [isSelectingLanguage, setIsSelectingLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  useEffect(() => {
    if (!isSelectingLanguage) return;

    function removeLanguageSelect() {
      setIsSelectingLanguage(false);
    }

    window.addEventListener("click", removeLanguageSelect);

    return () => window.removeEventListener("click", removeLanguageSelect);
  }, [isSelectingLanguage]);
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          setIsSelectingLanguage(!isSelectingLanguage);
          e.stopPropagation();
        }}
        className={`flex items-center gap-1 text-sm hover:underline hover:cursor-pointer ${
          border
            ? "py-3 px-4 tracking-wider border-1 rounded-sm border-gray-500"
            : ""
        }`}
      >
        {selectedLanguage === "English" ? selectedLanguage : "አማረኛ"}{" "}
        <span>
          {isSelectingLanguage ? (
            border ? (
              <IoChevronDown />
            ) : (
              <IoChevronUp />
            )
          ) : border ? (
            <IoChevronUp />
          ) : (
            <IoChevronDown />
          )}
        </span>
      </button>
      {isSelectingLanguage && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute ${
            border ? "bottom-[120%] left-0" : "top-[120%] right-0"
          }  border-[1px] border-black p-6  pr-9 text-sm rounded-sm z-10 bg-white`}
        >
          <div
            onClick={() => {
              if (selectedLanguage === "English") return;
              setSelectedLanguage("English");
              setIsSelectingLanguage(false);
            }}
            className="flex gap-1 items-center"
          >
            <span className="w-5">
              {selectedLanguage === "English" && <IoCheckmark />}
            </span>
            <button className="cursor-pointer">English</button>
          </div>
          <div
            onClick={() => {
              if (selectedLanguage === "Amharic") return;
              setSelectedLanguage("Amharic");
              setIsSelectingLanguage(false);
            }}
            className="flex gap-1 items-center mt-4"
          >
            <span className="w-5">
              {selectedLanguage === "Amharic" && <IoCheckmark />}
            </span>
            <button className="cursor-pointer">አማረኛ</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectLanguage;
