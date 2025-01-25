import React from 'react'
import { Color } from './Color'
import { LaunchPadMiniMk3 } from '../../model/controllers/LaunchPadMiniMk3'
import { ControllerPadNote } from '../../model/controllers/Controller'

export const MyController = () => {
  const [pad1Color, setPad1Color] = React.useState(Color.RED)
  const [append, setAppend] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPad1Color(Color.PURPLE)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <controller model={LaunchPadMiniMk3}>
      <pad
        color={pad1Color}
        target={ControllerPadNote(11)}
        onClick={() => {
          setPad1Color(Color.GREEN)
        }}
      />
      <pad
        color={Color.GREEN}
        target={ControllerPadNote(12)}
        onClick={() => console.log('Pad 2 clicked')}
      />
      <pad
        color={Color.BLUE}
        target={ControllerPadNote(13)}
      />
    </controller>
  )
}
