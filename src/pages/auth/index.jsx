import { useEffect, useState } from "react";
import BaseButton from "../../components/base/BaseButton";
import BaseInput from "../../components/base/BaseInput";

import {
  signInWithEmailAndPasswordHandler,
  createUserWithEmailAndPasswordHandler,
} from "../../firebase/auth";
import { createUser } from "../../api/users";

import React from "react";
import BaseDialog from "../../components/base/BaseDialog";
import { useNavigate } from "react-router-dom";
import BaseLoader from "../../components/base/BaseLoader";

export default function AuthPage() {
  const navigate = useNavigate();
  // Variables:
  const [isNewUser, setIsNewUser] = useState(true);
  const [dialog, setDialog] = useState({
    state: false,
    content: "",
    title: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    password: null,
    confirmPassword: null,
  });
  const [existingUserData, setExistingUserData] = useState({
    email: null,
    password: null,
  });

  // Functions:
  const signupHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (newUserData.confirmPassword !== newUserData.password) {
        setDialog({
          state: true,
          content: "Passwords don't match",
          title: "Something went wrong!",
        });
        return;
      }
      const signupResponse = await createUserWithEmailAndPasswordHandler(
        newUserData.email,
        newUserData.password
      );
      await createUser({
        _id: signupResponse.user.uid,
        basicInformation: {
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          email: newUserData.email,
        },
        contactInformation: {
          address: null,
          phoneNumber: newUserData.phone,
        },
      });
      navigate("/info", { state: { newUser: true } });
    } catch (e) {
      // Open Dialog Here
      console.log("Error Occurred: ", e);
      setDialog({
        state: true,
        content: "Please check if all the fields entered are correct!",
        title: "Something went wrong!",
      });
    }
    setIsLoading(false);
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPasswordHandler(
        existingUserData.email,
        existingUserData.password
      );
      window.location.reload();
      navigate("/");
    } catch (e) {
      console.log("Error Occurred: ", e);
      setDialog({
        state: true,
        content: "Please check if all the fields entered are correct!",
        title: "Something went wrong!",
      });
    }
    setIsLoading(false);
  };

  const updateFormDataHandler = (event, inputKey) => {
    if (isNewUser) {
      setNewUserData((prevState) => ({
        ...prevState,
        [`${inputKey}`]: event.target.value,
      }));
    } else {
      setExistingUserData((prevState) => ({
        ...prevState,
        [`${inputKey}`]: event.target.value,
      }));
    }
  };

  const toggleDialog = () => {
    setDialog((prevState) => ({
      ...prevState,
      state: !prevState.state,
    }));
  };

  return (
    <>
      <div className="h-screen w-full bg-white flex items-center justify-center">
        {isLoading ? (
          <BaseLoader />
        ) : (
          <div
            className={`${
              isLoading && "hidden"
            } mx-4 md:mx-8 w-full md:w-2/3 xl:w-1/3 border-0 md:border rounded-xl md:px-8 py-12 space-y-4 md:space-y-4 bg-white flex-col flex items-center`}
          >
            <p className="text-4xl font-thin text-center">
              P R <span className="text-primary font-extralight">I </span> M E
              {/* <span className="italic">Org</span> */}
            </p>
            {isNewUser && (
              <div className="flex items-center justify-between w-full space-x-2">
                <div className="w-1/2">
                  <BaseInput
                    value={newUserData.firstName}
                    name="firstName"
                    placeHolder="John"
                    label="First Name"
                    errorText=""
                    onChange={(event) =>
                      updateFormDataHandler(event, "firstName")
                    }
                    type={undefined}
                  />
                </div>
                <div className="w-1/2">
                  <BaseInput
                    value={newUserData.lastName}
                    name="lastName"
                    placeHolder="Doe"
                    label="Last Name"
                    errorText=""
                    onChange={(event) =>
                      updateFormDataHandler(event, "lastName")
                    }
                    type={undefined}
                  />
                </div>
              </div>
            )}
            <BaseInput
              value={isNewUser ? newUserData.email : existingUserData.email}
              name="email"
              placeHolder="Enter your email"
              label="Email"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "email")}
              type={undefined}
              isHidden={undefined}
            />
            <BaseInput
              value={newUserData.phone}
              name="phone"
              isHidden={!isNewUser}
              placeHolder="Enter your primary contact"
              label="Phone"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "phone")}
              type={undefined}
            />
            <BaseInput
              value={
                isNewUser ? newUserData.password : existingUserData.password
              }
              name="password"
              placeHolder="Must have at least 6 characters"
              label="Password"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "password")}
              type="password"
              isHidden={undefined}
            />
            <BaseInput
              value={newUserData.confirmPassword}
              name="confirmPassword"
              isHidden={!isNewUser}
              placeHolder=""
              label="Confirm Password"
              errorText=""
              onChange={(event) =>
                updateFormDataHandler(event, "confirmPassword")
              }
              type={undefined}
            />
            <BaseButton
              customClasses="w-full"
              buttonText={isNewUser ? `Sign Up` : `Sign In`}
              onClick={isNewUser ? signupHandler : signInHandler}
              type={undefined}
            />
            {!isNewUser ? (
              <p>
                Don&apos;t have an account yet?{" "}
                <span
                  className="cursor-pointer underline"
                  onClick={() => {
                    setNewUserData({
                      firstName: null,
                      lastName: null,
                      email: null,
                      phone: null,
                      password: null,
                      confirmPassword: null,
                    });
                    setIsNewUser(!isNewUser);
                  }}
                >
                  Sign Up!
                </span>
              </p>
            ) : (
              <p>
                Already a user?{" "}
                <span
                  className="cursor-pointer underline"
                  onClick={() => {
                    setExistingUserData({
                      email: null,
                      password: null,
                    });
                    setIsNewUser(!isNewUser);
                  }}
                >
                  Sign in!
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      <BaseDialog
        title={dialog.title}
        contentContainerClasses="py-4 text-xs md:text-l"
        toggleDialog={toggleDialog}
        isOpen={dialog.state}
        text={dialog.content}
      />
    </>
  );
}
