import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import { WeatherResponse } from '@/types/weather'
import { CityResponse } from '@/types/geo-location'

type Props = {
  data: WeatherResponse
  cityData: CityResponse[]
  onCityClick: () => void
}

const ICON_BASE_URL = 'https://openweathermap.org/img/wn/'
export const CurrentWeather = ({ data, cityData, onCityClick }: Props) => {
  if (!data || !cityData) return null
  const imageUrl = `${ICON_BASE_URL}${data.current.weather[0].icon}@2x.png`
  const temperature = data.current.temp.toFixed(1)
  const displayTemperature = temperature.endsWith('.0') ? temperature.slice(0, -2) : temperature
  return (
    <div className="w-full mb-10">
      <h2 className="text-3xl font-bold mb-6 cursor-pointer" onClick={onCityClick}>
        <span>{cityData[0].local_names.ko}</span>
      </h2>

      <div className="flex items-center">
        <div className="flex items-center w-1/2">
          <div>
            <Image src={imageUrl} alt="Weather Icon" width={150} height={150} className="opacity-80 -ml-7" />
          </div>
          <div className="text-6xl font-semibold z-10 -ml-20">
            {displayTemperature}
            <span className="text-5xl align-top">°</span>
          </div>
          <div className="ml-2">
            <p className="text-2xl font-bold">{data.current.weather[0].description}</p>
            <p className="text-xl font-semibold">어제보다 1.2°↓</p>
          </div>
        </div>
        <div className="text-lg">
          <p>
            습도 <span className="font-bold">{data.current.humidity}%</span> · 체감{' '}
            <span className="font-bold">{data.current.feels_like.toFixed(1)}°</span> · 서풍{' '}
            <span className="font-bold">0.8m/s</span>
          </p>
          <p className="mt-1">
            미세 <span className="text-green-500 font-bold">보통</span> · 초미세{' '}
            <span className="text-red-500 font-bold">나쁨</span> · 일출{' '}
            <span className="font-bold">{format(new Date(data.current.sunrise * 1000), 'HH:mm')} </span>
          </p>
        </div>
      </div>
    </div>
  )
}
