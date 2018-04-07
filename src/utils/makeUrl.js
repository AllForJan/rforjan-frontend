export function stringifyQueryParams (params = {}) {
  return Object.entries(params).map(([key, value]) => {
    return `${key}=${decodeURIComponent(value)}`
  }).join('&')
}

export default function makeUrl(baseUrl, params = {}) {
  return `${baseUrl}?${stringifyQueryParams(params)}`
}

