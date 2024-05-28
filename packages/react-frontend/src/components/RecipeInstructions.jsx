import "../styles/Recipe.css";

function RecipeInstructions(props) {
    console.log(props);
    return (
        <div className="recipe-section">
            <h2>Instructions</h2>
            <table className="recipe-instructions-table">
                <tbody>
                    {props.instructions.map((row, index) => (
                        <tr key={index}>
                            <td className="recipe-pair-index">{index + 1}.</td>
                            <td className="recipe-pair-instruction">{row}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecipeInstructions;
