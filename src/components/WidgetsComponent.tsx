import React from 'react'
import {Box} from "@mui/material";
import _ from 'lodash'
import {WidgetComponent} from "./WidgetComponent";
import {Project} from "../model/Projects";
import {editWidgetsAtom, useWidgets} from "../model/Widgets";
import { useAtomValue } from 'jotai';
import objectHash from 'fast-json-stable-stringify'

export type WidgetsComponentProps = {
  project: Project
}

export const WidgetsComponent: React.FC<WidgetsComponentProps> = ({
  project
}) => {

  const widgets = useWidgets(project)
  const isEdit = useAtomValue(editWidgetsAtom)

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1
      }}
    >
      {_.map(widgets, (widget, i) => (
        <Box
          key={objectHash(widget)}
          sx={{
            ...(widget.type === 'spacer' && widget.isLineBreaking ? {
              flexBasis: "100%",
              height: (isEdit ? '80px': '0')
            }: {})
          }}
        >
          <WidgetComponent
            widget={widget}
            project={project}
          />
        </Box>
      ))}
    </Box>
  )
}
