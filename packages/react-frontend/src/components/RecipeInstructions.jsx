import "../styles/Recipe.css";

function RecipeInstructions(props) {
    return (
        <div className="recipe-section">
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
