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
import { useHistory, Redirect } from 'react-router-dom'

import { useStyles } from './styles/signupStyles';
import { baseUrl } from '../common/baseUrl';

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [formContent, setFormContent] = useState({firstname: '', lastname: '', email: '', password: ''});
  const [touched, setTouched] = useState({firstname: '', lastname: '', email: '', password: ''})
  const errors = validate(formContent.firstname, formContent.lastname, formContent.email, formContent.password)

  function handleBlur(e) { 
      setTouched({...touched, [e.target.name]: true})
  }

  function validate(firstname, lastname, email, password) {
    const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
    const validPassword = val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(val)
    const errors = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    }

    if (firstname !== undefined &&  touched.firstname && firstname.length <= 2)
      errors.firstname = 'Nombre debe tener más de 2 caracteres'

    else if (firstname !== undefined &&  touched.firstname && firstname.length > 20)
      errors.firstname = 'Nombre debe tener menos de 20 caracteres'

    if (lastname !== undefined &&  touched.lastname && lastname.length <= 2)
      errors.lastname = 'Apellido debe tener más de 4 caracteres'

    else if (lastname !== undefined &&  touched.lastname && lastname.length > 20)
      errors.lastname = 'Apellido debe tener menos de 20 caracteres'
        
    if (email !== undefined &&  touched.email && !validEmail(email))
      errors.email = 'Correo No valido'
        
    if (password !== undefined && touched.password && !validPassword(password))
      errors.password = 'Contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y números'

    return errors
  }

  function handleChange (e) {
    const target = e.target;
    const value = target.type === 'checkbox'? target.checkbox: target.value
    const name = target.name;
    setFormContent({...formContent, [name]: value })
  }

  function handleSubmit(e){
    e.preventDefault();
    const sendForm = {...formContent, username: formContent.email }
    fetch(baseUrl+'users/signup', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendForm),
      credentials: 'same-origin'
    })
    .then( res => {
      if(!res.ok) throw new Error(`${res.status}: usuario existente`);
      else return res
    })
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem('loggedin', true)
      sessionStorage.setItem('email', res.email)
      history.push("/gallery")
    })
    .catch(e => {
      console.log(e)
      alert(`Hubo un error: ${e}`)
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
          Inscribirse
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="Nombre"
                error={errors.firstname !== ''}
                helperText={errors.firstname}
                autoFocus
                value={formContent.firstname}
                onBlur={e => handleBlur(e)}
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Apellido"
                error={errors.lastname !== ''}
                helperText={errors.lastname}
                name="lastname"
                autoComplete="lname"
                value={formContent.lastname}
                onBlur={e => handleBlur(e)}
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userame"
                label="Email"
                name="email"
                error={errors.email !== ''}
                helperText={errors.email}
                autoComplete="email"
                value={formContent.email}
                onBlur={e => handleBlur(e)}
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                error={errors.password !== ''}
                helperText={errors.password}
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formContent.password}
                onBlur={e => handleBlur(e)}
                onChange={e => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            name="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                ¿Ya tienes una cuenta? Inicia sesión aquí
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}