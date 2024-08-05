<script lang="ts" setup>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { vElementSize } from '@vueuse/components'

// (maplibregl.accessToken as any)
//   = MAP_MAPBOX_TOKEN

const mapContainer = shallowRef()

const debouncedFnMapResize = useDebounceFn(() => {
  window.map.resize()
}, 100, { maxWait: 500 })

onMounted(() => {
  const map = new maplibregl.Map({
    container: mapContainer.value,
    style: MAP_STYLE,
    center: MAP_INIT_CENTER,
    zoom: MAP_INIT_ZOOM,
    hash: true,
  })
  window.map = map

  const navControl = new maplibregl.NavigationControl()
  map.addControl(navControl, 'bottom-left')

  map.on('load', () => {
    // map.resize()
    // mapStoreLoaded.value = true
    // mapLoadImages()
  })
})
onUnmounted(() => {
  // mapStoreLoaded.value = false
})
function onResize() {
  debouncedFnMapResize()
}
</script>

<template>
  <div ref="mapContainer" v-element-size="onResize" class="relative flex-x-hidden overflow-hidden" />
</template>
