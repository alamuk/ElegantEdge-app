import "./category-preview.style.scss";
import ProductCard from "../product-card/ProductCard";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
    return (
        <div className="category-preview-container">
            <h2>
                <Link className="title" to={title}>
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
