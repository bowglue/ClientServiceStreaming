import { createContext } from "react";
import { WIDECONTEXT } from "./DesignContext";

export const CardActiveContext = createContext<boolean>(false);
export const DesignContext = createContext<string>(WIDECONTEXT);
