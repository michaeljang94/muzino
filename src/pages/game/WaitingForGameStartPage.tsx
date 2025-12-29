import { AlignVerticalCenterOutlined } from '@mui/icons-material';
import { Container, Grid, TextareaAutosize } from '@mui/material';

export const WaitingForGameStartPage: React.FC = () => {
  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        <Grid container spacing={10}>
          <Grid
            size={12}
            style={{
              textAlign: 'center',
              marginTop: '100px',
            }}
          >
            <h1>Waiting for game to start...</h1>
          </Grid>
          <Grid
            size={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className="🤚">
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="🌴"></div>
              <div className="👍"></div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
