import React from 'react'
import {
  editWidgetsAtom,
  moveLeftWidget,
  moveRightWidget,
  removeWidget, replaceWidget, useSetWidgets, useWidgets,
  Widget
} from "../model/Widgets";
import {Box, Modal, Paper} from "@mui/material";
import {TempoComponent} from "./TempoComponent";
import {TimeSignatureComponent} from "./TimeSignatureComponent";
import {BeatCounterComponent} from "./BeatCounterComponent";
import {BarBeatComponent} from "./BarBeatComponent";
import {BeatCountComponent} from "./widgets/BeatCountComponent";
import {ActiveTrackClipWidgetComponent} from "./widgets/ActiveTrackClipWidgetComponent";
import {TrackSectionWidgetComponent} from "./widgets/TrackSectionWidgetComponent";
import {useAtomValue, useSetAtom} from "jotai";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeftOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {PlayStopWidgetComponent} from "./widgets/PlayStopWidgetComponent";
import {ClipNavWidgetComponent} from "./widgets/ClipNavWidgetComponent";
import {SpacerWidgetComponent} from "./widgets/SpacerWidgetComponent";
import {WidgetSettingsComponent} from "./widgets/WidgetSettingsComponent";
import {ButtonWidgetComponent} from "./widgets/ButtonWidgetComponent";
import {Project} from "../model/Projects";
import {KnobWidgetComponent} from "./widgets/KnobWidgetComponent";

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24
}

export type WidgetComponentProps = {
  project: Project,
  widget: Widget
}

export const WidgetComponent: React.FC<WidgetComponentProps> = ({
  project,
  widget
}) => {

  const isEdit = useAtomValue(editWidgetsAtom)
  const setWidgets = useSetWidgets(project)
  const [settingsOpen, setSettingsOpen] = React.useState(false)

  let el = (
    <Box>Unknown</Box>
  )

  if(widget.type === 'tempo') {
    el = (<TempoComponent />)
  } else if(widget.type === 'time-signature') {
    el = (<TimeSignatureComponent />)
  } else if(widget.type === 'beat-counter') {
    el = (<BeatCounterComponent />)
  } else if(widget.type === 'bar-beat') {
    el = (<BarBeatComponent />)
  } else if(widget.type === 'beat-count') {
    el = (<BeatCountComponent />)
  } else if(widget.type === 'active-track-clip') {
    el = (<ActiveTrackClipWidgetComponent widget={widget} project={project} />)
  } else if(widget.type === 'track-sections') {
    el = (<TrackSectionWidgetComponent widget={widget} project={project} />)
  } else if(widget.type === 'play-stop') {
    el = (<PlayStopWidgetComponent />)
  } else if(widget.type === 'clip-nav') {
    el = (<ClipNavWidgetComponent widget={widget} project={project} />)
  } else if(widget.type === 'spacer') {
    el = (<SpacerWidgetComponent widget={widget}/>)
  } else if(widget.type === 'button') {
    el = (<ButtonWidgetComponent widget={widget} />)
  } else if(widget.type === 'knob') {
    el = (<KnobWidgetComponent widget={widget} />)
  }

  const label = widget.label === undefined ? null : (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          x: 0,
          y: '0',
          marginTop: '-16px',
          backgroundColor: '#777777',
          border: '1px solid white',
          lineHeight: 1,
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
          paddingLeft: '3px',
          paddingRight: '3px',
        }}
      >
        {widget.label}
      </Box>
    </Box>
  )

  const widgetBody = (
    <Box
      sx={{
        p: 2,
        borderSize: `${widget.borderSizePx}px`,
        borderColor: widget.borderColor,
        borderStyle: 'solid',
        borderRadius: '5px',
      }}
    >
      {label}
      <Box>
        {el}
      </Box>
    </Box>
  )

  if(isEdit) {

    return (
      <Paper>
        <Modal
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        >
          <Box sx={modalStyle}>
            <WidgetSettingsComponent
              widget={widget}
              setWidgets={setWidgets}
            />
          </Box>
        </Modal>
        <Box
          sx={{
            border: '1px solid #777777',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box>
          </Box>
          <Box>
            <IconButton
              onClick={() => {
                setSettingsOpen(true)
              }}
              aria-label="Edit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

        </Box>
        {widgetBody}
      </Paper>
    )
  } else if(widget.visible === false) {
    return el
  } else {
    return widgetBody
  }


}
