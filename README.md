# HabitosApp

**HábitosApp** es una aplicación diseñada para motivar a las personas a adoptar hábitos saludables y fortalecer su compromiso con sus objetivos. Nuestro sistema permite a los usuarios configurar rutinas de ejercicio y hábitos personalizados, brindándoles seguimiento y recordatorios adaptados a sus preferencias. Así, podrán visualizar sus avances, mantenerse motivados y construir una vida más equilibrada.

# Backend con Node.js y Express

Este backend está desarrollado con Node.js y Express, utilizando una arquitectura organizada en capas: **Model-Controller-Service**. Este enfoque busca facilitar el mantenimiento, la escalabilidad y la separación de responsabilidades en el código.

Para esto usaremos librerias como: 
-

## Estructura del backend proyecto
```plaintext
src/
├── controllers/
│   └── userController.ts
├── services/
│   └── userService.ts
├── models/
│   └── userModel.ts
├── repositories/
│   └── userRepository.ts
├── routes/
│   └── userRoutes.ts
├── middlewares/
│   └── authMiddleware.ts
├── utils/
│   └── logger.ts
├── config/
│   └── dbConfig.ts
├── server.ts
└── app.ts
```
---

### **1. middlewares/**

La carpeta `middlewares` ahora agrupa no solo los middlewares tradicionales (como la autenticación), sino también los controladores y validadores. Esto se hace para mantener juntos los elementos que manejan solicitudes HTTP y validan datos antes de que lleguen a la lógica de negocio.

- **`controllers/userController.ts`**:  
  Maneja las solicitudes HTTP relacionadas con los usuarios, como obtener un usuario por ID o crear uno nuevo. Llama a los servicios para ejecutar la lógica de negocio.

- **`validators/userValidator.ts`**:  
  Contiene las reglas de validación para asegurarse de que los datos proporcionados en las solicitudes HTTP cumplan con los requisitos necesarios antes de ser procesados.  
  Ejemplo: Validar que el campo `email` tenga un formato válido al crear un usuario.

- **`authMiddleware.ts`**:  
  Middleware para la autenticación y autorización. Verifica que el usuario esté autenticado y tenga los permisos adecuados antes de acceder a ciertas rutas.

---

### **2. services/**

- **`userService.ts`**:  
  Contiene la lógica de negocio principal. Procesa las operaciones relacionadas con los modelos, como obtener, actualizar o eliminar datos. Se asegura de aplicar reglas de negocio antes de interactuar directamente con los modelos.

---

### **3. models/**

- **`userModel.ts`**:  
  Define la estructura de los datos del usuario, incluyendo propiedades y tipos. Si se utiliza un ORM como Sequelize o TypeORM, este archivo también incluye métodos para interactuar con la base de datos.  
  Ejemplo: Atributos como `id`, `nombre`, `email`, y relaciones con otros modelos.

---

### **5. routes/**

- **`userRoutes.ts`**: Define las rutas de la API para los usuarios. Estas rutas se conectan con el controlador correspondiente (`userController.ts`) para manejar las solicitudes HTTP.

---

### **6. utils/**

- **`logger.ts`**: Contiene funciones de utilidad, como un logger para registrar información sobre las solicitudes, errores, y otros eventos de la aplicación.

---

### **7. config/**

- **`dbConfig.ts`**: Contiene la configuración de la base de datos, ya sea utilizando un ORM o una conexión directa, y maneja la conexión a la base de datos en función del entorno de ejecución.

---

### **8. app.ts**

- Archivo principal donde se configura Express, se inicializan los middlewares, las rutas y la base de datos. Aquí también se puede configurar la conexión a otros servicios.

---

### **9. server.ts**

- Archivo de entrada al backend. Desde este punto se inicializa la aplicación y se levanta el servicio.
---