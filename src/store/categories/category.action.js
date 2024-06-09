import { CreateAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.type";

export const setCategories = (categoriesArray) =>
  CreateAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);
