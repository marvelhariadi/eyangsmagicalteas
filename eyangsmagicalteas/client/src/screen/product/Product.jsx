import { products, categories } from "../../assets/data/data";
import { ProductCard } from "../../components/cards/ProductCard";

export const Product = () => {
  return (
    <>
      <section className="product">
        <div className="container" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <h1 className="section-title">Our Magical Products</h1>
          
          {categories
            .filter(category => category.sectionId !== 'best-sellers')
            .map((category) => (
            <div key={category.id} id={category.sectionId} className="product-category-section">
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <div className="content">
                {products[category.sectionId].map((product, index) => (
                  <ProductCard key={index} products={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};