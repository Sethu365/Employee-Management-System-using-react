import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
      });
    
      const [showPassword, setShowPassword] = useState(false);//to see password
    
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);//to see password
      };
    
      const [error, setError] = useState(null);
      const navigate = useNavigate();
      axios.defaults.withCredentials = true;
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post("http://localhost:3000/employee/employeelogin", values)
          .then((result) => {
            if (result.data.loginStatus) {
              localStorage.setItem("valid",true)
              navigate("/employee_detail/"+ result.data.id );
            } else {
              setError(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      };
    
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
    <div className="p-3 rounded border loginForm1">
      <div className="text-danger">{error && error}</div>
      <h2 className="d-flex justify-content-center">Employee Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" >
            <strong>Email:</strong>
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="form-control rounded-2"
            
          />
        </div>
          <div className="mb-3">
          <label htmlFor="password">
            <strong>Password:</strong>
          </label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="form-control rounded-start"
              id="password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="btn btn-light"
              style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-success w-100 rounded mb-2"
          >
            Log In
          </button>
        </div>

      
      </form>
    </div>
  </div>
  )
}

export default EmployeeLogin