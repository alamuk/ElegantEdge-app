import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/CategoryPreview";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                console.log(products);
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                );
            })}
        </>
    );
};

export default CategoriesPreview;
