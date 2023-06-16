import React from 'react'
import {useAtom} from "jotai";
import {projectAtom} from "../model/UIStateDisplay";
import {Box, Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {JSONEditor} from "../components/JSONEditor";
import {Widgets, widgetsAtom} from "../model/Widgets";
import * as E from 'fp-ts/Either'
import {toast} from "react-toastify";
import { PathReporter } from 'io-ts/lib/PathReporter'

export type SettingsPageProps = {}

export const SettingsPage: React.FC<SettingsPageProps> = ({

}) => {

  const [project, setProject] = useAtom(projectAtom)
  const [widgets, setWidgets] = useAtom(widgetsAtom)

  const [rawWidgets, setRawWidgets] = React.useState("")

  React.useEffect(() => {
    setRawWidgets(JSON.stringify(widgets, null, 2))
  }, [widgets])

  const onWidgetsSave = () => {
    const json = E.tryCatch(
      () => JSON.parse(rawWidgets),
      e => e
    )
    const res = E.flatMap(json, Widgets.decode)
    E.match<any, Widgets, void>(
      (err: any) => {
        toast.error("Invalid widgets: " + PathReporter.report(E.left(err)).join(', '))
      },
      widgets => {
        setWidgets(widgets)
        toast.success("Widgets saved")
      }
    )(res)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        gap: 2,
      }}
    >
      <Card>
        <CardHeader
          title="Project"
        />
        <CardContent>
          <JSONEditor
            height='800px'
            value={JSON.stringify(project, null, 2)}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          action={
            <Button
              onClick={onWidgetsSave}
              variant="outlined" size="small">
              Save
            </Button>
          }
          title="Widgets"
        />
        <CardContent>
          <JSONEditor
            height='800px'
            readonly={false}
            onChange={setRawWidgets}
            value={rawWidgets}
          />
        </CardContent>
      </Card>

    </Box>
  )
}
