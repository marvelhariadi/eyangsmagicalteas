import { categories } from "../../assets/data/data";
import { useNavigate } from "react-router-dom";
import "../../styles/home/category.scss";

export const Category = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (sectionId) => {
    // Map section IDs to route paths
    const routeMap = {
      "magic-tea-leaves": "/category/tea-leaves",
      "tea-pots": "/category/tea-pots",
      "magic-tea-bags": "/category/tea-bags",
      "best-sellers": "/category/best-sellers" // Navigate to Best Sellers page
    };
    
    // Navigate to the appropriate category page
    if (routeMap[sectionId]) {
      navigate(routeMap[sectionId]);
    }
  };

  return (
    <section className="category">
      <div className="container">
        <h1 className="cinzel-title">Browse Categories</h1>
        
        <div className="category-container">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-item" 
              onClick={() => handleCategoryClick(category.sectionId)}
              role="button"
            >
              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};