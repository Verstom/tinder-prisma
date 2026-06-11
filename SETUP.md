# 🚀 Guía de Instalación y Setup - Proyecto Tinder

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.0.0 o superior
  - Descargar desde: https://nodejs.org/
  - Verificar: `node --version`

- **npm**: v9.0.0 o superior
  - Generalmente viene con Node.js
  - Verificar: `npm --version`

- **PostgreSQL**: v12 o superior
  - Descargar desde: https://www.postgresql.org/download/
  - Verificar: `psql --version`

- **Git**: Para clonar el repositorio
  - Verificar: `git --version`

---

## 🔧 Pasos de Instalación

### Paso 1: Clonar el Repositorio

```bash
# Clonar proyecto
git clone <URL_DEL_REPOSITORIO>

# Entrar a la carpeta
cd tinder
```

### Paso 2: Instalar Dependencias

```bash
# Instalar todas las dependencias de npm
npm install

# Esto instalará:
# - NestJS
# - Prisma
# - PostgreSQL client
# - JWT y autenticación
# - Testing frameworks
# - Y más...
```

### Paso 3: Configurar PostgreSQL

#### Opción A: PostgreSQL Local

1. **Crear base de datos**
```sql
-- Conectarse como superuser (usuario 'postgres')
psql -U postgres

-- Crear base de datos para desarrollo
CREATE DATABASE tinder_dev;

-- Crear base de datos para testing
CREATE DATABASE tinder_test;

-- Crear usuario para la aplicación (opcional)
CREATE USER tinder_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE tinder_dev TO tinder_user;

-- Listar bases de datos
\l

-- Salir
\q
```

2. **Verificar conexión**
```bash
psql -U postgres -d tinder_dev
```

#### Opción B: PostgreSQL en Docker

```bash
# Descargar imagen PostgreSQL
docker pull postgres:15

# Ejecutar contenedor
docker run --name tinder-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tinder_dev \
  -p 5432:5432 \
  -d postgres:15

# Verificar que el contenedor está corriendo
docker ps

# Conectarse
psql -h localhost -U postgres -d tinder_dev
```

### Paso 4: Configurar Variables de Entorno

1. **Crear archivo `.env` en la raíz**

```bash
# En Windows (PowerShell)
New-Item .env

# En Linux/Mac
touch .env
```

2. **Añadir contenido**

```env
# ==========================================
# CONFIGURACIÓN DE BASE DE DATOS
# ==========================================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tinder_dev"

# Para testing (diferente BD):
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tinder_test"

# ==========================================
# CONFIGURACIÓN DE JWT
# ==========================================
# Generar una clave segura: openssl rand -hex 32
JWT_SECRET="your_super_secret_key_here_change_this_in_production"
JWT_EXPIRATION=3600  # 1 hora en segundos

# ==========================================
# CONFIGURACIÓN DEL SERVIDOR
# ==========================================
NODE_ENV=development
PORT=3000

# ==========================================
# CONFIGURACIÓN DE LOGGING (opcional)
# ==========================================
LOG_LEVEL=debug
```

3. **Generar JWT_SECRET seguro**

```bash
# En Windows (PowerShell)
$bytes = [byte[]]::new(32)
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$rng.GetBytes($bytes)
$secret = [BitConverter]::ToString($bytes) -replace '-'
Write-Host "JWT_SECRET=$($secret.ToLower())"

# En Linux/Mac
openssl rand -hex 32
```

### Paso 5: Configurar Base de Datos con Prisma

```bash
# Ejecutar migraciones
npx prisma migrate dev --name init

# Esto hará:
# - Crear las tablas en la BD
# - Generar el cliente de Prisma
# - Crear registro en histórico de migraciones
```

### Paso 6: Verificar Setup

```bash
# Ver si Prisma Studio funciona (interfaz gráfica)
npx prisma studio

# Esto abre: http://localhost:5555
# Aquí puedes ver y editar datos de forma visual

# Presionar Ctrl+C para cerrar
```

### Paso 7: Iniciar Servidor

```bash
# Desarrollo (con hot-reload)
npm run start:dev

# Producción (compilado)
npm run build
npm run start:prod

# Debug (con breakpoints)
npm run start:debug
```

✅ **Servidor corriendo en:** `http://localhost:3000`

---

## ✅ Verificación de Instalación

### Checklist

- [ ] Node.js instalado: `node --version`
- [ ] npm instalado: `npm --version`
- [ ] PostgreSQL corriendo: `psql --version`
- [ ] Base de datos creada
- [ ] Archivo `.env` configurado
- [ ] `npm install` ejecutado
- [ ] Migraciones aplicadas: `npx prisma migrate dev`
- [ ] Servidor inicia sin errores: `npm run start:dev`

### Probar Endpoints

Una vez que el servidor esté corriendo:

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'

# Respuesta esperada:
# { "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }

# 2. Copiar el token y usarlo
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer <TOKEN_AQUI>"
```

---

## 🔄 Comandos Útiles

### Desarrollo

```bash
# Iniciar servidor en modo watch
npm run start:dev

# Iniciar con debugging
npm run start:debug

# Compilar proyecto
npm run build

# Ejecutar compilado (producción)
npm run start:prod

# Ver logs
npm run lint

# Formatear código
npm run format
```

### Base de Datos

```bash
# Abrir Prisma Studio (GUI)
npx prisma studio

# Ver migraciones pendientes
npx prisma migrate status

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Generar cliente de Prisma
npx prisma generate

# Reset base de datos (⚠️ BORRA TODO)
npx prisma migrate reset
```

### Testing

```bash
# Ejecutar tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Cobertura de tests
npm run test:cov

# Tests E2E
npm run test:e2e
```

---

## 🐛 Troubleshooting

### Problema: "ECONNREFUSED 127.0.0.1:5432"

**Causa**: PostgreSQL no está corriendo

**Solución**:
```bash
# Windows
sc query postgresql

# Linux
sudo service postgresql status

# Mac
brew services list

# Si no está corriendo, iniciar:
sudo service postgresql start  # Linux
brew services start postgresql  # Mac
```

---

### Problema: "Database connection refused"

**Causa**: DATABASE_URL incorrea

**Verificar**:
1. PostgreSQL está corriendo
2. Usuario y contraseña correcta
3. Base de datos existe
4. Puerto 5432 está disponible

```bash
# Probar conexión
psql -U postgres -d tinder_dev -c "SELECT 1"
```

---

### Problema: "Cannot find module '@prisma/client'"

**Causa**: Prisma no fue instalado

**Solución**:
```bash
npm install @prisma/client
npx prisma generate
```

---

### Problema: "Error in premigration"

**Causa**: Migraciones previas fallaron

**Solución**:
```bash
# Reset completo (⚠️ BORRA TODO)
npx prisma migrate reset

# O reparar migraciones
npx prisma migrate resolve --rolled-back 20260518150826_init
```

---

### Problema: JWT_SECRET no configurado

**Solución**:
```bash
# Verificar .env
cat .env | grep JWT_SECRET

# Si falta, agregar:
echo "JWT_SECRET=your_secret_key_here" >> .env
```

---

## 📦 Instalación Alternativa (Docker)

```bash
# Crear Dockerfile (si no existe)
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
EOF

# Crear docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: tinder_dev
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/tinder_dev
      JWT_SECRET: your_secret_key
    depends_on:
      - postgres

volumes:
  postgres_data:
EOF

# Ejecutar todo
docker-compose up
```

---

## 🎯 Próximos Pasos

1. ✅ Leer [DOCUMENTACION.md](DOCUMENTACION.md) para entender el proyecto
2. ✅ Explorar [ARQUITECTURA.md](ARQUITECTURA.md) para ver el diseño
3. ✅ Ver endpoints en [DOCUMENTACION.md#endpoints-principales](DOCUMENTACION.md#endpoints-principales)
4. ✅ Usar Postman/Insomnia para probar endpoints
5. ✅ Leer el código de los módulos
6. ✅ Escribir tests para nuevas features

---

## 📞 Soporte

Si encuentras problemas:

1. Revisar los logs del servidor
2. Consultar [Troubleshooting](#troubleshooting)
3. Verificar variables de entorno
4. Revisar documentación oficial:
   - [NestJS Docs](https://docs.nestjs.com)
   - [Prisma Docs](https://www.prisma.io/docs)
   - [PostgreSQL Docs](https://www.postgresql.org/docs)

---

**¡Listo! El proyecto debería estar funcionando. 🎉**

