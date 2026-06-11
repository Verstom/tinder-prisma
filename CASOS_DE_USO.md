# 📚 Casos de Uso y Flujos - Proyecto Tinder

## Tabla de Contenidos
1. [Caso de Uso 1: Registro e Login](#caso-de-uso-1-registro-e-login)
2. [Caso de Uso 2: Buscar y Descubrir Perfiles](#caso-de-uso-2-buscar-y-descubrir-perfiles)
3. [Caso de Uso 3: Sistema de Interacciones](#caso-de-uso-3-sistema-de-interacciones)
4. [Caso de Uso 4: Crear Match](#caso-de-uso-4-crear-match)
5. [Caso de Uso 5: Mensajería](#caso-de-uso-5-mensajería)
6. [Caso de Uso 6: Gestión de Suscripciones](#caso-de-uso-6-gestión-de-suscripciones)
7. [Secuencias de Negocio](#secuencias-de-negocio)

---

## Caso de Uso 1: Registro e Login

### Escenario: Nuevo Usuario se Registra

```
ACTORES:
- Usuario no autenticado
- Sistema
- Base de datos

PRECONDICIONES:
- Usuario tiene email válido
- Usuario no está registrado

PASOS:
1. Usuario abre aplicación
2. Usuario hace clic en "Registrarse"
3. Sistema muestra formulario de registro
4. Usuario ingresa:
   - Nombre completo
   - Email
   - Contraseña (mín. 8 caracteres)
5. Usuario hace clic en "Crear Cuenta"
6. Sistema valida:
   - ✓ Email válido
   - ✓ Email único (no registrado)
   - ✓ Contraseña fuerte
   - ✓ Nombre no vacío
7. Sistema encripta contraseña
8. Sistema guarda usuario en BD
9. Sistema genera JWT
10. Sistema devuelve token al usuario
11. Usuario almacena token (localStorage)

FLUJO ALTERNATIVO - Email ya existe:
- En paso 6, validación falla
- Sistema devuelve error 409 (Conflict)
- Sistema sugiere "Iniciar sesión"

VALIDACIONES:
✓ Email: debe ser válido (regex o librería)
✓ Contraseña: mín 8 caracteres
✓ Nombre: 2-100 caracteres
```

### Escenario: Usuario Inicia Sesión

```
ACTORES:
- Usuario registrado
- Sistema
- Base de datos

PRECONDICIONES:
- Usuario tiene credenciales correctas
- Usuario no está logueado

PASOS:
1. Usuario va a pantalla de login
2. Usuario ingresa:
   - Email
   - Contraseña
3. Usuario hace clic en "Iniciar Sesión"
4. Sistema busca usuario por email
5. Sistema compara contraseña con bcrypt
6. Si credenciales correctas:
   - ✓ Sistema genera JWT
   - ✓ Sistema devuelve token
   - ✓ Usuario se autentica
7. Si credenciales incorrectas:
   - ✗ Sistema devuelve error 401
   - ✗ Usuario no puede acceder

FLUJO ALTERNATIVO - Usuario no existe:
- En paso 4, no hay usuario
- Sistema devuelve error 404
- Sistema sugiere "Registrarse"

SEGURIDAD:
- Contraseña nunca se devuelve
- Usar bcrypt para comparación
- Token con expiración (1 hora)
```

---

## Caso de Uso 2: Buscar y Descubrir Perfiles

### Escenario: Usuario Explora Perfiles

```
ACTORES:
- Usuario autenticado
- Sistema
- Base de datos

PRECONDICIONES:
- Usuario está logueado
- Existen otros usuarios disponibles

PASOS:
1. Usuario abre la sección "Descubrir"
2. Sistema obtiene userId del token JWT
3. Sistema busca usuarios disponibles:
   - Excepto el usuario autenticado
   - Excepto usuarios bloqueados
   - Excepto matches actuales
   - Excepto usuarios con interacciones previas
4. Sistema devuelve lista de perfiles
5. Para cada perfil muestra:
   - Nombre y edad
   - Fotos
   - Biografía
   - Ubicación
   - Intereses
6. Usuario puede:
   - Ver perfil completo
   - Hacer like/dislike/superlike
   - Pasar al siguiente perfil

FILTROS OPCIONALES:
- Por edad (rango)
- Por ubicación (distancia)
- Por intereses
- Por plan de suscripción

RENDIMIENTO:
- Paginar resultados (20 por página)
- Caché de perfiles recientes
- Índices en BD para búsquedas
```

### Endpoint Técnico

```typescript
// GET /users/discover
// Authorization: Bearer <token>

REQUEST:
{
  page: 1,
  limit: 20,
  filters: {
    ageMin: 18,
    ageMax: 50,
    location: "Madrid",
    interests: ["viajes", "música"]
  }
}

RESPONSE (200):
{
  data: [
    {
      id: 5,
      name: "María García",
      age: 28,
      bio: "Amante de viajes y música",
      location: "Madrid",
      interests: ["viajes", "música", "cine"],
      photos: ["url1", "url2"],
      plan: "GOLD"
    },
    // ... más usuarios
  ],
  total: 342,
  page: 1,
  limit: 20
}

ERRORES:
401 - No autenticado
400 - Parámetros inválidos
```

---

## Caso de Uso 3: Sistema de Interacciones

### Escenario: Usuario Interactúa con Perfil

```
ACTORES:
- Usuario autenticado
- Perfil objetivo
- Sistema
- Base de datos

PRECONDICIONES:
- Usuario está logueado
- Perfil objetivo existe
- No hay interacción previa

PASOS:
1. Usuario ve perfil
2. Usuario selecciona acción:
   - LIKE (me gusta)
   - DISLIKE (no me gusta)
   - SUPERLIKE (me gusta mucho)
3. Sistema valida:
   - ✓ Usuario autenticado
   - ✓ Perfil existe
   - ✓ No es interacción consigo mismo
   - ✓ No hay interacción previa
4. Sistema verifica límites por plan:
   - FREE: máx 10 likes/día
   - GOLD: máx 50 likes/día
   - PREMIUM: ilimitado
5. Sistema guarda interacción:
   - senderId: usuario autenticado
   - receiverId: perfil objetivo
   - type: LIKE/DISLIKE/SUPERLIKE
   - createdAt: timestamp
6. Sistema verifica si hay MATCH:
   - ¿Usuario A hizo like a B?
   - ¿Usuario B hizo like a A?
   - Si ambos: Crear match automáticamente
7. Sistema devuelve confirmación

REGLAS DE NEGOCIO:
✓ No puedo interactuar conmigo mismo
✓ No puedo interactuar dos veces con la misma persona
✓ Límites según plan
✓ SUPERLIKE solo en GOLD y PREMIUM

ESTADÍSTICAS:
- Contador de likes enviados (para límite)
- Contador de superlikes (limitado)
- Historial de interacciones
```

### Endpoint Técnico

```typescript
// POST /interactions
// Authorization: Bearer <token>

REQUEST:
{
  receiverId: 7,
  type: "LIKE"  // | "DISLIKE" | "SUPERLIKE"
}

RESPONSE (201):
{
  id: 42,
  senderId: 3,
  receiverId: 7,
  type: "LIKE",
  createdAt: "2026-06-10T15:30:00Z",
  matchCreated: false  // ó true si hay match mutuo
}

ERRORES:
401 - No autenticado
400 - Datos inválidos
409 - Ya interactuaste con este perfil
429 - Límite de likes excedido (FREE plan)
```

---

## Caso de Uso 4: Crear Match

### Escenario: Match Automático

```
ACTORES:
- Usuario A
- Usuario B
- Sistema

PRECONDICIONES:
- Usuario A hace like a Usuario B
- Usuario B ya hizo like a Usuario A
  (O viceversa)

PASOS (Automáticos):
1. Sistema detecta que ambos se dieron like
2. Sistema valida:
   - ✓ Ambas interacciones existen
   - ✓ Tipo es LIKE o SUPERLIKE
   - ✓ No existe match previo
3. Sistema crea registro de match:
   - firstUserId: ID usuario
   - secondUserId: ID usuario
   - createdAt: timestamp
4. Sistema notifica a ambos usuarios
5. Sistema permite que se envíen mensajes
6. Match queda activo hasta que uno de ellos
   haga "deshacer match"

DIAGRAMA:
User A: ──LIKE──> User B
                   |
                   | Usuario B ya hizo LIKE a A
                   ↓
              MATCH CREADO ✓
              │
              └─> Notificaciones
              └─> Habilitación mensajería
              └─> Historial compartido

OPERACIONES POSIBLES:
- Ver match (perfil completo)
- Enviar mensaje
- Ver historial de chat
- Deshacer match (bloquea conversación)
```

### Endpoint Técnico

```typescript
// GET /matches
// Authorization: Bearer <token>

RESPONSE (200):
{
  data: [
    {
      id: 1,
      firstUserId: 3,
      secondUserId: 7,
      firstUser: { id: 3, name: "Juan", ... },
      secondUser: { id: 7, name: "María", ... },
      createdAt: "2026-06-10T14:00:00Z",
      messageCount: 15,
      lastMessage: "¡Hola! ¿Cómo estás?"
    },
    // ... más matches
  ],
  total: 8
}

// POST /matches/:id/unmatch
// Deshacer un match

REQUEST: {}

RESPONSE (200):
{
  message: "Match eliminado",
  matchId: 1
}
```

---

## Caso de Uso 5: Mensajería

### Escenario: Intercambio de Mensajes

```
ACTORES:
- Usuario A (matched)
- Usuario B (matched)
- Sistema
- Base de datos

PRECONDICIONES:
- Existe match activo entre A y B
- Ambos usuarios están autenticados

PASOS:
1. Usuario A abre chat
2. Usuario A escribe mensaje
3. Usuario A envía
4. Sistema valida:
   - ✓ Usuario autenticado
   - ✓ Match existe y está activo
   - ✓ Mensaje no vacío
   - ✓ Longitud válida
5. Sistema guarda mensaje:
   - matchId: match activo
   - senderId: usuario A
   - content: texto mensaje
   - createdAt: timestamp
6. Sistema devuelve confirmación
7. (Futuro) Sistema notifica Usuario B
8. Usuario B ve mensaje en su chat

VALIDACIONES:
✓ Mensaje: 1-1000 caracteres
✓ Match debe estar activo
✓ Solo matched users pueden mensajearse

CARACTERÍSTICAS:
- Historial de mensajes
- Ordenados por fecha
- Indicador de lectura (futuro)
- Notificaciones (futuro)
```

### Endpoint Técnico

```typescript
// POST /messages
// Authorization: Bearer <token>

REQUEST:
{
  matchId: 1,
  content: "¡Hola! ¿Cómo estás?"
}

RESPONSE (201):
{
  id: 100,
  matchId: 1,
  senderId: 3,
  content: "¡Hola! ¿Cómo estás?",
  createdAt: "2026-06-10T15:45:00Z"
}

// GET /messages/:matchId
// Obtener historial de chat

RESPONSE (200):
{
  messages: [
    {
      id: 98,
      senderId: 7,
      content: "¡Hola!",
      createdAt: "2026-06-10T15:30:00Z"
    },
    {
      id: 99,
      senderId: 3,
      content: "Hola, ¿cómo estás?",
      createdAt: "2026-06-10T15:32:00Z"
    },
    // ...
  ],
  total: 45,
  match: { firstUserId: 3, secondUserId: 7 }
}
```

---

## Caso de Uso 6: Gestión de Suscripciones

### Escenario: Usuario Actualiza Plan

```
ACTORES:
- Usuario autenticado
- Sistema
- Proveedor de pagos (futuro)

PRECONDICIONES:
- Usuario está logueado
- Usuario selecciona nuevo plan

PASOS:
1. Usuario abre sección "Premium"
2. Sistema muestra 3 planes:

   FREE:
   - Likes limitados (10/día)
   - Sin superlikes
   - Perfil básico
   - Costo: $0

   GOLD:
   - Likes ilimitados
   - 5 superlikes/día
   - Perfil destacado
   - Costo: $9.99/mes

   PREMIUM:
   - Todo ilimitado
   - Perfil VIP
   - Soporte prioritario
   - Costo: $19.99/mes

3. Usuario selecciona plan
4. (Futuro) Usuario realiza pago
5. Sistema actualiza plan del usuario
6. Sistema activa features según plan
7. Usuario recibe confirmación
8. Cambios se reflejan inmediatamente

CAMBIOS SEGÚN PLAN:
✓ FREE → GOLD: Superlikes disponibles
✓ GOLD → PREMIUM: Soporte prioritario
✓ PREMIUM → FREE: Restricciones aplicadas

VALIDACIONES:
✓ Validar cambio de plan permitido
✓ No permitir cambios duplicados
✓ Historial de cambios de plan
```

### Endpoint Técnico

```typescript
// GET /subscriptions/plans
// Ver planes disponibles

RESPONSE (200):
{
  plans: [
    {
      name: "FREE",
      price: 0,
      features: [
        "10 likes por día",
        "Perfil básico",
        "Sin superlikes"
      ]
    },
    {
      name: "GOLD",
      price: 9.99,
      features: [
        "Likes ilimitados",
        "5 superlikes por día",
        "Perfil destacado"
      ]
    },
    {
      name: "PREMIUM",
      price: 19.99,
      features: [
        "Todo ilimitado",
        "Perfil VIP",
        "Soporte prioritario"
      ]
    }
  ]
}

// POST /subscriptions/:userId
// Cambiar plan

REQUEST:
{
  plan: "GOLD"
}

RESPONSE (200):
{
  userId: 3,
  plan: "GOLD",
  activatedAt: "2026-06-10T16:00:00Z",
  expiryDate: "2026-07-10T16:00:00Z"
}
```

---

## Secuencias de Negocio

### Secuencia 1: Usuario Nuevo a Match

```
Timeline:

T0:00  Usuario A se registra
       └─ Crea cuenta
       └─ Se autentica con JWT
       └─ Perfil activo

T0:05  Usuario A busca perfiles
       └─ GET /users/discover
       └─ Ve lista de usuarios

T0:10  Usuario A ve perfil de Usuario B
       └─ Le parece atractivo

T0:12  Usuario A hace LIKE a B
       └─ POST /interactions
       └─ System: ¿B ya likeo a A? NO
       └─ No hay match aún

T1:30  Usuario B (que estaba registrado)
       └─ Busca perfiles
       └─ Ve perfil de Usuario A

T1:35  Usuario B hace LIKE a A
       └─ POST /interactions
       └─ System: ¿A ya likeo a B? SÍ ✓
       └─ MATCH CREADO! 🎉
       └─ Ambos reciben notificación

T2:00  Usuario A abre matches
       └─ GET /matches
       └─ Ve nuevo match con B

T2:05  Usuario A envía primer mensaje
       └─ POST /messages
       └─ "¡Hola, me gustó tu perfil!"

T2:07  Usuario B recibe mensaje
       └─ Notificación entrante
       └─ Abre el chat

T2:10  Usuario B responde
       └─ POST /messages
       └─ "¡Hola! Tú también me gustas"

T2:15  Conversación fluye... 💬
```

### Secuencia 2: Match y Deshacer

```
Estado Inicial:
├─ User A: Plan GOLD
├─ User B: Plan FREE
└─ Match activo entre ellos

Acciones:
1. User A: POST /interactions (tipo: DISLIKE)
   └─ Intenta cambiar de opinión
   └─ Sistema: "Ya has interactuado con este usuario"
   └─ Descarta

2. User A: POST /matches/:id/unmatch
   └─ Decide deshacer match
   └─ Sistema: Match eliminado
   └─ Conversación archived (no buscable)
   └─ Ambos usuarios notificados

3. User A: GET /users/discover
   └─ User B puede aparecerá de nuevo
   └─ Pero sistema recuerda interacción
   └─ (Futuro: Opción de re-like después de cierto tiempo)
```

### Secuencia 3: Upgrade de Plan

```
Timeline:

T0:00  User C: Plan FREE
       └─ Intenta hacer SUPERLIKE
       └─ Sistema: "Feature no disponible en plan FREE"

T0:05  User C: Ve planes disponibles
       └─ GET /subscriptions/plans
       └─ Selecciona GOLD ($9.99/mes)

T0:10  User C: Completa pago
       └─ (Futuro: Integración Stripe)

T0:15  Sistema: Actualiza plan a GOLD
       └─ POST /subscriptions/:userId
       └─ Activa superlikes

T0:20  User C: Intenta SUPERLIKE nuevamente
       └─ Sistema: "Superlike creado"
       └─ Contador: 4 superlikes restantes hoy

T0:25  User C: Enjoy GOLD features ✨
```

---

## Diagrama General de Flujo

```
┌─────────────────────────────────────────────────────────┐
│                     INICIO (SIN AUTH)                   │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴─────────┐
        │                  │
        ▼                  ▼
    REGISTER            LOGIN
    (POST)              (POST)
        │                  │
        └────────┬─────────┘
                 │
         GENERAR JWT ✓
                 │
┌────────────────▼────────────────────────────────────────┐
│            AUTENTICADO (CON TOKEN)                      │
└────────────────┬────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┬──────────────┐
    │            │            │              │
    ▼            ▼            ▼              ▼
  VER        DESCUBRIR   INTERACCIONES   MENSAJES
 PERFIL      PERFILES      (Like/Dislike)  (Chat)
    │            │            │              │
    └────────────┼────────────┼──────────────┘
                 │            │
                 │   ┌────────▼────────┐
                 │   │                 │
                 │   ▼                 ▼
                 │  LIKE A ──────> ¿B likeo A?
                 │  usuario B          │
                 │                ┌────┴────┐
                 │                │         │
                 │                NO       SÍ
                 │                │         │
                 │                │         ▼
                 │                │     MATCH ✓
                 │                │         │
                 │                │         │
                 │                └─────────┤
                 │                          │
                 └──────────────────────────┤
                                            │
                                            ▼
                                      MENSAJERÍA
                                      (Chat activo)
```

---

Este documento cubre los **6 casos de uso principales** del sistema. Cada uno puede expandirse con más detalles específicos según sea necesario.

