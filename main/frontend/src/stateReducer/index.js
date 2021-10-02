export default function stateReducer(state, actions) {
  for (const action of actions) {
    if (!action?.type) return state;
    switch (action?.type) {
      case "initLogin":
        state = {
          ...state,
          allowLogin: true,
          role: action.value.role || "",
        };
        break;
      case "logout":
        state = {
          allowLogin: false,
          role: "",
        };
        break;
      default:
        state = { ...state, [action.type]: action.value };
        break;
    }
  }
  return state;
}
