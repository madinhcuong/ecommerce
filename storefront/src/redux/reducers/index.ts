import { combineReducers } from "redux";
import { ConfigReducer, ConfigActions } from "./ConfigSlice";

const rootReducer = combineReducers({
  config: ConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// root actions
export const Actions = {
  ConfigActions,
};

export default rootReducer;
