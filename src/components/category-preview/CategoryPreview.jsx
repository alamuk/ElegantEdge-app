import './category-preview.styles.scss';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="category-title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products &&
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
