import React, { useEffect, useRef, useState } from "react";

const BaseMenu = ({ iconContainerClass, iconSrc, trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClick: () => {
          closeDropdown();
          if (child.props.onClick) child.props.onClick();
        },
      });
    }
    return child;
  });

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className={
          iconContainerClass
            ? iconContainerClass
            : "cursor-pointer flex items-center hover:bg-bg-hover rounded-xs p-1.5"
        }
        onClick={toggleDropdown}
      >
        {trigger ?? (iconSrc && <img src={iconSrc} alt="" className="h-4 w-4" />)}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-bg-surface border border-border-subtle shadow-ds-md z-10 rounded-xs overflow-hidden">
          {enhancedChildren}
        </div>
      )}
    </div>
  );
};

export default BaseMenu;
