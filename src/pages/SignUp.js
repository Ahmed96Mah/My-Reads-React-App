import { useState } from "react";
import { checkUser, createUser } from "../util/BooksAPI";

const SignUp = () => {
    const [Choice, setChoice] = useState('signup');
    const [Error, setError] = useState(false);

    const onSetChoice = (e) => {
        setChoice(e.target.name);
    };

    const [Signup, setSignup] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [Login, setLogin] = useState({
        username: "",
        password: ""
    });
    
    const onChangeSign = (e) => {
        const { name, value } = e.target;
        setSignup({ ...Signup, [name]: value }); 
    };

    const onChangeLogin = (e) => {
        const { name, value } = e.target;
        setLogin({ ...Login, [name]: value });
    };

    const onHandleSignup = (e) => {
        const result = createUser(Signup);
        if(result === false) {
            // If the user's info already exists
            e.preventDefault();
            setError(true);
        }
    };

    const onHandleLogin = () => {
        checkUser(Login);
    };

    return (
        (Choice === 'signup')? (
            <div className="form">
                <h1>Join <span>TODAY</span>, and keep your book activities <span>Up-To-Date</span></h1>
                <form action="http://localhost:3000/">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" value={Signup["username"]} placeholder="Username" onChange={onChangeSign} required/>
                    <label htmlFor="email">E-Mail: </label>
                    <input type="text" name="email" value={Signup["email"]} placeholder="Email" onChange={onChangeSign} required/>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" value={Signup["password"]} placeholder="Password" onChange={onChangeSign} required/>
                    <button onClick={onHandleSignup}>
                        SignUp
                    </button>
                    {(Error === true) && <p>Invalid Username or E-Mail!</p>}
                </form>
                <div className="no">
                    <span><span className="action">Already</span> Have an Account?</span> <button name="login" onClick={onSetChoice}>Login</button>
                </div>
            </div>
        ) : (
            <div className="form">
                <h1><span>Already</span> Subscribed ?</h1>
                <form action="http://localhost:3000/">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" value={Login["username"]} placeholder="Username" onChange={onChangeLogin} required/>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" value={Login["password"]} placeholder="Password" onChange={onChangeLogin} required/>
                    <button onClick={onHandleLogin}>
                        Login
                    </button>
                </form>
                <div className="no">
                    <span><span className="action">Don't</span> Have an account?</span> <button name="signup" onClick={onSetChoice}>SignUp</button>
                </div>
            </div>
        )
    );
};

export default SignUp;