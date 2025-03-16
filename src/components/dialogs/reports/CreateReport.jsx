import React, { useEffect, useState } from "react";
import BaseButton from "../../base/BaseButton";
import BaseDropdown from "../../base/BaseDropdown";
import { getTemplates } from "../../../api/templates";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function CreateReport({ text, toggleDialog, user }) {
  const location = useLocation();
  const [activeTemplate, setActiveTemplate] = useState({});

  const [templates, setTemplates] = useState({
    personal: [],
    organization: [],
  });

  const [selectedOption, setSelectedOption] = useState(
    user.organization ? true : false
  );
  // Todo: Add Pagination:
  const fetchTemplates = async () => {
    if (templates.organization.length && templates.personal.length) return;
    if (!selectedOption) {
      const personalTemplates = await getTemplates({
        createdBy: user._id,
      });
      setTemplates({
        ...templates,
        personal: personalTemplates,
      });
    } else if (selectedOption) {
      const organizationTemplates = await getTemplates({
        organizationId: user.organization.id,
      });
      setTemplates({
        ...templates,
        organization: organizationTemplates,
      });
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, [selectedOption]);

  const closeDialog = () => {
    toggleDialog();
  };

  const createDocument = () => {
    if (activeTemplate._id) {
      toggleDialog();
      navigate(`/reports/${activeTemplate._id}/${uuidv4()}`, {
        state: {
          organizationId: selectedOption ? user.organization.id : null,
        },
      });
    }
  };

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div
      onClick={closeDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-4 relative  flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        {/* Dialog Header */}
        <div className="text-xl">Please select a template for the report</div>

        {/* Dialog Content */}
        <div>{text}</div>

        {/* Check for org/personal reports */}
        {location.pathname !== "/organization" && (
          <div className="space-y-1">
            <div className="block text-gray-800 font-medium">Report Type</div>
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
                <span className="text-gray-800 ml-2">Organization</span>
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
                <span className="text-gray-800 ml-2">Personal</span>
              </label>
            </div>
          </div>
        )}

        <BaseDropdown activeDocument={activeTemplate}>
          {selectedOption
            ? templates.organization.map((template, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none"
                  onClick={() => setActiveTemplate(template)}
                >
                  {template.name}
                </button>
              ))
            : templates.personal.map((template, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none"
                  onClick={() => setActiveTemplate(template)}
                >
                  {template.name}
                </button>
              ))}
        </BaseDropdown>

        {/* Dialog CTA */}
        <BaseButton buttonText="Create!" onClick={createDocument} />
      </div>
    </div>
  );
}
