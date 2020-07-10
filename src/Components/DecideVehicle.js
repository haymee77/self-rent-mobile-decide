import React, { useRef } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    margin: '10px 0',
  },
  wrapIconIcon: {
    marginRight: '5px',
  },
  formControl: {
    marginTop: '10px',
  },
  noticeList: {
    margin: 0,
    paddingLeft: '25px',
    '& li': {
      padding: 0,
    },
  },
  button: {
    marginTop: '5px',
  },
  wrapBox: {
    marginTop: '10px',
  },
  bold7: {
    fontWeight: '700',
  },
}));

const DecideVehicle = (props) => {
  const {
    bookingPid,
    bookingData: {
      bookerName,
      bookerContact,
      driverName,
      driverContact,
      decidedCarNo,
      fuelType,
      modelName,
      startAt,
      returnAt,
      availableVehicles,
      state,
      bookingCancelStatus,
    },
  } = props;

  const [vehiclePid, setVehiclePid] = React.useState(0);
  const [selectVehicleError, setSelectVehicleError] = React.useState(false);
  const [decided] = React.useState(
    decidedCarNo !== null && decidedCarNo.length > 0
  );
  const cancelSelfRent = state === 'CANCEL';
  const cancelBooking = bookingCancelStatus === 'SUCCESS';
  const passedBooking = new Date(startAt) < new Date();
  const canceled = cancelSelfRent || cancelBooking || passedBooking;
  const refVehicleSelect = useRef();
  const classes = useStyles();

  const [toast, setToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const handleClose = (evt, reason) => {
    if (reason === 'clickaway') return;
    setToast(false);
  };
  const [toastSeverity, setToastSeverity] = React.useState('success');
  const toastAlert = (message, severity = 'success') => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToast(true);
  };

  const handleClickDecide = () => {
    if (vehiclePid === 0) {
      toastAlert('차량을 선택해주세요.', 'error');
      setSelectVehicleError(true);
      refVehicleSelect.current.focus();
    } else {
      setSelectVehicleError(false);
      requestDecide().then((result) => {
        if (result.success) {
          window.location.reload();
        }
      });
    }
  };

  const handleClickNoVehicle = () => {
    if (
      window.confirm('일반 배차방식으로 전환됩니다. 계속 진행하시겠습니까?')
    ) {
      requestCancel().then((result) => {
        if (result.success) {
          window.location.reload();
        }
      });
    }
  };

  const requestCancel = () => {
    return axios
      .get(
        `${process.env.REACT_APP_ZZIMCAR_API_URL}/self-rent/cancel/${bookingPid}`
      )
      .then((response) => {
        return response.data;
      });
  };

  const requestDecide = () => {
    return axios
      .post(`${process.env.REACT_APP_ZZIMCAR_API_URL}/self-rent/decide`, {
        bookingPid,
        carObdPid: vehiclePid,
      })
      .then((response) => {
        return response.data;
      });
  };

  return (
    <Container maxWidth='sm'>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={toast}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={toastSeverity}>
          {toastMessage}
        </Alert>
      </Snackbar>
      <Box className={classes.wrapBox}>
        <h2>무인배반 차량 확정</h2>
      </Box>
      <Box
        className={classes.wrapBox}
        padding={'10px'}
        bgcolor='text.disabled'
        color='background.paper'
      >
        <Typography
          variant='subtitle2'
          gutterBottom={true}
          className={classes.bold7}
        >
          예약정보
        </Typography>
        예약자명: {bookerName}({bookerContact}) <br />
        운전자명: {driverName}({driverContact}) <br />
        <br />
        이용일자: {startAt.replace('T', ' ')} <br />
        반납일자: {returnAt.replace('T', ' ')} <br />
        <br />
        차종: {modelName}({fuelType})
      </Box>

      {/* 대여 시작시각 지났을 때 노출 */}
      <Box
        display={passedBooking ? 'block' : 'none'}
        className={classes.wrapBox}
      >
        <Typography variant='button' className={classes.bold7}>
          확정 가능 시각이 지난 예약건입니다.
        </Typography>
      </Box>

      {/* 예약 취소되었을 때 노출 */}
      <Box
        display={cancelBooking ? 'block' : 'none'}
        className={classes.wrapBox}
      >
        <Typography variant='button' className={classes.bold7}>
          취소된 예약건입니다.
        </Typography>
      </Box>

      {/* 무인배반차 취소되었을 때 노출 */}
      <Box
        display={!cancelBooking && cancelSelfRent ? 'block' : 'none'}
        className={classes.wrapBox}
      >
        <Typography variant='button' className={classes.bold7}>
          일반 배차로 전환된 예약건입니다.
        </Typography>
      </Box>

      {/* 이미 차량 확정되었을 때 노출 */}
      <Box
        display={canceled ? 'none' : decided ? 'block' : 'none'}
        className={classes.wrapBox}
      >
        <Typography variant='button' className={classes.bold7}>
          {decidedCarNo}
        </Typography>{' '}
        차량으로 확정되었습니다. 차량이 확정되면 예약자에게 모바일 체크인 링크가
        전송되며 계약서 작성이 진행되므로 차량 변경이 불가능합니다.
      </Box>

      {/* 차량 확정해야할 때 노출 */}
      <Box
        display={canceled ? 'none' : decided ? 'none' : 'block'}
        className={classes.wrapBox}
        fontSize={12}
        lineHeight={1.8}
      >
        <Typography variant='subtitle1' className={classes.wrapIcon}>
          <ErrorIcon className={classes.wrapIconIcon} /> 알려드립니다.
        </Typography>
        <Typography
          component='ol'
          className={classes.noticeList}
          variant='subtitle2'
        >
          <li>
            미확정 시 금일 16시까지 확정요청 문자가 지속적으로 발송됩니다.
          </li>
          <li>
            17시 이후 미확정건은 찜카 고객센터에서 임의로 처리될 수 있으니
            반드시 시간 내 차량 확정 바랍니다.
          </li>
          <li>
            [무인배반 차량 없음] 선택 시 일반 배차방식으로 전환되며 예약자에게
            무인배반차 취소 알림이 발송됩니다.
          </li>
          <li>
            차량 선택 후 [차량 확정] 시 예약자가 모바일 체크인을 진행하며
            계약서를 작성하므로 이후 차량 변경이 불가능합니다. 위 이용일에
            이용가능한 차량을 선택해주세요.
          </li>
        </Typography>
      </Box>
      <Box
        display={canceled ? 'none' : decided ? 'none' : 'block'}
        className={classes.wrapBox}
      >
        <FormControl
          variant='outlined'
          className={classes.formControl}
          fullWidth={true}
          error={selectVehicleError}
        >
          <InputLabel id='demo-simple-select-outlined-label'>
            차량 선택
          </InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={vehiclePid}
            onChange={(e) => setVehiclePid(e.target.value)}
            label='Vehicle'
            inputRef={refVehicleSelect}
          >
            <MenuItem key={0} disabled value={0}>
              <em>차량을 선택해주세요.</em>
            </MenuItem>
            {availableVehicles.map((vehicle) => (
              <MenuItem key={vehicle.pid} value={vehicle.pid}>
                <em>{vehicle.carNo}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          fullWidth={true}
          variant='contained'
          size='large'
          color='primary'
          className={classes.button}
          onClick={handleClickDecide}
        >
          차량 확정
        </Button>
        <Button
          fullWidth={true}
          size='large'
          className={classes.button}
          variant='contained'
          onClick={handleClickNoVehicle}
        >
          무인배반 차량 없음
        </Button>
      </Box>
    </Container>
  );
};

export default DecideVehicle;
