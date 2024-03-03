import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword:""});
    let history = useNavigate();  // from react-router-dom ^6.sth we use useNavigate instead of useHistory

  const {name, email, password} = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        history("/")
        props.showAlert("Account created Successfully", "success")
    }
    else{
      props.showAlert("Invalid credentials", "danger")
    }
}

const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
}

  return (
    <div className='my-5'>
      <h2 className='mb-3'>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
