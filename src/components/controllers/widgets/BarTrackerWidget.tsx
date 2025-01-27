import React from 'react'
import { MidiTarget } from '../../../midi/MidiTarget'
import { ProjectHooks } from '../../../hooks/ProjectHooks'
import { useBarBeats } from '../../../hooks/RealTimeHooks'
import { useActiveClip } from '../../../hooks/ActiveClipHook'
import { Pad } from '../pads/Pad'
import { Color } from '../Color'

export type BarTrackerWidgetProps = {
  targets: Array<MidiTarget>
  trackName: string
}

export const BarTrackerWidget: React.FC<BarTrackerWidgetProps> = ({ targets, trackName }) => {
  const track = ProjectHooks.useTrack(trackName)
  const barBeat = useBarBeats()
  const activeClip = useActiveClip(track)

  const [barCount, setBarCount] = React.useState(0)

  const count = React.useMemo(() => {
    if (activeClip !== undefined && activeClip.type === 'real') {
      const count = Number(activeClip.name)
      if (!isNaN(count)) {
        return count
      }
    }
    return 0
  }, [activeClip])

  React.useEffect(() => {
    setBarCount(0)
  }, [activeClip])

  React.useEffect(() => {
    if (barBeat === 1) {
      setBarCount((c) => c + 1)
      if (barCount >= count) {
        setBarCount(0)
      }
    }
  }, [barBeat])

  const pads = targets.map((target, i) => (
    <Pad
      key={`bar-tracker-${i}`}
      color={i < barCount ? Color.GREEN : Color.BLACK}
      target={target}
    />
  ))

  return <>{pads}</>
}
