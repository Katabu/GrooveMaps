//TODO: refine this interface
export type EventData = {
    id: number;
    title: string;
    description: string;
    date: string;
    coordinates: [number, number] // [lng, lat]
}

export interface MapboxFeature {
  id: string;
  type: string; // often "Feature"
  place_type: string[];
  relevance: number;
  properties: MapboxProperties;
  text_en_US: string;
  language_en_US: string;
  place_name_en_US: string;
  text: string;
  language: string;
  place_name: string;
  bbox: [number, number, number, number];
  center: [number, number];
  geometry: Geometry;
  context: ContextEntry[];
  _source: string;
}

export interface MapboxProperties {
  mapbox_id: string;
  wikidata: string;
}

export interface Geometry {
  type: string; // often "Point"
  coordinates: [number, number];
}

export interface ContextEntry {
  id: string;
  mapbox_id: string;
  wikidata: string;
  short_code?: string;       // Not all context items have short_code
  text_en_US?: string;       // Some context items have separate localized text
  language_en_US?: string;   // Some context items have separate localized language
  text: string;
  language: string;
}
