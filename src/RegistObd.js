import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  regObdBoxForm: {
    margin: '70px auto 10px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default () => {
  const classes = useStyles();
  const [toast, setToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const handleClose = (evt, reason) => {
    if (reason === 'clickaway') return;
    setToast(false);
  };
  const [toastSeverity, setToastSeverity] = React.useState('success');

  const [manufacturer, setManufacturer] = React.useState('JASTECM');
  const [deviceKey, setDeviceKey] = React.useState('');
  const [plateNo, setPlateNo] = React.useState('');
  const handleClickRegist = () => {
    axios
      .post(process.env.REACT_APP_INT_API_URL + '/client/token', {
        apiKey: process.env.REACT_APP_INT_API_KEY,
        grantType: 'access_token',
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        axios
          .post(
            process.env.REACT_APP_INT_API_URL + '/car/remote/obd',
            {
              deviceKey,
              manufacturer,
              plateNo,
            },
            { headers: { xClientToken: token } }
          )
          .then((response) => {
            const result = response.data;
            if (result.success) {
              toastAlert('등록되었습니다', 'success');
            } else {
              toastAlert('등록 실패..!!', 'error');
            }
          })
          .catch((error) => {
            toastAlert('등록 실패...!!', 'error');
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };

  const toastAlert = (message, severity = 'succss') => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToast(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={toast}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={toastSeverity}>
            {toastMessage}
          </Alert>
        </Snackbar>
        <Box className='reg-obd-box' color='primary.main'>
          <form className={classes.regObdBoxForm} noValidate autoComplete='off'>
            <div>
              <FormControl
                fullWidth
                variant='outlined'
                className={classes.formControl}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  업체 선택
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='manufacturer'
                  value={manufacturer || ''}
                  onChange={(e) => {
                    setManufacturer(e.target.value);
                  }}
                >
                  <MenuItem value={'JASTECM'}>
                    <em>JASTECM</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                type='number'
                fullWidth
                className={classes.regObdBoxText}
                id='outlined-basic'
                label='OBD Serial No'
                variant='outlined'
                onChange={(e) => {
                  setDeviceKey(`VONXC${e.target.value}`);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>VONXC</InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                className={classes.regObdBoxText}
                id='outlined-basic'
                label='차량 번호판'
                variant='outlined'
                onChange={(e) => {
                  setPlateNo(e.target.value);
                }}
                value={plateNo}
              />
            </div>
            <div>
              <Button
                fullWidth
                className={classes.regObdBoxBtn}
                size='large'
                variant='contained'
                color='primary'
                onClick={handleClickRegist}
              >
                등록
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
};
