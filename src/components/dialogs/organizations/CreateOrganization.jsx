import { useEffect, useState } from "react";
import BaseInput from "../../base/BaseInput";
import BaseButton from "../../base/BaseButton";
import { createOrganization } from "../../../api/organizations";
import { useAuthContext } from "../../../context/AuthContext";

export default function CreateOrganization({ user, toggleDialog }) {
  const [organizationData, setOrganizationData] = useState(user.organization);

  const saveOrganization = async () => {
    const response = await createOrganization({
      ...organizationData,
      owners: [
        {
          _id: user._id,
          basicInformation: user.basicInformation,
          contactInformation: user.contactInformation,
        },
      ],
      settings: {},
      status: "",
      createdAt: Date.now(),
    });
    window.location.reload();
  };

  const updateFormDataHandler = (event, inputKey) => {
    setOrganizationData((prevState) => ({
      ...prevState,
      [`${inputKey}`]: event.target.value,
    }));
  };

  return (
    <div
      onClick={toggleDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 p-4 relative min-h-[50%] justify-between flex flex-col space-y-8"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        <div className="font-medium  text-2xl ">Organization</div>
        {/* Dialog Content  */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          <div>
            <BaseInput
              value={organizationData?.name}
              name="name"
              placeHolder=""
              label="Organization Name"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "name")}
              type={undefined}
            />

            <BaseInput
              value={organizationData?.emailDomain}
              name="emailDomain"
              placeHolder="@primeco.in"
              label="Email Domain"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "emailDomain")}
              type={undefined}
            />

            <BaseInput
              value={organizationData?.address}
              name="address"
              placeHolder="1234 SW 48th Blvd, Jacksonville, FL 12345"
              label="Address"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "address")}
              type={undefined}
            />
          </div>
          <div className="flex justify-center">
            <BaseButton
              onClick={saveOrganization}
              buttonText={"Save Organization"}
              customClasses={"my-2"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
