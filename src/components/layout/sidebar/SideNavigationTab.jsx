import { Link } from "react-router-dom";

export default function SideNavigationTab(props) {
  if (props.label === "New Document") {
    return (
      <div
        onClick={() => props.callbackFunction()}
        className={`rounded-xl hover:bg-gray-200 ${
          props.isTabActive && "bg-gray-200"
        } py-4 cursor-pointer px-4 flex items-center space-x-4`}
      >
        <img src={props.icon} className="h-5 w-5" />
        <p className="text-xl">{props.label}</p>
      </div>
    );
  }

  return (
    <Link
      onClick={() => props?.callbackFunction && props?.callbackFunction?.()}
      className={`rounded-xl hover:bg-gray-200 ${
        props.isTabActive && "bg-gray-200"
      } py-4 cursor-pointer px-4 flex items-center space-x-4 z-100`}
      to={props.navigateTo}
    >
      <img src={props.icon} className="h-5 w-5" />
      <p className="text-xl">{props.label}</p>
    </Link>
  );
}
