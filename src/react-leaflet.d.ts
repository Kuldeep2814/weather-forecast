// declare module "react-leaflet" {
//   import {
//     LeafletEvent,
//     LeafletMouseEvent,
//     CRS,
//     LatLng,
//     LatLngBounds,
//     Point,
//   } from "leaflet";
//   import * as React from "react";
//   import { TileLayer, Popup } from "leaflet";

//   export { CRS, LatLng, LatLngBounds, Point } from "leaflet";

//   export interface TileLayerProps {
//     [key: string]: any;
//     url: string;
//     attribution?: string;
//     pane?: string;
//     zIndex?: number;
//     interactive?: boolean;
//     crossOrigin?: boolean | string;
//     errorTileUrl?: string;
//     tileSize?: number | { x: number; y: number };
//     opacity?: number;
//     updateWhenIdle?: boolean;
//     updateWhenZooming?: boolean;
//     updateInterval?: number;
//     zIndexOffset?: number;
//     bounds?: [[number, number], [number, number]];
//     minZoom?: number;
//     maxZoom?: number;
//     noWrap?: boolean;
//     className?: string;
//     keepBuffer?: number;
//     zoomOffset?: number;
//     tms?: boolean;
//     zoomReverse?: boolean;
//     detectRetina?: boolean;
//     unloadInvisibleTiles?: boolean;
//     reUseTiles?: boolean;
//     accessToken?: string;
//     subdomains?: string | string[];
//     id?: string;
//     tileSize: number | { x: number; y: number };
//   }

//   export class TileLayer extends React.Component<TileLayerProps> {}

//   export interface PopupProps {
//     [key: string]: any;
//     position: [number, number];
//     children?: React.ReactNode;
//     onClose?: () => void;
//   }

//   export class Popup extends React.Component<PopupProps> {}

//   export type MapContainerProps = {
//     [key: string]: any;
//     center?: [number, number];
//     children: React.ReactNode;
//     className?: string;
//     id?: string;
//     maxBounds?: [[number, number], [number, number]];
//     maxZoom?: number;
//     minZoom?: number;
//     style?: React.CSSProperties;
//     zoom?: number;
//     zoomControl?: boolean;
//     attributionControl?: boolean;
//     doubleClickZoom?: boolean;
//     scrollWheelZoom?: boolean;
//     dragging?: boolean;
//     keyboard?: boolean;
//     tap?: boolean;
//     touchZoom?: boolean;
//     zoomAnimation?: boolean;
//     closePopupOnClick?: boolean;
//     bounceAtZoomLimits?: boolean;
//     zoomSnap?: number;
//     zoomDelta?: number;
//     trackResize?: boolean;
//     worldCopyJump?: boolean;
//     animate?: boolean;
//     updateWhenIdle?: boolean;
//     updateWhenZooming?: boolean;
//     updateInterval?: number;
//     bounds?: [[number, number], [number, number]];
//     maxBoundsViscosity?: number;
//     boxZoom?: boolean;
//     crs?: any;
//     renderer?: any;
//     inertia?: boolean;
//     inertiaDeceleration?: number;
//     inertiaMaxSpeed?: number;
//     easeLinearity?: number;
//     worldCopyJump?: boolean;
//     maxBounds?: [[number, number], [number, number]];
//     keyboardPanDelta?: number;
//     scrollWheelZoom?: boolean | "center" | "nearest";
//     wheelDebounceTime?: number;
//     wheelPxPerZoomLevel?: number;
//     tap?: boolean;
//     tapTolerance?: number;
//     touchZoom?: boolean | "center" | "nearest";
//     zoomControl?: boolean;
//     zoomSnap?: number;
//     zoomDelta?: number;
//     path?: any;
//     attribution?: string;
//     pane?: string;
//     zoom?: number;
//     animate?: boolean;
//     duration?: number;
//     easeLinearity?: number;
//     noClip?: boolean;
//   };

//   export class MapContainer extends React.Component<MapContainerProps> {}

//   // Add other components and types as needed

//   // Example:
//   export interface MarkerProps extends LeafletEvent {
//     [key: string]: any;
//     position: [number, number];
//     icon?: any;
//     zIndexOffset?: number;
//     opacity?: number;
//     draggable?: boolean;
//     riseOnHover?: boolean;
//     riseOffset?: number;
//     children?: React.ReactNode;
//   }
//   interface MarkerProps {
//     position: [number, number];
//   }

//   export class Marker extends React.Component<MarkerProps> {}
// }
