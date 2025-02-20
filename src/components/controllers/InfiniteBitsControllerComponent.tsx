import React from 'react'
import { LaunchPadMiniMk3 } from '../../model/controllers/LaunchPadMiniMk3'
import { StopWidget } from './widgets/StopWidget'
import { PlayWidget } from './widgets/PlayWidget'
import { PlayStopWidget } from './widgets/PlayStopWidget'
import { MetronomeWidget } from './widgets/MetronomeWidget'
import { BeatsWidget } from './widgets/BeatsWidget'
import { MidiTarget } from '../../midi/MidiTarget'
import { Midi } from '../../midi/GlobalMidi'
import { TimeSigNoteCountWidget } from './widgets/TimeSigNoteCountWidget'
import { TimeSigNoteLengthWidget } from './widgets/TimeSigNoteLengthWidget'
import { SongsWidget } from './widgets/SongsWidget'
import { BarTrackerWidget } from './widgets/BarTrackerWidget'
import { TrackSectionsWidget } from './widgets/TrackSectionsWidget'

type InfiniteBitsControllerComponentProps = {}

export const InfiniteBitsControllerComponent: React.FC<InfiniteBitsControllerComponentProps> = () => {
  const emitter = Midi.useControllerEmitter()
  const listener = Midi.useControllerListener()
  return (
    <controller model={LaunchPadMiniMk3(emitter, listener)}>
      <StopWidget target={MidiTarget.note(19)} />
      <PlayWidget target={MidiTarget.note(29)} />
      <PlayStopWidget target={MidiTarget.note(89)} />
      <MetronomeWidget target={MidiTarget.note(99)} />
      <BeatsWidget targets={MidiTarget.notes({ from: 81, to: 88 })} />
      <TimeSigNoteCountWidget targets={MidiTarget.notes({ from: 61, to: 68 })} />
      <TimeSigNoteLengthWidget targets={MidiTarget.notes({ from: 51, to: 58 })} />
      <SongsWidget
        targets={MidiTarget.notes({ from: 11, to: 18 })}
        trackName='Songs'
        fromClip={0}
        toClip={7}
      />
      <BarTrackerWidget
        targets={MidiTarget.notes({ from: 71, to: 78 })}
        trackName='Bars'
      />
      <TrackSectionsWidget
        targets={MidiTarget.notes({ from: 41, to: 48 })}
        trackName='Parts'
        parentTrackName='Songs'
      />
    </controller>
  )
}
