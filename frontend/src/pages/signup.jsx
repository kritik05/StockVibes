import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading.jsx";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState); 
    
    const handleSignup = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/signup`, {
                username,
                name,
                password
            });
            localStorage.setItem("token", response.data.token);
            const userInfo = response.data.user;
            setUser({ name: userInfo.name, username: userInfo.username });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    <InputBox onChange={e => setName(e.target.value)} placeholder="Rohan" label={"Full Name"} />
                    <InputBox onChange={e => setUsername(e.target.value)} placeholder="kritik@gmail.com" label={"Email"} />
                    <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                        <Button onClick={handleSignup} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
};
