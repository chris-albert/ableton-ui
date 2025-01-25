import React from 'react'
import { ControllerPadTarget } from '../../../model/controllers/Controller'
import { useIsPlaying } from '../../../hooks/RealTimeHooks'
import { StopWidget } from './StopWidget'
import { PlayWidget } from './PlayWidget'

type PlayStopWidgetProps = {
  target: ControllerPadTarget
}

export const PlayStopWidget: React.FC<PlayStopWidgetProps> = ({ target }) => {
  const isPlaying = useIsPlaying()

  return isPlaying ? <StopWidget target={target} /> : <PlayWidget target={target} />
}
