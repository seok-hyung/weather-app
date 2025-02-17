'use client'
import { QueryCache, QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import toast from 'react-hot-toast'

function createTitle(errorMsg: string, actionType: 'query' | 'mutation') {
  const action = actionType === 'query' ? 'fetch' : 'update'
  return `could not ${action} data: ${errorMsg ?? 'error connecting to server'}`
}

function errorHandler(title: string) {
  toast.error(title)
}

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 3600000, // 60분
      gcTime: 4200000, // 70분
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const errorMessage = error?.message || 'Unknown error occurred'
      const title = createTitle(errorMessage, 'query')
      errorHandler(title)
    },
  }),
}

export const queryClient = new QueryClient(queryClientOptions)

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
