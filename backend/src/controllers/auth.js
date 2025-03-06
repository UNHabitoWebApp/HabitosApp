import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserService from "../services/userService.js";
import { SECRET_KEY, REFRESH_SECRET_KEY } from "../config/config.js";

/**
 * Función para autenticar un usuario y devolver un JWT en una cookie.
 */
export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Crear el access token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: "7d" }
        );

        // Crear el refresh token
        const refreshToken = jwt.sign(
            { id: user._id, email: user.email },
            REFRESH_SECRET_KEY,
            { expiresIn: "7d" }
        );

        // Almacenar el refresh token en cookies (httpOnly)
        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Actualizar el último login del usuario
        user.lastLogin = new Date();
        await UserService.updateUser(user._id, { lastLogin: user.lastLogin });

        // Enviar el access token en el cuerpo de la respuesta
        return response.status(200).json({ message: "Inicio de sesión exitoso", accessToken: token, user });
    } catch (error) {
        return response.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};


export const register = async (request, response) => {
    try {
        const { email, password, lastName, firstName } = request.body;

        // Verificar si el usuario ya existe
        const existingUser = await UserService.getUserByEmail(email);
        if (existingUser) {
            return response.status(400).json({ message: "El correo ya está registrado" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = {
            email,
            password: hashedPassword,
            lastName,
            firstName,
            createdAt: new Date(),
        };

        const createdUser = await UserService.createUser(newUser);

        // Generar el JWT
        const token = jwt.sign(
            { id: createdUser._id, email: createdUser.email },
            SECRET_KEY,
            { expiresIn: "15m" }
        );

        // Generar el refresh token
        const refreshToken = jwt.sign(
            { id: createdUser._id, email: createdUser.email },
            REFRESH_SECRET_KEY,
            { expiresIn: "7d" }
        );

        // Almacenar el refresh token en las cookies
        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,  // No accesible desde JavaScript
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Actualizar la fecha de último login del usuario
        createdUser.lastLogin = new Date();
        await UserService.updateUser(createdUser._id, { lastLogin: createdUser.lastLogin });

        // Enviar el access token en el cuerpo de la respuesta
        return response.status(201).json({
            message: "Registro exitoso",
            accessToken: token,
            user: createdUser
        });
    } catch (error) {
        return response.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};


export const refreshToken = async (request, response) => {
    try {
        // Obtener el refresh token de las cookies
        console.log(request);
        const refreshToken = request.cookies.refreshToken;

        // Verificar si el refresh token existe
        if (!refreshToken) {
            return response.status(401).json({ message: "No se proporcionó el refresh token." });
        }

        // Verificar y decodificar el refresh token
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

        // Buscar al usuario con el ID del token decodificado
        const user = await UserService.getUserById(decoded.id);
        if (!user) {
            return response.status(401).json({ message: "Usuario no encontrado o el refresh token no es válido." });
        }

        // Generar un nuevo access token
        const newAccessToken = jwt.sign(
            { id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: "15m" }
        );

        // Retornar el nuevo access token
        return response.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return response.status(500).json({ message: "Error al verificar el refresh token", error: error.message });
    }
};
