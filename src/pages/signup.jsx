import {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {FirebaseContext} from '../context/firebase';
import {HeaderContainer} from '../containers/header';
import {FooterContainer} from '../containers/footer';
import {Form} from '../components';
import * as ROUTES from '../constants/routes';

export default function Signup(){
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Checking if form is valid
    const isInvalid = firstName === "" || email === "" || password === "";

    // Sign up action handler
    const handleSignUp = (event) => {
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                // push to the browse page
                result.user
                    .updateProfile({
                        displayName: firstName,
                        photoURL: Math.floor(Math.random() * 5) + 1
                    }).then(() => {
                        history.push(ROUTES.BROWSE);
                    });
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
                <Form.Title>Sign Up</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}
                <Form.Base onSubmit={handleSignUp} method="POST">
                    <Form.Input
                        placeholder="First name"
                        value={firstName}
                        onChange={({target}) => setFirstName(target.value)} />
                    <Form.Input
                        placeholder="Email address"
                        value={email}
                        onChange={({target}) => setEmail(target.value)} />
                    <Form.Input
                        type="password"
                        autoComplete="off"
                        placeholder="Password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)} />
                    <Form.Submit disabled={isInvalid} type="submit">Sign Up</Form.Submit>
                </Form.Base>

                <Form.Text>
                    Already have an account? <Form.Link to="/signin">Sign in now</Form.Link>
                </Form.Text>

                <Form.TextSmall>
                    This page is protected byt Google reCAPTCHA to ensure you are not a bot. Learn more.
                </Form.TextSmall>
            </Form>
        </HeaderContainer>
        <FooterContainer />
        </>
    );
}