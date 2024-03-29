export const colors = ['blue', 'red', 'black', 'green', 'yellow', 'pink'] as const

declare global {
  type PlayerColor = (typeof colors)[number]
  type ResourceType = 'silk' | 'wheat' | 'rum'

  interface IResource {
    type: ResourceType
    count: number
    maxValue: number
  }

  interface IPoints {
    current: number
    total: number
    showCurrent: boolean
  }

  interface IPlayer {
    name: string
    colorId: PlayerColor
    points: IPoints
    resources: IResource[]
  }

  interface IOption {
    id: PlayerColor
    title: string
  }
}
