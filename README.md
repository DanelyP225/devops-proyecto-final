# Práctica Final: Diseño e Implementación de Pipeline DevOps

Este repositorio contiene la implementación completa de una aplicación web integrada con un pipeline de Integración Continua (CI/CD), contenedores Docker, pruebas automatizadas y monitoreo básico.

---

## Arquitectura del Proyecto

```text
devops-proyecto-final/
├── .github/workflows/
│   └── deploy.yml        # Pipeline CI/CD con GitHub Actions
├── src/
│   ├── public/
│   │   └── index.html    # Frontend
│   ├── server.js         # Backend (Node.js/Express)
│   └── database.js       # Base de Datos (SQLite)
├── tests/
│   ├── unit.test.js      # Pruebas Unitarias
│   └── integration.test.js # Pruebas de Integración
├── Dockerfile            # Configuración del contenedor
├── .eslintrc.json        # Linter para análisis estático
└── package.json          # Dependencias y scripts


Tecnologías Utilizadas

    Control de Versiones: Git / GitHub

    Backend: Node.js, Express

    Base de Datos: SQLite

    Testing: Jest, Supertest

    Análisis Estático: ESLint

    Contenedores: Docker

    CI/CD: GitHub Actions



    Guía de Instalación y Ejecución Local

    Clonar el repositorio:
    Bash

    git clone [https://github.com/DanelyP225/devops-proyecto-final.git](https://github.com/DanelyP225/devops-proyecto-final.git)
    cd devops-proyecto-final

    Instalar dependencias:
    Bash

    npm install

    Ejecutar pruebas automatizadas:
    Bash

    npm test

    Iniciar el servidor local:
    Bash

    npm start

    Accede a la aplicación en http://localhost:3000.



    Ejecución con Docker

    Construir la imagen de Docker:
    Bash

    docker build -t devops-app .

    Ejecutar el contenedor:
    Bash

    docker run -p 3000:3000 devops-app


Pipeline CI/CD (GitHub Actions)

El pipeline de CI/CD se activa automáticamente en cada push o pull_request a las ramas main o master. Realiza los siguientes pasos:

    Checkout: Clona el código fuente.

    Setup: Configura el entorno de Node.js v20.

    Install: Instala las dependencias necesarias de forma limpia (npm ci).

    Lint: Realiza un análisis estático del código (npm run lint).

    Test: Ejecuta el suite de pruebas unitarias y de integración (npm test).

    Docker Build: Construye y verifica la imagen de Docker.

Monitoreo y Salud de la Aplicación

    Endpoint de Salud (/health): Permite verificar que el servicio está activo retornando { "status": "UP" }.

    Logs Centralizados: Registrar marcas de tiempo ISO y método/ruta de cada petición HTTP en la salida estándar de la consola.