import { Toolbar } from '@material-ui/core';
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleIcon from '@material-ui/icons/People';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
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
                    {sessionStorage.getItem('loggedin')?
                        '':
                        <Link to={'/signup'}>
                            <Typography variant="h6" color="white" noWrap className={classes.toolText}>
                                <PeopleIcon className={classes.icon} />
                                Inscribirse
                            </Typography>
                        </Link>
                    }

                    {sessionStorage.getItem('loggedin')?     
                        '':              
                        <Link to={'/home'}>
                            <Typography variant="h6" color="white" noWrap className={classes.toolText}>
                                <HomeIcon className={classes.icon} />
                                Iniciar sesión
                            </Typography>
                        </Link>
                    }
                    {sessionStorage.getItem('loggedin')? 
                        <Link to={'/gallery'}>
                            <Typography variant="h6" color="white" noWrap className={classes.toolText}>
                                <MenuBookIcon className={classes.icon} />
                                Galería
                            </Typography>
                        </Link>
                        : ''
                    }
                    {sessionStorage.getItem('loggedin')? 
                        <Link to={'/home'}>
                            <Typography variant="h6" color="white" noWrap onClick={() => handleLogout()}>
                                <MeetingRoomIcon className={classes.icon} />
                                Salir
                            </Typography>
                        </Link>
                        :''
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}