import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
const URL = 'https://api.openweathermap.org/data/3.0'
const GEO_URL = 'http://api.openweathermap.org/geo/1.0'

const fetchAllWeather = async (lat: number, lon: number) => {
  const { data } = await axios.get(`${URL}/onecall`, {
    params: {
      lat,
      lon,
      lang: 'kr',
      exclude: 'minutely,alerts', // minutely, alerts 데이터 제외
      units: 'metric',
      appid: API_KEY,
    },
  })
  return data
}

export const useWeather = (lat: number, lon: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['all', lat, lon],
    queryFn: () => fetchAllWeather(lat, lon),
    enabled: !!lat && !!lon,
  })
  return { data, isLoading, isError, error }
}

const fetchCityNameWithLocation = async (lat: number, lon: number) => {
  const { data } = await axios.get(`${GEO_URL}/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  return data
}

export const useGetCityNameWithLocation = (lat: number, lon: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cityName', lat, lon],
    queryFn: () => fetchCityNameWithLocation(lat, lon),
    enabled: !!lat && !!lon,
  })
  return { data, isLoading, isError }
}

const fetchLocationWithCityName = async (cityName: string) => {
  const { data } = await axios.get(`${GEO_URL}/direct?q=${cityName}&appid=${API_KEY}`)
  return data
}

export const useGetLocationWithCityName = (cityName: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [cityName],
    queryFn: () => fetchLocationWithCityName(cityName),
    enabled: !!cityName,
  })
  return { data, isLoading, isError }
}
