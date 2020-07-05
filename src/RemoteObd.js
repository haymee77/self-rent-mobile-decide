import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HighlightIcon from '@material-ui/icons/Highlight';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  searchBoxForm: {
    margin: '70px auto 10px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  searchBoxText: {
    width: '70%',
  },
  searchBoxBtn: {
    marginTop: '15px',
  },
  buttonBoxGroup: {
    width: '100%',
    '& button': {
      height: 70,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
  const toastAlert = (message, severity = 'success') => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToast(true);
  };
  const [toastSeverity, setToastSeverity] = React.useState('success');

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [deviceKey, setDeviceKey] = React.useState('');
  const [validDevice, setValidDevice] = React.useState(false);

  const handleChangeDeviceKey = (e) => {
    const deviceKeyPrefix = 'VONXC';
    setDeviceKey(`${deviceKeyPrefix}${e.target.value}`);
  };
  const handleView = () => {
    if (deviceKey.trim() === '') {
      toastAlert('Device Key를 입력해주세요.', 'error');
      return;
    }
    setOpenBackdrop(true);
    axios
      .post(process.env.REACT_APP_INT_API_URL + '/client/token', {
        apiKey: process.env.REACT_APP_INT_API_KEY,
        grantType: 'access_token',
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        axios
          .get(
            process.env.REACT_APP_INT_API_URL + '/car/remote/obd/' + deviceKey,
            { headers: { xClientToken: token } }
          )
          .then((response) => {
            if (response.data.success) {
              setValidDevice(true);
              toastAlert('원격조정 가능합니다.', 'success');
            } else {
              setValidDevice(false);
              toastAlert('Device Key 확인 후 다시 조회바랍니다.', 'error');
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setOpenBackdrop(false);
      });
  };

  const handleUnlock = () => {
    if (!validDevice) {
      toastAlert('Device Key [조회] 후 이용바랍니다.', 'error');
      return;
    }
    setOpenBackdrop(true);
    axios
      .post(process.env.REACT_APP_INT_API_URL + '/client/token', {
        apiKey: process.env.REACT_APP_INT_API_KEY,
        grantType: 'access_token',
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        axios
          .get(
            process.env.REACT_APP_INT_API_URL + '/car/remote/open/' + deviceKey,
            { headers: { xClientToken: token } }
          )
          .then((response) => {
            setOpenBackdrop(false);
            if (response.data.success) {
              toastAlert('차량 문이 열렸습니다.');
            } else {
              toastAlert('잠금해제 실패..!', 'error');
            }
          })
          .catch((error) => {
            setOpenBackdrop(false);
            toastAlert('잠금해제 실패..!', 'error');
          });
      })
      .catch((error) => console.log(error));
  };

  const handleLock = () => {
    if (!validDevice) {
      toastAlert('Device Key [조회] 후 이용바랍니다.', 'error');
      return;
    }
    setOpenBackdrop(true);
    axios
      .post(process.env.REACT_APP_INT_API_URL + '/client/token', {
        apiKey: process.env.REACT_APP_INT_API_KEY,
        grantType: 'access_token',
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        axios
          .get(
            process.env.REACT_APP_INT_API_URL +
              '/car/remote/close/' +
              deviceKey,
            { headers: { xClientToken: token } }
          )
          .then((response) => {
            setOpenBackdrop(false);
            if (response.data.success) {
              toastAlert('차량 문이 잠겼습니다.');
            } else {
              toastAlert('잠금 실패..!', 'error');
            }
          })
          .catch((error) => {
            setOpenBackdrop(false);
            toastAlert('잠금 실패..!', 'error');
          });
      })
      .catch((error) => console.log(error));
  };

  const handleHorn = () => {
    if (!validDevice) {
      toastAlert('Device Key [조회] 후 이용바랍니다.', 'error');
      return;
    }
    setOpenBackdrop(true);
    axios
      .post(process.env.REACT_APP_INT_API_URL + '/client/token', {
        apiKey: process.env.REACT_APP_INT_API_KEY,
        grantType: 'access_token',
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        axios
          .get(
            process.env.REACT_APP_INT_API_URL + '/car/remote/horn/' + deviceKey,
            { headers: { xClientToken: token } }
          )
          .then((response) => {
            setOpenBackdrop(false);
            if (response.data.success) {
              toastAlert('비상등/경적 ON.');
            } else {
              toastAlert('비상등/경적 실패..!', 'error');
            }
          })
          .catch((error) => {
            setOpenBackdrop(false);
            toastAlert('비상등/경적 실패..!', 'error');
          });
      })
      .catch((error) => console.log(error));
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
        <Box className='search-box' color='primary.main'>
          <form className={classes.searchBoxForm} noValidate autoComplete='off'>
            <TextField
              type='tel'
              onChange={handleChangeDeviceKey}
              className={classes.searchBoxText}
              id='outlined-basic'
              label='Device Key'
              variant='outlined'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>VONXC</InputAdornment>
                ),
              }}
            />
            <Button
              className={classes.searchBoxBtn}
              size='large'
              variant='contained'
              color='primary'
              onClick={handleView}
            >
              조회
            </Button>
          </form>
        </Box>
        <Box className='button-box' color='primary.main'>
          <ButtonGroup
            className={classes.buttonBoxGroup}
            orientation='vertical'
            color='primary'
            aria-label='vertical outlined primary button group'
          >
            <Button size='large' onClick={handleUnlock}>
              <LockOpenIcon />
              {' 잠금해제'}
            </Button>
            <Button size='large' onClick={handleLock}>
              <LockIcon />
              {' 잠금'}
            </Button>
            <Button size='large' onClick={handleHorn}>
              <VolumeDownIcon />
              {' 비상등 / '}
              <HighlightIcon />
              {' 경적'}
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </React.Fragment>
  );
};
