"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const matches_service_module_1 = require("./matches-service.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(matches_service_module_1.MatchesServiceModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const port = process.env.PORT ? Number(process.env.PORT) : 3003;
    await app.listen(port);
    console.log(`🚀 Matches Service running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map