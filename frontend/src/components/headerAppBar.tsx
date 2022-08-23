import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { margin } from '@mui/system';

export default function HeaderAppBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Flight Finder
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}