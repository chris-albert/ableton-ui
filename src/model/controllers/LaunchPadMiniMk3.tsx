import {
  Controller,
  ControllerPad,
  ControllerPadNote,
  ControllerPadTarget,
  midiFromRowCol,
} from '../Controller'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Box } from '@mui/material'

export const LaunchPadMiniMk3: Controller = new Controller({
  pads: [
    [
      new ControllerPad({
        target: ControllerPadNote(91),
        content: <ArrowDropUpIcon />,
      }),
      new ControllerPad({
        target: ControllerPadNote(92),
        content: <ArrowDropDownIcon />,
      }),
      new ControllerPad({
        target: ControllerPadNote(93),
        content: <ArrowLeftIcon />,
      }),
      new ControllerPad({
        target: ControllerPadNote(94),
        content: <ArrowRightIcon />,
      }),
      new ControllerPad({
        target: ControllerPadNote(95),
        content: <>Session</>,
      }),
      new ControllerPad({
        target: ControllerPadNote(96),
        content: <>Drums</>,
      }),
      new ControllerPad({
        target: ControllerPadNote(97),
        content: <>Keys</>,
      }),
      new ControllerPad({
        target: ControllerPadNote(98),
        content: <>User</>,
      }),
      new ControllerPad({
        target: ControllerPadNote(99),
        content: <></>,
      }),
    ],
    [
      ...new Array(8).fill(0).map(
        (_, i) =>
          new ControllerPad({
            target: ControllerPadNote(midiFromRowCol(8, i)),
            content: <></>,
          }),
      ),
      new ControllerPad({
        target: ControllerPadNote(89),
        content: <KeyboardArrowRightIcon />,
      }),
    ],
    [
      ...new Array(8).fill(0).map(
        (_, i) =>
          new ControllerPad({
            target: ControllerPadNote(midiFromRowCol(7, i)),
            content: <></>,
          }),
      ),
      new ControllerPad({
        target: ControllerPadNote(79),
        content: <KeyboardArrowRightIcon />,
      }),
    ],
    [
      ...new Array(8).fill(0).map(
        (_, i) =>
          new ControllerPad({
            target: ControllerPadNote(midiFromRowCol(6, i)),
            content: <></>,
          }),
      ),
      new ControllerPad({
        target: ControllerPadNote(69),
        content: <KeyboardArrowRightIcon />,
      }),
    ],
    [
      ...new Array(8).fill(0).map(
        (_, i) =>
          new ControllerPad({
            target: ControllerPadNote(midiFromRowCol(5, i)),
            content: <></>,
          }),
      ),
      new ControllerPad({
        target: ControllerPadNote(59),
        content: <KeyboardArrowRightIcon />,
      }),
    ],
    [
      ...new Array(8).fill(0).map(
        (_, i) =>
          new ControllerPad({
            target: ControllerPadNote(midiFromRowCol(4, i)),
            content: <></>,
          }),
      ),
      new ControllerPad({
        target: ControllerPadNote(49),
        content: <KeyboardArrowRightIcon />,
      }),
    ],
    [
      ...new Array(8).fill(0).map(
        (_, i) =>
          new ControllerPad({
            target: ControllerPadNote(midiFromRowCol(3, i)),
            content: <></>,
          }),
      ),
      new ControllerPad({
        target: ControllerPadNote(39),
        content: <KeyboardArrowRightIcon />,
      }),
    ],
    [
      ...new Array(8).fill(0).map(
        (_, i) =>
          new ControllerPad({
            target: ControllerPadNote(midiFromRowCol(2, i)),
            content: <></>,
          }),
      ),
      new ControllerPad({
        target: ControllerPadNote(29),
        content: <KeyboardArrowRightIcon />,
      }),
    ],

    [
      ...new Array(8).fill(0).map(
        (_, i) =>
          new ControllerPad({
            target: ControllerPadNote(midiFromRowCol(1, i)),
            content: <></>,
          }),
      ),
      new ControllerPad({
        target: ControllerPadNote(19),
        content: (
          <Box>
            <Box>Stop</Box>
            <Box>Solo</Box>
            <Box>Mute</Box>
          </Box>
        ),
      }),
    ],
  ],
})
