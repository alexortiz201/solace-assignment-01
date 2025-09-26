import { useQuery } from '@tanstack/react-query'
import { Advocate } from '../AdvocatesTable'

const fetchAdvocates = async (): Promise<Advocate[]> => {
  console.log("fetching advocates...")
  try {
    const res = await fetch("/api/advocates")
    const { data } = await res.json()
    return data as Advocate[]
  } catch {
    return []
  }
}

export const useAdvocatesQuery = () => {
  return useQuery<Advocate[]>({
    queryKey: ['advocates'],
    queryFn: fetchAdvocates
  })
}