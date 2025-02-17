import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import { WeatherResponse } from '@/types/weather'

const ICON_BASE_URL = 'https://openweathermap.org/img/wn'
const getWeatherIcon = (icon: string) => `${ICON_BASE_URL}/${icon}@2x.png`

export const HourlyWeather = ({ data }: { data: WeatherResponse }) => {
  if (!data?.hourly) return null

  const dataPerHour = data.hourly.slice(0, 24) // Show 24 hours of data

  const getWindDirectionSymbol = (degree: number) => {
    if (degree >= 337.5 || degree < 22.5) return '↓' // 북쪽 (바람이 남쪽에서 불어옴)
    if (degree >= 22.5 && degree < 67.5) return '↙' // 북동쪽 (바람이 남서쪽에서 불어옴)
    if (degree >= 67.5 && degree < 112.5) return '←' // 동쪽 (바람이 서쪽에서 불어옴)
    if (degree >= 112.5 && degree < 157.5) return '↖' // 남동쪽 (바람이 북서쪽에서 불어옴)
    if (degree >= 157.5 && degree < 202.5) return '↑' // 남쪽 (바람이 북쪽에서 불어옴)
    if (degree >= 202.5 && degree < 247.5) return '↗' // 남서쪽 (바람이 북동쪽에서 불어옴)
    if (degree >= 247.5 && degree < 292.5) return '→' // 서쪽 (바람이 동쪽에서 불어옴)
    if (degree >= 292.5 && degree < 337.5) return '↘' // 북서쪽 (바람이 남동쪽에서 불어옴)
    return '↓'
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex min-w-full">
        <div className="flex flex-col min-w-full">
          {/* 시간과 날씨 아이콘 */}
          <div className="flex-col items-center justify-center">
            <div className="flex">
              {dataPerHour.map((hour) => (
                <div key={`header-${hour.dt}`} className="flex-1 px-2 py-3 text-center">
                  <div className="text-sm text-gray-600">{format(new Date(hour.dt * 1000), 'HH시')}</div>
                  <div className="flex justify-center items-center">
                    <Image
                      src={getWeatherIcon(hour.weather[0].icon)}
                      width={60}
                      height={60}
                      alt="날씨 아이콘"
                      className="opacity-80"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 기온 */}
            <div className="flex">
              {dataPerHour.map((hour) => (
                <div key={`temp-${hour.dt}`} className="flex-1 px-2 py-2 text-center">
                  <div className="text-sm font-medium">{Math.round(hour.temp)}°</div>
                </div>
              ))}
            </div>
          </div>

          {/* 강수 확률 */}
          <div className="flex border-b border-t border-gray-100">
            <div className="px-2 py-2 text-center text-sm min-w-[72px]">
              <p>강수 확률</p>
              <span className="text-xs text-gray-400">(%)</span>
            </div>
            {dataPerHour.map((hour) => (
              <div key={`precip-${hour.dt}`} className="flex-1 px-2 py-2 text-center flex items-center justify-center">
                <div className={`text-xs ${hour.pop > 0 ? 'text-blue-400' : 'text-gray-400'}`}>
                  {hour.pop > 0 ? Math.round(hour.pop * 100) : '-'}
                </div>
              </div>
            ))}
          </div>

          {/* 강수량 */}
          <div className="flex border-b border-t border-gray-100">
            <div className="px-2 py-2 text-center text-sm min-w-[72px]">
              <p>강수량</p>
              <span className="text-xs text-gray-400">(mm)</span>
            </div>
            {dataPerHour.map((hour) => (
              <div key={`precip-${hour.dt}`} className="flex-1 px-2 py-2 text-center flex items-center justify-center">
                <div className="text-xs text-gray-400">{hour.rain ? hour.rain?.['1h'] : '0'}</div>
              </div>
            ))}
          </div>

          {/* 바람 */}
          <div className="flex border-b border-gray-100">
            <div className="shrink-0 px-2 py-2 text-center text-sm min-w-[72px]">
              <p>바람</p>
              <span className="text-xs text-gray-400">(m/s)</span>
            </div>
            {dataPerHour.map((hour) => (
              <div key={`wind-${hour.dt}`} className="flex-1 px-2 py-2 text-center flex items-center justify-center">
                <div className="text-xs text-blue-600">
                  <p>{getWindDirectionSymbol(hour.wind_deg)}</p> <p>{Math.round(hour.wind_speed)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 습도 */}
          <div className="flex">
            <div className="flex-1 px-2 py-2 text-center text-sm min-w-[72px]">
              <p>습도</p>
              <span className="text-xs text-gray-400">(%)</span>
            </div>
            {dataPerHour.map((hour) => (
              <div
                key={`humidity-${hour.dt}`}
                className="flex-1 px-2 py-2 text-center flex items-center justify-center">
                <div className="text-xs text-blue-600">{hour.humidity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
