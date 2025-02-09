import app from "./app.js";

const startServer = async () => {
    try {
        const port = process.env.PORT || 8080;
        /*
        const newNosql = await ExtendGame.create({
            description: "Juego de prueba",
            teams: {
                min: 1,
                max: 2
            },
            fundamentalConcepts: ["Concepto 1", "Concepto 2"],
            purposes: ["Proposito 1", "Proposito 2"],
            instructionalObjectives: ["Objetivo 1", "Objetivo 2"],
            materials: ["Material 1","Material 2"],
            rules: ["Regla 1", "Regla 2"],
            winnerCriteria: "Criterio del ganador",
            gender: "JAJAJA",
        })

        await Game.create({
            name: "Juego de prueba",
            time: 11,
            level: "Facil",
            userId: "57e4aa5a-61a3-44fa-b2a9-e1b3f65b8b14",
            documentId: newNosql.id
        })
    */

        app.listen(port, () => {
            console.log(`Servidor encendido! Escuchando en el puerto: ${port}`);
        });
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        process.exit(1);
    }
};

startServer();