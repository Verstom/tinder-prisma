# Guía de Peticiones HTTP - Tinder Microservices

Esta guía contiene la documentación de las peticiones para interactuar con la **API Gateway (Puerto 3000)** y con cada uno de los **Microservicios** de manera directa. 

> [!NOTE]
> * **API Gateway (Puerto 3000)** unifica el acceso y requiere en algunas rutas cabeceras de autorización JWT.
> * **Microservicios (Puertos 3001-3005)** se pueden invocar directamente y no requieren autenticación (ideal para pruebas internas).
> * *Nota sobre métodos:* El protocolo HTTP estándar utiliza `PUT` y `PATCH` para actualizaciones de recursos (las cuales equivalen conceptualmente al concepto de "push" o actualización). Se incluyen ambos.

---

## Tabla de Puertos y Servicios
| Servicio | Puerto en Local / Docker | Endpoint Base |
| :--- | :---: | :--- |
| **API Gateway** | `3000` | `http://localhost:3000` |
| **Users Service** | `3001` | `http://localhost:3001/users` |
| **Interactions Service** | `3002` | `http://localhost:3002/interactions` |
| **Matches Service** | `3003` | `http://localhost:3003/matches` |
| **Messages Service** | `3004` | `http://localhost:3004/messages` |
| **Subscriptions Service** | `3005` | `http://localhost:3005/subscriptions` |

---

## 1. API GATEWAY (Puerto 3000)

### Autenticación (Auth)
#### Iniciar Sesión (Obtener JWT Token)
* **Método:** `POST`
* **URL:** `http://localhost:3000/auth/login`
* **Body (JSON):**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
* **curl:**
  ```bash
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "user@example.com", "password": "password123"}'
  ```

#### Obtener Perfil Protegido (Requiere Token)
* **Método:** `GET`
* **URL:** `http://localhost:3000/auth/profile`
* **Cabecera:** `Authorization: Bearer <TU_JWT_TOKEN>`
* **curl:**
  ```bash
  curl -X GET http://localhost:3000/auth/profile \
    -H "Authorization: Bearer <REMPLAZAR_CON_TOKEN>"
  ```

---

### Usuarios (Gateway)
#### Crear Usuario
* **Método:** `POST`
* **URL:** `http://localhost:3000/users`
* **Body (JSON):**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "supersecurepassword"
  }
  ```
* **curl:**
  ```bash
  curl -X POST http://localhost:3000/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Jane Doe", "email": "jane@example.com", "password": "supersecurepassword"}'
  ```

#### Obtener todos los Usuarios
* **Método:** `GET`
* **URL:** `http://localhost:3000/users`
* **curl:**
  ```bash
  curl -X GET http://localhost:3000/users
  ```

#### Obtener un Usuario por ID
* **Método:** `GET`
* **URL:** `http://localhost:3000/users/1`
* **curl:**
  ```bash
  curl -X GET http://localhost:3000/users/1
  ```

#### Actualizar Usuario (PUT)
* **Método:** `PUT`
* **URL:** `http://localhost:3000/users/1`
* **Body (JSON):**
  ```json
  {
    "name": "Jane Smith"
  }
  ```
* **curl:**
  ```bash
  curl -X PUT http://localhost:3000/users/1 \
    -H "Content-Type: application/json" \
    -d '{"name": "Jane Smith"}'
  ```

#### Eliminar Usuario
* **Método:** `DELETE`
* **URL:** `http://localhost:3000/users/1`
* **curl:**
  ```bash
  curl -X DELETE http://localhost:3000/users/1
  ```

---

### Interacciones (Gateway)
#### Registrar una Interacción (Like, Dislike, Superlike)
* **Método:** `POST`
* **URL:** `http://localhost:3000/interactions`
* **Body (JSON):**
  ```json
  {
    "fromUserId": 1,
    "toUserId": 2,
    "type": "LIKE"
  }
  ```
  *(Tipos permitidos: `LIKE`, `DISLIKE`, `SUPERLIKE`)*
* **curl:**
  ```bash
  curl -X POST http://localhost:3000/interactions \
    -H "Content-Type: application/json" \
    -d '{"fromUserId": 1, "toUserId": 2, "type": "LIKE"}'
  ```

#### Obtener Interacciones Enviadas por un Usuario
* **Método:** `GET`
* **URL:** `http://localhost:3000/interactions/sent/1`
* **curl:**
  ```bash
  curl -X GET http://localhost:3000/interactions/sent/1
  ```

#### Obtener Interacciones Recibidas por un Usuario
* **Método:** `GET`
* **URL:** `http://localhost:3000/interactions/received/2`
* **curl:**
  ```bash
  curl -X GET http://localhost:3000/interactions/received/2
  ```

---

### Matches (Gateway)
#### Crear un Match Manualmente
* **Método:** `POST`
* **URL:** `http://localhost:3000/matches`
* **Body (JSON):**
  ```json
  {
    "user1Id": 1,
    "user2Id": 2
  }
  ```
* **curl:**
  ```bash
  curl -X POST http://localhost:3000/matches \
    -H "Content-Type: application/json" \
    -d '{"user1Id": 1, "user2Id": 2}'
  ```

#### Obtener Matches de un Usuario
* **Método:** `GET`
* **URL:** `http://localhost:3000/matches/user/1`
* **curl:**
  ```bash
  curl -X GET http://localhost:3000/matches/user/1
  ```

---

### Mensajes (Gateway)
#### Enviar un Mensaje
* **Método:** `POST`
* **URL:** `http://localhost:3000/messages`
* **Body (JSON):**
  ```json
  {
    "matchId": 1,
    "senderId": 1,
    "content": "¡Hola! ¿Cómo estás?"
  }
  ```
* **curl:**
  ```bash
  curl -X POST http://localhost:3000/messages \
    -H "Content-Type: application/json" \
    -d '{"matchId": 1, "senderId": 1, "content": "¡Hola! ¿Cómo estás?"}'
  ```

#### Obtener Mensajes de un Match
* **Método:** `GET`
* **URL:** `http://localhost:3000/messages/match/1`
* **curl:**
  ```bash
  curl -X GET http://localhost:3000/messages/match/1
  ```

#### Editar Contenido de un Mensaje (PATCH)
* **Método:** `PATCH`
* **URL:** `http://localhost:3000/messages/1`
* **Body (JSON):**
  ```json
  {
    "content": "Mensaje editado con éxito"
  }
  ```
* **curl:**
  ```bash
  curl -X PATCH http://localhost:3000/messages/1 \
    -H "Content-Type: application/json" \
    -d '{"content": "Mensaje editado con éxito"}'
  ```

---

### Suscripciones (Gateway)
#### Crear Suscripción
* **Método:** `POST`
* **URL:** `http://localhost:3000/subscriptions`
* **Body (JSON):**
  ```json
  {
    "userId": 1,
    "plan": "GOLD"
  }
  ```
  *(Planes permitidos: `FREE`, `PREMIUM`, `GOLD`)*
* **curl:**
  ```bash
  curl -X POST http://localhost:3000/subscriptions \
    -H "Content-Type: application/json" \
    -d '{"userId": 1, "plan": "GOLD"}'
  ```

#### Modificar Plan de Suscripción (PATCH)
* **Método:** `PATCH`
* **URL:** `http://localhost:3000/subscriptions/1`
* **Body (JSON):**
  ```json
  {
    "plan": "PREMIUM"
  }
  ```
* **curl:**
  ```bash
  curl -X PATCH http://localhost:3000/subscriptions/1 \
    -H "Content-Type: application/json" \
    -d '{"plan": "PREMIUM"}'
  ```

---
---

## 2. PETICIONES DIRECTAS A MICROSERVICIOS

Si deseas comunicarte directamente con cada servicio individual omitiendo el Gateway, utiliza los siguientes puertos:

### 👤 USERS SERVICE (Puerto 3001)
* **GET** - Obtener todos:
  `curl -X GET http://localhost:3001/users`
* **GET** - Detalle:
  `curl -X GET http://localhost:3001/users/1`
* **POST** - Crear:
  `curl -X POST http://localhost:3001/users -H "Content-Type: application/json" -d '{"name":"Ariel","email":"ariel@test.com","password":"password"}'`
* **PUT** - Actualizar:
  `curl -X PUT http://localhost:3001/users/1 -H "Content-Type: application/json" -d '{"name":"Ariel Modificado"}'`
* **DELETE** - Borrar:
  `curl -X DELETE http://localhost:3001/users/1`

### 💘 INTERACTIONS SERVICE (Puerto 3002)
* **GET** - Obtener todas:
  `curl -X GET http://localhost:3002/interactions`
* **GET** - Enviadas por usuario:
  `curl -X GET http://localhost:3002/interactions/sent/1`
* **GET** - Recibidas por usuario:
  `curl -X GET http://localhost:3002/interactions/received/2`
* **POST** - Crear interacción:
  `curl -X POST http://localhost:3002/interactions -H "Content-Type: application/json" -d '{"fromUserId":1,"toUserId":2,"type":"SUPERLIKE"}'`
* **DELETE** - Borrar interacción:
  `curl -X DELETE http://localhost:3002/interactions/1`

### 🤝 MATCHES SERVICE (Puerto 3003)
* **GET** - Obtener todos:
  `curl -X GET http://localhost:3003/matches`
* **GET** - Detalle:
  `curl -X GET http://localhost:3003/matches/1`
* **GET** - Por usuario:
  `curl -X GET http://localhost:3003/matches/user/1`
* **POST** - Crear match:
  `curl -X POST http://localhost:3003/matches -H "Content-Type: application/json" -d '{"user1Id":1,"user2Id":2}'`
* **DELETE** - Borrar:
  `curl -X DELETE http://localhost:3003/matches/1`

### 💬 MESSAGES SERVICE (Puerto 3004)
* **GET** - Obtener todos:
  `curl -X GET http://localhost:3004/messages`
* **GET** - Por match:
  `curl -X GET http://localhost:3004/messages/match/1`
* **POST** - Enviar mensaje:
  `curl -X POST http://localhost:3004/messages -H "Content-Type: application/json" -d '{"matchId":1,"senderId":1,"content":"Hola microservicio"}'`
* **PATCH** - Editar mensaje:
  `curl -X PATCH http://localhost:3004/messages/1 -H "Content-Type: application/json" -d '{"content":"Contenido microservicio editado"}'`
* **DELETE** - Borrar:
  `curl -X DELETE http://localhost:3004/messages/1`

### 💳 SUBSCRIPTIONS SERVICE (Puerto 3005)
* **GET** - Obtener todas:
  `curl -X GET http://localhost:3005/subscriptions`
* **GET** - Obtener planes:
  `curl -X GET http://localhost:3005/subscriptions/plans`
* **GET** - Suscripción de un usuario:
  `curl -X GET http://localhost:3005/subscriptions/user/1`
* **POST** - Crear suscripción:
  `curl -X POST http://localhost:3005/subscriptions -H "Content-Type: application/json" -d '{"userId":1,"plan":"PREMIUM"}'`
* **PATCH** - Actualizar plan:
  `curl -X PATCH http://localhost:3005/subscriptions/1 -H "Content-Type: application/json" -d '{"plan":"GOLD"}'`
* **DELETE** - Cancelar/Eliminar:
  `curl -X DELETE http://localhost:3005/subscriptions/1`
