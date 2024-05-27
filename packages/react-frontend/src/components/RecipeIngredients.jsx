import "../styles/Recipe.css";

function RecipeIngredients(props) {
    return (
        <div className="recipe-section">
            <h2>Ingredients Needed</h2>
            <table className="recipe-ingredient-table">
                <tbody>
                    {props.ingredients.map((row, index) => (
                        <tr key={index}>
                            <td className="recipe-pair-name">{row.name}</td>
                            <td className="recipe-pair-quantity">
                                ({row.quantity})
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecipeIngredients;
