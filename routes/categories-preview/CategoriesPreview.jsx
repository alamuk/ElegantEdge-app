import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/CategoryPreview';
import Spinner from '../../components/spinner/Spinner';

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/categories.selector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
