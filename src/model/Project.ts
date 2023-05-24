
export type Step = {
  on: boolean
}

export const newStep = (): Step => ({
  on: false
})

export type Steps = {
  steps: Array<Step>
}

export const steps = (size: number): Steps => ({
  steps: Array(size).fill(newStep())
})

export type Track = {
  name: string
  steps: Array<Step>
}

export const newTrack = (size: number): Track => ({
  name: 'New Track',
  steps: Array(size).fill(newStep())
})

export type Project = {
  name: string
  tracks: Array<Track>
}

export const emptyProject = (): Project => ({
  name: 'New Project',
  tracks: [
    newTrack(8),
    newTrack(8),
    newTrack(8)
  ]
})
