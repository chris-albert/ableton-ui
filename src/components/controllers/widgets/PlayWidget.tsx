import React from 'react'
import { Color } from '../Color'
import { ControllerPadTarget } from '../../../model/controllers/Controller'

type PlayWidgetProps = {
  target: ControllerPadTarget
}

export const PlayWidget: React.FC<PlayWidgetProps> = ({ target }) => {
  return (
    <pad
      color={Color.GREEN}
      target={target}
    />
  )
}
