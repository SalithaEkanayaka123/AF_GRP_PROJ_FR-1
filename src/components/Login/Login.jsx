import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

//Importing Custom Style Sheet. 
import styles from './style';
import './loginstyle.css';
import {loginUser} from "../../actions/users";
const Login = () => {
    const history = useHistory();
    const classes = styles();
    const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  //Methods comes here.
  const [userData, setUserData] = useState(
    {
      userName: '',
      password: ''
    }
  );

  const [password, setPassword] = useState();
  const [token, setToken] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  }

    const login = async () => {
        try {

            const {data} = await axios.post("https://application-framework-database.herokuapp.com/api/v1/validate", userData);
            setToken(data.jwt);
            //Decode the JWT and get User type.
            const decode = jwt(data.jwt);
            console.log(decode);

            //Create the state object to save in the store.
            const user = {
               "userName": decode.sub,
               "userToken": data.jwt,
               "userType": decode.userType
            }
            dispatch(loginUser(user));
            localStorage.setItem('userName', user.userName);
           //Navigate the User to the Home Page.
            Navigate();


        } catch (err) {
            console.log("Login Error");
            console.log(err.message);
        }
    }

    function Navigate() {
        history.push("/");
    }

    return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="login-component">
        <div className="login-border">
            <div className="header">
                <h2 className="main-header">Login</h2>
                <h4 className="second-header">Information</h4>
            </div>
          </div>

            <div className="login-body">
              <div className="input-wrapper">
                <lable>Name</lable><br/>
                <input className="input-field"
                       placeholder="Enter Name..."
                       type="text"
                       value={userData.userName}
                       onChange={(e) => setUserData({...userData, userName:e.target.value})}
                />
                <br/>
              </div>
              <div className="input-wrapper">
                <lable>Password</lable><br/>
                <input className="input-field"
                       placeholder="Enter Password..."
                       type="password"
                       value={userData.password}
                       onChange={(e) => setUserData({...userData, password: e.target.value})}
                />
              </div>
            
            <div className="button-group">
              <button className="auth-button" type="submit">Login</button><br/>
              <button className= "auth-button" onClick={Navigate}>Registration</button>
              <div className="button-group-link">Forgot Password?</div>
            </div>
            </div>
      </div>
      </form>
    </div>
  )

}

export default Login;
