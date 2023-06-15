import React from 'react'
import {useAtomValue} from "jotai";
import {widgetsAtom} from "../model/Widgets";
import {Box} from "@mui/material";
import _ from 'lodash'
import {WidgetComponent} from "./WidgetComponent";

export type WidgetsComponentProps = {}

export const WidgetsComponent: React.FC<WidgetsComponentProps> = ({}) => {

  const widgets = useAtomValue(widgetsAtom)

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      {_.map(widgets, (widget, i) => (
        <Box key={`widget-${i}`}>
          <WidgetComponent widget={widget} />
        </Box>
      ))}
    </Box>
  )
}
