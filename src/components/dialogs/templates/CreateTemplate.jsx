import { useState } from "react";
import BaseButton from "../../base/BaseButton";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function CreateTemplate({ toggleDialog, user }) {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);

  const buildTemplate = () => {
    navigate(`/templates/${uuidv4()}`, {
      state: {
        organizationId: selectedOption ? user.organization.id : null,
      },
    });
  };

  const handleChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <div
      onClick={() => toggleDialog()}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-4 relative  flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        {/* Dialog Header */}
        <div className="text-xl">Confirm Template</div>

        {/* Check for org/personal reports */}
        <div className="space-y-1">
          <div className="block text-gray-800 font-medium">
            Is this template associated with your organization?
          </div>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={true}
                checked={selectedOption === true}
                onChange={() => handleChange(true)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === true
                    ? "border-primary bg-primary"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === true && (
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                )}
              </span>
              <span className="text-gray-800 ml-2">Yes</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={false}
                checked={selectedOption === false}
                onChange={() => handleChange(false)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === false
                    ? "border-primary bg-primary"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === false && (
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                )}
              </span>
              <span className="text-gray-800 ml-2">No</span>
            </label>
          </div>
        </div>
        {/* Dialog CTA */}
        <BaseButton buttonText="Build!" onClick={buildTemplate} />
      </div>
    </div>
  );
}
