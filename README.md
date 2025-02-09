# HabitosApp

## Descripción
HabitosApp es una aplicación diseñada para ayudarte a gestionar y seguir tus hábitos diarios. Este proyecto está compuesto por un backend y un frontend, y utiliza Docker para facilitar su despliegue y ejecución.

## Requisitos Previos
- **Docker**: Asegúrate de tener Docker instalado en tu sistema. Puedes descargarlo desde [aquí](https://www.docker.com/get-started).

## Instalación y Ejecución

### 1. Clonar el Repositorio
Primero, clona el repositorio en tu máquina local

### 2. Iniciar los Contenedores de Docker
Navega a la raíz del proyecto y ejecuta el siguiente comando para levantar los contenedores de Docker:

```
docker-compose up
```

### 3. Ejecutar el Backend
Una vez que los contenedores estén en funcionamiento, navega a la carpeta del backend y ejecuta el servidor en modo de desarrollo:

```
cd backend
npm run dev
```

### 4. API

Hay un .json en la carpeta de backend con ejemplos de como deben ser las peticiones del Auth es una coleccion de thunderclient thunder-collection_auth.json la importan en el cliente de thunderclient para usarla

