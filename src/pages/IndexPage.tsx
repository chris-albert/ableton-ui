import React from 'react'
import {Box, Button, Drawer} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {AddWidgetComponent} from "../components/AddWidgetComponent";
import {WidgetsComponent} from "../components/WidgetsComponent";


export type IndexPageProps = {}

export const IndexPage: React.FC<IndexPageProps> = ({}) => {

  const [widgetOpen, setWidgetOpen] = React.useState(false)

  return (
    <Box>
      <Drawer
        anchor='top'
        open={widgetOpen}
        onClose={() => setWidgetOpen(false)}
      >
        <AddWidgetComponent />
      </Drawer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          p: 2
        }}
      >
        <Button
          variant="outlined"
          startIcon={
            <AddCircleOutlineIcon />
          }
          onClick={() => setWidgetOpen(true)}
        >
          Add Widget
        </Button>
      </Box>
      <Box>
        <WidgetsComponent />
      </Box>
    </Box>
  )
}
