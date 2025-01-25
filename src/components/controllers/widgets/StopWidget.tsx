import React from 'react'
import { ControllerPadTarget } from '../../../model/controllers/Controller'
import { Color } from '../Color'

type StopWidgetProps = {
  target: ControllerPadTarget
}

export const StopWidget: React.FC<StopWidgetProps> = ({ target }) => {
  return (
    <pad
      color={Color.RED}
      target={target}
    />
  )
}
