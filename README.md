# MercadoUrbano — Semana 1 (Microservicios + Clean Architecture)

Servicios incluidos:
- `auth-usuarios` (puerto 3001)
- `catalogo-productos` (puerto 3002)
- `recomendaciones` (puerto 3003)
- `notificaciones` (puerto 3004)

## Levantar dependencias locales
```bash
docker compose -f docker-compose.dev.yml up -d
```

## Variables de entorno por servicio
Copiar `.env.example` a `.env` y ajustar:
```
PORT=3001
JWT_SECRET=supersecret
SUPABASE_URL=https://<tu-proyecto>.supabase.co
SUPABASE_ANON_KEY=eyJ...
RABBITMQ_URL=amqp://mu:mu@localhost:5672
POSTGRES_URL=postgres://mu:mu@localhost:5432/mercadourbano
DB_SCHEMA=<auth|catalog|recs|notify>
```

## Swagger
Cada servicio expone Swagger en `/docs`.
