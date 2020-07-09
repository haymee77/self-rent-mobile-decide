import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Box, Typography, Divider } from '@material-ui/core';

export default () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box component='div' mt={20}>
          <Typography variant='h5' gutterBottom={true}>
            페이지를 찾을 수 없습니다.
          </Typography>
          <Divider />
          <Typography
            component='div'
            color='textSecondary'
            variant='body2'
            gutterBottom={true}
          >
            <Box mt={1.5}>
              잘못된 요청이거나 더이상 제공하지 않는 페이지입니다.
              <br /> 자세한 사항은 찜카 고객센터로 문의 바랍니다.
            </Box>
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
};
