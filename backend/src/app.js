import cors from "cors";
import morgan from "morgan";
import express from "express";
import { waos } from "./middlewares/index.js";

const app = express();

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
	waos();
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});