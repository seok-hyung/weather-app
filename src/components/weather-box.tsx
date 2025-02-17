import { PropsWithChildren } from 'react'
import { PartialLoading } from './spinner'
import { cn } from '@/lib/utils'
interface WeatherBoxProps {
  isLoading: boolean
  className?: string
}

export const WeatherBox: React.FC<PropsWithChildren<WeatherBoxProps>> = ({ isLoading, className, children }) => {
  return (
    <div
      className={cn(
        'bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 min-h-[202px]',
        className
      )}>
      {isLoading ? PartialLoading() : children}
    </div>
  )
}
