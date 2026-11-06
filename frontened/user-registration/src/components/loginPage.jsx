import { useState } from "react"
import { registration } from "../Api/ragistration.js";

const loginPage = () => {

    const [userData,setUserData] = useState({
        username,
        password,
        fullname,
        email,
    });

    const OnSumbmit = async(e) =>{
      e.preventDefault();

      const response = await registration({
          username: userData.username,
          password : userData.password,
          fullname : userData.fullname,
          email : userData.email
      })  

        console.log(response)
    }

    const HandleChange = (e)=>{

        setUserData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    return (
        <div>
            
        <h1>Registration</h1>
          <form OnSumbmit={OnSumbmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={userData.username}
                    onChange={HandleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="fullname"
                    placeholder="Enter full name"
                    value={userData.fullname}
                    onChange={HandleChange}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={userData.email}
                    onChange={HandleChange}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={userData.password}
                    onChange={HandleChange}
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

export default loginPage
