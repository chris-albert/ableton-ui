import React from 'react'
import { MidiTarget } from '../../../midi/MidiTarget'
import { ProjectHooks } from '../../../hooks/ProjectHooks'
import { useActiveClip } from '../../../hooks/ActiveClipHook'

type SongsWidgetProps = {
  targets: Array<MidiTarget>
  trackName: string
}

export const SongsWidget: React.FC<SongsWidgetProps> = ({ targets, trackName }) => {
  const arranmement = ProjectHooks.useArrangement()
  const track = ProjectHooks.useTrack(trackName)
  const activeClip = useActiveClip(track)

  return <></>
}
