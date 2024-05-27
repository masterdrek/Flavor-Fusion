import "../styles/Recipe.css";

function RecipeIngredients(props) {
    console.log(props);

    return (
        <div className="recipe-section">
            <h2>Cookware Needed</h2>
            <table className="recipe-cookware-table">
                <tbody>
                    {props.cookware.map((row, index) => (
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
