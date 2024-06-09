import { CreateAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPE } from "./user.type";

export const setCurrentUser = (user) => {
    return CreateAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);
};
