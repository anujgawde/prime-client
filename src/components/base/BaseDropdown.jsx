import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "./Icons";

export default function BaseDropdown({ children, activeDocument }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div
        className="items-center flex justify-between w-full px-2.5 py-[7px] cursor-pointer bg-bg-surface border border-border-default rounded-xs text-[13px] text-text-primary"
        onClick={toggleDropdown}
      >
        <div>{activeDocument?.name ?? "Select a Template"}</div>
        <ChevronDown className="text-text-muted" />
      </div>
      {isOpen && (
        <div
          onClick={toggleDropdown}
          className="absolute right-0 left-0 mt-1 w-full bg-bg-surface border border-border-subtle shadow-ds-md z-10 rounded-xs max-h-64 overflow-y-auto"
        >
          {children}
        </div>
      )}
    </div>
  );
}
