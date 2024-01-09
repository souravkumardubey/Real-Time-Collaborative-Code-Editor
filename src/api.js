import axios from 'axios';
export async function APILogin(userName,password){
    const options = {
        method:"POST",
        url:import.meta.env.VITE_APP_API_LOGIN,
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json'
        },
        data:{
            userName:userName,
            password:password
        }
    };
    try {
        const res = await axios.request(options);
        if(res.status === 200){
            return res.data;
        }else{
            return {"err":"Internal Server Error"}
        }
    }catch (err){
        return {"err":err};
    }
}
export async function APISignUp(userName,password,email){
    const options = {
        method:"POST",
        url:import.meta.env.VITE_APP_API_SIGNUP,
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json'
        },
        data:{
            userName:userName,
            password:password,
            email:email
        }
    };
    try {
        const res = await axios.request(options);
        if(res.status === 200){
            return res.data;
        }else{
            return {"err":"Internal Server Error"}
        }
    }catch (err){
        return {"err":err};
    }
}

