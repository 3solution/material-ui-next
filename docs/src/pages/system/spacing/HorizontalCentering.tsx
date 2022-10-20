import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function HorizontalCentering() {
  return (
    <div>
      <Box mx="auto" bgcolor="background.paper" p={1}>
        Centered element
      </Box>
    </div>
  );
}
