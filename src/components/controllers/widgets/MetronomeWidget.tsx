import React from 'react'
import { ControllerPadTarget } from '../../../model/controllers/Controller'
import { useBarBeats } from '../../../hooks/RealTimeHooks'
import { Color } from '../Color'

type MetronomeWidgetProps = {
  target: ControllerPadTarget
}

export const MetronomeWidget: React.FC<MetronomeWidgetProps> = ({ target }) => {
  const beat = useBarBeats()

  const [color, setColor] = React.useState(Color.BLACK)

  React.useEffect(() => {
    setColor(beat === 1 ? Color.GREEN : Color.RED)
    const timer = setTimeout(() => {
      // setColor(Color.BLACK)
    }, 100)
    return () => clearTimeout(timer)
  }, [beat])

  return (
    <pad
      color={color}
      target={target}
    />
  )
}
