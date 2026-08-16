# Práctica Final: Diseño e Implementación de Pipeline DevOps

Este repositorio contiene la implementación completa de una aplicación web con arquitectura CRUD integrada con un pipeline de Integración Continua y Despliegue Continuo (CI/CD), contenedores Docker, pruebas automatizadas y monitoreo básico.

---

## Arquitectura del Proyecto

```text
devops-proyecto-final/
├── .github/workflows/
│   └── deploy.yml          # Pipeline CI/CD con GitHub Actions
├── docs/                   # Documentación adicional
├── src/
│   ├── public/
│   │   └── index.html      # Frontend interactivo (CRUD + Monitor)
│   ├── server.js           # Backend (Node.js / Express REST API)
│   ├── database.js         # Configuración y conexión a SQLite
│   └── database.sqlite     # Archivo local de base de datos
├── tests/
│   ├── unit.test.js        # Pruebas Unitarias
│   └── integration.test.js # Pruebas de Integración (Suite CRUD & Health)
├── .eslintrc.json          # Configuración de análisis estático
├── .gitignore              # Reglas de exclusión para Git
├── Dockerfile              # Empaquetado y contenedorización
├── package.json            # Scripts y dependencias del proyecto
└── README.md               # Documentación general

Tecnologías Utilizadas

    Control de Versiones: Git / GitHub

    Backend: Node.js, Express.js (REST API con soporte CRUD completo)

    Base de Datos: SQLite (sqlite3)

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

    Ejecutar análisis estático (Linter):
    Bash

    npm run lint

    Ejecutar pruebas automatizadas:
    Bash

    npm test

    Iniciar el servidor local:
    Bash

    npm start

    Accede a la interfaz web en: http://localhost:3000

 Ejecución con Docker

    Construir la imagen de Docker:
    Bash

    docker build -t devops-app .

    Ejecutar el contenedor:
    Bash

    docker run -d -p 3000:3000 --name devops-container devops-app

 Pipeline CI/CD (GitHub Actions)

El flujo de trabajo se encuentra configurado en .github/workflows/deploy.yml y se dispara automáticamente ante eventos de push o pull_request sobre la rama principal (main/master). Ejecuta las siguientes etapas:

    Checkout: Descarga el código fuente del repositorio.

    Setup Node.js: Configura el entorno de ejecución Node.js v20 con caché de paquetes.

    Install: Instala las dependencias limpias del proyecto (npm ci).

    Lint: Evalúa el estándar y calidad del código mediante análisis estático (npm run lint).

    Automated Testing: Ejecuta las pruebas unitarias y de integración end-to-end (npm test).

    Docker Build: Valida la construcción correcta de la imagen Docker de producción.

 Monitoreo y Salud de la Aplicación

    Endpoint de Salud (/health): Retorna el estado operativo del servicio y la marca de tiempo actual ({ "status": "UP", "timestamp": "..." }).

    Logs Centralizados: Middleware HTTP configurado en Express para registrar en consola la fecha en formato ISO, método y ruta de cada solicitud entrante.