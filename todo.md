# Game Development Roadmap: Próximas Funcionalidades

Este documento resume las siguientes grandes características a desarrollar, su orden propuesto y consideraciones clave para su implementación.

## 1. Rotación Mensual de Ítems

- [ ] **Rotación Mensual de Ítems (Backend Cron Job)**
  - [ ] Asegurar que la rotación sea atómica y quede registrada para trazabilidad.

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
  - [ ] Definir y desarrollar la lógica de ataques, defensa, turnos y efectos.
  - [ ] Integrar hechizos, enemigos y jugadores en el sistema de combate.
  - [ ] UI para mostrar y gestionar combates.

## 6. Sistema de Gremios (Guilds/Clanes)

- [ ] **Entidad Guild**
- [ ] **API de Guilds (CRUD y gestión)**
- [ ] **Lógica de membresía y roles**
- [ ] **Integración con otros sistemas**
- [ ] **UI para gestión de gremios**

## Consideraciones Generales

- [ ] **Testing**: Unitario e integración, especialmente para stats, party/guild y permisos.
- [ ] **Escalabilidad**: Pensar en crecimiento de jugadores, parties y gremios.
- [ ] **Seguridad**: Proteger APIs y evitar manipulación indebida de stats o info de party/guild.
- [ ] **Comunicación en tiempo real**: Para chat, estado online/offline y notificaciones (WebSockets u otro sistema).

---

> Mantener este roadmap actualizado y claro. Eliminar tareas completadas y agrupar lo pendiente por fases. Si se añaden nuevas features, seguir la estructura y claridad de este documento.
