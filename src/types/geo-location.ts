export interface CityResponse {
  name: string // 도시 이름
  local_names: LocalNames // 다양한 언어로된 도시 이름
  lat: number // 위도
  lon: number // 경도
  country: string // 국가 코드
}

interface LocalNames {
  ko: string
  [key: string]: string // 기타 언어 코드와 이름의 쌍
}
