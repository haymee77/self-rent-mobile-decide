import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    margin: '10px 0',
  },
  wrapIconIcon: {
    marginRight: '5px',
  },
}));

export default ({ match }) => {
  const classes = useStyles();
  const bookingPid = match.params.bookingPid || 0;

  const [bookerName, setBookerName] = React.useState('');
  const [driverName, setDriverName] = React.useState('');
  const [startAt, setStartAt] = React.useState('');
  const [returnAt, setReturnAt] = React.useState('');
  const [vehicleModelName, setVehicleModelName] = React.useState('');

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box m={'70px auto 10px'}>
          <h2>무인배반 차량 확정</h2>
        </Box>
        <Box padding={'10px'} bgcolor='text.disabled' color='background.paper'>
          예약자명: {bookerName} <br />
          운전자명: {driverName} <br />
          <br />
          이용일자: {startAt} <br />
          반납일자: {returnAt} <br />
          <br />
          차종: {vehicleModelName}
        </Box>
        <Box marginTop={'10px'} fontSize={12} lineHeight={1.8}>
          위 이용일에 이용가능한 차량을 선택해주세요.
          <br />
          <Typography variant='subtitle1' className={classes.wrapIcon}>
            <ErrorIcon className={classes.wrapIconIcon} /> 알려드립니다.
          </Typography>
          <br />
          1. 미확정 시 금일 16시까지 확정요청 문자가 지속적으로 발송됩니다.{' '}
          <br />
          2. 17시 이후 미확정건은 찜카 고객센터에서 임의로 처리될 수 있으니
          반드시 시간 내 차량 확정 바랍니다.
          <br />
          3. [무인배반 차량 없음] 선택 시 예약자에게 무인배반차 취소 알림이
          발송됩니다.
          <br />
          4. 차량 선택 후 [차량 확정] 시 예약자가 모바일 체크인을 진행하며
          계약서를 작성하므로 이후 차량 변경이 불가능합니다.
        </Box>
      </Container>
    </React.Fragment>
  );
};
