import React from 'react'
import { LaunchPadMiniMk3 } from '../../model/controllers/LaunchPadMiniMk3'
import { StopWidget } from './widgets/StopWidget'
import { ControllerPadNote } from '../../model/controllers/Controller'
import { PlayWidget } from './widgets/PlayWidget'
import { PlayStopWidget } from './widgets/PlayStopWidget'
import { MetronomeWidget } from './widgets/MetronomeWidget'
import { BeatsWidget } from './widgets/BeatsWidget'

type InfiniteBitsControllerComponentProps = {}

export const InfiniteBitsControllerComponent: React.FC<InfiniteBitsControllerComponentProps> = () => {
  return (
    <controller model={LaunchPadMiniMk3}>
      <StopWidget target={ControllerPadNote(19)} />
      <PlayWidget target={ControllerPadNote(29)} />
      <PlayStopWidget target={ControllerPadNote(39)} />
      <MetronomeWidget target={ControllerPadNote(99)} />
      <BeatsWidget
        targets={[
          ControllerPadNote(81),
          ControllerPadNote(82),
          ControllerPadNote(83),
          ControllerPadNote(84),
          ControllerPadNote(85),
          ControllerPadNote(86),
          ControllerPadNote(87),
          ControllerPadNote(88),
        ]}
      />
    </controller>
  )
}
