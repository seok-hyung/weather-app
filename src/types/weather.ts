export interface WeatherResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: CurrentWeather
  hourly: HourlyWeather[]
  daily: DailyWeather[]
}

interface CurrentWeather {
  dt: number // Unix timestamp
  sunrise: number // Unix timestamp
  sunset: number // Unix timestamp
  temp: number // 현재 온도 (K)
  feels_like: number // 체감 온도 (K)
  pressure: number // 기압 (hPa)
  humidity: number // 습도 (%)
  dew_point: number // 이슬점 (K)
  uvi: number // 자외선 지수
  clouds: number // 구름량 (%)
  visibility: number // 가시거리 (m)
  wind_speed: number // 풍속 (m/s)
  wind_deg: number // 풍향 (도)
  wind_gust: number // 돌풍 속도 (m/s)
  weather: Weather[]
}

interface HourlyWeather {
  dt: number // Unix timestamp
  temp: number // 온도 (K)
  feels_like: number // 체감 온도 (K)
  pressure: number // 기압 (hPa)
  humidity: number // 습도 (%)
  dew_point: number // 이슬점 (K)
  uvi: number // 자외선 지수
  clouds: number // 구름량 (%)
  visibility: number // 가시거리 (m)
  wind_speed: number // 풍속 (m/s)
  wind_deg: number // 풍향 (도)
  wind_gust: number // 돌풍 속도 (m/s)
  weather: Weather[]
  pop: number // 강수 확률 (%) 매개변수 값은 0과 1 사이에서 변하며, 0은 0%, 1은 100%와 같습니다.
  // 강수량, 지난 1시간 동안의 강수량, mm. 이 매개변수의 측정 단위는 mm만 사용할 수 있습니다.
  rain?: {
    '1h': number
  }
}

interface DailyWeather {
  dt: number // Unix timestamp
  sunrise: number // Unix timestamp
  sunset: number // Unix timestamp
  moonrise: number // Unix timestamp
  moonset: number // Unix timestamp
  moon_phase: number // 달의 위상
  summary: string // 요약
  temp: Temperature
  feels_like: FeelsLike
  pressure: number // 기압 (hPa)
  humidity: number // 습도 (%)
  dew_point: number // 이슬점 (K)
  wind_speed: number // 풍속 (m/s)
  wind_deg: number // 풍향 (도)
  wind_gust: number // 돌풍 속도 (m/s)
  weather: Weather[]
  clouds: number // 구름량 (%)
  pop: number // 강수 확률 (%)
  rain?: number // 강수량 (mm)
  uvi: number // 자외선 지수
}

interface Weather {
  id: number // 날씨 ID
  main: string // 날씨 주제
  description: string // 날씨 설명
  icon: string // 아이콘 코드
}

interface Temperature {
  day: number // 낮 온도 (K)
  min: number // 최저 온도 (K)
  max: number // 최고 온도 (K)
  night: number // 밤 온도 (K)
  eve: number // 저녁 온도 (K)
  morn: number // 아침 온도 (K)
}

interface FeelsLike {
  day: number // 낮 체감 온도 (K)
  night: number // 밤 체감 온도 (K)
  eve: number // 저녁 체감 온도 (K)
  morn: number // 아침 체감 온도 (K)
}
