export {}
declare global {
  type PlayerColor = 'pink' | 'blue' | 'yellow' | 'black' | 'green' | 'red'

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
