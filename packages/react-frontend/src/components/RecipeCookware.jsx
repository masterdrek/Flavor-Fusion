// RecipeCookware.js
import "../styles/Recipe.css";

function RecipeCookware(props) {
    return (
        <div className="recipe-section">
            <h2>Cookware Needed</h2>
            <ul className="recipe-cookware-list">
                {props.cookware &&
                    props.cookware.map((row, index) => (
                        <li key={index} className="recipe-pair-item">
                            {row.name} ({row.quantity})
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default RecipeCookware;
