import {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {FirebaseContext} from '../context/firebase';
import {HeaderContainer} from '../containers/header';
import {FooterContainer} from '../containers/footer';
import {Form} from '../components';
import * as ROUTES from '../constants/routes';

export default function Signin(){
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Checking if form is valid
    const isInvalid = password === "" || email === "";

    // Sign in action handler
    const handleSignIn = async(event) => {
        event.preventDefault();
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // push to the browse page
                history.push(ROUTES.BROWSE);
            })
            .catch((error) => {
                setEmail("");
                setPassword("");
                setError(error.message);
            })
    };

    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign In</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}
                    <Form.Base onSubmit={handleSignIn} method="POST">
                        <Form.Input
                         placeholder="Email Address"
                         value={email}
                         onChange={({target}) => setEmail(target.value)}/>
                        <Form.Input
                         type="password"
                         autoComplete="off"
                         placeholder="Password"
                         value={password}
                         onChange={({target}) => setPassword(target.value)}/>
                         <Form.Submit disabled={isInvalid} type="submit">Sign In</Form.Submit>
                    </Form.Base>

                    <Form.Text>
                        New to Netflix? <Form.Link to="/signup">Sign up now</Form.Link>
                    </Form.Text>

                    <Form.TextSmall>
                        This page is protected byt Google reCAPTCHA to ensure you are not a bot. Learn more.
                    </Form.TextSmall>
                </Form>
            </HeaderContainer>
            <FooterContainer>
            </FooterContainer>
        </>
    );
}