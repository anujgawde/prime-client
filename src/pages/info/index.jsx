import { useNavigate } from "react-router-dom";
import BaseButton from "../../components/base/BaseButton";
export default function InfoPage() {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/");
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl py-6 text-center fixed top-0 flex items-center justify-center w-full">
        About
        <p className="mx-2 font-thin">
          P R <span className=" text-primary font-extralight">I </span>M E
        </p>
      </h1>

      <div className="flex justify-center mt-16">
        <div className="max-w-4xl">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
            <p className="text-muted-foreground">
              {/* Prime is a powerful tool designed to streamline the creation of
              daily document templates. Users can easily update content in real
              time and capture images directly to their documents. The
              application also includes an insightful statistics dashboard,
              providing a comprehensive view of the number of templates and
              documents created over the year, along with other key performance
              metrics to help users track their document activity and usage. */}
              Prime is a powerful tool designed to simplify and optimize the
              creation and management of document templates used in everyday
              business operations. With a user-friendly interface and powerful
              features, we aim to make your daily tasks easier and more
              efficient.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Real-Time Document Generation</li>
              <li>Capture and Attach Live Images</li>
              <li>Comprehensive Dashboard Analytics</li>
              <li>Customizable Document Templates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Sign Up for a new account (If you are'nt already!)</li>
              <li>
                Build your First Template - A template is a base structure for
                your documents.
              </li>
              <li>
                Create Documents using your - Using the template(s) you created.
              </li>
              <li>Analyze your usage on the dashboard</li>
            </ul>
          </section>
        </div>
      </div>
      <div className="flex justify-center">
        <BaseButton
          onClick={navigateToDashboard}
          buttonText="Go to Dashboard!"
        />
      </div>
    </div>
  );
}
