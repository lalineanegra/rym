import { Toolbar } from '@material-ui/core';
import React from 'react';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link, useHistory } from 'react-router-dom';

import { useStyles } from './styles/styles';
import { AuthService } from './auth';

export default function AppMenu() {
    const classes = useStyles();
    let history = useHistory();

    function handleLogout(){
        localStorage.setItem('orders', '')
        localStorage.setItem('tabCounter', '')
        AuthService.logout()
        history.push('/login')
    }

    return(
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar style={{'backgroundColor': '#d18419'}}>
                    <CameraIcon className={classes.icon} />
                    <Link to={'/signup'}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolText}>
                            Inscribirse
                        </Typography>
                    </Link>
                    <Link to={'/home'}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolText}>
                            Iniciar sesión
                        </Typography>
                    </Link>
                    <Link to={'/gallery'}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolText}>
                            Galería
                        </Typography>
                    </Link>
                    <Link to={'/home'}>
                        <Typography variant="h6" color="inherit" noWrap onClick={() => handleLogout()}>
                            Salir
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}