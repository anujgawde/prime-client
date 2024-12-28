import { useEffect, useState } from "react";
import BaseButton from "../base/BaseButton";
import BaseInput from "../base/BaseInput";
import { editOrganization } from "../../api/organizations";

export default function EditOrganization({
  organization,
  editorId,
  editorRole,
}) {
  const [organizationData, setOrganizationData] = useState();
  const updateFormDataHandler = (event, inputKey) => {
    setOrganizationData((prevState) => ({
      ...prevState,
      [`${inputKey}`]: event.target.value,
    }));
  };

  const editOrganizationHandler = async () => {
    await editOrganization({
      editorRole,
      editorId,
      data: { ...organizationData, _id: organization._id },
    });
    window.location.reload();
  };

  useEffect(() => {
    setOrganizationData({
      name: organization.name,
      address: organization.address,
      emailDomain: organization.emailDomain,
    });
  }, []);

  return (
    <div className="w-full">
      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between w-full space-x-2">
          <div className="w-1/2">
            <BaseInput
              value={organizationData?.name}
              name="name"
              placeHolder=""
              label="Organization Name"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "name")}
              type={undefined}
            />
          </div>
          <div className="w-1/2">
            {" "}
            <BaseInput
              value={organizationData?.emailDomain}
              name="emailDomain"
              placeHolder=""
              label="Email Domain"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "emailDomain")}
              type={undefined}
            />
          </div>
        </div>
        <BaseInput
          value={organizationData?.address}
          name="address"
          placeHolder=""
          label="Address"
          errorText=""
          onChange={(event) => updateFormDataHandler(event, "address")}
          type={undefined}
        />{" "}
        <div className="flex justify-start">
          <BaseButton
            onClick={editOrganizationHandler}
            buttonText={"Update Organization"}
            customClasses={"my-2"}
          />
        </div>
      </div>
    </div>
  );
}
