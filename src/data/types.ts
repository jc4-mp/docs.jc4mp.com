export interface ApiDataMethod {
    name: string;
    description: string;
}

export interface ApiDataField {
    name: string;
    description: string;
}

export interface ApiData {
    methods: ApiDataMethod[];
    fields: ApiDataField[];
}