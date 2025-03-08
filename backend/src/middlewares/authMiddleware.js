import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";

/**
 * Middleware para verificar el JWT y agregar la información del usuario a la request.
 */
export const authenticateUser = (request, response, next) => {
    const token = request.header("Authorization")?.split(" ")[1];

    if (!token) {
        return response.status(401).json({ message: "Acceso no autorizado: Token no encontrado" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        request.user_id = decoded.id;
        next();
    } catch (error) {
        return response.status(401).json({ message: "Acceso no autorizado: Token inválido", error: error.message });
    }
};