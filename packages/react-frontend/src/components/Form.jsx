import React, { useState } from "react";

function Form(props) {
    const [formData, setFormData] = useState(
        props.fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {})
    );

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    function submitForm() {
        props.handleSubmit(formData);
        setFormData(
            props.fields.reduce((acc, field) => {
                acc[field.name] = "";
                return acc;
            }, {})
        );
    }

    return (
        <form>
            {props.fields.map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type="text"
                        name={field.name}
                        id={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default Form;
