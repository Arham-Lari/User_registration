const login = async({username,password})=>{
    try{

        const response= await fetch("http://localhost:8000/user/login",
            {
                method:POST,
                headers:{
                  "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    username,
                    password
                })
            }
        )
        
        const data = await response.json()

        return data;

    }catch(error){

        console.log(error);
    }
}

export {login}
