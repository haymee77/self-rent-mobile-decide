import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CircularProgress,
  Box,
  CssBaseline,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box className={classes.root}>
          <CircularProgress />
        </Box>
      </Container>
    </React.Fragment>
  );
};
