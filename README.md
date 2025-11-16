🏢 Coworking App — Despliegue Full Stack con Docker

🌐 Tecnologías utilizadas

| Capa                | Tecnología                          |
| ------------------- | ----------------------------------- |
| **Frontend**        | Next.js · React · Styled Components |
| **Backend**         | Java 17 · Spring Boot · Maven       |
| **Base de Datos**   | MySQL 8                             |
| **Infraestructura** | Docker · Docker Compose             |

📦 Estructura del proyecto

coworking-app/
│
├── backend/               # Proyecto Java Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/              # Proyecto Next.js
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml     # Orquesta todos los contenedores
└── README.md

🚀 Despliegue local con Docker Compose

1️⃣ Requisitos previos

Asegurate de tener instalados:

Docker Desktop

Docker Compose

2️⃣ Clonar el repositorio

git clone https://github.com/tu-usuario/coworking-app.git
cd coworking-app

3️⃣ Levantar los servicios

docker-compose up --build

🪄 Este comando va a:

Crear y levantar MySQL, Backend (Spring Boot) y Frontend (Next.js).

Ejecutar automáticamente el backend en el puerto 8080 y el frontend en el 3000.

4️⃣ Verificar que todo esté funcionando

| Servicio          | URL                                                    |    Descripción                                      |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------ |
| **Frontend**      | [http://localhost:3000](http://localhost:3000)         | Aplicación web                                   |
| **Backend API**   | [http://localhost:8080/api](http://localhost:8080/api) | Endpoints del backend                            |
| **Base de datos** | `localhost:3306`                                       | Acceso MySQL (usuario: `user`, pass: `password`) |

⚙️ Configuración de contenedores

🧱 docker-compose.yml

version: "3.9"
services:
  mysql:
    image: mysql:8.0
    container_name: coworking_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: coworking
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  backend:
    build: ./backend
    container_name: coworking_backend
    restart: always
    depends_on:
      - mysql
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/coworking
      SPRING_DATASOURCE_USERNAME: user
      SPRING_DATASOURCE_PASSWORD: password
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    container_name: coworking_frontend
    restart: always
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8080/api
    ports:
      - "3000:3000"

volumes:
  db_data:


🧰 Comandos útiles

| Acción                          | Comando                     |
| ------------------------------- | --------------------------- |
| **Iniciar todo**                | `docker-compose up`         |
| **Reconstruir imágenes**        | `docker-compose up --build` |
| **Ejecutar en segundo plano**   | `docker-compose up -d`      |
| **Detener todo**                | `docker-compose down`       |
| **Eliminar datos persistentes** | `docker-compose down -v`    |
| **Ver logs**                    | `docker-compose logs -f`    |
| **Ver contenedores activos**    | `docker ps`                 |

🗃️ Configuración de entorno (opcional)

Si querés manejar las variables sin editar el docker-compose.yml,
podés crear un archivo .env en la raíz del proyecto:

MYSQL_DATABASE=coworking
MYSQL_USER=user
MYSQL_PASSWORD=password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
NEXT_PUBLIC_API_URL=http://localhost:8080/api


⚙️ DOCKERFILE — Backend
backend/Dockerfile

# Etapa 1: build
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: runtime
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

⚙️ DOCKERFILE — Frontend
frontend/Dockerfile

# Etapa 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]

☁️ Despliegue en servidor (AWS EC2, VPS, etc.)

Clonar el proyecto en el servidor:

git clone https://github.com/tu-usuario/coworking-app.git
cd coworking-app

Instalar Docker y Docker Compose:

sudo apt update
sudo apt install docker.io docker-compose -y

Levantar los servicios:

sudo docker-compose up -d --build

Verificar:

Backend: http://<IP_SERVIDOR>:8080

Frontend: http://<IP_SERVIDOR>:3000

Limpieza y mantenimiento

Para limpiar imágenes y volúmenes no usados:

docker system prune -a

⚠️ Esto borra todas las imágenes no utilizadas.
Usalo solo si sabés que no hay otros contenedores importantes.

Frontend: Juan Manuel Herrero
Backend & Base de Datos: Emiliano Nakayama
Stack: React · Next.js · Spring Boot · MySQL · Docker