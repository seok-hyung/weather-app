import { create } from 'zustand'

type LocationValue = {
  location: { lat: number; lon: number }
  setLocation: (value: any) => void
}
export const useLocationValue = create<LocationValue>((set) => ({
  location: { lat: 37.51423056, lon: 126.8687083 },
  setLocation: (value) =>
    set({
      location: value,
    }),
}))
