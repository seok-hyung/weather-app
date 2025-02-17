'use client'
import { useEffect, useState } from 'react'
import { CurrentWeather } from '@/components/current-weather'
import { HourlyWeather } from '@/components/hourly-weather'
import { DailyWeather } from '@/components/daily-weather'
import { useGetCityNameWithLocation, useGetLocationWithCityName, useWeather } from '@/hooks/use-weather'
import { WeatherBox } from '@/components/weather-box'
import { cityNamesConverter } from '@/lib/utils'
import { WeatherResponse } from '@/types/weather'
import Image from 'next/image'
import Link from 'next/link'

const cities = [
  '서울',
  '부산',
  '인천',
  '대구',
  '대전',
  '광주',
  '울산',
  '수원',
  '성남',
  '고양',
  '전주',
  '창원',
  '김해',
  '포항',
  '제주시',
  '세종',
  '목포',
  '여수',
  '구미',
  '남양주',
  '파주',
  '시흥',
  '김포',
]

export default function Home() {
  const [location, setLocation] = useState({ lat: 37.51423056, lon: 126.8687083 })
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 사용자의 현재 위치를 지속적으로 감지하여 업데이트
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    )
    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [setLocation])

  // 날씨 데이터 및 도시명 가져오기
  const { data, isLoading }: { data: WeatherResponse; isLoading: boolean } = useWeather(location?.lat, location?.lon)
  const { data: cityData, isLoading: isCityDataLoading } = useGetCityNameWithLocation(location?.lat, location?.lon)

  // 검색어를 도시명 형식에 맞게 변환 후 좌표 조회
  const convertedSearch = cityNamesConverter(search)
  const { data: geoData } = useGetLocationWithCityName(convertedSearch)

  useEffect(() => {
    if (geoData && geoData.length > 0) {
      setLocation({ lat: geoData[0].lat, lon: geoData[0].lon })
    }
  }, [geoData])

  // 도시이름 클릭 시 검색어 업데이트 및 모달 닫기
  const handleCityClick = (city: string) => {
    const convertedCity = cityNamesConverter(city)
    setSearch(convertedCity)
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 min-h-screen text-gray-900 ">
      <div className="flex justify-center items-center">
        <Image src="/kowave-logo.png" width={300} height={150} alt="로고" />
        <h1 className="text-5xl font-bold text-center ml-4">날씨 앱</h1>
      </div>
      <p className="text-xl text-center text-gray-700 mb-10">
        당신의 도시에서의 날씨를 실시간으로 확인하고, 특별한 일정을 위해 준비하세요!
      </p>
      {/* 날씨 정보 */}
      <WeatherBox isLoading={isLoading && isCityDataLoading} className="mb-10">
        <CurrentWeather data={data} cityData={cityData} onCityClick={() => setIsModalOpen(true)} />
        <HourlyWeather data={data} />
      </WeatherBox>
      <WeatherBox isLoading={isLoading}>
        <DailyWeather data={data} />
      </WeatherBox>

      <div className="mt-10 mb-20">
        <h2 className="text-3xl mb-4">사용한 날씨 API</h2>
        <Link href={'https://openweathermap.org/'} target="_blank">
          <div className="flex">
            <div className="-mr-12">
              <Image src="/api-logo.png" width={100} height={100} alt="api logo" />
            </div>
            <p className="text-xl">OpenWeatherMap </p>
          </div>
        </Link>
      </div>

      {/* 모달 UI */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false)
            }
          }}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">도시 선택</h2>
            <div className="grid grid-cols-3 gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  className="p-2 bg-gray-200 rounded text-sm hover:bg-gray-300"
                  onClick={() => handleCityClick(city)}>
                  {city}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
              onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
