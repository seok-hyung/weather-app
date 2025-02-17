import React from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

import Image from 'next/image'
import { WeatherResponse } from '@/types/weather'

const ICON_BASE_URL = 'https://openweathermap.org/img/wn'
const getWeatherIcon = (icon: string) => `${ICON_BASE_URL}/${icon}@2x.png`

const WeatherCard = ({ title, day, hourly }: { title: string; day: any; hourly: any[] }) => {
  const getHourlyWeather = (targetHour: number) => {
    return hourly.find((h) => new Date(h.dt * 1000).getHours() === targetHour)
  }

  const morningWeather = getHourlyWeather(9)
  const afternoonWeather = getHourlyWeather(16)

  return (
    <div className="flex flex-1 rounded-lg border border-gray-300 px-4 py-2 items-center shadow-sm">
      {/* 오늘/내일 날짜 박스 */}
      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold">{title}</span>
        <span className="text-lg text-gray-500">{format(new Date(day.dt * 1000), 'M.dd.', { locale: ko })}</span>
      </div>

      {/* 오전/오후 날씨 정보 */}
      <div className="flex flex-1 justify-center items-center">
        {/* 오전 */}
        <div className="flex flex-col items-center">
          <span className="text-lg text-gray-500">오전</span>
          <span className="text-base text-gray-500">{Math.round(morningWeather.pop * 100)}%</span>
        </div>
        <div>
          <Image
            src={getWeatherIcon(morningWeather.weather[0].icon)}
            alt="morning-icon"
            width={80}
            height={80}
            className="opacity-80"
          />
        </div>

        {/* 오후 */}
        <div>
          <Image
            src={getWeatherIcon(afternoonWeather.weather[0].icon)}
            alt="afternoon-icon"
            width={80}
            height={80}
            className="opacity-80"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg text-gray-500">오후</span>
          <span className="text-base text-gray-500">{Math.round(afternoonWeather.pop * 100)}%</span>
        </div>
      </div>

      {/* 최저/최고 기온 */}
      <div className="flex gap-2 text-2xl font-semibold">
        <span className="text-blue-500 ">{Math.round(day.temp.min)}°</span>
        <span className="text-gray-500">/</span>
        <span className="text-orange-400">{Math.round(day.temp.max)}°</span>
      </div>
    </div>
  )
}

export const DailyWeather = ({ data }: { data: WeatherResponse }) => {
  if (!data?.daily || !data?.hourly) return null

  const getHourlyWeather = (timestamp: number, targetHour: number) => {
    return data.hourly.find((hour) => new Date(hour.dt * 1000).getHours() === targetHour)
  }

  const todayData = data.daily[0]
  const tomorrowData = data.daily[1]
  const restWeekData = data.daily.slice(2, 8)

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6">주간 예보</h2>
      <div className="flex gap-6 mb-6">
        <WeatherCard title="오늘" day={todayData} hourly={data.hourly} />
        <WeatherCard title="내일" day={tomorrowData} hourly={data.hourly} />
      </div>

      <div className="flex overflow-x-auto">
        {restWeekData.map((day) => {
          const morningWeather = getHourlyWeather(day.dt, 9)
          const afternoonWeather = getHourlyWeather(day.dt, 16)
          return (
            <div key={day.dt} className="flex-1 text-center px-2">
              <div className="text-xl font-semibold mb-1">{format(new Date(day.dt * 1000), 'EEE', { locale: ko })}</div>
              <div className="text-sm">{format(new Date(day.dt * 1000), 'M.dd', { locale: ko })}</div>
              <div className="flex justify-center">
                <div className="text-center">
                  {morningWeather && (
                    <>
                      <div>
                        <Image
                          src={getWeatherIcon(morningWeather.weather[0].icon)}
                          alt="morning-weather-icon"
                          width={80}
                          height={80}
                          className="opacity-80"
                        />
                      </div>
                      <div>
                        <span className="text-blue-500 mr-1">{Math.round(morningWeather.temp)}°</span>
                      </div>
                      <div className="text-xs text-blue-500">{Math.round(morningWeather.pop * 100)}%</div>
                    </>
                  )}
                </div>
                <div className="text-center">
                  {afternoonWeather && (
                    <>
                      <div>
                        <Image
                          src={getWeatherIcon(afternoonWeather.weather[0].icon)}
                          alt="afternoon-weather-icon"
                          width={80}
                          height={80}
                          className="opacity-80"
                        />
                      </div>
                      <div>
                        <span className="text-orange-400 ml-1">{Math.round(afternoonWeather.temp)}°</span>
                      </div>
                      <div className="text-xs text-orange-400">{Math.round(afternoonWeather.pop * 100)}%</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
