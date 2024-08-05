import type { LabelValue, MapTilesPaginationQuery, MapTilesQuery, MapTilesRecord, R_P, R_Pagination } from '~/types'

export function initMapTilesRecord(): MapTilesRecord {
  return {
    id: '',
    code: '',
    name: '',
    minZoom: 0,
    maxZoom: 0,
    createdAt: 0,
    updatedAt: 0,
  }
}

export function initMapTilesQuery(): MapTilesQuery {
  return {
    code: '',
    name: '',
  }
}
export function queryMapTilesPage(query: MapTilesPaginationQuery): R_Pagination<MapTilesRecord> {
  return $fetch('/api/admin/map_tiles/page', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
    query,
  })
}

export function postMapTiles(body: MapTilesRecord): R_P<MapTilesRecord> {
  return $fetch('/api/admin/map_tiles', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function putMapTiles(body: MapTilesRecord): R_P<MapTilesRecord> {
  return $fetch('/api/admin/map_tiles', {
    method: 'PUT',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteMapTiles(body: string[]): R_P<MapTilesRecord[]> {
  return $fetch('/api/admin/map_tiles', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteMapTilesById(data: string): R_P<MapTilesRecord[]> {
  return deleteMapTiles([data])
}

export function queryMapTilesList(): R_P<LabelValue[]> {
  return $fetch('/api/admin/map_tiles/list', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}
