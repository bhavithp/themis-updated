import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const AppBarDiv = styled('div')({
  position: 'fixed',
  width: '100%',
  top: 'auto',
  bottom: 0,
  backgroundColor: '#3098c5'
});

const ToolbarGrow = styled('div')({
  flexGrow: 1,
})

function ActionBar({ children }) {

  return (
    <AppBar color="primary">
      <AppBarDiv>
        <Toolbar>
          <ToolbarGrow />
          {children}
        </Toolbar>
      </AppBarDiv>
    </AppBar>
  );
}

export default ActionBar;

