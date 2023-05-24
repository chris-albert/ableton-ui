import { assign, createMachine } from 'xstate'

export type TransportContext = {
  bar: number
}

/**
 * Events
 */

type PlayEvent = {
  type: 'PLAY'
}

type StopEvent = {
  type: 'STOP'
}

type PauseEvent = {
  type: 'PAUSE'
}

type NextEvent = {
  type: 'NEXT'
}

export type TransportEvents = PlayEvent | StopEvent | PauseEvent | NextEvent

/**
 * States
 */

export const TransportStates = {
  PLAYING: 'playing',
  STOPPED: 'stopped',
  PAUSED: 'paused'
}

export const TransportMachine = createMachine<TransportContext, TransportEvents>({
  id: 'Transport',
  initial: TransportStates.STOPPED,
  context: {
    bar: 0
  },
  states: {
    [TransportStates.PLAYING]: {
      on: {
        STOP: {
          target: TransportStates.STOPPED,
          actions: 'resetBar'
        },
        PAUSE: {
          target: TransportStates.PAUSED
        },
        NEXT: {
          actions: 'nextBar'
        }
      },
    },
    [TransportStates.STOPPED]: {
      on: {
        PLAY: TransportStates.PLAYING
      }
    },
    [TransportStates.PAUSED]: {
      on: {
        PLAY: TransportStates.PLAYING
      }
    }
  }
},
  {
    actions: {
      resetBar: assign({
        bar: (context, event) => 0
      }),
      nextBar: assign({
        bar: (context, event) => context.bar + 1
      })
    }
  })

