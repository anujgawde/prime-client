import { useState } from "react";
import BaseInput from "../../base/BaseInput";
import BaseButton from "../../base/BaseButton";

export default function BaseConfirmation({
  primaryAction,
  secondaryAction,
  title,
  content,
  primaryButtonText,
  secondaryButtonText,
}) {
  return (
    <div
      onClick={secondaryAction}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 p-4 relative  justify-between flex flex-col space-y-8"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        <div className="font-medium  text-2xl ">{title}</div>
        {/* Dialog Content  */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          <div>{content}</div>
          <div className=" justify-center flex items-center space-x-4">
            <button
              onClick={secondaryAction}
              className="rounded-md text-center py-2 px-4 md:px-8 md:py-2 bg-gray-300 text-black font-semibold border-none ${customClasses} text-sm md:text-base"
            >
              {secondaryButtonText}
            </button>

            <BaseButton
              onClick={primaryAction}
              buttonText={primaryButtonText}
              customClasses={"my-2"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
