'use client'
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './DietaryRecommendations.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

interface DiningHallRecommendation {
  diningHall: string;
  meals: Array<{
    name: string;
    description: string;
    dietaryInfo: string[];
    rating?: number;
    isSpecial?: boolean;
  }>;
}

const DIETARY_DATA: Record<string, {
  title: string;
  description: string;
  color: string;
  icon: string;
  dietaryCode: string;
  recommendations: DiningHallRecommendation[];
}> = {
  kosher: {
    title: "Kosher Recommendations",
    description: "Top kosher meals available today from our dining halls, certified by Brown Hillel.",
    color: "#3498db",
    icon: "✡️",
    dietaryCode: "HL",
    recommendations: [
      {
        diningHall: "Sharpe Refectory",
        meals: [
          {
            name: "Halal Cauliflower Rice & Chicken Tinga Bowl",
            description: "A flavorful bowl featuring cauliflower rice topped with kosher-certified chicken tinga.",
            dietaryInfo: ["Halal", "Kosher"],
            rating: 4.7,
            isSpecial: true
          },
          {
            name: "Baked Ziti",
            description: "Kosher-certified pasta baked with tomato sauce and cheese.",
            dietaryInfo: ["Vegetarian", "Halal", "Kosher"],
            rating: 4.3
          }
        ]
      },
      {
        diningHall: "Andrews",
        meals: [
          {
            name: "Hummus with Pita",
            description: "Fresh-made hummus served with warm pita bread.",
            dietaryInfo: ["Vegan", "Halal", "Kosher"],
            rating: 4.5
          },
          {
            name: "Grandma Pizza",
            description: "Traditional kosher pizza with tomato sauce and cheese.",
            dietaryInfo: ["Vegetarian", "Halal", "Kosher"],
            rating: 4.2
          }
        ]
      },
      {
        diningHall: "Verney-Woolley",
        meals: [
          {
            name: "Slow Braised Tomatoes - Rialto",
            description: "Slow-cooked tomatoes prepared according to kosher standards.",
            dietaryInfo: ["Vegan", "Halal", "Kosher"],
            rating: 4.1
          },
          {
            name: "VW - Belgium Waffles",
            description: "Kosher-certified Belgian waffles served with maple syrup.",
            dietaryInfo: ["Vegetarian", "Halal", "Kosher"],
            rating: 4.6,
            isSpecial: true
          }
        ]
      }
    ]
  },
  vegetarian: {
    title: "Vegetarian Recommendations",
    description: "Top meat-free options available today across our dining halls.",
    color: "#2ecc71",
    icon: "🥗",
    dietaryCode: "VGTN",
    recommendations: [
      {
        diningHall: "Sharpe Refectory",
        meals: [
          {
            name: "Eggplant Parmesan",
            description: "Breaded eggplant slices topped with marinara sauce and melted cheese.",
            dietaryInfo: ["Vegetarian", "Contains Dairy"],
            rating: 4.6,
            isSpecial: true
          },
          {
            name: "Broccoli Alfredo",
            description: "Tender broccoli florets in a creamy alfredo sauce.",
            dietaryInfo: ["Vegetarian", "Contains Dairy"],
            rating: 4.4
          },
          {
            name: "Oreo Cream Cheese Red Velvet Cupcake",
            description: "Decadent red velvet cupcakes with oreo cream cheese frosting.",
            dietaryInfo: ["Vegetarian", "Contains Dairy"],
            rating: 4.8,
            isSpecial: true
          }
        ]
      },
      {
        diningHall: "Blue Room",
        meals: [
          {
            name: "Blue Room Muffins",
            description: "Freshly baked vegetarian muffins in various flavors.",
            dietaryInfo: ["Vegetarian"],
            rating: 4.5
          },
          {
            name: "Egg and Cheese Sandwich",
            description: "Classic breakfast sandwich with farm fresh eggs and cheese.",
            dietaryInfo: ["Vegetarian"],
            rating: 4.3
          }
        ]
      },
      {
        diningHall: "Andrews",
        meals: [
          {
            name: "Cheese Pizza",
            description: "Handmade pizza with mozzarella cheese and tomato sauce.",
            dietaryInfo: ["Vegetarian"],
            rating: 4.4
          },
          {
            name: "Andrew's Deli Cheeses",
            description: "Selection of premium vegetarian cheeses for sandwiches.",
            dietaryInfo: ["Vegetarian"],
            rating: 4.5
          }
        ]
      }
    ]
  },
  vegan: {
    title: "Vegan Recommendations",
    description: "100% plant-based options available today with no animal products.",
    color: "#27ae60",
    icon: "🌱",
    dietaryCode: "VGN",
    recommendations: [
      {
        diningHall: "Sharpe Refectory",
        meals: [
          {
            name: "Vegan Creole Jambalaya",
            description: "Plant-based jambalaya with rice, vegetables, and cajun spices.",
            dietaryInfo: ["Vegan", "Halal"],
            rating: 4.5,
            isSpecial: true
          },
          {
            name: "Vegan Black Bean Burger",
            description: "Hearty black bean patty with lettuce, tomato, and vegan sauce.",
            dietaryInfo: ["Vegan"],
            rating: 4.3
          },
          {
            name: "Vegan Caribbean Rum Cake",
            description: "Dairy-free rum cake with tropical flavors.",
            dietaryInfo: ["Vegan"],
            rating: 4.2
          }
        ]
      },
      {
        diningHall: "Andrews",
        meals: [
          {
            name: "Vegan Pizza",
            description: "Plant-based pizza with vegan cheese and fresh vegetables.",
            dietaryInfo: ["Vegan"],
            rating: 4.1
          },
          {
            name: "Vegan Sugar Cookie",
            description: "Sweet dairy-free sugar cookie.",
            dietaryInfo: ["Vegan"],
            rating: 4.0
          },
          {
            name: "Gochujang Tofu",
            description: "Spicy Korean-style tofu with gochujang sauce.",
            dietaryInfo: ["Vegan"],
            rating: 4.7,
            isSpecial: true
          }
        ]
      },
      {
        diningHall: "Ivy Room",
        meals: [
          {
            name: "IVY - House Salad",
            description: "Fresh salad with mixed greens and seasonal vegetables.",
            dietaryInfo: ["Vegan"],
            rating: 4.0
          },
          {
            name: "Ivy- Vegan Nashville Hot Chicken Sandwich",
            description: "Spicy plant-based chicken alternative sandwich.",
            dietaryInfo: ["Vegan", "Spicy"],
            rating: 4.6,
            isSpecial: true
          }
        ]
      },
      {
        diningHall: "Verney-Woolley",
        meals: [
          {
            name: "Basic Tofu Scramble",
            description: "Seasoned tofu scramble, a perfect protein-rich breakfast option.",
            dietaryInfo: ["Vegan"],
            rating: 4.0
          },
          {
            name: "Vegan Cappuccino Muffin",
            description: "Coffee-flavored vegan muffin.",
            dietaryInfo: ["Vegan"],
            rating: 4.3
          }
        ]
      }
    ]
  },
  pescetarian: {
    title: "Pescetarian Recommendations",
    description: "Vegetarian options with seafood available today across campus.",
    color: "#1abc9c",
    icon: "🐟",
    dietaryCode: "",
    recommendations: [
      {
        diningHall: "Andrews",
        meals: [
          {
            name: "Tuna Salad (Andrews)",
            description: "Fresh tuna salad with mayo, celery, and herbs.",
            dietaryInfo: ["Pescetarian"],
            rating: 4.2
          },
          {
            name: "Andrews Roman Sandwich- Caprese",
            description: "Fresh mozzarella, tomato, and basil on ciabatta bread.",
            dietaryInfo: ["Vegetarian"],
            rating: 4.4
          }
        ]
      },
      {
        diningHall: "Sharpe Refectory",
        meals: [
          {
            name: "Eggplant Parmesan",
            description: "Breaded eggplant slices with marinara sauce and cheese.",
            dietaryInfo: ["Vegetarian"],
            rating: 4.3
          },
          {
            name: "Steamed Broccoli Florets",
            description: "Perfectly steamed broccoli, great with any seafood dish.",
            dietaryInfo: ["Vegan", "Halal"],
            rating: 3.9
          }
        ]
      },
      {
        diningHall: "Blue Room",
        meals: [
          {
            name: "Egg and Cheese Sandwich",
            description: "Breakfast sandwich with eggs and cheese on an english muffin.",
            dietaryInfo: ["Vegetarian"],
            rating: 4.1
          },
          {
            name: "Yogurt Bowl",
            description: "Greek yogurt with choice of toppings.",
            dietaryInfo: ["Vegetarian"],
            rating: 4.2
          }
        ]
      }
    ]
  },
  paleo: {
    title: "Paleo Recommendations",
    description: "Whole food options focusing on meat, fish, vegetables, and nuts available today.",
    color: "#e67e22",
    icon: "🥩",
    dietaryCode: "",
    recommendations: [
      {
        diningHall: "Sharpe Refectory",
        meals: [
          {
            name: "Grilled Chicken",
            description: "Simply seasoned grilled chicken breast.",
            dietaryInfo: ["Halal", "Paleo-friendly"],
            rating: 4.3,
            isSpecial: true
          },
          {
            name: "Steamed Broccoli Florets",
            description: "Plain steamed broccoli, perfect for paleo diets.",
            dietaryInfo: ["Vegan", "Halal", "Paleo-friendly"],
            rating: 3.8
          }
        ]
      },
      {
        diningHall: "Andrews",
        meals: [
          {
            name: "Andrew's Deli Meats",
            description: "Selection of unprocessed deli meats.",
            dietaryInfo: ["Paleo-friendly"],
            rating: 4.4
          },
          {
            name: "Chicken Salad (Retail)",
            description: "Chicken salad with minimal additives.",
            dietaryInfo: ["Halal", "Paleo-friendly"],
            rating: 4.1
          }
        ]
      },
      {
        diningHall: "Verney-Woolley",
        meals: [
          {
            name: "Breakfast Chicken Four Pepper Sausage",
            description: "Spiced chicken sausage with bell peppers.",
            dietaryInfo: ["Paleo-friendly"],
            rating: 4.2
          },
          {
            name: "Eggs Hard Boiled",
            description: "Simple hard-boiled eggs, perfect protein source.",
            dietaryInfo: ["Vegetarian", "Paleo-friendly"],
            rating: 3.7
          }
        ]
      }
    ]
  },
  gluten_free: {
    title: "Gluten-Free Recommendations",
    description: "Options free from wheat, barley, rye, and other gluten sources available today.",
    color: "#f1c40f",
    icon: "🌾",
    dietaryCode: "",
    recommendations: [
      {
        diningHall: "Sharpe Refectory",
        meals: [
          {
            name: "Marsala Sweet Potato Saute With Chives",
            description: "Gluten-free sweet potato dish with marsala sauce.",
            dietaryInfo: ["Vegetarian", "Gluten-Free"],
            rating: 4.3
          },
          {
            name: "Grilled Chicken",
            description: "Plain grilled chicken breast, no breading or gluten-containing sauces.",
            dietaryInfo: ["Halal", "Gluten-Free"],
            rating: 4.1
          },
          {
            name: "Peas and Carrots",
            description: "Simple vegetable side dish, naturally gluten-free.",
            dietaryInfo: ["Vegan", "Halal", "Gluten-Free"],
            rating: 3.7
          }
        ]
      },
      {
        diningHall: "Andrews",
        meals: [
          {
            name: "Tuna Salad (Andrews)",
            description: "Gluten-free tuna salad, best enjoyed without bread.",
            dietaryInfo: ["Gluten-Free"],
            rating: 4.0
          },
          {
            name: "Hummus",
            description: "Chickpea spread that's naturally gluten-free.",
            dietaryInfo: ["Vegan", "Halal", "Gluten-Free"],
            rating: 4.4,
            isSpecial: true
          }
        ]
      },
      {
        diningHall: "Verney-Woolley",
        meals: [
          {
            name: "Steel Cut Oats",
            description: "Certified gluten-free steel cut oats.",
            dietaryInfo: ["Vegan", "Halal", "Gluten-Free"],
            rating: 4.2
          },
          {
            name: "Eggs Hard Boiled",
            description: "Naturally gluten-free protein source.",
            dietaryInfo: ["Vegetarian", "Gluten-Free"],
            rating: 3.9
          }
        ]
      }
    ]
  },
  carnivore: {
    title: "Carnivore Recommendations",
    description: "Protein-rich meat options available today across our dining halls.",
    color: "#d35400",
    icon: "🥓",
    dietaryCode: "",
    recommendations: [
      {
        diningHall: "Sharpe Refectory",
        meals: [
          {
            name: "Grilled Chicken",
            description: "Perfectly grilled chicken breast.",
            dietaryInfo: ["Halal", "High Protein"],
            rating: 4.2
          },
          {
            name: "Cajun Pasta with Chicken AAK",
            description: "Spicy pasta dish with grilled chicken pieces.",
            dietaryInfo: ["Halal", "Contains Allergens"],
            rating: 4.5,
            isSpecial: true
          }
        ]
      },
      {
        diningHall: "Andrews",
        meals: [
          {
            name: "Andrew's Deli Meats",
            description: "Selection of premium deli meats.",
            dietaryInfo: ["High Protein"],
            rating: 4.6,
            isSpecial: true
          },
          {
            name: "Chicken Parm Pizza",
            description: "Pizza topped with breaded chicken and parmesan.",
            dietaryInfo: ["High Protein"],
            rating: 4.4
          },
          {
            name: "Buffalo Chicken Salad (Retail)",
            description: "Spicy buffalo chicken over fresh greens.",
            dietaryInfo: ["Halal", "High Protein"],
            rating: 4.3
          }
        ]
      },
      {
        diningHall: "Josiahs",
        meals: [
          {
            name: "Jo's Spicy Chicken",
            description: "Spicy chicken tenders with signature sauce.",
            dietaryInfo: ["Spicy"],
            rating: 4.7,
            isSpecial: true
          },
          {
            name: "Jo's Homestyle Chicken",
            description: "Comfort-style fried chicken.",
            dietaryInfo: ["Contains Gluten"],
            rating: 4.5
          },
          {
            name: "Jo's 50 Cut Burger",
            description: "Premium beef burger patty.",
            dietaryInfo: ["High Protein"],
            rating: 4.4
          }
        ]
      },
      {
        diningHall: "Ivy Room",
        meals: [
          {
            name: "Ivy- Double Burger",
            description: "Double beef patty burger with toppings.",
            dietaryInfo: ["High Protein"],
            rating: 4.3
          },
          {
            name: "IVY - Chicken Caesar Wrap",
            description: "Grilled chicken with caesar dressing in a wrap.",
            dietaryInfo: ["High Protein"],
            rating: 4.2
          }
        ]
      }
    ]
  },
  halal: {
    title: "Halal Recommendations",
    description: "Options prepared according to Islamic dietary guidelines available today.",
    color: "#9b59b6",
    icon: "☪️",
    dietaryCode: "HL",
    recommendations: [
      {
        diningHall: "Sharpe Refectory",
        meals: [
          {
            name: "Halal Cauliflower Rice & Chicken Tinga Bowl",
            description: "Certified halal chicken with flavorful cauliflower rice.",
            dietaryInfo: ["Halal"],
            rating: 4.7,
            isSpecial: true
          },
          {
            name: "Baked Ziti",
            description: "Pasta baked with halal-certified cheese and sauce.",
            dietaryInfo: ["Vegetarian", "Halal"],
            rating: 4.3
          },
          {
            name: "Cajun Pasta with Chicken AAK",
            description: "Spicy halal chicken pasta dish.",
            dietaryInfo: ["Halal", "Contains Allergens"],
            rating: 4.5
          }
        ]
      },
      {
        diningHall: "Andrews",
        meals: [
          {
            name: "Grandma Pizza",
            description: "Traditional pizza with halal-certified cheese.",
            dietaryInfo: ["Vegetarian", "Halal"],
            rating: 4.2
          },
          {
            name: "Hummus",
            description: "Traditional chickpea spread, naturally halal.",
            dietaryInfo: ["Vegan", "Halal"],
            rating: 4.5,
            isSpecial: true
          }
        ]
      },
      {
        diningHall: "Verney-Woolley",
        meals: [
          {
            name: "Veggie Sausage Patty",
            description: "Plant-based sausage patty, halal certified.",
            dietaryInfo: ["Vegan", "Halal"],
            rating: 4.0
          },
          {
            name: "Steel Cut Oats",
            description: "Simple oatmeal dish, naturally halal.",
            dietaryInfo: ["Vegan", "Halal"],
            rating: 3.9
          },
          {
            name: "VW - Belgium Waffles",
            description: "Halal-certified Belgian waffles.",
            dietaryInfo: ["Vegetarian", "Halal"],
            rating: 4.6
          }
        ]
      },
      {
        diningHall: "Ivy Room",
        meals: [
          {
            name: "Ivy- Hummus Cups w/ Pretzels",
            description: "Pre-packaged hummus with pretzel dippers.",
            dietaryInfo: ["Vegan", "Halal"],
            rating: 4.1
          },
          {
            name: "Ivy- Assorted Fruit cup",
            description: "Fresh fruit selection, naturally halal.",
            dietaryInfo: ["Vegan", "Halal"],
            rating: 4.3
          }
        ]
      }
    ]
  }
};

const DietaryRecommendationsPage: React.FC = () => {
  const { dietType } = useParams<{ dietType: string }>();
  const [activeTab, setActiveTab] = useState<'today' | 'popular' | 'explore'>('today');
  
  // Default to kosher if no diet type is specified or if invalid
  const dietData = dietType && DIETARY_DATA.dataType ? DIETARY_DATA.dataType : DIETARY_DATA.carnivore;
  
  return (
    <div className="recommendations-page" style={{ "--accent-color": dietData.color } as React.CSSProperties}>
      <NavigationBar />
      
      <div className="hero-banner">
        <div className="hero-content">
          <div className="diet-icon">{dietData.icon}</div>
          <h1>{dietData.title}</h1>
          <p>{dietData.description}</p>
        </div>
      </div>
      
      <div className="page-content">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => setActiveTab('today')}
          >
            Today's Picks
          </button>
          <button 
            className={`tab-button ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => setActiveTab('popular')}
          >
            Most Popular
          </button>
          <button 
            className={`tab-button ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore New
          </button>
        </div>
        
        <div className="recommendations-grid">
          {dietData.recommendations.map((diningHallRec, index) => (
            <div className="dining-hall-card" key={index}>
              <div className="dining-hall-header">
                <h3>{diningHallRec.diningHall}</h3>
                <span className="location-icon">📍</span>
              </div>
              
              <div className="meals-list">
                {diningHallRec.meals.map((meal, mealIndex) => (
                  <div className={`meal-item ${meal.isSpecial ? 'special' : ''}`} key={mealIndex}>
                    {meal.isSpecial && <div className="special-badge">Chef's Pick</div>}
                    <div className="meal-details">
                      <h4>{meal.name}</h4>
                      <p>{meal.description}</p>
                      <div className="meal-meta">
                        <div className="dietary-tags">
                          {meal.dietaryInfo.map((tag, tagIndex) => (
                            <span className="dietary-tag" key={tagIndex}>{tag}</span>
                          ))}
                        </div>
                        {meal.rating && (
                          <div className="rating">
                            <span className="stars">{'★'.repeat(Math.floor(meal.rating))}</span>
                            <span className="stars-empty">{'☆'.repeat(5 - Math.floor(meal.rating))}</span>
                            <span className="rating-value">{meal.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="nutrition-info-section">
          <h3>Nutrition Information</h3>
          <p>Complete nutrition information for all menu items is available at each dining hall or by scanning the QR code displayed with each item.</p>
          <p>For detailed allergen information, please use the "Filter by diet or allergen" option in our dining hall menus.</p>
        </div>
        
        <div className="user-feedback">
          <h3>How was your meal?</h3>
          <p>Your feedback helps us improve our dining options. Please rate your meals through the Brown Dining Services app.</p>
          <button className="feedback-button">Leave Feedback</button>
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2025 Brown University Dining Services</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DietaryRecommendationsPage;