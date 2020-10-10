import React from 'react';
import { Redirect } from 'react-router-dom'
import decode from 'jwt-decode'
import { baseUrl } from '../common/baseUrl'

const OC_API = baseUrl;

export const AuthService =  {

    authenticate(username, password) {

        sessionStorage.setItem('loggedin', false)
            
        fetch(`${OC_API}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {	
            if (res.ok){
                return res
            } else {
                console.log('Hubo un error')
            }
        }, err => {
            console.log(`Hubo un problema: ${err}`)
        })
        .then(res => res.json())
        .then(res => { 
            console.log(res.role)
            console.log(res.token)
            sessionStorage.setItem('role', res.role);
            sessionStorage.setItem('token', res.token)
            sessionStorage.setItem('loggedin', true)
            return (<Redirect to={ { pathname: "/home" } }/>)
        })
        .catch(e => console.log(`There was an Error ${e}`))
    },
    loggedIn() {
        const sess = sessionStorage.getItem('loggedin'); // 
        return sess;
    },
    setSess(token) {
        // Saves user token to localStorage
        sessionStorage.setItem('token', token)
    },
    getSess() {
        // Retrieves the user token from localStorage
        return sessionStorage.getItem('token')
    },
    logout() {
        // Clear user token and profile data from localStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('loggedin');
        console.log(sessionStorage.getItem('token'))
        console.log(sessionStorage.getItem('role'))
        console.log(sessionStorage.getItem('loggedin'))
    },
    getProfile(token) {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken(token));
    }

}
