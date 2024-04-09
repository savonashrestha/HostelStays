import { useState,useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import "./signin.scss"
export default function Signin(){
    const navigate=useNavigate()
    const emailRef=useRef(null)
    const [formData,setFormData]=useState({email:"",password:""})
    const [error,setError]=useState("")
    const { login } = useAuth()
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        emailRef.current.focus()
    },[])
    async function handleSubmit(e) {
        e.preventDefault()
        if(!formData.email || !formData.password){
            setError("Please fill up all the fields")
            return
        }
        try {
          setError("")
          setLoading(true)
          await login(formData.email, formData.password)
          navigate("/home",{replace:true})
        } catch(error) {
            console.log(error.code)
            if (error.code === "auth/invalid-credential") {
                setError("User not found. Please use correct username and password");
            } else {
                setError("Failed to log in. Please try again later.");
            }
        }
    
        setLoading(false)
      }
        
    function handleChange(event){
        setFormData((prevFormData)=>({
            ...prevFormData,
            [event.target.name]:event.target.value
        }))
    }
    return(
        <div className="signinContainer">
            <h1 className="signinTitle">Log In</h1>
            {error!="" && <Alert variant="danger">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" name="email" className="form-control" ref={emailRef} id="exampleInputEmail1" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} placeholder="Email"/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={formData.password} onChange={handleChange} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Sign In</button>
            </form>
            
            <div className="w-100 text-center mt-2">
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </div>

    )

}