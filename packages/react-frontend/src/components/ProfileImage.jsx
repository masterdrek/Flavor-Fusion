import React, { useState, useEffect } from "react";
import "../styles/ProfileImage.css";

const ProfileImage = ({ name }) => {
    const [bgColor, setBgColor] = useState("#6200ea");
    const nameParts = name.split(" ");
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";

    // Set a new random color on component mount
    useEffect(() => {
        const newColor = getRandomColor();
        setBgColor(newColor);
    }, []);

    // Function to generate a random color
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <span className="user-profile-image" style={{ background: bgColor }}>
            {firstNameInitial}
        </span>
    );
};
export default ProfileImage;
