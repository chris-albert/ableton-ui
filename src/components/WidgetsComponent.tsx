import React from 'react'
import {Box} from "@mui/material";
import _ from 'lodash'
import {WidgetComponent} from "./WidgetComponent";
import {Project} from "../model/Projects";
import {useWidgets} from "../model/Widgets";

export type WidgetsComponentProps = {
  project: Project
}

export const WidgetsComponent: React.FC<WidgetsComponentProps> = ({
  project
}) => {

  const widgets = useWidgets(project)

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1
      }}
    >
      {_.map(widgets, (widget, i) => (
        <Box key={`widget-${i}`}>
          <WidgetComponent widget={widget} project={project} />
        </Box>
      ))}
    </Box>
  )
}
