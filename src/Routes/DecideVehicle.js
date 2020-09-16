import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';

import Loading from './Loading';
import DecideVehicle from '../Components/DecideVehicle';

const getBookingData = (bookingPid) => {
  return axios
    .get(
      `${process.env.REACT_APP_ZZIMCAR_API_URL}/self-rent/admin/decide/${bookingPid}`
    )
    .then((response) => {
      return response.data;
    });
};

export default ({ match }) => {
  const history = useHistory();
  const bookingPid = match.params.bookingPid || 0;
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [bookingData, setBookingData] = React.useState(null);

  React.useEffect(() => {
    getBookingData(bookingPid).then((result) => {
      if (result.data !== null) {
        setBookingData(result.data);
        setDataLoaded(true);
      } else {
        history.push({
          pathname: '/not-found',
        });
      }
    });
  }, [bookingPid, history]);

  return (
    <React.Fragment>
      <CssBaseline />
      {dataLoaded ? (
        <DecideVehicle bookingPid={bookingPid} bookingData={bookingData} />
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};
