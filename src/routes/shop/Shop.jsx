import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./shop.styles.scss";
import Category from "../category/Category";
import CategoriesPreview from "../categorires-preview/CategoriesPreview";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/category.action";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments("caregories");
            console.log(categoriesArray);

            dispatch(setCategories(categoriesArray));
        };

        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
