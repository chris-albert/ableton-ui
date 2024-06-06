import React from 'react'
import {Widget} from "../../model/Widgets";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {JSONEditor} from "../JSONEditor";
import * as E from "fp-ts/Either";
import {toast} from "react-toastify";
import {PathReporter} from "io-ts/PathReporter";
import _ from 'lodash'

export type WidgetSettingsComponentProps = {
  widget: Widget
  onWidgetUpdate: (w: Widget) => void
}

export const WidgetSettingsComponent: React.FC<WidgetSettingsComponentProps> = ({
  widget,
  onWidgetUpdate
}) => {

  const [settings, setSettings] = React.useState(JSON.stringify(widget, null, 2))

  const onWidgetSave = () => {
    const json = E.tryCatch(
      () => JSON.parse(settings),
      e => e
    )
    const res = E.flatMap(json, Widget.decode)
    E.match<any, Widget, void>(
      (err: any) => {
        if(_.isArray(err)) {
          toast.error("Invalid widget: " + PathReporter.report(E.left(err)).join(', '))
        } else {
          toast.error("Invalid JSON: " + err)
        }
      },
      widget => {
        onWidgetUpdate(widget)
        toast.success("Widget saved")
      }
    )(res)
  }

  return (
    <Card>
      <CardHeader
        action={
          <Button
            onClick={() => {
              onWidgetSave()
            }}
            variant="outlined" size="small">
            Save
          </Button>
        }
        title={widget.type}
      />
      <CardContent>
        <JSONEditor
          height='200px'
          width='365px'
          readonly={false}
          onChange={setSettings}
          value={settings}
        />
      </CardContent>
    </Card>
  )
}
