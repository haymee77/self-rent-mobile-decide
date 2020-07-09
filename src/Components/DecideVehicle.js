import React from 'react';
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
  } = props.bookingData;

  const [vehiclePid, setVehiclePid] = React.useState(0);
  const [decided] = React.useState(
    decidedCarNo !== null && decidedCarNo.length > 0
  );
  const classes = useStyles();

  return (
    <Container maxWidth='sm'>
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
      <Box display={decided ? 'block' : 'none'} className={classes.wrapBox}>
        이미{' '}
        <Typography variant='button' className={classes.bold7}>
          {decidedCarNo}
        </Typography>{' '}
        차량으로 확정되었습니다.
      </Box>
      <Box
        display={decided ? 'none' : 'block'}
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
            [무인배반 차량 없음] 선택 시 예약자에게 무인배반차 취소 알림이
            발송됩니다.
          </li>
          <li>
            차량 선택 후 [차량 확정] 시 예약자가 모바일 체크인을 진행하며
            계약서를 작성하므로 이후 차량 변경이 불가능합니다. 위 이용일에
            이용가능한 차량을 선택해주세요.
          </li>
        </Typography>
      </Box>
      <Box display={decided ? 'none' : 'block'} className={classes.wrapBox}>
        <FormControl
          variant='outlined'
          className={classes.formControl}
          fullWidth={true}
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
        >
          차량 확정
        </Button>
        <Button
          fullWidth={true}
          size='large'
          className={classes.button}
          variant='contained'
        >
          무인배반 차량 없음
        </Button>
      </Box>
    </Container>
  );
};

export default DecideVehicle;
