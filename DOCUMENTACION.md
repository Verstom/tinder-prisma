# 📱 Proyecto Tinder - Documentación Completa

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Arquitectura](#arquitectura)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Módulos del Proyecto](#módulos-del-proyecto)
7. [Base de Datos](#base-de-datos)
8. [Autenticación](#autenticación)
9. [Endpoints Principales](#endpoints-principales)
10. [Ejecución y Testing](#ejecución-y-testing)

---

## 🎯 Descripción General

**Tinder API** es una aplicación backend construida con NestJS que simula la funcionalidad principal de la aplicación de citas Tinder. Permite a usuarios:
- Registrarse y autenticarse
- Ver perfiles de otros usuarios
- Hacer interacciones (like, dislike, superlike)
- Crear matches cuando ambos usuarios se gustan
- Mensajería en tiempo real entre matches
- Gestionar suscripciones para acceder a funcionalidades premium

### Características Principales
✅ Autenticación segura con JWT  
✅ Sistema de interacciones (like/dislike/superlike)  
✅ Matching automático  
✅ Sistema de mensajería  
✅ Planes de suscripción (Free, Gold, Premium)  
✅ Base de datos relacional con PostgreSQL  
✅ Arquitectura modular y escalable  
✅ Validación de datos con class-validator  

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **NestJS 11**: Framework progresivo Node.js
- **TypeScript**: Lenguaje tipado
- **PostgreSQL**: Base de datos relacional
- **Prisma ORM**: ORM para gestión de datos
- **JWT (JSON Web Tokens)**: Autenticación segura
- **Passport.js**: Estrategia de autenticación
- **bcrypt**: Encriptación de contraseñas
- **Jest**: Framework de testing
- **ESLint**: Linting

### Desarrollo
- **npm**: Gestor de paquetes
- **class-validator**: Validación de DTOs
- **class-transformer**: Transformación de objetos
- **dotenv**: Variables de entorno

---

## 🏗️ Arquitectura

### Patrón Arquitectónico: Domain-Driven Design (DDD)

```
┌─────────────────────────────────────────┐
│       Controllers (Rutas HTTP)          │
├─────────────────────────────────────────┤
│   Application Layer (Lógica de Negocio) │
├─────────────────────────────────────────┤
│   Domain Layer (Entidades y Reglas)     │
├─────────────────────────────────────────┤
│   Infrastructure (Prisma, DB)           │
└─────────────────────────────────────────┘
```

Cada módulo está organizado en capas:
- **Controllers**: Manejan las peticiones HTTP
- **Application**: Casos de uso y lógica de negocio
- **Domain**: Entidades, interfaces y reglas de negocio
- **Infrastructure**: Acceso a datos con Prisma
- **DTOs**: Validación de entrada/salida

---

## 📁 Estructura del Proyecto

```
tinder/
├── src/
│   ├── auth/                    # Módulo de autenticación
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   ├── application/
│   │   ├── decorators/          # Decoradores JWT
│   │   ├── domain/              # Interfaces de autenticación
│   │   ├── dto/                 # Login, Register DTOs
│   │   ├── guards/              # Guards JWT
│   │   └── infrastructure/
│   │
│   ├── users/                   # Módulo de usuarios
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── application/         # Servicios de usuario
│   │   ├── domain/              # Interfaces de usuario
│   │   ├── dto/                 # DTOs de usuario
│   │   └── infrastructure/      # Repositorio Prisma
│   │
│   ├── interactions/            # Módulo de interacciones (like/dislike)
│   │   ├── interactions.controller.ts
│   │   ├── interactions.module.ts
│   │   ├── application/
│   │   ├── domain/
│   │   ├── dto/
│   │   └── infrastructure/
│   │
│   ├── matches/                 # Módulo de matches
│   │   ├── matches.controller.ts
│   │   ├── matches.module.ts
│   │   ├── application/
│   │   ├── domain/
│   │   └── infrastructure/
│   │
│   ├── messages/                # Módulo de mensajería
│   │   ├── messages.controller.ts
│   │   ├── messages.module.ts
│   │   ├── application/
│   │   ├── domain/
│   │   ├── dto/
│   │   └── infrastructure/
│   │
│   ├── subscriptions/           # Módulo de suscripciones
│   │   ├── subscriptions.controller.ts
│   │   ├── subscriptions.module.ts
│   │   ├── application/
│   │   ├── domain/
│   │   ├── dto/
│   │   └── infrastructure/
│   │
│   ├── prisma/                  # Servicio Prisma global
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── middlewares/             # Middlewares (Auth)
│   │   └── auth.middleware.ts
│   │
│   ├── shared/                  # Código compartido
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── utils/
│   │
│   ├── app.module.ts            # Módulo raíz
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts                  # Punto de entrada
│
├── prisma/                      # Configuración de Prisma
│   ├── schema.prisma            # Esquema principal
│   ├── interactions.prisma      # Esquema de interactions
│   ├── matches.prisma           # Esquema de matches
│   ├── messages.prisma          # Esquema de messages
│   ├── users.prisma             # Esquema de users
│   ├── subscriptions.prisma     # Esquema de subscriptions
│   └── migrations/              # Migraciones de base de datos
│
├── test/                        # Tests e2e
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v18+)
- npm (v9+)
- PostgreSQL (v12+)

### Pasos de Instalación

#### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd tinder
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/tinder_db"

# JWT
JWT_SECRET="tu_secret_key_super_seguro"
JWT_EXPIRATION=3600

# Servidor
NODE_ENV=development
PORT=3000
```

#### 4. Configurar la base de datos
```bash
# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Generar el cliente de Prisma
npx prisma generate

# (Opcional) Ver la base de datos en Prisma Studio
npx prisma studio
```

---

## 📦 Módulos del Proyecto

### 1️⃣ **Módulo Auth** (Autenticación)
**Ubicación:** `src/auth/`

**Responsabilidades:**
- Registro de nuevos usuarios
- Login y generación de JWT
- Validación de tokens
- Estrategias de autenticación (JWT)

**Endpoints:**
```
POST   /auth/register      # Registrar nuevo usuario
POST   /auth/login         # Login y obtener token JWT
```

**Características:**
- Contraseñas encriptadas con bcrypt
- JWT con expiración configurable
- Decoradores personalizados (@User, @Auth)
- Guards para proteger rutas

---

### 2️⃣ **Módulo Users** (Usuarios)
**Ubicación:** `src/users/`

**Responsabilidades:**
- Gestión de perfiles de usuario
- Actualizar información personal
- Obtener datos de usuario
- Listar usuarios disponibles

**Endpoints:**
```
GET    /users               # Obtener perfil del usuario autenticado
GET    /users/:id           # Obtener perfil de otro usuario
GET    /users/discover      # Obtener usuarios disponibles
PUT    /users/:id           # Actualizar perfil
DELETE /users/:id           # Eliminar cuenta
```

**Campos del Usuario:**
- ID, nombre, email, contraseña
- Edad, biografía, ubicación
- Intereses (array de strings)
- Fotos (array de URLs)
- Plan de suscripción

---

### 3️⃣ **Módulo Interactions** (Interacciones)
**Ubicación:** `src/interactions/`

**Responsabilidades:**
- Registrar likes, dislikes y superlikes
- Validar que no se interactúe con el mismo usuario dos veces
- Consultar historial de interacciones

**Endpoints:**
```
POST   /interactions        # Crear nueva interacción
GET    /interactions        # Obtener historial de interacciones
```

**Tipos de Interacciones:**
- **LIKE**: Usuario le gusta
- **DISLIKE**: Usuario no le gusta
- **SUPERLIKE**: Usuario le gusta mucho

---

### 4️⃣ **Módulo Matches** (Matches)
**Ubicación:** `src/matches/`

**Responsabilidades:**
- Crear matches automáticos cuando hay like mutuo
- Obtener lista de matches del usuario
- Terminar un match

**Endpoints:**
```
GET    /matches             # Obtener todos los matches
GET    /matches/:id         # Obtener detalles de un match
POST   /matches/:id/unmatch # Terminar un match
```

**Lógica:**
- Se crea un match cuando Usuario A hace like a Usuario B Y Usuario B hace like a Usuario A
- Los matches pueden enviar mensajes entre sí

---

### 5️⃣ **Módulo Messages** (Mensajería)
**Ubicación:** `src/messages/`

**Responsabilidades:**
- Enviar y recibir mensajes
- Validar que solo matched users pueden mensajearse
- Obtener historial de conversaciones

**Endpoints:**
```
POST   /messages            # Enviar mensaje
GET    /messages/:matchId   # Obtener conversación con un match
```

**Reglas:**
- Solo usuarios con match activo pueden mensajearse
- Los mensajes se almacenan en orden cronológico
- Incluyen marca de tiempo

---

### 6️⃣ **Módulo Subscriptions** (Suscripciones)
**Ubicación:** `src/subscriptions/`

**Responsabilidades:**
- Gestionar planes de suscripción
- Actualizar plan del usuario
- Validar acceso a features premium

**Planes Disponibles:**
```
FREE    - Sin costo, limitaciones básicas
GOLD    - Acceso a superlikes ilimitados
PREMIUM - Todas las features + soporte prioritario
```

**Endpoints:**
```
GET    /subscriptions/plans      # Listar planes disponibles
POST   /subscriptions/:userId    # Actualizar plan de usuario
GET    /subscriptions/:userId    # Obtener plan actual del usuario
```

---

## 🗄️ Base de Datos

### Diagrama de Relaciones

```
User (1) ──────── (Many) UserInteraction
  │                        ↓
  │                   (LIKE/DISLIKE/SUPERLIKE)
  │
  ├─── (1,Many) Match
  │
  ├─── (1,Many) Message
  │
  └─── (1,1) SubscriptionPlan
```

### Tablas Principales

#### Users
```sql
CREATE TABLE User (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),  -- bcrypt
  plan ENUM('FREE', 'GOLD', 'PREMIUM'),
  age INT,
  bio TEXT,
  interests JSON,
  location VARCHAR(255),
  photos JSON,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### UserInteractions
```sql
CREATE TABLE UserInteraction (
  id INT PRIMARY KEY AUTO_INCREMENT,
  senderId INT,
  receiverId INT,
  type ENUM('LIKE', 'DISLIKE', 'SUPERLIKE'),
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (senderId) REFERENCES User(id),
  FOREIGN KEY (receiverId) REFERENCES User(id)
);
```

#### Matches
```sql
CREATE TABLE Match (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstUserId INT,
  secondUserId INT,
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (firstUserId) REFERENCES User(id),
  FOREIGN KEY (secondUserId) REFERENCES User(id)
);
```

#### Messages
```sql
CREATE TABLE Message (
  id INT PRIMARY KEY AUTO_INCREMENT,
  matchId INT,
  senderId INT,
  content TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (matchId) REFERENCES Match(id),
  FOREIGN KEY (senderId) REFERENCES User(id)
);
```

---

## 🔐 Autenticación

### Flujo de Autenticación

```
1. Usuario -> POST /auth/register (email, password)
   └─> Validar datos
   └─> Encriptar contraseña con bcrypt
   └─> Guardar usuario en BD
   └─> Devolver token JWT

2. Usuario -> POST /auth/login (email, password)
   └─> Validar credenciales
   └─> Comparar contraseña con bcrypt
   └─> Generar JWT con userId
   └─> Devolver token

3. Cliente guarda el token en localStorage/header

4. En cada petición autorizada:
   └─> Client envía: Authorization: Bearer <token>
   └─> Guard JWT valida el token
   └─> Si es válido, permite acceso
   └─> Si es inválido, rechaza (401)
```

### Guards y Decoradores

**Guard @UseGuards(JwtAuthGuard)**
- Protege rutas que requieren autenticación
- Valida el JWT automáticamente

**Decorador @User()**
- Inyecta datos del usuario autenticado
- Disponible en rutas protegidas

---

## 📡 Endpoints Principales

### 🔐 Autenticación
```
POST /auth/register
Content-Type: application/json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "secure123"
}
Response: { access_token: "jwt_token_aqui" }

POST /auth/login
Content-Type: application/json
{
  "email": "juan@example.com",
  "password": "secure123"
}
Response: { access_token: "jwt_token_aqui" }
```

### 👤 Usuarios (Requiere JWT)
```
GET /users
Authorization: Bearer <token>
Response: { id, name, email, age, bio, location, interests, photos, plan }

GET /users/discover
Authorization: Bearer <token>
Response: [{ usuario1 }, { usuario2 }, ...]

PUT /users/:id
Authorization: Bearer <token>
Body: { name?, age?, bio?, location?, interests?, photos? }

GET /users/:id
Authorization: Bearer <token>
Response: { perfil del usuario }
```

### ❤️ Interacciones (Requiere JWT)
```
POST /interactions
Authorization: Bearer <token>
Body: {
  "receiverId": 2,
  "type": "LIKE"  // "LIKE" | "DISLIKE" | "SUPERLIKE"
}
Response: { id, senderId, receiverId, type, createdAt }

GET /interactions
Authorization: Bearer <token>
Response: [{ interaccion1 }, { interaccion2 }, ...]
```

### 💑 Matches (Requiere JWT)
```
GET /matches
Authorization: Bearer <token>
Response: [{ match1 }, { match2 }, ...]

GET /matches/:id
Authorization: Bearer <token>
Response: { id, firstUserId, secondUserId, createdAt, messages }

POST /matches/:id/unmatch
Authorization: Bearer <token>
Response: { message: "Match eliminado" }
```

### 💬 Mensajes (Requiere JWT)
```
POST /messages
Authorization: Bearer <token>
Body: {
  "matchId": 5,
  "content": "Hola! ¿Cómo estás?"
}
Response: { id, matchId, senderId, content, createdAt }

GET /messages/:matchId
Authorization: Bearer <token>
Response: [{ mensaje1 }, { mensaje2 }, ...]
```

### 💳 Suscripciones (Requiere JWT)
```
GET /subscriptions/plans
Response: [
  { plan: "FREE", features: [...] },
  { plan: "GOLD", features: [...] },
  { plan: "PREMIUM", features: [...] }
]

GET /subscriptions/:userId
Authorization: Bearer <token>
Response: { userId, plan, expiryDate }

POST /subscriptions/:userId
Authorization: Bearer <token>
Body: { "plan": "GOLD" }
Response: { userId, plan, activatedAt }
```

---

## 🧪 Ejecución y Testing

### Desarrollo

#### Iniciar en modo watch
```bash
npm run start:dev
```
Servidor corriendo en `http://localhost:3000`

#### Iniciar en modo debug
```bash
npm run start:debug
```

#### Producción
```bash
npm run build
npm run start:prod
```

### Testing

#### Tests Unitarios
```bash
npm run test
```

#### Tests en modo watch
```bash
npm run test:watch
```

#### Cobertura de tests
```bash
npm run test:cov
```

#### Tests E2E
```bash
npm run test:e2e
```

### Herramientas Recomendadas

#### Postman/Insomnia
- Importar endpoints y probar manualmente
- Guardar requests comunes
- Crear colecciones por módulo

#### Prisma Studio
```bash
npx prisma studio
```
- Visualizar datos en tiempo real
- Crear/editar registros en GUI
- Perfecto para debug

---

## 🔍 Validación de Datos

### DTOs con Validación

El proyecto usa `class-validator` para validar automáticamente:

```typescript
// Ejemplo: RegisterDto
export class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

Validaciones incluidas:
- ✅ Email válido
- ✅ Contraseña mínimo 8 caracteres
- ✅ Campos requeridos
- ✅ Tipos de datos correctos

---

## 🚀 Próximos Pasos / Mejoras Futuras

- [ ] Implementar WebSockets para mensajería en tiempo real
- [ ] Agregar búsqueda avanzada con filtros
- [ ] Sistema de reportes de usuarios
- [ ] Notificaciones push
- [ ] Integración con redes sociales
- [ ] Analytics y estadísticas
- [ ] Sistema de rating/reviews
- [ ] Backup y recuperación de datos

---

## 📚 Referencias

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [JWT.io](https://jwt.io)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## 👨‍💼 Autor
**Tu Nombre**  
Proyecto Académico - Desarrollo Backend con NestJS

---

**Última actualización:** Junio 2026
