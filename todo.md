# Game Development Roadmap: Próximas Funcionalidades

Este documento resume las siguientes grandes características a desarrollar, su orden propuesto y consideraciones clave para su implementación.

## 1. Rotación Mensual de Ítems

- [x] **Rotación Mensual de Ítems (Backend Cron Job)**
  - [x] Asegurar que la rotación sea atómica y quede registrada para trazabilidad.

## 2. Sistema de Dungeons

- [ ] **Generación Procedural de Dungeons**
  - [ ] Diseñar e implementar el sistema de generación de dungeons.
  - [ ] Definir estructura, salas, enemigos, recompensas y lógica de entrada/salida.
  - [ ] Integrar puntos de entrada en el mundo/lugares.
  - [ ] Asegurar que las dungeons sean rejugables y escalables en dificultad.
  - [ ] (Opcional) Añadir rankings y seguimiento de completado de dungeons.

## 3. Creación de Hechizos y Enemigos

- [ ] **Entidad Spell**

  - Campos: `id`, `name`, `description`, `requiredLevel`, `raceId`, `effects`, `createdAt`, `updatedAt`.
  - Cada raza puede tener varios hechizos; sólo pueden usarlos jugadores de la raza y nivel adecuado.

- [ ] **API de Hechizos**

  - [ ] `GET /players/me/spells`: Hechizos disponibles para el jugador actual.
  - [ ] `GET /spells/{spellId}`: Detalles de un hechizo.
  - [ ] (Opcional) `POST /spells/cast`: Endpoint para lanzar un hechizo.
  - [ ] **Seguridad**: Validar en el backend que el jugador tiene permisos para realizar la acción (ej. lanzar el hechizo) y los recursos necesarios.

- [ ] **Lógica de Asignación de Hechizos**

  - [ ] Actualizar hechizos disponibles al cambiar de raza.
  - [ ] Sólo devolver hechizos para los que el jugador cumple el nivel requerido.

- [ ] **UI de Hechizos**

  - [ ] Mostrar lista y detalles de hechizos en la sección de jugador.
  - [ ] (Opcional) UI para lanzar hechizos si el juego lo soporta.

- [ ] **Creación e Integración de Enemigos**
  - [ ] Definir entidades y lógica de enemigos para dungeons y el mundo.
  - [ ] Integrar enemigos en la generación de dungeons y combates.

## 4. Loading Inicial y Sincronización de Datos Estáticos (Frontend)

- [ ] **Pantalla de loading inicial** que cargue y almacene en IndexedDB los datos estáticos:

  - [ ] Items
  - [ ] Spells
  - [ ] Sets
  - [ ] Enemies
  - [ ] Races

- [ ] **Sistema de actualización de datos locales**:
  - [ ] Backend expone un objeto JSON con las fechas de última actualización de cada recurso estático.
  - [ ] El frontend consulta este objeto y decide si debe refrescar los datos locales en IndexedDB.
  - [ ] Lógica para refrescar sólo los recursos que hayan cambiado.

## 5. Sistema de Ataques y Combate

- [ ] **Sistema de Ataques y Combate General**
  - [ ] Diseñar el bucle de combate principal (inicio, turnos, condiciones de fin).
  - [ ] Implementar el cálculo de daño (ataque vs. defensa, modificadores).
  - [ ] Desarrollar el sistema de estados y efectos (veneno, aturdimiento, etc.).
  - [ ] Definir la lógica de turnos (quién ataca y cuándo).
  - [ ] Integrar hechizos, enemigos y jugadores en el sistema de combate.
  - [ ] UI para mostrar y gestionar combates.

## 6. Sistema de Gremios (Guilds/Clanes)

- **Dependencias:** Sistema de jugadores base, API de autenticación.

- [ ] **Entidad Guild**

- [ ] **API de Guilds (CRUD y gestión)**

  - [ ] **Seguridad**: Validar en el backend que el jugador tiene permisos para realizar la acción (ej. unirse al gremio) y los recursos necesarios.

- [ ] **Lógica de membresía y roles**

- [ ] **Integración con otros sistemas**

- [ ] **UI para gestión de gremios**

## Consideraciones Generales

- [ ] **Testing**: Unitario e integración, especialmente para stats, party/guild y permisos.

- [ ] **Escalabilidad**: Pensar en crecimiento de jugadores, parties y gremios.

- [ ] **Comunicación en tiempo real**: Para chat, estado online/offline y notificaciones (WebSockets u otro sistema).

## 7. Estrategia de Comunicación en Tiempo Real

Este punto resume el enfoque a seguir para las interacciones en tiempo real, diferenciando entre notificaciones generales y la lógica de juego activo.

### Resumen de Tecnologías

- **Server-Sent Events (SSE):**

  - **Dirección:** Unidireccional (Servidor → Cliente).

  - **Uso Ideal:** Notificaciones generales que no requieren una respuesta interactiva inmediata a través del mismo canal (ej. nuevas peticiones de amistad, desafíos, anuncios globales).

  - **Ventajas:** Es ligero, se basa en HTTP estándar y gestiona la reconexión automáticamente.

  - **Limitaciones:** No es nativo para comunicación bidireccional; las respuestas del cliente deben hacerse por otros medios (ej. peticiones HTTP POST).

- **WebSockets / Socket.IO:**

  - **Dirección:** Bidireccional (Cliente ↔ Servidor).

  - **Uso Ideal:** Interacciones de juego complejas y de baja latencia que requieren un diálogo constante (combates, movimientos, uso de habilidades en tiempo real).

  - **Ventajas (Socket.IO):** Ofrece una API robusta, gestión de "salas" (rooms) para aislar comunicaciones, reconexión automática y un fallback a otros transportes si WebSockets no está disponible.

  - **Consideración:** Ligeramente más "pesado" que SSE, pero indispensable para la interactividad del juego.

### Arquitectura Propuesta (Sistema Híbrido)

Se implementará una estrategia híbrida para optimizar recursos y utilizar la herramienta más adecuada para cada necesidad:

1. **Notificaciones Generales (SSE):**

   - **Cuándo:** Estará activa siempre que el usuario esté en la aplicación, pero no necesariamente en un combate.

   - **Flujo:** El cliente establece una conexión SSE persistente para recibir notificaciones. Las respuestas a estas (ej. aceptar una amistad) se realizarán mediante peticiones HTTP POST estándar.

   - **Identificación:** Es crucial que el servidor pueda enviar una notificación a un usuario específico. Esto se logrará asociando la conexión SSE de cada cliente con su `userId` autenticado.

2. **Juego en Tiempo Real (Socket.IO):**

   - **Cuándo:** La conexión Socket.IO se creará **únicamente** cuando comience un combate y se cerrará explícitamente cuando este termine.

   - **Flujo:** Se utilizará para toda la comunicación bidireccional y de baja latencia del combate. Las acciones del jugador (ataques, uso de objetos) se emitirán a través de este socket, y el servidor difundirá las actualizaciones de estado a todos los participantes del combate.

   - **Gestión:** Se usarán "salas" (rooms) en Socket.IO para aislar la comunicación de cada combate, asegurando que los mensajes de la `partida-A` solo lleguen a los jugadores de la `partida-A`.

### Ejemplos Clave de Implementación (SSE)

Para clarificar el funcionamiento de SSE y su direccionamiento a usuarios específicos, aquí se muestran los conceptos clave.

#### Servidor (Node.js/Express) - Envío a un usuario específico

```javascript
// Usar un Map para asociar userId con su conexión SSE. Un Map ofrece búsquedas (get) y eliminaciones (delete) en tiempo O(1) por clave, lo que es más eficiente que buscar en un array cuando hay muchos usuarios conectados.
const sseClients = new Map();

// 1. Cuando un usuario autenticado se conecta al endpoint SSE
app.get('/api/notificaciones-stream', (req, res) => {
  // IMPORTANTE: Obtener el userId de una sesión o token autenticado, no de un query param inseguro.
  const userId = req.user.id;

  // Configurar cabeceras estándar para SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Guardar el objeto 'response' del cliente para poder enviarle datos más tarde
  sseClients.set(userId, res);

  req.on('close', () => {
    sseClients.delete(userId); // Limpiar cuando el cliente se desconecta
  });
});

// 2. Función para enviar una notificación a un usuario específico
function enviarNotificacionAUsuario(targetUserId, tipoEvento, datos) {
  const clientResponse = sseClients.get(targetUserId);

  if (clientResponse) {
    // 'id:': Opcional. Ayuda a la resincronización tras una desconexión. El cliente enviará el último ID recibido en la cabecera 'Last-Event-ID' al reconectar.
    clientResponse.write(`id: ${new Date().getTime()}\n`);

    // 'event:': Define el tipo de evento. El cliente lo usará para disparar el listener correcto.
    clientResponse.write(`event: ${tipoEvento}\n`);

    // 'data:': Contiene la información del evento, usualmente en formato JSON.
    clientResponse.write(`data: ${JSON.stringify(datos)}\n\n`); // \n\n es crucial para finalizar el evento
  }
}

// Ejemplo de uso desde la lógica de negocio:
// Cuando 'juanita456' envía una petición a 'pepito123'
// enviarNotificacionAUsuario('pepito123', 'peticionAmistad', { remitente: 'juanita456' });
```

#### Cliente (JavaScript) - Recepción de eventos con nombre

```javascript
// El cliente se conecta al endpoint SSE. El navegador gestionará la autenticación (cookies, cabeceras Authorization, etc.).
const source = new EventSource('/api/notificaciones-stream');

// Este listener se activa cuando el servidor envía un evento con "event: peticionAmistad"
source.addEventListener('peticionAmistad', function (event) {
  const datos = JSON.parse(event.data);
  console.log(`Nueva petición de amistad de: ${datos.remitente}`);

  // Aquí iría la lógica para mostrar la notificación en la UI.

  // La propiedad 'lastEventId' contiene el valor del último campo 'id:' que se recibió.
  console.log('Último ID de evento recibido:', event.lastEventId);
});

// Este listener se activa si el servidor envía un evento SIN la línea 'event:'. Es el evento por defecto ("message").
source.onmessage = function (event) {
  console.log('Notificación genérica o sin nombre recibida:', event.data);
};

// Manejo de errores de conexión
source.onerror = function (err) {
  console.error('Error en la conexión SSE. El navegador intentará reconectar automáticamente.', err);
};
```

> Mantener este roadmap actualizado y claro. Eliminar tareas completadas y agrupar lo pendiente por fases. Si se añaden nuevas features, seguir la estructura y claridad de este documento.
