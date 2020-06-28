import { AnyAction } from "redux";
import { LOCAL_STORAGE_WATCH } from "../constants";

export const watchLocalStorage = (): AnyAction => ({ type: LOCAL_STORAGE_WATCH });
