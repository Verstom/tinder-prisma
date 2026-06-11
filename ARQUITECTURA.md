# 🏗️ Guía de Arquitectura - Proyecto Tinder

## Tabla de Contenidos
- [Visión General](#visión-general)
- [Patrones Utilizados](#patrones-utilizados)
- [Estructura de Capas](#estructura-de-capas)
- [Flujos de Datos](#flujos-de-datos)
- [Ejemplos de Implementación](#ejemplos-de-implementación)

---

## Visión General

El proyecto Tinder implementa una arquitectura modular basada en **Domain-Driven Design (DDD)** con NestJS. Esto permite:

✅ **Escalabilidad**: Fácil de agregar nuevos módulos  
✅ **Mantenibilidad**: Cada módulo es independiente  
✅ **Testabilidad**: Lógica separada y aislada  
✅ **Claridad**: Responsabilidades bien definidas  

---

## Patrones Utilizados

### 1. Inyección de Dependencias (DI)
NestJS proporciona DI automático:

```typescript
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
}
```

### 2. Repository Pattern
Abstracción para acceso a datos:

```typescript
// Infrastructure layer
@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
```

### 3. DTO Pattern
Validación y transformación de datos:

```typescript
export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
```

### 4. Guard Pattern
Protección de rutas:

```typescript
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  // Rutas protegidas
}
```

---

## Estructura de Capas

### Por Módulo (Ej: Users)

```
users/
├── users.controller.ts       ◄─── Controllers (HTTP Layer)
├── users.module.ts           ◄─── Module Configuration
│
├── application/
│   ├── services/
│   │   ├── get-user.service.ts      ◄─── Use Cases
│   │   ├── create-user.service.ts
│   │   └── update-user.service.ts
│   └── dto/
│       ├── create-user.dto.ts       ◄─── Input/Output Validation
│       └── user.dto.ts
│
├── domain/
│   ├── entities/
│   │   └── user.entity.ts           ◄─── Business Rules
│   └── interfaces/
│       └── user.interface.ts        ◄─── Contracts
│
└── infrastructure/
    ├── repositories/
    │   └── users.repository.ts      ◄─── Data Access
    └── prisma/
        └── users.prisma.schema      ◄─── Database Schema
```

### Responsabilidades por Capa

| Capa | Responsabilidad | Ejemplo |
|------|-----------------|---------|
| **Controller** | Manejar HTTP, validación básica | Recibir request, validar JWT |
| **Application** | Lógica de negocio, casos de uso | Crear usuario, generar JWT |
| **Domain** | Reglas de negocio, entidades | Validar email único, encriptar password |
| **Infrastructure** | Acceso a datos, persistencia | Consultar/guardar en BD |

---

## Flujos de Datos

### Flujo 1: Registrar Usuario

```
┌─────────────────────────────────────────────────┐
│ Cliente: POST /auth/register                    │
│ { name, email, password }                       │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ AuthController.register()                       │
│ - Valida DTO                                    │
│ - Llama a RegisterService                       │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ RegisterService (Application)                   │
│ - Valida email único                            │
│ - Encripta password                             │
│ - Crea usuario                                  │
│ - Genera JWT                                    │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ UsersRepository (Infrastructure)                │
│ - Consulta Prisma                               │
│ - Guarda usuario en PostgreSQL                  │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ Base de Datos PostgreSQL                        │
│ INSERT INTO users (...)                         │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ Respuesta: { access_token: "jwt_token" }        │
└─────────────────────────────────────────────────┘
```

### Flujo 2: Crear Interacción (Like)

```
Cliente
   │
   ▼
POST /interactions
{ receiverId: 5, type: "LIKE" }
   │
   ▼
InteractionsController
   │ (Validar JWT, DTO)
   ▼
InteractionsService (Application)
   │ (Validar reglas de negocio)
   │ - ¿Usuario existe?
   │ - ¿Ya interactuó antes?
   │ - ¿Plan permite interacción?
   ▼
InteractionsRepository (Infrastructure)
   │ (Guardar en BD)
   ▼
PostgreSQL
   │ (INSERT INTO interactions)
   ▼
✓ Verificar si hay Match
   │ (Usuario A likea B Y B likea A)
   ▼
Crear Match automáticamente
   ▼
Respuesta: { interaction created }
```

### Flujo 3: Obtener Matches

```
Cliente
   │
   ▼
GET /matches (con token JWT)
   │
   ▼
MatchesController
   │ (Validar JWT)
   │ (Extraer userId del token)
   ▼
MatchesService (Application)
   │ (Lógica: obtener matches del usuario)
   ▼
MatchesRepository (Infrastructure)
   │ (Consultar en BD)
   ▼
PostgreSQL
   │ SELECT * FROM matches
   │ WHERE firstUserId = ? OR secondUserId = ?
   ▼
Devolver lista de matches
   │
   ▼
Respuesta: [{ match1 }, { match2 }, ...]
```

---

## Ejemplos de Implementación

### Ejemplo 1: Crear un Nuevo Servicio

```typescript
// 1. DTOs (application/dto)
export class CreatePostDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsArray()
  hashtags?: string[];
}

// 2. Entity (domain/entities)
export class Post {
  id: number;
  userId: number;
  content: string;
  hashtags: string[];
  createdAt: Date;
}

// 3. Service (application/services)
@Injectable()
export class CreatePostService {
  constructor(private repository: PostsRepository) {}

  async execute(userId: number, dto: CreatePostDto): Promise<Post> {
    const post = new Post({
      userId,
      content: dto.content,
      hashtags: dto.hashtags || [],
      createdAt: new Date(),
    });

    return this.repository.save(post);
  }
}

// 4. Repository (infrastructure/repositories)
@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  async save(post: Post): Promise<Post> {
    return this.prisma.post.create({
      data: {
        userId: post.userId,
        content: post.content,
        hashtags: post.hashtags,
      },
    });
  }
}

// 5. Controller (users.controller.ts)
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private createPostService: CreatePostService) {}

  @Post()
  async create(@User() user, @Body() dto: CreatePostDto) {
    return this.createPostService.execute(user.id, dto);
  }
}

// 6. Module (users.module.ts)
@Module({
  controllers: [PostsController],
  providers: [CreatePostService, PostsRepository],
})
export class PostsModule {}
```

### Ejemplo 2: Agregar Validación

```typescript
// Domain rules
@Injectable()
export class ValidateUserBusinessRules {
  constructor(private repository: UsersRepository) {}

  async validateEmailUniqueness(email: string): Promise<void> {
    const existing = await this.repository.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email ya registrado');
    }
  }

  validatePasswordStrength(password: string): void {
    if (password.length < 8) {
      throw new BadRequestException('Contraseña muy corta');
    }
    // Más validaciones...
  }
}

// Usar en servicio
@Injectable()
export class RegisterService {
  constructor(
    private rules: ValidateUserBusinessRules,
    private repository: UsersRepository,
  ) {}

  async execute(dto: RegisterDto): Promise<User> {
    await this.rules.validateEmailUniqueness(dto.email);
    this.rules.validatePasswordStrength(dto.password);
    
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.repository.create({
      ...dto,
      password: hashedPassword,
    });
  }
}
```

### Ejemplo 3: Guards Personalizados

```typescript
// Custom Guard
@Injectable()
export class PremiumUserGuard implements CanActivate {
  constructor(private usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const userData = await this.usersRepository.findById(user.id);
    
    if (userData.plan !== SubscriptionPlan.PREMIUM) {
      throw new ForbiddenException('Solo usuarios PREMIUM');
    }

    return true;
  }
}

// Uso en controller
@UseGuards(JwtAuthGuard, PremiumUserGuard)
@Post('advanced-feature')
async premiumFeature(@User() user) {
  // Solo PREMIUM llega aquí
}
```

---

## Decisiones de Diseño

### ¿Por qué DDD?
- ✅ Modelos cercanos al dominio del negocio
- ✅ Fácil comunicación con stakeholders
- ✅ Escalable para proyectos grandes
- ✅ Separación clara de responsabilidades

### ¿Por qué Prisma?
- ✅ Type-safe queries
- ✅ Migraciones automáticas
- ✅ Studio para debugging
- ✅ Soporte para múltiples bases de datos

### ¿Por qué JWT?
- ✅ Stateless (sin sesiones en servidor)
- ✅ Escalable horizontalmente
- ✅ Estándar industria
- ✅ Seguro con firma digital

---

## Tips para Mantener la Arquitectura

1. **Una responsabilidad por clase**
   - Controller → Validar y rutear
   - Service → Lógica de negocio
   - Repository → Acceso a datos

2. **Inyectar dependencias**
   - Nunca hacer `new NombreService()`
   - Usar `constructor(private service: Service) {}`

3. **Validar en DTOs**
   - No validar en controllers
   - Usar decoradores: `@IsEmail()`, `@MinLength(8)`

4. **Tests por capa**
   - Unit tests para servicios
   - Integration tests para repositories
   - E2E tests para controllers

5. **Reutilizar código compartido**
   - Carpeta `shared/` para utilidades
   - Guards personalizados
   - Decoradores comunes

---

## Recursos

- [NestJS Best Practices](https://docs.nestjs.com/techniques/sql-databases)
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

