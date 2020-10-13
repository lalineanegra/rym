import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom'

import { useStyles } from './styles/signinStyles';
import { baseUrl } from '../common/baseUrl';

export default function SignIn() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [formContent, setFormContent] = useState( {username: '', password: ''});

  function handleChange (e) {
    const target = e.target;
    const value = target.type === 'checkbox'? target.checkbox: target.value
    const name = target.name;
    setFormContent({...formContent, [name]: value })
    console.log(formContent);
  }

  function handleSubmit(e){
    e.preventDefault();
    setIsLoading(true);
    fetch(baseUrl+'users/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formContent),
      credentials: 'same-origin'
    })
    .then(res => {
      if (res.ok){
        return res
      } else {
        return new Error({message: 'Error de servidor'})
      }
    })
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem('loggedin', true)
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('username', res.username)
      setIsLoading(false);
      history.push("/gallery")
    })
    .catch(e => {
      alert('¡Hubo un error! Intenta nuevamente')
      setIsLoading(false);
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio de sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={ e => handleSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="username"
            label="Email"
            name="username"
            autoComplete="username"
            autoFocus
            value={formContent.username}
            onChange={e => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formContent.password}
            onChange={e => handleChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
            value="submit"
          >
            Iniciar Sesión
            {
              isLoading?
              <div className={classes.circ} style={{'marginLeft': '1em'}}>
                <CircularProgress color="white" size={20}/>
              </div>: ''
            }
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"¿No tienes una cuenta? Inscríbete aquí"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}