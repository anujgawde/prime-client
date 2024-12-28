import { useEffect, useState } from "react";
import BaseButton from "../../components/base/BaseButton";
import { useNavigate } from "react-router-dom";
export default function ComingSoonPage() {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/");
  };

  const upcomingFeatures = [
    "Collaborative Contributions",
    "Document History Tracking",
    "Resource Permissions",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl p-10 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-center mb-2">
            What's Coming Next
          </h1>
          <p className="text-center text-muted-foreground ">
            We are working hard on bringing new features soon! Stay Tuned!
          </p>
        </div>
        <div className="space-y-6">
          {/* <h2 className="text-2xl font-semibold  text-center">What's Coming</h2> */}
          <ul className="grid grid-cols-1  gap-3 ">
            {upcomingFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 font-medium"
              >
                {/* <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" /> */}
                <img className="" src="/icons/base/circle-check.svg" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <BaseButton
              onClick={navigateToDashboard}
              buttonText="Go to Dashboard!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
