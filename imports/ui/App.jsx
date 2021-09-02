import React, {useRef} from 'react';
import {useTracker} from "meteor/react-meteor-data";

function LoginForm() {
    const loginFormRef = useRef();
    const signupFormRef = useRef();
    return (
        <div>
            <div>
                <h2>Log in</h2>
                <form ref={loginFormRef} onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(loginFormRef.current);

                    const value = data.get('code');

                    Meteor.loginWithToken(value);

                }}>
                    <label htmlFor="code">Code:</label>
                    <input type="text" id="code" name="code"/>
                </form>
            </div>
            <div>
                <h2>Don't have an account? Register now!</h2>
                <form ref={signupFormRef} onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(signupFormRef.current);

                    const email = data.get('email');

                    Accounts.requestLoginTokenForUser({selector: {email}, userObject:{email}})

                    console.log(email);
                }}>
                    <label htmlFor="code">Email:</label>
                    <input type="email" id="email" name="email"/>
                </form>
            </div>
        </div>
    );
}

export const App = () => {
    Accounts.autoLoginWithToken();
    const currentUser = useTracker(() => {
        return Meteor.user()
    })
    const loggedIn = !!currentUser;
    return (
        <div>
            <h1>Welcome to Meteor!</h1>

            <p>You are currently {loggedIn ? 'logged in' : 'not logged in'}</p>
            {!loggedIn && (
                <LoginForm/>
            )}
        </div>
    );
};
