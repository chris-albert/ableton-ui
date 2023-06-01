import React from 'react'
import {MidiMessage} from "../midi/WindowMidi";
import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Chip
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {byteArrayToJson} from "../utils/Converters";
import {JSONEditor} from "./JSONEditor";
import {parseAbletonUIMessage} from "../data/AbletonUIMessage";
import _ from 'lodash'

export type MidiMessageDetailProps = {
  message: MidiMessage
  messageNumber: number
}

export const MidiMessageDetail: React.FC<MidiMessageDetailProps> = ({
  message,
  messageNumber
}) => {

  let detail = (
    <Box>Unknown</Box>
  )

  let jsonType = (
    <Box></Box>
  )

  let values = (
    <Box></Box>
  )

  if(message.type === 'sysex') {
    try {
      var json = parseAbletonUIMessage(byteArrayToJson(message.data))
      detail = (
        <JSONEditor
          height={json.type === 'beat' ? '100px' : '500px'}
          value={JSON.stringify(json, null, 2)}
        />
      )
      jsonType = (
        <Box>{json.type}</Box>
      )
      if(json.type === 'beat') {
        values = (
          <Box>
            <Chip
              color='info'
              size="small"
              label={json.value}
            />
          </Box>
        )
      } else if(json.type === 'init') {
        values = (
          <Box>
            <Chip
              sx={{mr: 1}}
              color='info'
              size="small"
              label={`Track: ${json.track.name}`}
            />
            <Chip
              color='info'
              size="small"
              label={`Clips: ${_.size(json.track.clips)}`}
            />
          </Box>
        )
      }
    } catch (e) {
      detail = (
        <Box>Unable to parse JSON, raw sysex data [{message.data}]</Box>
      )
    }
  } else if(message.type === 'noteon') {
    values = (
      <Box>
        <Chip
          sx={{mr: 1}}
          color='info'
          size="small"
          label={`Channel: ${message.channel}`}
        />
        <Chip
          sx={{mr: 1}}
          color='info'
          size="small"
          label={`Note: ${message.note}`}
        />
        <Chip
          color='info'
          size="small"
          label={`Velocity: ${message.velocity}`}
        />
      </Box>
    )
  } else if(message.type === 'unknown') {
    detail = (
      <Box>Unable to parse JSON {JSON.stringify(message.data.data, null, 2)}</Box>
    )
  }

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Chip
                size="small"
                label={messageNumber}
              />
            </Grid>
            <Grid item xs={1}>
              <Chip
                color='primary'
                size="small"
                label={message.type}
              />
            </Grid>
            <Grid item xs={1}>
              <Chip
                color='success'
                size="small"
                label={jsonType}
              />
            </Grid>
            <Grid item xs={9}>
              <Box sx={{display: 'flex', justifyContent: 'flex-start', mr: 2}}>
                {values}
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <Divider/>
        <AccordionDetails>
          <Typography>
            {detail}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
