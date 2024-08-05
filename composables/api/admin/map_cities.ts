import type { LabelValue, MapCitiesPaginationQuery, MapCitiesQuery, MapCitiesRecord, R_P, R_Pagination } from '~/types'

export function initMapCitiesRecord(): MapCitiesRecord {
  return {
    id: '',
    code: '',
    name: '',
    createdAt: 0,
    updatedAt: 0,
  }
}

export function initMapCitiesQuery(): MapCitiesQuery {
  return {
    code: '',
    name: '',
  }
}
export function queryMapCitiesPage(query: MapCitiesPaginationQuery): R_Pagination<MapCitiesRecord> {
  return $fetch('/api/admin/map_cities/page', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
    query,
  })
}

export function queryMapCitiesPolygon(id: string): R_P<string[]> {
  return $fetch(`/api/admin/map_cities/polygon/${id}`, {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}

export function MapCities(id: string): R_P<string[]> {
  return $fetch(`/api/admin/map_cities/task/${id}`, {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}

export function postMapCities(body: MapCitiesRecord): R_P<MapCitiesRecord> {
  return $fetch('/api/admin/map_cities', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function putMapCities(body: MapCitiesRecord): R_P<MapCitiesRecord> {
  return $fetch('/api/admin/map_cities', {
    method: 'PUT',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteMapCities(body: string[]): R_P<MapCitiesRecord[]> {
  return $fetch('/api/admin/map_cities', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteMapCitiesById(data: string): R_P<MapCitiesRecord[]> {
  return deleteMapCities([data])
}

export function queryMapCitiesList(): R_P<LabelValue[]> {
  return $fetch('/api/admin/map_cities/list', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}
