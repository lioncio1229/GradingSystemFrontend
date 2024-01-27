import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface JwtPayloadExtended extends JwtPayload {
    userData: string,
    role: string[],
}

interface UserData {
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    roles: string[],
}

export default function useUserInfo() : UserData {
    const [user, setUser] = useState<UserData>({
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        roles: [],
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded : JwtPayloadExtended = jwtDecode(token);

            if(decoded.userData) {
                const userData : UserData = JSON.parse(decoded.userData);
                setUser({...userData, roles: decoded.role});
            }
        }
        catch(e) {
            console.error(e);
        }

    }, []);

    return user;
}