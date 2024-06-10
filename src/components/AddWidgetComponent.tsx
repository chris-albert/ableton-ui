import React from 'react'
import {Box, Button} from "@mui/material";
import {WidgetButtonComponent} from "./WidgetButtonComponent";
import {
  activeTrackClip,
  addWidget,
  barBeat,
  beatCount,
  beatCounter, button, clipNav, knob, playStop, spacer,
  tempo,
  timeSignature, trackSections, useSetWidgets
} from "../model/Widgets";
import {useSetAtom} from "jotai";
import {Project} from "../model/Projects";

export type AddWidgetComponentProps = {
  project: Project
}

export const AddWidgetComponent: React.FC<AddWidgetComponentProps> = ({
  project
}) => {

  const setWidgets = useSetWidgets(project)

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 2
      }}
    >
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(beatCounter()))
      }}>
        Beat Counter
      </WidgetButtonComponent>
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
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(spacer()))
      }}>
        Spacer
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(button()))
      }}>
        Button
      </WidgetButtonComponent>
      <WidgetButtonComponent onClick={() => {
        setWidgets(addWidget(knob()))
      }}>
        Knob
      </WidgetButtonComponent>
    </Box>
  )
}
