import { useEffect, useState } from "react";
import { deleteTemplate, getTemplates } from "../../api/templates";
import DocumentCard from "../../components/DocumentCard";
import { formatDate } from "../../utils/utils";
import BaseButton from "../../components/base/BaseButton";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import CreateTemplate from "../../components/dialogs/templates/CreateTemplate";
import { useNavigate } from "react-router-dom";

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const auth = useAuthContext();

  const fetchTemplates = async () => {
    const templateResponse = await getTemplates({
      createdBy: auth.currentUser._id,
    });
    setTemplates(templateResponse);
  };

  const deleteTemplateHandler = async (templateId) => {
    await deleteTemplate(templateId, auth.currentUser);
    setTemplates(templates.filter((element) => element._id !== templateId));
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div>
      <div className="w-full py-4 px-8 bg-white flex justify-end items-center">
        {/* <Link to={`${uuidv4()}`}> */}
        {/* <BaseButton buttonText="Build New" /> */}
        <BaseButton
          buttonText="Build New"
          onClick={() => {
            if (
              auth.currentUser.organization &&
              (auth.currentUser.organization.roles === "super-admin" ||
                auth.currentUser.organization.roles === "admin")
            ) {
              setIsTemplateDialogOpen(true);
            } else {
              navigate(`/templates/${uuidv4()}`);
            }
          }}
        />
        {/* </Link> */}
      </div>
      <div className="py-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {templates.map((template, index) => (
          <DocumentCard
            id={template._id}
            organizationId={template.organizationId}
            navigate={template._id}
            title={template.name}
            basePath="templates"
            modifiedAt={formatDate(template.modifiedAt)}
            actionsVisible={true}
            key={index}
            deleteDocumentHandler={deleteTemplateHandler}
            identifier="template"
          />
        ))}
      </div>

      {isTemplateDialogOpen && (
        <CreateTemplate
          user={auth.currentUser}
          toggleDialog={() => setIsTemplateDialogOpen(false)}
        />
      )}
    </div>
  );
}
