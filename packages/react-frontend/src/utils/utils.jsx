import { jwtDecode } from "jwt-decode";

// Function to get the username from the token
export const getUsernameFromToken = () => {
    const token = sessionStorage.getItem("token");
    return token ? jwtDecode(token)?.username : "Guest_User";
};
