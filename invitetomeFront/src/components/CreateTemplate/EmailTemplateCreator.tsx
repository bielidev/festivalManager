import React, { useContext, useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";

import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";
import ActionBar from "./ActionBar";
import languages from "./email-default-languages.json";
import { Language, TemplateContext } from "./templateReducer";

// Memoize child components to prevent unnecessary re-renders
const EditorPanelMemo = React.memo(EditorPanel);
const PreviewPanelMemo = React.memo(PreviewPanel);
const ActionBarMemo = React.memo(ActionBar);

interface EmailTemplateCreatorProps {
  onClose: () => void;
}

const EmailTemplateCreator: React.FC<EmailTemplateCreatorProps> = () => {
  const { dispatch, ...state } = useContext(TemplateContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [showEditor, setShowEditor] = useState(false);
  const [showActionBar, setShowActionBar] = useState(false);

  const defaultFields = [
    "logoUrl",
    "header",
    "contactName",
    "contactEmail",
    "contactPhone",
    "qrInstruction",
    "eventName",
    "eventDate",
    "eventLocation",
    "pickupLocation",
    "eventDescription",
    "footerText1",
    "footerText2",
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {(showEditor || !isMobile) && (
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "25%",
              },
              height: {
                xs: "auto",
                md: "100%",
              },
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRight: {
                xs: "none",
                md: "1px solid",
              },
              borderColor: "divider",
            }}
          >
            <EditorPanelMemo
              fields={state.fields}
              visibility={state.visibility}
              customFields={state.customFields}
              defaultFields={defaultFields}
              language={state.language}
              translations={languages.languages}
              onInputChange={(field: string, value: string) =>
                dispatch({ type: "UPDATE_FIELD", field, value })
              }
              onToggleVisibility={(field: string) =>
                dispatch({ type: "TOGGLE_VISIBILITY", field })
              }
            />
          </Box>
        )}

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "50%",
            },
            height: {
              xs: "auto",
              md: "100%",
            },
            overflow: "hidden",
            bgcolor: "background.default",
          }}
        >
          <PreviewPanelMemo
            fields={state.fields}
            visibility={state.visibility}
            customFields={state.customFields}
            defaultFields={defaultFields}
            language={state.language}
            translations={
              Object.fromEntries(
                Object.entries(
                  languages.languages[state.language] || {}
                ).filter(
                  ([, value]) => typeof value === "object" && value !== null
                )
              ) as { [key: string]: { [key: string]: string } }
            }
            templateStyles={state.template?.styles}
          />
        </Box>

        {(showActionBar || !isMobile) && (
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "25%",
              },
              height: {
                xs: "auto",
                md: "100%",
              },
              bgcolor: "background.paper",
              borderLeft: {
                xs: "none",
                md: "1px solid",
              },
              borderColor: "divider",
            }}
          >
            <ActionBarMemo
              templateName={state.templateName}
              createdAt={state.createdAt}
              showAddFieldForm={state.showAddFieldForm}
              defaultFields={defaultFields}
              language={state.language}
              onAddCustomField={(name, placeholder, position) =>
                dispatch({
                  type: "ADD_CUSTOM_FIELD",
                  name,
                  placeholder,
                  position,
                })
              }
              onToggleAddFieldForm={() =>
                dispatch({ type: "TOGGLE_ADD_FIELD_FORM" })
              }
              onSetTemplateName={(name) =>
                dispatch({ type: "SET_TEMPLATE_NAME", name })
              }
              onSave={() => console.log("Save:", state)}
              onReset={() => dispatch({ type: "RESET_TEMPLATE" })}
              onDownloadJson={() => {
                const json = JSON.stringify(state, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${state.templateName || "template"}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              onSetLanguage={(language: Language) =>
                dispatch({ type: "SET_LANGUAGE", language })
              }
            />
          </Box>
        )}
      </Box>

      {isMobile && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label={showEditor ? "Ocultar Editor" : "Editor"}
              icon={<EditIcon />}
              onClick={() => setShowEditor((prev) => !prev)}
            />
            <BottomNavigationAction
              label={showActionBar ? "Ocultar Herramientas" : "Herramientas"}
              icon={<ViewSidebarIcon />}
              onClick={() => setShowActionBar((prev) => !prev)}
            />
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

export default EmailTemplateCreator;
