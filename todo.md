# Game Development Roadmap: Next Features

This document outlines the next major features to be developed, the proposed order, and key considerations for their implementation.

## Phase 1: Monthly Item Rotation & Inventory Improvements

- [ ] **Monthly Item Rotation (Backend Cron Job)**
  - [ ] Implement a cron job that, once per month, changes the items assigned to all places.
  - [ ] Ensure the rotation is atomic and logged for traceability.
- [x] **Inventory Total Count (Frontend)**
  - [x] Show the total number of items in the player's inventory (UI only, no backend change).
- [ ] **Nearby Player Detection (Bluetooth LE, Capacitor Plugin)**
  - [ ] Integrate the Capacitor Bluetooth LE (o LT) plugin in the frontend to scan for nearby devices.
  - [ ] Emit the deviceId of the current device when found.
  - [ ] Backend: receive and store the deviceId associated with the player.
  - [ ] Backend: provide an endpoint to list nearby players based on detected deviceIds.
  - [ ] Frontend: show a list of nearby players in the UI.

## Phase 2: Dungeon Generation System

- [ ] **Dungeon Generation System (Core Feature)**
  - [ ] Design and implement a system to procedurally generate dungeons.
  - [ ] Define dungeon structure, rooms, enemies, rewards, and entry/exit logic.
  - [ ] Integrate dungeon entry points in the world/places.
  - [ ] Ensure dungeons are replayable and scalable in difficulty.
  - [ ] (Optional) Add dungeon leaderboards and completion tracking.

## Phase 3: Spells System (Race-based Spells)

**Objective:** Implement a system where each player has access to spells according to their race. Spells are defined and linked to races, and players can view and use their available spells.

### Backend Tasks:

- [ ] **`Spell` Entity Definition:**
  - Fields: `id`, `name`, `description`, `requiredLevel`, `raceId` (relation to Race), `effects` (JSON or structured fields), `createdAt`, `updatedAt`.
  - Ensure each race can have multiple spells, and spells can only be used by players of the corresponding race.
- [ ] **API Endpoints for Spells:**
  - [ ] `GET /players/me/spells`: Get all spells available to the current player (based on their race and level).
  - [ ] `GET /spells/{spellId}`: Get details of a specific spell.
  - [ ] (Optional) `POST /spells/cast`: Endpoint to cast a spell (if real-time or turn-based logic is needed).
- [ ] **Spell Assignment Logic:**
  - [ ] When a player's race changes, update their available spells accordingly.
  - [ ] Only return spells for which the player meets the required level.
- [ ] **Integration with Player Panel:**
  - [ ] Ensure spells are shown in the player info endpoint if needed.

### Frontend Tasks:

- [ ] **User Interface (UI) for Spells:**
  - [ ] Display a list of available spells in the player section.
  - [ ] Show spell details (name, description, effects, required level).
  - [ ] (Optional) UI to cast spells if the game supports it.

---

## Phase 4: Guild System (Persistent Clans/Gremios)

**Objective:** Implement persistent player-run organizations (Guilds/Clans) that offer long-term social structures, progression, and benefits.

### Backend Tasks:

- [ ] **`Guild` Entity Definition**
- [ ] **API Endpoints for Guilds (CRUD & Management)**
- [ ] **Guild Membership and Role Logic**
- [ ] **Integration with Other Systems**

### Frontend Tasks:

- [ ] **User Interface (UI) for Guilds**

---

## Additional Considerations (Applicable to all Phases):

- [ ] **Unit and Integration Testing**: Fundamental, especially for stat calculation, party/guild management, and permission logic.
- [ ] **Scalability**: Design solutions with potential growth in the number of players, parties, and guilds in mind.
- [ ] **Security**: Ensure APIs are protected and players cannot unduly manipulate their stats or party/guild information.
- [ ] **Real-time Communication**: For party and guild chat, member status updates (online/offline), and notifications, consider using WebSockets or a similar real-time communication technology. This might be a separate "Core Feature" to be developed in parallel or as a prerequisite for some advanced social features.

---

### Completados recientes

- [x] Party System (Temporary Groups)
- [x] Integration with Set Buffs (Party-specific)
- [x] AggregatedStats Data Structure & Calculation
- [x] AggregatedStats Endpoint & Optimizations
- [x] Display of AggregatedStats in UI
