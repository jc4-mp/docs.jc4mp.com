// Class documentation metadata for inheritance system
// Each class has a name, optional parent, and its own methods/fields

export type ClassName = 'NetObjectBase' | 'NetObject' | 'NetPlayer';

export interface ClassMethod {
  name: string;
  description: string;
  returnType?: string;
}

export interface ClassDoc {
  name: ClassName;
  parent?: ClassName;
  methods: ClassMethod[];
  docLink: string;
}

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
    ],
    docLink: '/shared-api/netobjectbase',
  },
  NetObject: {
    name: 'NetObject',
    parent: 'NetObjectBase',
    methods: [], // Add NetObject-specific methods here
    docLink: '/shared-api/netobject',
  },
  NetPlayer: {
    name: 'NetPlayer',
    parent: 'NetObject',
    methods: [], // Add NetPlayer-specific methods here
    docLink: '/shared-api/netplayer',
  },
}; 