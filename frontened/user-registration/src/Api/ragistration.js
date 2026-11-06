
const registration=async({username,email,password,fullname})=>{

    try{
        const response = await fetch("http://localhost:8000/user/registration",
        {
            method: "POST",
            headers:{
                     "Content-Type": "application/json",
                },
            body : JSON.stringify({
                username,
                email,
                password,
                fullname
            })
        }
        );

        const data = await response.json();
    
        console.log(data)

        return data;
    }catch(error){
        console.log(error.message)
    }

}

export {registration};
