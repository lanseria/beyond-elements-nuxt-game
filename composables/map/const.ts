import type { LayerSpecification, LngLatLike, StyleSpecification } from 'maplibre-gl'

export const MAP_MAPBOX_TOKEN = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2wxMGo5ZWk3MTF3dTNkcnRwcDMyMXowOSJ9.kxLDvTThtaU0uiBOXanNvA'

export const MAP_INIT_CENTER: LngLatLike = [122.1335, 30.0910]
export const MAP_INIT_ZOOM = 5

export const MAP_BASE_LAYER = [
  // 'google-maps-m',
  'google-maps-s',
]
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
const COMPUTED_LAYERS: LayerSpecification = MAP_BASE_LAYER.map((item, index) => {
  return {
    id: `${item}-layer`,
    type: 'raster',
    source: item,
    layout: { visibility: index === 0 ? 'visible' : 'none' },
  }
})
export const MAP_STYLE: StyleSpecification = {
  version: 8,
  name: 'Basic',
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  sources: {
    // 'google-maps-m': {
    //   type: 'raster',
    //   tiles: [
    //     '/assets/map/google/vt/m/{x}/{y}/{z}.png',
    //   ],
    //   tileSize: 256,
    // },
    'google-maps-s': {
      type: 'raster',
      tiles: [
        'http://bmcr1-wtr-r1:20004/gis/map/google/vt/s/{x}/{y}/{z}.png',
      ],
      tileSize: 256,
    },
  },
  layers: [
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    ...COMPUTED_LAYERS,
  ],
}
