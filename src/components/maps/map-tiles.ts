/** Tile URL for Leaflet — OpenStreetMap default, optional Mapbox vector tiles */
export function getTileLayerUrl() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const provider = process.env.NEXT_PUBLIC_MAP_PROVIDER ?? "leaflet";

  if (provider === "mapbox" && token) {
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${token}`;
  }

  return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
}

export function getTileAttribution() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const provider = process.env.NEXT_PUBLIC_MAP_PROVIDER ?? "leaflet";

  if (provider === "mapbox" && token) {
    return '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; OpenStreetMap';
  }

  return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
}

export function getTileOptions() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const provider = process.env.NEXT_PUBLIC_MAP_PROVIDER ?? "leaflet";

  if (provider === "mapbox" && token) {
    return { tileSize: 512, zoomOffset: -1 };
  }

  return {};
}
