import { updateUserProfile } from "../../../api/users";
import BaseButton from "../../base/BaseButton";
import BaseInput from "../../base/BaseInput";
import { useEffect, useState } from "react";

export default function ViewProfile({ user, isOpen, toggleDialog }) {
  const [userData, setUserData] = useState();

  const updateFormDataHandler = (event, inputKey) => {
    setUserData((prevState) => ({
      ...prevState,
      [`${inputKey}`]: event.target.value,
    }));
  };

  const updateProfile = async () => {
    const response = await updateUserProfile({ ...userData, _id: user._id });
    window.location.reload();
  };

  useEffect(() => {
    setUserData({
      firstName: user.basicInformation.firstName,
      lastName: user.basicInformation.lastName,
      email: user.basicInformation.email,
      address: user.contactInformation.address,
      phoneNumber: user.contactInformation.phoneNumber,
    });
  }, []);

  return (
    <div
      onClick={toggleDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 p-4 relative min-h-[50%] justify-between flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        <div className="font-medium  text-2xl ">Profile</div>

        {/* Dialog Content  */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between w-full space-x-2">
            <div className="w-1/2">
              <BaseInput
                value={userData?.firstName}
                name="firstName"
                placeHolder=""
                label="First Name"
                errorText=""
                onChange={(event) => updateFormDataHandler(event, "firstName")}
                type={undefined}
              />
            </div>
            <div className="w-1/2">
              <BaseInput
                value={userData?.lastName}
                name="lastName"
                placeHolder=""
                label="Last Name"
                errorText=""
                onChange={(event) => updateFormDataHandler(event, "lastName")}
                type={undefined}
              />
            </div>
          </div>

          <BaseInput
            value={userData?.email}
            name="email"
            placeHolder=""
            label="Email"
            errorText=""
            onChange={(event) => updateFormDataHandler(event, "email")}
            type={undefined}
          />

          <BaseInput
            value={userData?.address}
            name="address"
            placeHolder="1234 SW 48th Blvd, Jacksonville, FL 12345"
            label="Address"
            errorText=""
            onChange={(event) => updateFormDataHandler(event, "address")}
            type={undefined}
          />

          <BaseInput
            value={userData?.phoneNumber}
            name="phoneNumber"
            placeHolder=""
            label="Phone"
            errorText=""
            onChange={(event) => updateFormDataHandler(event, "phoneNumber")}
            type={undefined}
          />
          <div className="flex justify-center">
            <BaseButton
              onClick={updateProfile}
              buttonText={"Update Profile"}
              customClasses={"my-2"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
