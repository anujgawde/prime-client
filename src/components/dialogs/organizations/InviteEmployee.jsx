import { useState } from "react";
import BaseInput from "../../base/BaseInput";
import BaseButton from "../../base/BaseButton";

export default function InviteEmployee({ inviteEmployee, toggleDialog }) {
  const [employeeEmail, setEmployeeEmail] = useState();
  return (
    <div
      onClick={toggleDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 p-4 relative  justify-between flex flex-col space-y-8"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        <div className="font-medium  text-2xl ">Invite Employee</div>
        {/* Dialog Content  */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          <div>
            <BaseInput
              value={employeeEmail}
              name="employeeEmail"
              placeHolder="johndoe@primeco.in"
              label="Employee's Email"
              errorText=""
              onChange={(event) => setEmployeeEmail(event.target.value)}
              type={undefined}
            />
          </div>
          <div className="flex justify-center">
            <BaseButton
              onClick={() => {
                setEmployeeEmail("");
                inviteEmployee(employeeEmail);
              }}
              buttonText={"Send Invite"}
              customClasses={"my-2"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
