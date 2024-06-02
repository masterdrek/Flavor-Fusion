// RecipeIngredients.js
import "../styles/Recipe.css";

function RecipeIngredients(props) {
    return (
        <div className="recipe-section">
            <h2>Ingredients Needed</h2>
            <ul className="recipe-ingredient-list">
                {props.ingredients.map((row, index) => (
                    <li key={index} className="recipe-pair-item">
                        {row.name} ({row.quantity})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeIngredients;
