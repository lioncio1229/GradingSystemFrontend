import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface JwtPayloadExtended extends JwtPayload {
    userData: string,
    role: string[] | string,
}

interface UserData {
    id: string,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    roles: string[],
}

export default function useUserInfo() : UserData {
    const [user, setUser] = useState<UserData>({
        id: "",
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
                setUser({...userData, roles: typeof decoded.role === "string" ? [decoded.role] : decoded.role});
            }
        }
        catch(e) {
            console.error(e);
        }

    }, []);

    return user;
}