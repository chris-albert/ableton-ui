import React from 'react'
import {useAtom} from "jotai";
import {projectAtom} from "../model/UIStateDisplay";
import {Box, Typography} from "@mui/material";
import {JSONEditor} from "../components/JSONEditor";
import {Widget, widgetsAtom} from "../model/Widgets";

export type SettingsPageProps = {}

export const SettingsPage: React.FC<SettingsPageProps> = ({

}) => {

  const [project, setProject] = useAtom(projectAtom)
  const [widgets, setWidgets] = useAtom(widgetsAtom)

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Box sx={{p: 2}}>
        <Typography>Project</Typography>
        <JSONEditor
          height='800px'
          value={JSON.stringify(project, null, 2)}
        />
      </Box>
      <Box sx={{p: 2}}>
        <Typography>Widgets</Typography>
        <JSONEditor
          height='800px'
          value={JSON.stringify(widgets, null, 2)}
        />
      </Box>
    </Box>
  )
}
