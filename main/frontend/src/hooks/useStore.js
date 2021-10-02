import { useReducer } from "react";
import stateReducer from "../stateReducer";
import initLogin from "../handlers/initLogin";
import logout from "../handlers/initLogout";

export const INITIAL_VALUE = {
  allowLogin: false,
  role: "",
};

export default function useStore(initialValue = INITIAL_VALUE) {
  let [store, dispatch] = useReducer(stateReducer, initialValue);
  let handlers = {
    initLogin: initLogin.bind({ store, dispatch }),
    logout: logout.bind({ store, dispatch }),
  };
  return [store, handlers];
}
