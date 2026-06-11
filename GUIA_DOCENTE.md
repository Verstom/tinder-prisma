# 🎓 Guía Rápida para el Docente

## 📌 Resumen Ejecutivo

**Proyecto Tinder API** es una aplicación backend completa que simula las funcionalidades principales de la app de citas Tinder. Está construida con **NestJS**, **TypeScript**, **PostgreSQL** y **Prisma**.

### 🎯 Objetivos Educativos Alcanzados

✅ **Arquitectura de Software**: Domain-Driven Design (DDD) con separación de capas  
✅ **Backend con NestJS**: Framework moderno y escalable  
✅ **Base de Datos**: Diseño relacional con PostgreSQL  
✅ **Autenticación**: JWT con estrategia Passport  
✅ **ORM**: Prisma para gestión de datos type-safe  
✅ **Validación**: Class-validator con DTOs  
✅ **Testing**: Jest para tests unitarios y E2E  
✅ **Seguridad**: Encriptación con bcrypt, validaciones  
✅ **API RESTful**: Endpoints bien documentados  

---

## 📁 Estructura de Documentación

Todo está organizado en esta carpeta raíz:

```
├── DOCUMENTACION.md    ← Documentación COMPLETA del proyecto
├── ARQUITECTURA.md     ← Patrones y diseño técnico
├── CASOS_DE_USO.md     ← Flujos de negocio y ejemplos
├── SETUP.md            ← Instrucciones de instalación paso a paso
└── README.md           ← (Original de NestJS)
```

### Recomendación de Lectura

```
1. Este archivo (Guía Rápida) - 5 min
   ↓
2. DOCUMENTACION.md - 20 min (ver secciones 1-3)
   ↓
3. ARQUITECTURA.md - 15 min (entender patrones)
   ↓
4. CASOS_DE_USO.md - 15 min (ver flujos reales)
   ↓
5. Explorar código en src/ - 30+ min
```

---

## 🚀 Demostración Rápida

### Instalación (5 minutos)

```bash
# 1. Clonar
git clone <repo>
cd tinder

# 2. Dependencias
npm install

# 3. Configurar .env (copiar del SETUP.md)
# Crear archivo .env con DATABASE_URL, JWT_SECRET, etc.

# 4. Base de datos
npx prisma migrate dev

# 5. Ejecutar
npm run start:dev
```

### Probar Endpoints (10 minutos)

```bash
# Terminal 1: Servidor corriendo en http://localhost:3000

# Terminal 2: Probar endpoints

# 1. REGISTRAR
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@test.com",
    "password": "password123"
  }'

# Respuesta: { "access_token": "eyJ..." }
# Guardar el token

# 2. OBTENER PERFIL (reemplazar TOKEN)
TOKEN="eyJ..." # Copiar del paso anterior
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer $TOKEN"

# Respuesta: { id, name, email, age, ... }

# 3. DESCUBRIR PERFILES
curl -X GET http://localhost:3000/users/discover \
  -H "Authorization: Bearer $TOKEN"

# Respuesta: [{ usuario1 }, { usuario2 }, ...]

# 4. HACER LIKE
curl -X POST http://localhost:3000/interactions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "receiverId": 2,
    "type": "LIKE"
  }'
```

---

## 🧠 Conceptos Clave

### 1. Modularidad
Cada módulo (Users, Auth, Matches, etc.) es independiente:
```
users/
├── users.controller.ts      (maneja HTTP)
├── application/services/    (lógica de negocio)
├── domain/                  (reglas)
└── infrastructure/          (acceso a datos)
```

### 2. Inyección de Dependencias
NestJS gestiona automáticamente las dependencias:
```typescript
constructor(private prisma: PrismaService) {}
// No hacer: new PrismaService()
```

### 3. DTOs y Validación
Los datos se validan automáticamente:
```typescript
export class RegisterDto {
  @IsEmail()
  email: string;
  
  @MinLength(8)
  password: string;
}
```

### 4. Guards y Decoradores
Protección de rutas:
```typescript
@UseGuards(JwtAuthGuard)
@Get()
getProfile(@User() user) { ... }
```

### 5. Prisma ORM
Type-safe queries a la BD:
```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 }
});
```

---

## 🔍 Ejemplos de Código

### Ejemplo 1: Crear un Usuario

**Controller (HTTP)**
```typescript
@Post('register')
async register(@Body() dto: RegisterDto) {
  return this.authService.register(dto);
}
```

**Service (Lógica)**
```typescript
async register(dto: RegisterDto) {
  const hashedPassword = await bcrypt.hash(dto.password, 10);
  const user = await this.usersRepository.create({
    ...dto,
    password: hashedPassword,
  });
  return this.generateToken(user.id);
}
```

**Repository (Datos)**
```typescript
async create(data: CreateUserInput) {
  return this.prisma.user.create({ data });
}
```

**DTO (Validación)**
```typescript
export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;
}
```

### Ejemplo 2: Crear Like

```typescript
// Flujo completo:
1. Usuario autenticado envía:
   POST /interactions
   { receiverId: 5, type: "LIKE" }

2. Controller valida JWT, llama al Service

3. Service valida reglas:
   - ¿Usuario existe?
   - ¿No hay like previo?
   - ¿Plan lo permite?

4. Repository guarda en BD

5. Sistema verifica si hay match mutuo:
   - ¿Usuario 5 también likeo?
   - Si sí: Crear Match automáticamente

6. Devolver confirmación
```

---

## 📊 Diagrama de Base de Datos

```
┌─────────────┐
│    User     │
├─────────────┤
│ id (PK)     │
│ email       │ ← ÚNICO
│ name        │
│ password    │
│ plan        │ ← ENUM(FREE, GOLD, PREMIUM)
│ age         │
│ bio         │
│ location    │
│ photos[]    │
└─────────────┘
      │
      ├──1:N──→ UserInteraction (Like/Dislike/Superlike)
      ├──1:N──→ Match (Matches mutuos)
      └──1:N──→ Message (Mensajes)


UserInteraction
├─ id (PK)
├─ senderId (FK)
├─ receiverId (FK)
├─ type (ENUM)
└─ createdAt


Match
├─ id (PK)
├─ firstUserId (FK)
├─ secondUserId (FK)
└─ createdAt


Message
├─ id (PK)
├─ matchId (FK)
├─ senderId (FK)
├─ content
└─ createdAt
```

---

## 🧪 Testing

### Tests Unitarios
```bash
npm run test
```
Prueban servicios aislados (mocks de dependencias)

### Tests E2E
```bash
npm run test:e2e
```
Prueban endpoints HTTP completos

### Ejemplo Test
```typescript
describe('AuthService', () => {
  it('should register user', async () => {
    const dto = { email: 'test@test.com', password: 'pass123' };
    const result = await service.register(dto);
    expect(result).toHaveProperty('access_token');
  });
});
```

---

## 🔐 Seguridad Implementada

✅ **Contraseñas**: Encriptadas con bcrypt (no reversible)  
✅ **JWT**: Token firmado, con expiración  
✅ **Validación**: DTOs validan todos los inputs  
✅ **Guards**: JwtAuthGuard protege rutas  
✅ **Errores**: Mensajes genéricos (no revelan info)  
✅ **CORS**: Configurable según necesidad  

---

## 📈 Escalabilidad

El proyecto está diseñado para crecer:

```
ACTUAL (Monolito bien estructurado):
- 1 servidor NestJS
- 1 base de datos PostgreSQL
- Capa de caché (futuro)

FUTURO (Microservicios):
- Servicio Auth
- Servicio Users
- Servicio Matching
- Servicio Messaging
- API Gateway
- Message Queue (RabbitMQ)
- Base de datos por servicio
```

---

## 🎓 Puntos Para Destacar en Clase

### 1. **Separación de Responsabilidades**
Cada clase tiene una responsabilidad clara:
- Controller: HTTP
- Service: Lógica
- Repository: Datos
- DTO: Validación

### 2. **Type Safety**
TypeScript garantiza tipos en tiempo de compilación:
```typescript
// Esto falla en compilación (bueno!)
const user: User = "invalid";

// En JavaScript puro no se vería el error hasta runtime
```

### 3. **Decoradores (Metaprogramming)**
```typescript
@UseGuards(JwtAuthGuard)  // Guard automático
@Get('profile')           // GET endpoint
async getProfile(@User() user) { // Inyectar usuario
  return user;
}
```

### 4. **Inyección de Dependencias**
```typescript
// Bad (acoplado):
class UserService {
  private db = new Database();
}

// Good (flexible):
class UserService {
  constructor(private db: Database) {}
}
```

### 5. **DDD (Domain-Driven Design)**
El código refleja el dominio del negocio:
- Users, Interactions, Matches, Messages
- No hay clases genéricas como "Manager"

### 6. **Validación Automática**
```typescript
// No validar manualmente:
if (!email.includes('@')) throw Error(...);

// Usar decoradores:
@IsEmail()
email: string;
```

---

## 🔧 Herramientas de Demostración

### Postman / Insomnia
Importar colección de endpoints para probar

### Prisma Studio
```bash
npx prisma studio
# Abre: http://localhost:5555
# Ver/editar datos visualmente
```

### Logs del Servidor
```bash
npm run start:dev
# Ver logs en tiempo real
```

### VS Code Extensions
- REST Client (para requests inline)
- Thunder Client (similar a Postman)
- Prettier (formateo)
- ESLint (linting)

---

## 📚 Rutas de Aprendizaje para Estudiantes

### Nivel 1: Entender la Estructura
1. Leer DOCUMENTACION.md (secciones 1-4)
2. Explorar carpeta `src/`
3. Ver estructura de módulos

### Nivel 2: Entender la Lógica
1. Leer ARQUITECTURA.md
2. Rastrear un flujo completo (registro → match → mensaje)
3. Ver cómo fluyen datos entre capas

### Nivel 3: Contribuir
1. Hacer cambios pequeños (agregar field a usuario)
2. Escribir tests
3. Agregar nuevo endpoint

### Nivel 4: Diseñar
1. Proponer nuevo módulo (ej: Ratings)
2. Diseñar BD para ello
3. Implementar completo

---

## ⚡ Comandos Rápidos

```bash
# Desarrollo
npm run start:dev          # Servidor con reload automático

# Testing
npm run test              # Tests unitarios
npm run test:cov          # Con cobertura

# Base de datos
npx prisma studio        # GUI para ver datos
npx prisma migrate dev   # Crear migración

# Linting
npm run lint             # Ver errores
npm run lint --fix       # Arregliar automáticamente

# Build
npm run build            # Compilar TypeScript
npm run start:prod       # Ejecutar compilado
```

---

## 🎯 Objetivos Alcanzados

Este proyecto demuestra competencias en:

| Área | Logro |
|------|-------|
| **Backend** | NestJS, TypeScript, Node.js |
| **Bases de Datos** | PostgreSQL, Prisma ORM |
| **Seguridad** | JWT, bcrypt, validación |
| **Arquitectura** | DDD, capas, SOLID |
| **Testing** | Jest unitarios y E2E |
| **API REST** | Endpoints con validación |
| **DevOps** | Git, package.json, migrations |

---

## 📞 Preguntas Sugeridas para Estudiante

1. "¿Cuál es la diferencia entre Controller y Service?"
2. "¿Por qué usar DTOs?"
3. "¿Cómo se crea un Match automáticamente?"
4. "¿Qué hace el Guard JwtAuthGuard?"
5. "¿Por qué Prisma en lugar de SQL directo?"
6. "¿Cómo se encriptan las contraseñas?"
7. "¿Qué es Dependency Injection?"
8. "¿Cómo se escalaría este proyecto?"

---

## 🎁 Punto Extra: Posibles Mejoras

**El estudiante podría implementar:**
- 🔔 Notificaciones en tiempo real (WebSockets)
- 🔍 Búsqueda avanzada con filtros
- ⭐ Sistema de ratings
- 📸 Upload de fotos
- 🌍 Geolocalización
- 📊 Analytics
- 🚀 Caché con Redis
- 🐳 Docker deployment

---

**¡Este proyecto es una excelente base para un sistema de citas profesional!**

---

**Última actualización:** Junio 2026

