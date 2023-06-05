import React from 'react'
import {useAtom} from "jotai";
import {projectAtom} from "../model/UIStateDisplay";
import {Box} from "@mui/material";
import {JSONEditor} from "../components/JSONEditor";

export type SettingsPageProps = {}

export const SettingsPage: React.FC<SettingsPageProps> = ({

}) => {

  const [project, setProject] = useAtom(projectAtom)

  return (
    <Box>
      <JSONEditor
        height='800px'
        value={JSON.stringify(project, null, 2)}
      />
    </Box>
  )
}
