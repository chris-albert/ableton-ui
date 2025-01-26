import React from 'react'
import { Color } from '../Color'
import { MidiTarget } from '../../../midi/MidiTarget'

type PlayWidgetProps = {
  target: MidiTarget
}

export const PlayWidget: React.FC<PlayWidgetProps> = ({ target }) => {
  return (
    <pad
      color={Color.GREEN}
      target={target}
    />
  )
}
