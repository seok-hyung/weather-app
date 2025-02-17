import { clsx, type ClassValue } from 'clsx'
import { format, fromUnixTime } from 'date-fns'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertUnixTimestamp = (timestamp: number, foramt: string) => {
  const date = fromUnixTime(timestamp)
  return format(date, foramt)
}

// 도시 이름에 해당하는 영어 이름 반환해주는 함수
export const cityNamesConverter = (cityName: string) => {
  const cityMap: { [key: string]: string } = {
    서울: 'Seoul',
    부산: 'Busan',
    인천: 'Incheon',
    대구: 'Daegu',
    대전: 'Daejeon',
    광주: 'Gwangju',
    울산: 'Ulsan',
    수원: 'Suwon',
    성남: 'Seongnam',
    고양: 'Goyang',
    전주: 'Jeonju',
    창원: 'Changwon',
    김해: 'Gimhae',
    포항: 'Pohang',
    제주시: 'Jeju',
    세종: 'Sejong',
    목포: 'Mokpo',
    여수: 'Yeosu',
    구미: 'Gumi',
    남양주: 'Namyangju',
    파주: 'Paju',
    시흥: 'Siheung',
    김포: 'Gimpo',
  }
  return cityMap[cityName] || cityName
}
