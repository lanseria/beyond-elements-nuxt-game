import type { CityTilesPaginationQuery, CityTilesPostData, CityTilesQuery, CityTilesRecord, CityTilesTaskPostData, R_P, R_Pagination } from '~/types'

export function initCityTilesRecord(): CityTilesRecord {
  return {
    id: '',
    cityId: '',
    cityName: '',
    cityCode: '',
    tileId: '',
    tileName: '',
    tileCode: '',
    zoomStatus: [],
    createdAt: 0,
    updatedAt: 0,
  }
}

export function initCityTilesQuery(): CityTilesQuery {
  return {
    cityName: '',
    cityCode: '',
    tileName: '',
    tileCode: '',
  }
}

export function initCityTilesPostData(): CityTilesPostData {
  return {
    cityId: '',
    tileId: '',
  }
}

export function initCityTilesTaskPostData(): CityTilesTaskPostData {
  return {
    id: '',
    zoom: '',
  }
}

export function queryCityTilesPage(query: CityTilesPaginationQuery): R_Pagination<CityTilesRecord> {
  return $fetch('/api/admin/city_tiles/page', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
    query,
  })
}

export function postCityTiles(body: CityTilesRecord): R_P<CityTilesRecord> {
  return $fetch('/api/admin/city_tiles', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteCityTiles(body: string[]): R_P<CityTilesRecord[]> {
  return $fetch('/api/admin/city_tiles', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteCityTilesById(data: string): R_P<CityTilesRecord[]> {
  return deleteCityTiles([data])
}

export function resetCityTiles(body: string[]): R_P<CityTilesRecord[]> {
  return $fetch('/api/admin/city_tiles/reset', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function resetCityTilesById(data: string): R_P<CityTilesRecord[]> {
  return resetCityTiles([data])
}

export function postCityTilesTask(body: CityTilesTaskPostData): R_P<boolean> {
  return $fetch('/api/admin/city_tiles/task', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}
