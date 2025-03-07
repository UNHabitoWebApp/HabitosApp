export async function cleanQueue(queue) {
    await queue.drain(); // Limpia los jobs pendientes
    await queue.clean(0, "completed");  // Limpia los completados
    await queue.clean(0, "failed");     // Limpia los fallidos
    await queue.clean(0, "delayed");    // Limpia los retrasados
    await queue.obliterate({ force: true }); // Borra todo si es necesario
    console.log("Cola limpiada:", queue.name);
}