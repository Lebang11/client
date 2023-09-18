import { Link } from "react-router-dom";

const Login = () => {
    
    return (
        <div className="register">
        <Link to="https://team-hub.netlify.app/">
        <button class="submit-button back-button">Back</button>
        </Link>
        
        <div class="form-box-flex">
            <form action="https://team-hub.onrender.com/api/create" method="POST" class="form-box">
                <h1>Sign Up</h1>
                <input name="username" type="text" placeholder="Username" class="email-text-box js-email"/>
                <input name="email" type="text" placeholder="Email" class="email-text-box js-email"/>
                <input name="password" type="password" placeholder="Password" class="password-box"/>
                <input name="passwordConfirm" type="password" placeholder="Confirm Password" class="password-box"/>
                <button type="submit" class="submit-button js-submit-button">Submit</button>
            </form>     
        </div>
    </div>
            
        
    );
}
 
export default Login;