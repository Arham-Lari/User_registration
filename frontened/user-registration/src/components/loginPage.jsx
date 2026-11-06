import { useState } from "react"
import { registration } from "../Api/ragistration.js";

const LoginPage = () => {

    const [userData,setUserData] = useState({
        username : "",
        password : "",
        fullname : "",
        email : "",
    });

    const onSumbmit = async(e) =>{
      e.preventDefault();

      const response = await registration({
          username: userData.username,
          password : userData.password,
          fullname : userData.fullname,
          email : userData.email
      })  

        console.log(response)

        setUserData(prev=>(
            {
                ...prev,
                username: "",
                email : "",
                password : "",
                fullname: "",
            }
        ))
    }

    const handleChange = (e)=>{

        setUserData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    return (
        <div>
            
        <h1>Registration</h1>
          <form onSubmit={onSumbmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="fullname"
                    placeholder="Enter full name"
                    value={userData.fullname}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>
          </form>
            
        </div>
    )
}

export default LoginPage
