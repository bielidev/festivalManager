import { ReactNode, useReducer } from "react";
import { initialState, reducer, TemplateContext } from "./templateReducer";

export const TemplateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TemplateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TemplateContext.Provider>
  );
};
