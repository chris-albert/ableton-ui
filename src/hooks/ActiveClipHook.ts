import React from 'react'
import {UIClip, UITrack} from "../model/UIStateDisplay";
import {useAtomValue} from "jotai";
import {beatsAtom} from "../model/RealTime";

export const useActiveClip = (track: UITrack): UIClip | undefined => {

  const [activeClip, setActiveClip] = React.useState<UIClip | undefined>(undefined)
  const beat = useAtomValue(beatsAtom)


  return activeClip
}