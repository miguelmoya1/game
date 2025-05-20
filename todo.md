# Game Development Roadmap: Next Features

This document outlines the next major features to be developed, the proposed order, and key considerations for their implementation.

## Phase 1: Party System (Temporary Groups)

**Objective:** Implement functionality for players to form temporary parties for specific activities (e.g., dungeons, quests). These parties are short-lived and disband after the activity or when players choose to leave. This is distinct from persistent Guilds. This phase is a priority due to existing item sets that grant benefits to party members.

### Backend Tasks:

- [x] **`Party` Entity Definition (or dynamic in-memory structure)**:
  - Fields: `id` (if persisted, otherwise managed in-memory), `leaderId`, `members` (list of `playerId`), `maxMembers` (e.g., 4-6 players), `creationTime`.
  - Consider if parties are purely in-memory or need light persistence for session recovery.
- [x] **API Endpoints for Parties (Real-time or HTTP)**:
  - [x] `POST /parties`: Create a new party (creator becomes the leader).
  - [x] `POST /parties/{partyId}/invite/{playerId}`: Invite a player to the party.
  - [x] `POST /parties/invitations/{invitationId}/accept`: Player accepts a party invitation.
  - [x] `POST /parties/invitations/{invitationId}/decline`: Player declines a party invitation.
  - [x] `GET /parties/{partyId}`: Get details of a specific party (members).
  - [x] `POST /parties/{partyId}/leave`: Allow a player to leave their current party. (If leader leaves, new leader might be assigned or party disbands).
  - [x] `POST /parties/{partyId}/kick/{playerId}`: Kick a member (leader only).
  - [x] `POST /parties/{partyId}/promote/{playerId}`: Promote a member to leader (leader only).
  - [x] `DELETE /parties/{partyId}`: Disband a party (leader only, or automatically if empty).
- [x] **Party Membership Logic**:
  - [x] Ensure a player can only be in one party at a time.
- [ ] **Integration with Set Buffs (Party-specific)**:
  - [ ] Modify the set buff calculation so that if a set affects party members, these buffs are correctly applied to the corresponding players within the same party. (This will connect to Phase 2).

### Frontend Tasks:

- [ ] **User Interface (UI) for Parties**:
  - [ ] Interface to create/invite to a party.
  - [ ] Display current party members and leader.
  - [ ] Buttons and logic for: leave party, kick member (if leader), promote leader (if leader).
  - [ ] Handling party invitations (accept/decline).

## Phase 2: Buff System and Global Aggregated Stats

**Objective:** Create a robust and optimized system to calculate a player's final stats, considering their base stats, the effects of equipped item sets, buffs originating from their temporary party, and buffs from their persistent Guild. This information must be globally and efficiently available.

### Backend Tasks (High Priority on Optimization):

- [ ] **`AggregatedStats` Data Structure Definition**:
  - Object/Class that will hold all final player stats (e.g., `finalMaxHealth`, `finalAttack`, `finalDefense`, `finalCritChance`, etc.).
- [ ] **`AggregatedStats` Calculation Service/Endpoint**:
  - [ ] `GET /player/{playerId}/aggregated-stats` or a similar endpoint.
  - **Centralized Calculation Logic**:
    1.  [ ] Get base stats from `PlayerEntity`.
    2.  [ ] Calculate and sum modifiers from all the player's active equipped item sets.
    3.  [ ] If the player is in a Party:
        - [ ] Identify active party buffs (e.g., from other party members' sets).
    4.  [ ] If the player is in a Guild (see Phase 3):
        - [ ] Identify active Guild-wide buffs (e.g., Guild level perks).
        - [ ] Identify buffs originating from _other Guild members'_ sets that affect the entire Guild (if applicable and distinct from party set buffs).
    5.  [ ] Aggregate all stat sources (base, personal sets, party buffs, guild buffs) to get the `AggregatedStats`.
        - Consider the order of application (e.g., percentages on base, then flat additions).
- [ ] **Optimization Strategies for the `AggregatedStats` Endpoint**:
  - **Main Goal:** Minimize database load and response time, as this information will be frequently queried.
  - [ ] **Advanced Caching**:
    - Implement a caching system (e.g., Redis, Memcached, or in-memory cache with short TTLs) for each player's `AggregatedStats`.
    - **Smart Cache Invalidation**:
      - Invalidate the player's cache when:
        - Their equipment changes.
        - Their level changes (if it affects base stats).
        - They join/leave a party or guild.
        - The party/guild composition changes in a way that affects buffs.
        - A party/guild buff is activated/deactivated.
    - Consider using event sourcing or messaging to trigger cache invalidations reactively.
  - [ ] **Optimized Database Queries**:
    - Ensure all queries to fetch player data, sets, party, and guild information are highly optimized (indexes, projections).
    - Minimize the number of queries needed.
  - [ ] **Efficient Calculations**:
    - Perform stat summation and modification calculations efficiently.
  - [ ] **Possible Partial Pre-calculation (if applicable)**:
    - Evaluate if certain parts of the stats can be pre-calculated.
  - [ ] **Real-time vs. Periodic Updates (for complex buffs)**:
    - Evaluate for buffs that are costly to recalculate instantly. _Prioritize real-time if possible without performance degradation._

### Frontend Tasks:

- [ ] **Display of `AggregatedStats`**:
  - [ ] Show the player's final stats in the UI (character panel, etc.).
  - [ ] Ensure the UI updates when `AggregatedStats` change.
- [ ] **(Optional) Detailed Stats Breakdown**:
  - [ ] Consider a view showing stat composition (e.g., "Health: 100 (base) + 20 (set) + 5 (party) + 15 (guild)").

## Phase 3: Guild System (Persistent Clans/Gremios)

**Objective:** Implement persistent player-run organizations (Guilds/Clans) that offer long-term social structures, progression, and benefits.

### Backend Tasks:

- [ ] **`Guild` Entity Definition**:
  - Fields: `id`, `name` (unique), `tag` (unique, short), `leaderId`, `officerIds` (list of `playerId`), `memberIds` (list of `playerId`), `maxMembers`, `description`, `publicDescription`, `recruitmentStatus` (e.g., 'open', 'application_required', 'closed'), `guildLevel`, `guildExperience`, `creationDate`, `guildMotd` (Message of the Day).
  - Consider: Guild bank, customizable ranks, guild housing/HQ, alliance/rivalry system in the future.
- [ ] **API Endpoints for Guilds (CRUD & Management)**:
  - [ ] `POST /guilds`: Create a new guild (requires name, tag; creator becomes leader).
  - [ ] `GET /guilds`: List/search existing guilds (filters: name, tag, recruitment status, level).
  - [ ] `GET /guilds/{guildId}`: Get public details of a specific guild.
  - [ ] `GET /guilds/{guildId}/internal`: Get internal/detailed details of a guild (for members).
  - [ ] `POST /guilds/{guildId}/applications`: Player submits an application to join.
  - [ ] `GET /guilds/{guildId}/applications`: Guild leaders/officers view pending applications.
  - [ ] `POST /guilds/{guildId}/applications/{applicationId}/accept`: Accept a player's application.
  - [ ] `POST /guilds/{guildId}/applications/{applicationId}/reject`: Reject a player's application.
  - [ ] `POST /guilds/{guildId}/invitations/{playerId}`: Guild leader/officer invites a player to the guild.
  - [ ] `GET /player/{playerId}/guild-invitations`: Player views their pending guild invitations.
  - [ ] `POST /guild-invitations/{invitationId}/accept`: Player accepts a guild invitation.
  - [ ] `POST /guild-invitations/{invitationId}/decline`: Player declines a guild invitation.
  - [ ] `POST /guilds/{guildId}/leave`: Player leaves their current guild.
  - [ ] `PUT /guilds/{guildId}`: Update guild public information (leader/officers with permission).
  - [ ] `PUT /guilds/{guildId}/motd`: Update guild Message of the Day (leader/officers).
  - [ ] `PUT /guilds/{guildId}/recruitment`: Update guild recruitment status and description.
  - [ ] `DELETE /guilds/{guildId}`: Disband a guild (leader only, possibly with confirmation steps or delay).
  - [ ] `GET /guilds/{guildId}/members`: List members of a guild (with ranks/roles).
  - [ ] `POST /guilds/{guildId}/members/{memberId}/promote`: Promote a guild member (leader/officers).
  - [ ] `POST /guilds/{guildId}/members/{memberId}/demote`: Demote a guild member (leader/officers).
  - [ ] `POST /guilds/{guildId}/members/{memberId}/kick`: Kick a member from the guild (leader/officers).
  - [ ] (Optional) `PUT /guilds/{guildId}/ranks`: Manage custom guild ranks and permissions.
- [ ] **Guild Membership and Role Logic**:
  - [ ] Ensure a player can only belong to one guild at a time.
  - [ ] Implement a role/permission system (e.g., Leader, Officer, Veteran, Member, Recruit).
- [ ] **Integration with Other Systems**:
  - [ ] Guild-wide buffs (e.g., based on guild level or achievements).
  - [ ] Guild-specific events, quests, or vendors.
  - [ ] Contribution systems (e.g., players contributing resources for guild upgrades).

### Frontend Tasks:

- [ ] **User Interface (UI) for Guilds**:
  - [ ] Guild browser (search, filter, view public guild profiles).
  - [ ] Guild creation interface.
  - [ ] Detailed guild view for members (member list, ranks, MOTD, internal info, management tools if permission allows).
  - [ ] Application submission UI for players.
  - [ ] Application management UI for guild leaders/officers.
  - [ ] Guild invitation management UI for players.
  - [ ] Guild management panel for leaders/officers (edit details, manage ranks, kick/promote members, update MOTD, manage recruitment).
  - [ ] Display current guild affiliation and basic info prominently.

## Phase 4: Spells System (Race-based Spells)

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

## Additional Considerations (Applicable to all Phases):

- [ ] **Unit and Integration Testing**: Fundamental, especially for stat calculation, party/guild management, and permission logic.
- [ ] **Scalability**: Design solutions with potential growth in the number of players, parties, and guilds in mind.
- [ ] **Security**: Ensure APIs are protected and players cannot unduly manipulate their stats or party/guild information.
- [ ] **Real-time Communication**: For party and guild chat, member status updates (online/offline), and notifications, consider using WebSockets or a similar real-time communication technology. This might be a separate "Core Feature" to be developed in parallel or as a prerequisite for some advanced social features.

nx g @nx/angular:library --directory=libs/features/player --lazy=true --name=feature/player --routing=true --changeDetection=OnPush --displayBlock=true --flat=true --inlineStyle=true --inlineTemplate=true --skipModule=true
