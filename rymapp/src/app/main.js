import React, { Fragment } from 'react';
import AppMenu from './appMenu';
import WithAuth from './withAuth';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import App from './App';
import Gallery from './gallery';
import SignIn from './signin';
import SignUp from './signup';

function  Main() {
    const GalleryPage = (props) => {
        return(
            <Fragment>
                <Gallery props={props}/>
            </Fragment>
        );
    }
    const HomePage = props => {
        return(
            <App />
        )
    }
    const SignInPage = (props) => {
        return(
            <Fragment>
                <SignIn props={props}/>
            </Fragment>
        );
    }
    const SignUpPage = (props) => {
        return(
            <Fragment>
                <SignUp props={props}/>
            </Fragment>
        );
    }

    return (
        <React.Fragment>
            <AppMenu />
            <div className="container-fluid w-100" style={{'paddingLeft': '1%'}}>
                <Switch >
                    <Route path = "/home" component = {HomePage} />
                    <Route path = "/signin" component = {SignInPage} />
                    <Route path = "/signup" component = {SignUpPage} />
                    <Route path = "/gallery" component = {GalleryPage} />
                    { /*<WithAuth path="/gallery"> <GalleryPage /> </WithAuth> */}
                    <Redirect to = "/home"></Redirect>
                </Switch>
            </div>
        </React.Fragment>
    );
}

export default withRouter(Main)