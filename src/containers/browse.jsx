import React, { useContext, useState, useEffect } from 'react';
import { SelectProfileContainer } from './profiles';
import {FirebaseContext} from '../context/firebase';
import {Loading, Header} from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg'

export function BrowseContainer({slides})
{
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const {firebase} = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    useEffect(() => {
        console.log("profile: ", profile);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [profile.displayName, profile])

    return profile.displayName ? (
        <>
            {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
            <Header src="joker1" dontShowOnSmallViewPort>
                <Header.Frame>
                    <Header.Group>
                        <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
                        <Header.TextLink>Series</Header.TextLink>
                        <Header.TextLink>Films</Header.TextLink>
                    </Header.Group>
                    <Header.Group>
                        <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <Header.Profile>
                            <Header.Picture src={user.photoURL} />
                            <Header.Dropdown>
                                <Header.Group>
                                    <Header.Picture src={user.photoURL} />
                                    <Header.TextLink>{user.displayName}</Header.TextLink>
                                </Header.Group>
                                <Header.Group>
                                    <Header.TextLink onClick={() => firebase.auth().signOut()}>
                                        Sign out
                                    </Header.TextLink>
                                </Header.Group>
                            </Header.Dropdown>
                        </Header.Profile>
                    </Header.Group>
                </Header.Frame>
                <Header.Feature>
                    <Header.FeatureCallOut>The Clown Prince of Crime is here. Watch The Joker Now!!!</Header.FeatureCallOut>
                    <Header.Text>
                    “Joker” is an original, standalone story. Arthur Fleck (Joaquin Phoenix), 
                    a man disregarded by society, is not only a gritty character study, 
                    but also a broader cautionary tale. A clown-for-hire by day, 
                    he aspires to be a stand-up comic at night… but finds the joke always seems to be on him. 
                    Caught in a cyclical existence between apathy and cruelty, Arthur makes one bad decision that brings 
                    about a chain reaction of escalating events in this gritty character study.
                    </Header.Text>
                    <Header.PlayButton>Play</Header.PlayButton>
                </Header.Feature>
            </Header>
        </>
    ) : <SelectProfileContainer user={user} setProfile={setProfile} />
}