
const registration=async({username,email,password,fullname})=>{

    try{
        const response = await fetch("http://localhost:8000/user/registration",
        {
            method: "POST",
            body : JSON.stringify({
                username,
                email,
                password,
                fullname
            })
        }
        );

        const data = await response.json();j
        console.log(data)
    }catch(error){
        console.log(error.message)
    }

}

export {registration};
