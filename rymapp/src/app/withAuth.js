import React, { useState, useEffect } from 'react';
import { AuthService }from './auth';
import { Redirect, Route } from 'react-router-dom';


export default function WithAuth({children, ...rest}) {

    const [user, setUser] = useState(AuthService.loggedIn());

    useEffect(() => {
            if (AuthService.loggedIn() != user){
                setUser(AuthService.loggedIn())
                console.log(`User is ${user}`)
            }
    },[user]) 

 
    return(
        <Route {...rest} render={ ({location}) =>
            user? 
                ( children )
            :
                ( <Redirect to={ { pathname: "/login", state: { from: location }} } /> ) 
            } 
        />
    )

}
