import React from 'react';
import {useHistory} from 'react-router-dom';
import {Header} from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export function HeaderContainer({children}){
    const history = useHistory();

    return (
        <Header>
            <Header.Frame>
                <Header.Logo to={ROUTES.HOME} alt="DazzlingNetFlix" src={logo} />
                {history.location.pathname === "/signup" || history.location.pathname === "/signin" 
                ? null : <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink>}
            </Header.Frame>
            {children}
        </Header>
    );
}