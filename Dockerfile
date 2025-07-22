# 1. Usar una imagen ligera de Node como base
FROM node:20-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias primero (optimiza la caché de Docker)
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del código del proyecto
COPY . .

# 6. Compilar el proyecto (NestJS usa TypeScript)
RUN npm run build

# 7. Exponer el puerto que usa NestJS (3000 por defecto)
EXPOSE 3000

# 8. Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]
