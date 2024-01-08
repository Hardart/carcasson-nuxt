export const colors = ['blue', 'red', 'black', 'green', 'yellow', 'pink'] as const

declare global {
  type PlayerColor = (typeof colors)[number]

  interface IPlayer {
    name: string
    colorId: PlayerColor
    points: number
  }

  interface IOption {
    id: PlayerColor
    title: string
  }
}
