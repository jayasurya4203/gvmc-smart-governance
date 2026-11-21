export const GVMC_MAP_CENTER = { lat: 17.6868, lng: 83.2185 };
export const GVMC_DEFAULT_ZOOM = 12;

export const FLOOD_ZONE_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Rushikonda low-lying", risk: "high" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [83.345, 17.755],
            [83.365, 17.755],
            [83.365, 17.77],
            [83.345, 17.77],
            [83.345, 17.755],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Gajuwaka drainage basin", risk: "medium" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [83.19, 17.605],
            [83.22, 17.605],
            [83.22, 17.635],
            [83.19, 17.635],
            [83.19, 17.605],
          ],
        ],
      },
    },
  ],
};

export function parseWardBoundary(boundaryGeo: string) {
  return JSON.parse(boundaryGeo) as {
    type: "Polygon";
    coordinates: number[][][];
  };
}
