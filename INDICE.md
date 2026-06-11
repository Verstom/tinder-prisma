# 📚 Índice de Documentación - Proyecto Tinder

## 🎯 ¿Por dónde empezar?

Bienvenido a la documentación del **Proyecto Tinder API**. Aquí encontrarás todo lo necesario para entender, ejecutar y evaluar este proyecto backend.

---

## 📖 Documentos Disponibles

### 🔴 **GUIA_DOCENTE.md** ⭐ **EMPIEZA AQUÍ**
**Tiempo de lectura:** 10 minutos

Tu puerta de entrada. Contiene:
- ✅ Resumen ejecutivo del proyecto
- ✅ Puntos clave para evaluar
- ✅ Demostración rápida
- ✅ Preguntas sugeridas para estudiante
- ✅ Objetivos educativos alcanzados

👉 **Lee primero GUIA_DOCENTE.md**

---

### 🔵 **DOCUMENTACION.md** (Documentación Principal)
**Tiempo de lectura:** 20-30 minutos

Documentación técnica completa:
- 📋 Descripción general y características
- 🛠️ Tecnologías utilizadas
- 🏗️ Arquitectura del sistema
- 📁 Estructura del proyecto (detallada)
- 🚀 Instalación y configuración
- 📦 Descripción de 6 módulos principales
- 🗄️ Diseño de base de datos
- 🔐 Sistema de autenticación
- 📡 Endpoints principales (ejemplos con curl)
- 🧪 Cómo ejecutar tests

**Secciones principales:**
- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Módulos del Proyecto](#módulos-del-proyecto)
- [Endpoints Principales](#endpoints-principales)

---

### 🟡 **ARQUITECTURA.md** (Diseño Técnico)
**Tiempo de lectura:** 15-20 minutos

Cómo está diseñado internamente:
- 🏗️ Patrones utilizados (DDD, Repository, DTO, Guard)
- 📊 Estructura de capas (Controller → Service → Domain → Infrastructure)
- 🔄 Flujos de datos con diagramas
- 💻 Ejemplos de código (crear servicio, agregar validación, guards)
- 📐 Decisiones de diseño explicadas
- 💡 Tips para mantener la arquitectura

**Para estudiantes que quieren:**
- Entender cómo se comunican las capas
- Ver ejemplos reales de implementación
- Aprender sobre patrones de diseño

---

### 🟣 **CASOS_DE_USO.md** (Flujos de Negocio)
**Tiempo de lectura:** 15-20 minutos

Cómo funciona la aplicación desde el punto de vista del usuario:
- 🎯 Caso de Uso 1: Registro e Login
- 🎯 Caso de Uso 2: Descubrir Perfiles
- 🎯 Caso de Uso 3: Sistema de Interacciones
- 🎯 Caso de Uso 4: Crear Matches
- 🎯 Caso de Uso 5: Mensajería
- 🎯 Caso de Uso 6: Gestión de Suscripciones

Cada caso incluye:
- Descripción del escenario
- Precondiciones
- Pasos detallados
- Endpoints técnicos con JSON
- Ejemplos de requests/responses

**Para estudiantes que quieren:**
- Ver cómo fluyen los datos en la aplicación
- Entender la lógica de negocio
- Ver ejemplos de endpoints reales

---

### 🟢 **SETUP.md** (Instalación Paso a Paso)
**Tiempo de lectura:** 15-20 minutos (primera vez)

Instrucciones detalladas para instalar y ejecutar:
- 📋 Requisitos previos
- 🔧 Pasos de instalación (7 pasos)
- ✅ Checklist de verificación
- 🐛 Troubleshooting (soluciones a errores comunes)
- 📦 Instalación alternativa con Docker
- 🎯 Próximos pasos

**Secciones principales:**
- [Requisitos Previos](#requisitos-previos)
- [Pasos de Instalación](#pasos-de-instalación)
- [Verificación de Instalación](#verificación-de-instalación)
- [Troubleshooting](#troubleshooting)

---

## 🎓 Rutas de Lectura Recomendadas

### Para Docentes (Evaluación Rápida)
```
1. GUIA_DOCENTE.md              (10 min)
   ↓
2. DOCUMENTACION.md (sec 1-3)   (10 min)
   ↓
3. Ver código en src/            (10 min)
   ↓
4. Testear endpoints             (5 min)

Total: 35 minutos
```

### Para Estudiantes (Aprendizaje Completo)
```
1. GUIA_DOCENTE.md              (10 min)
   ↓
2. DOCUMENTACION.md (completo)  (30 min)
   ↓
3. ARQUITECTURA.md              (20 min)
   ↓
4. CASOS_DE_USO.md              (20 min)
   ↓
5. SETUP.md y ejecutar          (20 min)
   ↓
6. Explorar código src/         (60+ min)

Total: 2-3 horas
```

### Para Implementadores (Agregar Features)
```
1. SETUP.md (instalación)       (20 min)
   ↓
2. ARQUITECTURA.md              (20 min)
   ↓
3. Leer módulo específico        (20 min)
   ↓
4. Escribir tests                (20 min)
   ↓
5. Implementar cambio            (60+ min)
```

---

## 🗂️ Estructura de Carpetas

```
tinder/
├── GUIA_DOCENTE.md          ← 👈 COMIENZA AQUÍ
├── DOCUMENTACION.md         ← Docs técnicas
├── ARQUITECTURA.md          ← Patrones y diseño
├── CASOS_DE_USO.md          ← Flujos de negocio
├── SETUP.md                 ← Instalación
├── README.md                ← (Original NestJS)
│
├── src/
│   ├── auth/                ← Módulo de autenticación
│   ├── users/               ← Módulo de usuarios
│   ├── interactions/        ← Likes/dislikes
│   ├── matches/             ← Matches entre usuarios
│   ├── messages/            ← Mensajería
│   ├── subscriptions/       ← Planes premium
│   ├── prisma/              ← ORM global
│   ├── middlewares/         ← Middleware de auth
│   ├── shared/              ← Código compartido
│   └── main.ts              ← Punto de entrada
│
├── prisma/
│   ├── schema.prisma        ← Esquema principal
│   └── migrations/          ← Histórico de cambios BD
│
├── test/                    ← Tests E2E
├── package.json             ← Dependencias
└── tsconfig.json            ← Configuración TypeScript
```

---

## 🎯 Quick Reference - Conceptos Clave

### ¿Qué es NestJS?
Framework Node.js progresivo para construir aplicaciones server-side eficientes y escalables. Similar a Spring Boot para Java, pero con TypeScript.

### ¿Qué es Prisma?
ORM (Object-Relational Mapping) que permite interactuar con la base de datos de forma type-safe sin escribir SQL.

### ¿Qué es JWT?
Token seguro para autenticación. El servidor genera un token que el cliente envía en cada petición. No requiere sesiones en servidor.

### ¿Qué es DDD?
Domain-Driven Design: patrón arquitectónico que organiza el código alrededor del dominio del negocio (usuarios, matches, etc.)

### ¿Qué es un DTO?
Data Transfer Object: clase que valida y transforma los datos que entran/salen de la API.

### ¿Qué es un Guard?
Componente de NestJS que protege rutas. En este caso, verifica que el token JWT sea válido.

### ¿Qué es Dependency Injection?
Patrón donde las dependencias se "inyectan" en lugar de crearse dentro de la clase. Hace el código más flexible y testeable.

---

## 📊 Estadísticas del Proyecto

- **Líneas de código:** ~3000+ LOC
- **Módulos:** 6 principales
- **Tablas BD:** 5 (User, UserInteraction, Match, Message, + Config)
- **Endpoints:** 20+
- **Tecnologías:** 10+ librerías/frameworks
- **Tiempo de desarrollo:** Proyecto académico completo

---

## 🎓 Competencias Demostrables

Este proyecto demuestra competencias en:

| Competencia | Evidencia |
|-------------|-----------|
| **Programación Backend** | Controllers, Services, Repositories |
| **TypeScript/Node.js** | Todo el proyecto está en TypeScript |
| **Bases de Datos** | Diseño relacional, migraciones, ORM |
| **API REST** | Endpoints con validación completa |
| **Autenticación** | JWT con estrategia Passport |
| **Testing** | Tests unitarios y E2E |
| **Arquitectura** | DDD, separación de capas, SOLID |
| **Herramientas** | Git, npm, Docker (opcional) |

---

## 🚀 Demo Rápida (5 minutos)

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env (ver SETUP.md)
# Crear archivo .env con:
# DATABASE_URL="postgresql://..."
# JWT_SECRET="..."

# 3. Ejecutar migraciones
npx prisma migrate dev

# 4. Iniciar servidor
npm run start:dev

# 5. Probar endpoint (en otra terminal)
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123"}'

# ✅ Respuesta esperada: { "access_token": "eyJ..." }
```

---

## 💡 Preguntas Frecuentes

**P: ¿Cuánto tiempo toma instalar?**
R: 5-10 minutos si tienes PostgreSQL instalado. Con Docker, menos tiempo.

**P: ¿Necesito Visual Studio Code?**
R: No es obligatorio, pero es lo recomendado. Funciona en cualquier IDE.

**P: ¿Puedo modificar el proyecto?**
R: Sí, es código educativo. Ver ARQUITECTURA.md para entender cómo agregar features.

**P: ¿Dónde está la UI/Frontend?**
R: Este es solo el backend (API). El frontend sería una aplicación React/Vue/Angular separada.

**P: ¿Está listo para producción?**
R: El código está bien estructurado pero no está optimizado para producción. Faltan: caché, CDN, load balancing, etc.

---

## 📞 Soporte y Recursos

### Documentación Oficial
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Videos Recomendados
- "NestJS Course for Beginners" (YouTube)
- "REST API Design Best Practices"
- "Database Design 101"

---

## ✅ Checklist para Docente

- [ ] He leído GUIA_DOCENTE.md
- [ ] He visto la estructura del proyecto (src/)
- [ ] He instalado y ejecutado el servidor
- [ ] He probado al menos 1 endpoint
- [ ] He visto Prisma Studio (npx prisma studio)
- [ ] He revisado el módulo Auth (entender JWT)
- [ ] He revisado el módulo Users (entender CRUD)
- [ ] He revisado cómo se crea un Match
- [ ] Estoy listo para evaluación

---

## 🎁 Documentación Adicional

Se incluyen comentarios en el código para explicar:
- Métodos complejos
- Reglas de negocio
- Validaciones especiales
- Decisiones de implementación

Busca los comentarios tipo `//TODO`, `//FIXME`, `//NOTE` para ver áreas de mejora.

---

## 🏁 Conclusión

Este proyecto es una **implementación completa de una aplicación backend moderna** que demuestra:

✅ Arquitectura profesional  
✅ Buenas prácticas de código  
✅ Seguridad  
✅ Escalabilidad  
✅ Testabilidad  

**Está listo para ser evaluado, estudiado y mejorado.**

---

### 📌 Recuerda:
1. **Lee GUIA_DOCENTE.md primero** (10 min)
2. **Ejecuta SETUP.md** para instalar
3. **Explora los módulos en src/**
4. **Prueba los endpoints**
5. **Haz preguntas** (ver sección de preguntas sugeridas)

---

**Creado:** Junio 2026  
**Versión:** 1.0  
**Estado:** ✅ Listo para demostración

