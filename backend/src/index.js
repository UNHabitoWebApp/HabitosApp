import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors({ 
	origin: true, 
	credentials: true, 
	allowedHeaders: "Content-Type, Authorization", 
	allowOrigin: "http://localhost:3000",
})); 

app.use(express.json());
app.use(morgan("dev"));

// Ruta de prueba
app.get("/", (req, res) => {
	res.json({ message: "Servidor con ESM funcionando 🚀" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});