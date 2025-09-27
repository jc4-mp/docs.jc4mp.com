// Class documentation metadata for inheritance system
// Each class has a name, optional parent, and its own methods/fields

export type ClassName = 'NetObjectBase' | 'NetObjectBase_Server' | 'NetObject' | 'NetObject_Server' | 'NetPlayer' | 'NetPlayer_Server' | 'NetPlayerBase' | 'NetVehicle' | 'NetVehicle_Client' | 'NetVehicle_Server' | 'Vehicle' | 'PlayerClient' | 'PlayerClient_Client' | 'PlayerClient_Server' | 'GameObject' | 'Damageable' | 'Character' | 'NetPlayer2' | 'RigidObject';

// Events inheritance system
export type EventContextName = 'SharedEvents' | 'ClientEvents' | 'ServerEvents';

// New enum types
export interface EnumDoc {
  name: string;
  values: Array<{
    name: string;
    description: string;
  }>;
  description: string;
  docLink: string;
}

export interface EventDoc {
  name: string;
  signature: string;
  description: string;
  example?: string;
}

export interface EventContext {
  name: EventContextName;
  events: EventDoc[];
  docLink: string;
}

export interface ClassMethod {
  name: string;
  args?: string; // Optional arguments string like "(key: string, value: any)"
  description: string;
  returnType?: string;
}

export interface ClassDoc {
  name: ClassName;
  parent?: ClassName;
  methods: ClassMethod[];
  docLink: string;
}

export const enumDocs: Record<string, EnumDoc> = {
  NetObjectType: {
    name: 'NetObjectType',
    values: [
      { name: 'Player', description: 'Represents a player network object' },
      { name: 'Vehicle', description: 'Represents a vehicle network object' }
    ],
    description: 'Enum representing different types of network objects in the game',
    docLink: '/shared-api/netobjecttype'
  }
};

export const eventDocs: Record<EventContextName, EventContext> = {
  SharedEvents: {
    name: 'SharedEvents',
    events: [
      {
        name: 'OnResourceStart',
        signature: '(resource: string)',
        description: 'Called when resource starts when a client joins the server. The first argument is the name of the resource that started. If you want to enable abilities for the local player, you should do it here (only on the client).',
        example: `Event.Add("OnResourceStart", function(resource)
	if resource == Resource.Name then
		Local.UnlockAbility(Ability.GrapplingHook)
		Local.UnlockAbility(Ability.Parachute)
		Local.UnlockAbility(Ability.Wingsuit)
		Local.UnlockAbility(Ability.ExitVehicle)
	end
end)`
      },
      {
        name: 'OnResourceStop',
        signature: '(resource: string)',
        description: 'Called when resource stops. The first argument is the name of the resource that stopped.'
      },
      {
        name: 'OnPlayerDamage',
        signature: '(player: NetPlayer, damager: NetObject, loss: number, hitbone: number, weaponHash: number, hitposition: vec3)',
        description: 'This event fires when a player is damaged. Use Event.Cancel() (only on the server) to prevent the player from taking damage.'
      },
      {
        name: 'OnPlayerKilled',
        signature: '(player: NetPlayer, damager: NetObject, loss: number, hitbone: number, weaponHash: number, hitposition: vec3)',
        description: 'This event fires when a player is killed. Parameters match OnPlayerDamage event for consistency.'
      },
      {
        name: 'OnVehicleDestroy',
        signature: '(vehicle: NetVehicle, damager: NetObject, loss: number, hitbone: number, weaponHash: number, hitposition: vec3)',
        description: 'This event fires when a vehicle is destroyed.'
      },
      {
        name: 'OnVehicleDamage',
        signature: '(vehicle: NetVehicle, damager: NetObject, loss: number, hitbone: number, weaponHash: number, hitposition: vec3)',
        description: 'This event fires when a vehicle is damaged.'
      },
      {
        name: 'OnPlayerTeleport',
        signature: '(player: NetPlayer)',
        description: 'This event fires when a player teleports (via [NetPlayer:Teleport](/server-api/netplayer)).'
      },
      {
        name: 'OnChat',
        signature: '(NetPlayer sender, string msg)',
        description: 'This event fires when a player sends a chat message. On the server, use `Event.Cancel()` to block the message.'
      }
    ],
    docLink: '/shared-api/events',
  },
  ClientEvents: {
    name: 'ClientEvents',
    events: [
      {
        name: 'OnClientJoin',
        signature: '()',
        description: 'Called when the local client joins the server.'
      },
      {
        name: 'OnRender',
        signature: '()',
        description: 'Called every frame. Use the `Render` event to draw elements to the screen underneath the JC4MP UI, such as the chat window. Learn more [here](/client-api/render).'
      },
      {
        name: 'OnPostRender',
        signature: '()',
        description: 'Called every frame. Use the `PostRender` event to draw elements to the screen on top of the JC4MP UI, such as the chat window. This is good for full-screen overlays, such as fading to black for transitions. Learn more [here](/client-api/render).'
      },
      {
        name: 'OnVehicleExplode',
        signature: '(vehicle: NetVehicle)',
        description: 'This event fires when a vehicle explodes. Only available on the client side.'
      },
      {
        name: 'OnVehiclePartChangedState',
        signature: '(vehicle: NetVehicle, part: VehiclePart, state: VehiclePartState)',
        description: 'This event is called when a part of a vehicle changes state, such as the door opening on the carrier plane.'
      },
      {
        name: 'OnPlayerRagdollStart',
        signature: '(player: NetPlayer)',
        description: 'This event fires when a player starts ragdolling (enters ragdoll state).'
      },
      {
        name: 'OnPlayerRagdollEnd',
        signature: '(player: NetPlayer)',
        description: 'This event fires when a player stops ragdolling (exits ragdoll state).'
      },
      {
        name: 'OnVehicleNitrousUse',
        signature: '(vehicle: NetVehicle)',
        description: 'This event fires when a vehicle uses nitrous boost.'
      },
      {
        name: 'OnVehicleTurboJump',
        signature: '(vehicle: NetVehicle)',
        description: 'This event fires when a vehicle performs a turbo jump.'
      },
      {
        name: 'OnVehicleCollision',
        signature: '(vehicle: NetVehicle, position: vec3, normal: vec3, impulse: float)',
        description: 'This event fires when a vehicle collides with something, providing collision details including position, surface normal, and impact impulse.'
      },
      {
        name: 'OnWaypointPlace',
        signature: '()',
        description: 'This event fires when a waypoint is placed. This event is cancellable with Event.Cancel().'
      },
      {
        name: 'OnWaypointRemove',
        signature: '(reached: bool)',
        description: 'This event fires when a waypoint is removed. The reached parameter indicates if the waypoint was removed when the local player reached it (true) or for another reason (false). This event is cancellable with Event.Cancel().'
      }
    ],
    docLink: '/client-api/events',
  },
  ServerEvents: {
    name: 'ServerEvents',
    events: [
      {
        name: 'OnResourceStart',
        signature: '(resource: string)',
        description: 'Called when a resource is started on the server.'
      },
      {
        name: 'OnPlayerJoin',
        signature: '(player: PlayerClient)',
        description: 'This fires when a [player client](./playerclient) joins the server. This does not guarantee that the player has loaded their scripts yet, so do not try to send them data yet.',
        example: `Event.Add("OnPlayerJoin", function(player)
    print("Player " .. player:GetNick() .. " joined the server!")
end)`
      },
      {
        name: 'OnPlayerQuit',
        signature: '(player: PlayerClient)',
        description: 'This fires when a [player client](./playerclient) leaves the server.',
        example: `Event.Add("OnPlayerQuit", function(player)
    print("Player " .. player:GetNick() .. " left the server!")
end)`
      },
      {
        name: 'OnPreTick',
        signature: '()',
        description: 'This fires every tick on the server _before_ any server logic is run.',
        example: `Event.Add("OnPreTick", function()
    print("PreTick! Elapsed seconds: " .. tostring(Server.GetElapsedSeconds()))
end)`
      },
      {
        name: 'OnPostTick',
        signature: '()',
        description: 'This fires every tick on the server _after_ all server logic is run.',
        example: `Event.Add("OnPostTick", function()
    print("PostTick! Elapsed seconds: " .. tostring(Server.GetElapsedSeconds()))
end)`
      },
      {
        name: 'OnPlayerResourceAction',
        signature: '(player: PlayerClient, resource: string, action: ResourceAction)',
        description: 'This fires when a player\'s resource is started, stopped, or restarted. See [ResourceAction](/shared-api/resourceaction) for more information on types of actions. If you want to send data to a player when they connect, you should do it here since there resource is fully loaded (on ResourceAction.Start).',
        example: `Event.Add("OnPlayerResourceAction", function(player, resource, action)
    print("Player " .. player:GetNick() .. " " .. action .. " resource " .. resource)
end)`
      },
      {
        name: 'OnPlayerVehicleEnter',
        signature: '(player: NetPlayer, vehicle: NetVehicle, seat: VehicleSeat, occupant: NetPlayer)',
        description: 'This event fires when a player enters a vehicle. Provides information about the player, vehicle, seat, and any previous occupant.'
      },
      {
        name: 'OnPlayerVehicleExit',
        signature: '(player: NetPlayer, vehicle: NetVehicle, seat: VehicleSeat)',
        description: 'This event fires when a player exits a vehicle. Provides information about the player, vehicle, and seat they exited from.'
      }
    ],
    docLink: '/server-api/events',
  },
};

export const classDocs: Record<ClassName, ClassDoc> = {
  NetObjectBase: {
    name: 'NetObjectBase',
    methods: [
      { name: 'GetPosition', description: 'Returns the position of the object.', returnType: 'vec3' },
      { name: 'GetRotation', description: 'Returns the rotation of the object.', returnType: 'quat' },
      { name: 'GetEulerRotation', description: 'Returns the euler rotation of the object.', returnType: 'vec3' },
      { name: 'GetHealth', description: 'Returns the current health of the object.', returnType: 'number' },
      { name: 'GetMaxHealth', description: 'Returns the maximum health of the object.', returnType: 'number' },
      { name: 'GetVelocity', description: 'Returns the velocity of the object.', returnType: 'vec3' },
      { name: 'GetNetId', description: 'Returns the network ID of the object.', returnType: 'number' },
      { name: 'SetData', args: '(key: string, value: any)', description: 'Sets generic data on the object. Value must be a number, string, bool, vec2, vec3, vec4, or quat. Returns true if the data was set successfully, false otherwise (for unsupported types).', returnType: 'boolean' },
      { name: 'GetData', args: '(key: string)', description: 'Gets generic data from the object.', returnType: 'any' },
      { name: 'AsPlayer', description: 'Returns NetPlayer instance if the object is a player, nil otherwise.', returnType: 'NetPlayer | nil' },
      { name: 'AsVehicle', description: 'Returns NetVehicle instance if the object is a vehicle, nil otherwise.', returnType: 'NetVehicle | nil' },
      { name: 'GetType', description: 'Returns the network object type. Use NetObjectType enum to compare types.', returnType: 'NetObjectType' },
    ],
    docLink: '/shared-api/netobjectbase',
  },
  NetObjectBase_Server: {
    name: 'NetObjectBase_Server',
    parent: 'NetObjectBase',
    methods: [
      { name: 'SetData', args: '(key: string, value: any, broadcast: bool)', description: 'Sets generic data on the object. Value must be a number, string, bool, vec2, vec3, vec4, or quat. If broadcast is true, the data will be synchronized to all clients. Returns true if the data was set successfully, false otherwise (for unsupported types).', returnType: 'boolean' },
    ],
    docLink: '/server-api/netobjectbase',
  },
  NetObject: {
    name: 'NetObject',
    parent: 'NetObjectBase',
    methods: [], // Add NetObject-specific methods here
    docLink: '/shared-api/netobject',
  },
  NetObject_Server: {
    name: 'NetObject_Server',
    parent: 'NetObjectBase_Server',
    methods: [
      { name: 'SetPosition', args: '(position: vec3)', description: 'Sets the position of the network object. This change is synchronized to all players.', returnType: 'void' },
      { name: 'SetRotation', args: '(rotation: quat)', description: 'Sets the rotation of the network object. This change is synchronized to all players.', returnType: 'void' },
      { name: 'SetVelocity', args: '(velocity: vec3)', description: 'Sets the velocity of the network object. This change is synchronized to all players.', returnType: 'void' }
    ], // Add NetObject_Server-specific methods here
    docLink: '/server-api/netobject',
  },
  NetPlayer: {
    name: 'NetPlayer',
    parent: 'NetObject',
    methods: [
      { name: 'Respawn', description: 'Respawns the player.', returnType: 'void' },
    ], // Add NetPlayer-specific methods here
    docLink: '/shared-api/netplayer',
  },
  NetPlayer2: {
    name: 'NetPlayer',
    parent: 'NetPlayerBase',
    methods: [
      { name: 'GetAimPosition', args: '()', returnType: 'vec3', description: 'Returns the player\'s current aim position, based on the weapon they have equipped. For example, if the player does not have a weapon, this position will only reach out as far as the grappling hook goes (about 80m).' },
      { name: 'GoRagdoll', description: 'Forces the Character into the ragdoll state.' },
      { name: 'IsRagdolling', description: 'Returns true if the Character is currently ragdolling, false otherwise.', returnType: 'boolean' },
      { name: 'IsGettingUpFromRagdoll', description: 'Returns true if the Character is currently getting up from ragdoll, false otherwise.', returnType: 'boolean' },
      { name: 'UsingParachute', description: 'Returns true if the Character is using a parachute, false otherwise.', returnType: 'boolean' },
      { name: 'UsingWingsuit', description: 'Returns true if the Character is using a wingsuit, false otherwise.', returnType: 'boolean' },
      { name: 'GetPlayer', description: 'Returns the Player associated with this Character.', returnType: 'Player' },
      { name: 'GetBonePosition', args: '(bone: Bone)', description: 'Gets the world position of a specific bone on a character.', returnType: 'vec3' },
      { name: 'GetVehicle', description: 'Returns the Vehicle instance that the character is currently in. Returns nil if the character is not in a vehicle.', returnType: 'Vehicle | nil' },
      { name: 'SetGhostMode', args: '(enabled: bool)', description: 'Enables or disables ghost mode. When ghost mode is enabled, all collisions will be disabled for the character, allowing them to pass through entities, objects, and terrain.' },
      { name: 'SetCloaked', args: '(enabled: bool)', description: 'Enables or disables cloaked mode. When cloaked mode is enabled, the character will become mostly invisible with a shine on them.' },
      { name: 'SetOpacity', args: '(opacity: number)', description: 'Sets the opacity of the character. Takes a value from 0-1 where 0 means invisible and 1 means fully opaque.' },
      { name: 'GetGrappleTargetObject', args: '()', description: 'Returns the object that the player is targeting with their grappling hook, or nil if there is none.', returnType: 'NetObject | nil' },
    ], // Add NetPlayer-specific methods here
    docLink: '/client-api/netplayer',
  },
  NetPlayer_Server: {
    name: 'NetPlayer_Server',
    parent: 'NetObject_Server',
    methods: [], // Add NetPlayer_Server-specific methods here
    docLink: '/server-api/netplayer',
  },
  NetPlayerBase: {
    name: 'NetPlayerBase',
    methods: [
      { name: 'GetNick', description: "Returns the player's nickname directly from the NetPlayerBase without needing to access the client.", returnType: 'string' },
      { name: 'GetClient', description: 'Returns the PlayerClient instance corresponding to this NetPlayerBase.', returnType: 'PlayerClient' },
      { name: 'GetVehicle', description: 'Returns the Vehicle that the player is currently in. Returns nil if the player is not in a vehicle.', returnType: 'Vehicle | nil' },
    ],
    docLink: '/shared-api/netplayerbase',
  },
  NetVehicle: {
    name: 'NetVehicle',
    parent: 'NetObject',
    methods: [
      { name: 'GetId', description: 'Returns the ID of the vehicle.', returnType: 'number' },
      { name: 'GetVelocity', description: 'Gets the vector3 velocity of the vehicle.', returnType: 'vec3' },
      { name: 'IsWheelDrifting', description: 'Returns true if the specified wheel is currently drifting, false otherwise. Wheel is the index of the wheel to check, and threshold is the threshold where it returns true. Threshold should be a value between 0 and 1 where a low value will detect drifting more easily.', args: '(wheel: number, threshold: number)', returnType: 'boolean' },
      { name: 'GetNumberOfWheelsOnGround', description: 'Returns the number of wheels of the vehicle that are currently touching the ground.', returnType: 'number' },
      { name: 'SetCloak', description: 'Enables or disables cloaked mode. When cloaked mode is enabled, the vehicle will become mostly invisible with a shine on them.', args: '(enabled: bool)', returnType: 'void' },
    ],
    docLink: '/shared-api/netvehicle',
  },
  NetVehicle_Client: {
    name: 'NetVehicle_Client',
    parent: 'NetVehicle',
    methods: [
      { name: 'SetPartState', args: '(part: VehiclePart, state: VehiclePartState)', description: 'Transitions a [vehicle part](/shared-api/vehiclepart) to the specified state with animation. Only [VehiclePartState.Open](/shared-api/vehiclepartstate) and [VehiclePartState.Closed](/shared-api/vehiclepartstate) states are supported. Use [VehiclePartState.Open](/shared-api/vehiclepartstate) to animate the part opening, and [VehiclePartState.Closed](/shared-api/vehiclepartstate) to animate the part closing. The state change is not instant - the part will transition smoothly over time.', returnType: 'void' },
    ],
    docLink: '/client-api/netvehicle',
  },
  NetVehicle_Server: {
    name: 'NetVehicle_Server',
    parent: 'NetVehicle',
    methods: [
      { name: 'SetPrimaryColor', args: '(r: number, g: number, b: number)', description: 'Sets the primary color of the vehicle. RGB values should be floats between 0 and 1.', returnType: 'void' },
      { name: 'SetSecondaryColor', args: '(r: number, g: number, b: number)', description: 'Sets the secondary color of the vehicle. RGB values should be floats between 0 and 1.', returnType: 'void' },
      { name: 'SetTertiaryColor', args: '(r: number, g: number, b: number)', description: 'Sets the tertiary color of the vehicle. RGB values should be floats between 0 and 1.', returnType: 'void' },
      { name: 'SetSpecularGloss', args: '(value: number)', description: 'Sets the specular gloss of the vehicle. Value should be a float between 0 and 1.', returnType: 'void' },
      { name: 'SetClearCoat', args: '(value: number)', description: 'Sets the clear coat value of the vehicle. Value should be a float between 0 and 1.', returnType: 'void' },
      { name: 'SetMetallic', args: '(value: number)', description: 'Sets the metallic value of the vehicle. Value should be a float between 0 and 1.', returnType: 'void' },
      { name: 'SetDirt', args: '(value: number)', description: 'Sets the dirt level of the vehicle. Value should be a float between 0 and 1, although higher values can make the vehicle extremely dirty.', returnType: 'void' },
    ],
    docLink: '/server-api/netvehicle',
  },
  Vehicle: {
    name: 'Vehicle',
    parent: 'Damageable',
    methods: [
      { name: 'GO', description: 'Returns the GameObject (GO) of the vehicle, used to modify transform.', returnType: 'GameObject' },
    ],
    docLink: '/client-api/vehicle',
  },
  PlayerClient: {
    name: 'PlayerClient',
    methods: [
      { name: 'GetNetPlayer', description: 'Returns the NetPlayer associated with this PlayerClient.', returnType: 'NetPlayer' },
      { name: 'GetNick', description: "Returns the player's nickname as a string.", returnType: 'string' },
      { name: 'GetSteamId', description: "Returns the player's Steam ID as a string.", returnType: 'string' },
      { name: 'GetNetId', description: "Returns the player's network ID as a number.", returnType: 'number' },
      { name: 'GetPing', description: "Returns the player's ping as a number.", returnType: 'number' },
    ],
    docLink: '/shared-api/playerclient',
  },
  PlayerClient_Client: {
    name: 'PlayerClient_Client',
    parent: 'PlayerClient',
    methods: [],
    docLink: '/client-api/playerclient',
  },
  PlayerClient_Server: {
    name: 'PlayerClient_Server',
    parent: 'PlayerClient',
    methods: [],
    docLink: '/server-api/playerclient',
  },
  GameObject: {
    name: 'GameObject',
    methods: [
      { name: 'GetPosition', description: 'Returns the position of the game object.', returnType: 'vec3' },
      { name: 'GetRotation', description: 'Returns the rotation of the game object.', returnType: 'quat' },
      { name: 'GetEulerRotation', description: 'Returns the euler rotation of the game object.', returnType: 'vec3' },
    ],
    docLink: '/client-api/gameobject',
  },
  Damageable: {
    name: 'Damageable',
    parent: 'GameObject',
    methods: [
      { name: 'GetHP', description: 'Returns the health of the damageable.', returnType: 'number' },
    ],
    docLink: '/client-api/damageable',
  },
  RigidObject: {
    name: 'RigidObject',
    parent: 'NetObject',
    methods: [
    ],
    docLink: '/shared-api/rigidobject',
  },
  Character: {
    name: 'Character',
    parent: 'Damageable',
    methods: [
      { name: 'GO', args: '()', description: 'Returns the GameObject instance of the character.' },
    ],
    docLink: '/client-api/character',
  },
}; 