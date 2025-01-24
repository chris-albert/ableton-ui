import React from 'react'
import { MidiRenderer } from '../../renderer/MidiRenderer'
import { Color } from './Color'
import { ControllerPadNote } from '../../model/controllers/Controller'
import { LaunchPadMiniMk3 } from '../../model/controllers/LaunchPadMiniMk3'

const MyController = () => {
  const [pad1Color, setPad1Color] = React.useState(Color.RED)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPad1Color(Color.PURPLE)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <controller model={LaunchPadMiniMk3}>
      <pad
        color={pad1Color}
        target={ControllerPadNote(11)}
      />
      <pad
        color={Color.GREEN}
        target={ControllerPadNote(12)}
      />
      <pad
        color={Color.BLUE}
        target={ControllerPadNote(13)}
      />
    </controller>
  )
}

export const ReactReconcilerController = () => {
  MidiRenderer.render(<MyController />)
}
