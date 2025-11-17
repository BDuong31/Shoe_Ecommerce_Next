'use client';
import ArrowForward from "@/components/icons/arrow-forward";
import { DebouncedInput } from "@/components/input";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa6";
import { SiGoogle } from "react-icons/si";
import { loginSchema } from "../data";
import { introspect, login } from "@/apis/auth";
import EyeRegular from "@/components/icons/eye";
import EyeOffRegular from "@/components/icons/eye-off";
import { useRouter } from "next/navigation";

export default function LoginAdminView() {
    const { setToken } = useAuth()
    const router = useRouter()
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [isShowPassword, setIsShowPassword] = React.useState(false)
    const [check, setCheck] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.checked);
    }

    const Login = async () => {
        setLoading(true);
        setEmailError('');
        setPasswordError('');

        const result = loginSchema.safeParse({ email, password});
        if (!result.success){
            result.error.issues.forEach((err) => {
                if(err.path.includes('email')){
                    setEmailError(err.message)
                }
                if(err.path.includes('password')){
                    setPasswordError(err.message)
                }
            });
            setLoading(false)
            return
        }

        try {
            const data = await login({
                email,
                password
            })

            const dataIntrospect = {
                token: data.data
            }

            const introspectCheck = await introspect(dataIntrospect)

            console.log("role: ", introspectCheck.role);
            if (introspectCheck.role ==='admin') {

                setToken(data.data);
                router.push('/')
            } else {
                setPasswordError('Vui lòng sử dụng tài khoản Admin để đăng nhập')
            }
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message){
                setPasswordError(err.response.data.message);
            } else {
                setPasswordError('Đã có lỗi xảy ra, Vui lòng thử lại sau');
            }
        }
    }


    return (
        <div className="h-[100vh] flex flex-row justify-center items-center">
            <div className="w-[50%] h-[100vh]" style={{backgroundImage: 'url(http://localhost:3001/bgadmin.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                <Image src="/footerlogo.png" alt="Logo" width={150} height={50} className="mx-auto mt-10"/>
            </div>
            <div className="w-[35%] mx-auto rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <div>
                    <div className="flex flex-col gap-[0.875rem] mb-[1.5rem]">
                        <DebouncedInput
                            type="text"
                            name="email"
                            placeholder={"Email"}
                            value={email}
                            className="w-full px-4 py-3 border border-darkgrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(value: string) => setEmail(value)}
                        />
                        {emailError && <p className="text-[#FF0000] text-sm">{emailError}</p>}
                        <div className="relative">
                            <DebouncedInput
                                type={isShowPassword ? "text" : "password"}
                                name="password"
                                placeholder={"Password"}
                                value={password}
                                className="w-full px-4 py-3 border border-darkgrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(value: string) => setPassword(value)}
                            />
                            <div
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? <EyeRegular/> : <EyeOffRegular/>}
                            </div>
                        </div>
                        {passwordError && <p className="text-[#FF0000] text-sm">{passwordError}</p>}
                    </div>
                    <div className="max-w-md py-3 mb-3">
                        {/* <li key='id1' className={`flex items-center pb-1`}>
                            <input id="idx1" type="checkbox" name="category" checked={check} className="w-4 h-4 accent-darkgrey" onChange={handleCheck}/>
                            <label htmlFor="idx1" className="ml-3 font-medium capitalize">Keep me logged in - applies to all log in options below. More info</label>
                        </li> */}
                        <input 
                            id="idx1" 
                            type="checkbox" 
                            name="category" 
                            checked={check} 
                            className="h-5 w-5 rounded border-[#232321] bg-transparent checked:bg-[#000000] checked:border-[#000000] checked:text-[#000000] appearance-none"
                            onChange={handleCheck}
                        />
                        <label htmlFor="idx1" className="ml-3 font-medium capitalize">Keep me logged in - applies to all log in options below. More info</label>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={Login}
                            className="w-full flex items-center justify-between px-4 py-3 bg-darkgrey text-white rounded-lg transition-colors uppercase"
                        >
                            Email login
                            <ArrowForward className="stroke-[#F8F8F8]"/>
                        </button>
                    </div>
                    <div className='flex justify-center mt-6 gap-14'>
                        <button 
                            type="button"
                            className="py-4 px-12 rounded-lg transition-colors border border-darkgrey"
                        >
                            <FaGoogle size={32} color="#4285F4" />
                        </button>
                        <button 
                            type="button"
                            className="py-4 px-12 rounded-lg transition-colors border border-darkgrey"
                        >
                            <FaApple size={32}/>
                        </button>
                        <button 
                            type="button"
                            className="py-4 px-12 rounded-lg transition-colors border border-darkgrey"
                        >
                            <FaFacebook size={32} color="#4285F4" />
                        </button>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="idx1" className="font-medium text-graymain capitalize">By clicking 'Log In' you agree to our website BasoClub Terms & Conditions, Baso Privacy Notice and Terms & Conditions.</label>
                    </div>
                </div>
            </div>
        </div>
    )
}