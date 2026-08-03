export type Movie = {
  id: number
  year: number
  title: string
  studios: string[]
  producers: string[]
  winner: boolean
}
export type MoviePage = {
  content: Movie[]
  totalPages: number
  totalElements: number
  number: number
}
export type YearWinner = { year: number; winnerCount: number }
export type Studio = { name: string; winCount: number }
export type ProducerInterval = {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}
export type DashboardData = {
  years: YearWinner[]
  studios: Studio[]
  min: ProducerInterval[]
  max: ProducerInterval[]
}
