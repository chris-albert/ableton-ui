import React from 'react'
import {Box, Button} from "@mui/material";
import {WidgetButtonComponent} from "./WidgetButtonComponent";
import {
  activeTrackClip,
  addWidget,
  barBeat,
  beatCount,
  beatCounter, clipNav, playStop,
  tempo,
  timeSignature, trackSections,
  widgetsAtom
} from "../model/Widgets";
import {useSetAtom} from "jotai";

export type AddWidgetComponentProps = {}

export const AddWidgetComponent: React.FC<AddWidgetComponentProps> = ({}) => {

  const setWidgets = useSetAtom(widgetsAtom)

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 2
      }}
    >
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(beatCount()))
      }}>
        Beat Count
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(timeSignature()))
      }}>
        Time Signature
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(tempo()))
      }}>
        Tempo
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(barBeat()))
      }}>
        Bar Beat
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(activeTrackClip('Songs')))
      }}>
        Active Clip
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(trackSections('Parts')))
      }}>
        Track Sections
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(playStop()))
      }}>
        Play/Stop
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(clipNav('')))
      }}>
        Clip Nav
      </WidgetButtonComponent>
    </Box>
  )
}
