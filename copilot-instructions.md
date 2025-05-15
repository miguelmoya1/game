# Copilot Instructions

## General Guidelines

- Follow the established coding standards.
- Write clean, maintainable, and well-documented code.
- Ensure all code changes are tested thoroughly.

## Error Handling

- Always handle errors gracefully.
- Use appropriate HTTP status codes for API responses.
- Log errors for debugging purposes.

## Database Operations

- Use transactions where necessary to maintain data integrity.
- Optimize queries for performance.
- Avoid N+1 query problems.

## SOFT DELETE

- Todos los deletes en el backend son soft delete: los recursos tienen un campo `deletedAt` (fecha).
- Para considerar un recurso como "no borrado", en los métodos de búsqueda o listados (find/search/getAll) se debe filtrar por `deletedAt: null` o por fecha superior a la actual (si aplica).
- Nunca mostrar ni operar sobre recursos con `deletedAt` no nulo (o en el pasado).
- El método `delete` de los repositorios debe marcar el recurso con la fecha actual en `deletedAt`, no eliminarlo físicamente.
- Los handlers de borrado deben usar este mecanismo.
- Los listados y búsquedas deben filtrar correctamente.

## Security

- Sanitize all user inputs to prevent SQL injection and XSS attacks.
- Use HTTPS for secure communication.
- Implement authentication and authorization mechanisms.

## API Design

- Follow RESTful principles.
- Use consistent naming conventions for endpoints.
- Provide clear and concise API documentation.

## Testing

- Write unit tests for all new features.
- Ensure high test coverage.
- Use mock data for testing purposes.

## Deployment

- Automate deployment processes.
- Monitor application performance post-deployment.
- Rollback changes if critical issues are detected.
