import React, {useState, useEffect }  from 'react';

import Typography from '@material-ui/core/Typography';

import { useStyles, bounce } from './styles/styles';
import Gallery from './gallery';
import SignIn from './signin';

export default function App() {
  const classes = useStyles();


  return (
    <React.Fragment>
      {
        sessionStorage.getItem('loggedin')?
      <main>
        <Gallery />
      </main>
      : 
      <main>
        <SignIn />
      </main>
      }
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          2020 R&M Corp.
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}