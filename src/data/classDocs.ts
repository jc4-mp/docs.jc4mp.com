// Class documentation metadata for inheritance system
// Each class has a name, optional parent, and its own methods/fields

export type ClassName = 'NetObjectBase' | 'NetObjectBase_Server' | 'NetObject' | 'NetObject_Server' | 'NetPlayer' | 'NetPlayer_Server' | 'NetPlayerBase' | 'NetVehicle' | 'NetVehicle_Client' | 'Vehicle' | 'PlayerClient' | 'PlayerClient_Client' | 'PlayerClient_Server' | 'GameObject' | 'Damageable' | 'Character';

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
        name: 'ResourceStart',
        signature: '(resource: string)',
        description: 'Called when resource starts when a client joins the server. The first argument is the name of the resource that started. If you want to enable abilities for the local player, you should do it here (only on the client).',
        example: `Event.Add("ResourceStart", function(resource)
	if resource == Resource.Name then
		Local.UnlockAbility(Ability.GrapplingHook)
		Local.UnlockAbility(Ability.Parachute)
		Local.UnlockAbility(Ability.Wingsuit)
		Local.UnlockAbility(Ability.ExitVehicle)
	end
end)`
      },
      {
        name: 'ResourceStop',
        signature: '(resource: string)',
        description: 'Called when resource stops. The first argument is the name of the resource that stopped.'
      },
      {
        name: 'PlayerDamage',
        signature: '(player: NetPlayer, damager: NetObject, loss: number, hitbone: number, weaponHash: number, hitposition: vec3)',
        description: 'This event fires when a player is damaged. Use Event.Cancel() (only on the client) to prevent the player from taking damage.'
      },
      {
        name: 'PlayerKilled',
        signature: '(player: NetPlayer, damager: NetObject, loss: number, hitbone: number, weaponHash: number, hitposition: vec3)',
        description: 'This event fires when a player is killed. Parameters match PlayerDamage event for consistency.'
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
      }
    ],
    docLink: '/shared-api/events',
  },
  ClientEvents: {
    name: 'ClientEvents',
    events: [
      {
        name: 'ClientJoin',
        signature: '()',
        description: 'Called when the local client joins the server.'
      },
      {
        name: 'Render',
        signature: '()',
        description: 'Called every frame. Use the `Render` event to draw elements to the screen underneath the JC4MP UI, such as the chat window. Learn more [here](/client-api/render).'
      },
      {
        name: 'PostRender',
        signature: '()',
        description: 'Called every frame. Use the `PostRender` event to draw elements to the screen on top of the JC4MP UI, such as the chat window. This is good for full-screen overlays, such as fading to black for transitions. Learn more [here](/client-api/render).'
      },
      {
        name: 'VehicleCollision',
        signature: '(vehicle: Vehicle)',
        description: 'This event fires when a vehicle collides with something.'
      },
      {
        name: 'OnVehicleExplode',
        signature: '(vehicle: NetVehicle)',
        description: 'This event fires when a vehicle explodes. Only available on the client side.'
      }
    ],
    docLink: '/client-api/events',
  },
  ServerEvents: {
    name: 'ServerEvents',
    events: [
      {
        name: 'ResourceStart',
        signature: '(resource: string)',
        description: 'Called when a resource is started on the server.'
      },
      {
        name: 'PlayerJoin',
        signature: '(player: PlayerClient)',
        description: 'This fires when a [player client](./playerclient) joins the server. This does not guarantee that the player has loaded their scripts yet, so do not try to send them data yet.',
        example: `Event.Add("PlayerJoin", function(player)
    print("Player " .. player:GetNick() .. " joined the server!")
end)`
      },
      {
        name: 'PlayerQuit',
        signature: '(player: PlayerClient)',
        description: 'This fires when a [player client](./playerclient) leaves the server.',
        example: `Event.Add("PlayerQuit", function(player)
    print("Player " .. player:GetNick() .. " left the server!")
end)`
      },
      {
        name: 'PreTick',
        signature: '()',
        description: 'This fires every tick on the server _before_ any server logic is run.',
        example: `Event.Add("PreTick", function()
    print("PreTick! Elapsed seconds: " .. tostring(Server.GetElapsedSeconds()))
end)`
      },
      {
        name: 'PostTick',
        signature: '()',
        description: 'This fires every tick on the server _after_ all server logic is run.',
        example: `Event.Add("PostTick", function()
    print("PostTick! Elapsed seconds: " .. tostring(Server.GetElapsedSeconds()))
end)`
      },
      {
        name: 'PlayerResourceAction',
        signature: '(player: PlayerClient, resource: string, action: ResourceAction)',
        description: 'This fires when a player\'s resource is started, stopped, or restarted. See [ResourceAction](/shared-api/resourceaction) for more information on types of actions. If you want to send data to a player when they connect, you should do it here since there resource is fully loaded (on ResourceAction.Start).',
        example: `Event.Add("PlayerResourceAction", function(player, resource, action)
    print("Player " .. player:GetNick() .. " " .. action .. " resource " .. resource)
end)`
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
      { name: 'GetRotation', description: 'Returns the rotation of the object.', returnType: 'vec3' },
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
    methods: [], // Add NetObject_Server-specific methods here
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
    ],
    docLink: '/shared-api/netplayerbase',
  },
  NetVehicle: {
    name: 'NetVehicle',
    parent: 'NetObject',
    methods: [
      { name: 'GetId', description: 'Returns the ID of the vehicle.', returnType: 'number' },
    ],
    docLink: '/shared-api/netvehicle',
  },
  NetVehicle_Client: {
    name: 'NetVehicle_Client',
    parent: 'NetVehicle',
    methods: [
      { name: 'GI', description: 'Returns the game instance (GI) of the NetVehicle, which is a Vehicle.', returnType: 'Vehicle' },
    ],
    docLink: '/client-api/netvehicle',
  },
  Vehicle: {
    name: 'Vehicle',
    parent: 'Damageable',
    methods: [
      { name: 'GO', description: 'Returns the GameObject (GO) of the vehicle, used to modify transform.', returnType: 'GameObject' },
      { name: 'GetVelocity', description: 'Gets the vector3 velocity of the vehicle.', returnType: 'vec3' },
      { name: 'GetNumberOfWheelsOnGround', description: 'Returns the number of wheels of the vehicle that are currently touching the ground.', returnType: 'number' },
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
  Character: {
    name: 'Character',
    parent: 'Damageable',
    methods: [
      { name: 'SetPosition', args: '(pos: vec3)', description: 'Sets the Character\'s position in the world. Do not use this to teleport the local character; use NetPlayer:Teleport(pos) on the server instead.' },
      { name: 'SetLinearVelocity', args: '(velocity: vec3)', description: 'Sets the Character\'s linear velocity.' },
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
    ],
    docLink: '/client-api/character',
  },
}; 