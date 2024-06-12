import Head from 'next/head'; 
import Link from 'next/link'; 
import axios from 'axios'; 
import { useState, FormEvent } from 'react'; 
import { useRouter } from 'next/router'; 

const Login: React.FC = () => { 
    const [email, setEmail] = useState<string>(''); 
    const [password, setPassword] = useState<string>(''); 
    const [error, setError] = useState<string>(''); 
    const router = useRouter(); 

    const handleLogin = async (e: FormEvent) => { 
        e.preventDefault(); 
        setError('');  // Clear any previous error
        console.log('Logging in with:', email, password);

        try { 
            const response = await axios.post('https://stemprotocol.codefremics.com/api/v2/users/login', { 
                username: email, 
                password: password, 
            }); 

            console.log('API response:', response.data);

            const { access_token, firstName, lastName } = response.data; 
            // Save token and user details to localStorage
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            // Redirect to home page 
            router.push('../home'); 
        } catch (error) { 
            console.error('Login error:', error);
            setError('Invalid email or password'); 
        } 
    };

    return ( 
        <> 
            <Head> 
                <title>Egamlio - Esports and Gaming Courses Website NextJS Template</title> 
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" /> 
            </Head> 
            <section className="login-reg"> 
                <div className="overlay pb-120"> 
                    <div className="container"> 
                        <div className="top-area pt-4 mb-30"> 
                            <div className="row d-flex align-items-center"> 
                                <div className="col-sm-5 col"> 
                                    <Link className="back-home" href="/"> 
                                        <img src="/images/icon/left-icon.png" alt="image" /> 
                                        Back To Egamlio 
                                    </Link> 
                                </div> 
                                <div className="col-sm-2 text-center col"> 
                                    <Link href="/index-3"> 
                                        <img src="/images/logo.png" alt="image" /> 
                                    </Link> 
                                </div> 
                            </div> 
                        </div> 
                        <div className="row pt-120 d-flex justify-content-center"> 
                            <div className="col-lg-6"> 
                                <div className="login-reg-main text-center"> 
                                    <div className="form-area"> 
                                        <div className="section-text"> 
                                            <h4>Welcome Back!</h4> 
                                            <p>We're so excited to see you again! Log In to your Egamlio Account!</p> 
                                        </div> 
                                        <form onSubmit={handleLogin}> 
                                            <div className="row"> 
                                                <div className="col-12"> 
                                                    <div className="single-input"> 
                                                        <label htmlFor="email">Email Address</label> 
                                                        <div className="input-box"> 
                                                            <input 
                                                                type="text" 
                                                                id="email" 
                                                                placeholder="Enter Your Email" 
                                                                value={email} 
                                                                onChange={(e) => setEmail(e.target.value)} 
                                                            /> 
                                                        </div> 
                                                    </div> 
                                                    <div className="single-input"> 
                                                        <label htmlFor="passInput">Password</label> 
                                                        <div className="input-box"> 
                                                            <input 
                                                                type="password" 
                                                                id="passInput" 
                                                                placeholder="Enter Your Password" 
                                                                value={password} 
                                                                onChange={(e) => setPassword(e.target.value)} 
                                                            /> 
                                                            <img className="showPass" src="/images/icon/show-hide.png" alt="icon" /> 
                                                        </div> 
                                                    </div> 
                                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                                    <div className="remember-me"> 
                                                        <label className="checkbox-single d-flex align-items-center"> 
                                                            <span className="left-area"> 
                                                                <span className="checkbox-area d-flex"> 
                                                                    <input type="checkbox" /> 
                                                                    <span className="checkmark"></span> 
                                                                </span> 
                                                                <span className="item-title d-flex align-items-center"> 
                                                                    <span>Remember Me</span> 
                                                                </span> 
                                                            </span> 
                                                        </label> 
                                                        <Link href="#">Forgot Password</Link> 
                                                    </div> 
                                                </div> 
                                            </div> 
                                            <button className="cmn-btn mt-40 w-100" type="submit">Login</button> 
                                        </form> 
                                        <div className="reg-with"> 
                                            <div className="or"> 
                                                <p>OR</p> 
                                            </div> 
                                            <div className="social"> 
                                                <ul className="footer-link d-flex justify-content-center align-items-center"> 
                                                    <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li> 
                                                    <li><Link href="#"><i className="fab fa-google"></i></Link></li> 
                                                    <li><Link href="#"><i className="fab fa-twitch"></i></Link></li> 
                                                    <li><Link href="#"><i className="fab fa-apple"></i></Link></li> 
                                                </ul> 
                                            </div> 
                                        </div> 
                                    </div> 
                                    <div className="account mt-30"> 
                                        <p>Don't have an account? <Link href="register">Sign Up Here</Link></p> 
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </section> 
        </>
    ); 
}; 

export default Login;
