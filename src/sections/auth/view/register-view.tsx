'use client';
import { register } from "@/apis/auth";
import ArrowForward from "@/components/icons/arrow-forward";
import EyeRegular, { EyeBold } from "@/components/icons/eye";
import EyeOffRegular from "@/components/icons/eye-off";
import { DebouncedInput } from "@/components/input";
import { useAuth } from "@/context/auth-context";
import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { registerSchema } from "../data/schema";
import { useRouter } from "next/navigation"; 
import SplashScreen from "@/components/loading/splash-sceen";

export default function RegisterView() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [fullName, setFullName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullNameError, setFullNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [genderError, setGenderError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const [isShowPassword, setIsShowPassword] = React.useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('handleRegister called');
        e.preventDefault();
        setLoading(true);
        setFullNameError('');
        setEmailError('');
        setGenderError('');
        setPasswordError('');

        const result = registerSchema.safeParse({ fullName, email, password, gender });
        if(!result.success) {
            result.error.issues.forEach((error) => {
                if (error.path.includes('fullName')) {
                    setFullNameError(error.message);
                }
                if (error.path.includes('email')) {
                    setEmailError(error.message);
                }
                // Sửa lỗi logic ở đây
                if (error.path.includes('gender')){ 
                    setGenderError(error.message);
                }
                if (error.path.includes('password')) {
                    setPasswordError(error.message);
                }
            });
            setLoading(false);
            return;
        }
        
        try {
            console.log('Registering user with data:', { fullName, email, password, gender });
            const userData = await register({
                fullName,
                email,
                password,
                gender,
            });

            console.log('Registration successful:', userData);

            if (userData){
                router.push('/login');
            }
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setPasswordError(err.response.data.message);
            } else {
                setPasswordError('Đã có lỗi xảy ra, vui lòng thử lại sau');
            }
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => { 
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    if (loading) {
        return <SplashScreen className="h-[80vh]" />
    }

    return (
        <div className="flex gap-12 m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%]">
            <div className="w-[40%] p-8 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                
                {/* Bọc <form> và thêm onSubmit */}
                <form onSubmit={handleRegister}>
                    <div>
                        <div className='flex justify-center mt-6 gap-14'>
                            <button type="button" className="py-4 px-12 rounded-lg transition-colors border border-darkgrey">
                                <FaGoogle size={32} color="#4285F4" />
                            </button>
                            <button type="button" className="py-4 px-12 rounded-lg transition-colors border border-darkgrey">
                                <FaApple size={32}/>
                            </button>
                            <button type="button" className="py-4 px-12 rounded-lg transition-colors border border-darkgrey">
                                <FaFacebook size={32} color="#4285F4" />
                            </button>
                        </div>
                        <h2 className="my-4 text-center">OR</h2>
                        <div className="flex flex-col gap-[0.875rem] mb-[1.5rem]">
                            <h1 className="text-lg font-semibold">Your Name</h1>
                            <DebouncedInput
                                type="text"
                                name="fullName"
                                placeholder={"Full Name"}
                                value={fullName}
                                className="w-full px-4 py-3 border border-darkgrey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(value: string) => setFullName(value)}
                            />
                            {fullNameError && <p className="text-[#FF0000] text-sm">{fullNameError}</p>}
                        </div>
                        <h1 className="text-lg font-semibold">Gender</h1>
                        <div className="max-w-md flex gap-8 py-3 mb-1">
                            <li key='id1' className={`flex items-center pb-1`}>
                                <input id="gender-male" type="radio" name="gender-selection" checked={gender === 'male'} className="radio radio-sm" onChange={() => setGender('male')}/>
                                <label htmlFor="gender-male" className="ml-3 font-medium capitalize">Male</label>
                            </li>
                            <li key='id2' className={`flex items-center pb-1`}>
                                <input id="gender-female" type="radio" name="gender-selection" checked={gender === 'female'} className="radio radio-sm" onChange={() => setGender('female')}/>
                                <label htmlFor="gender-female" className="ml-3 font-medium capitalize">Female</label>
                            </li>
                            <li key='id3' className={`flex items-center pb-1`}>
                                <input id="gender-other" type="radio" name="gender-selection" checked={gender === 'other'} className="radio radio-sm" onChange={() => setGender('other')}/>
                                <label htmlFor="gender-other" className="ml-3 font-medium capitalize">Other</label>
                            </li>
                        </div>
                        {genderError && <p className="text-[#FF0000] text-sm -mt-2 mb-3">{genderError}</p>}

                        <div className="flex flex-col gap-[0.875rem] mb-[1.5rem]">
                            <h1 className="text-lg font-semibold">Login Details</h1>
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
                                    placeholder={"password"}
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
                            <li key='terms' className={`flex items-center pb-1`}>
                                <input id="terms-check" type="checkbox" name="terms" className="checkbox checkbox-sm" required />
                                <label htmlFor="terms-check" className="ml-3 font-medium capitalize">By clicking 'Log In' you agree to our website KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.</label>
                            </li>
                            <li key='keep-logged' className={`flex items-center pb-1`}>
                                <input id="keep-logged-check" type="checkbox" name="keep-logged" className="checkbox checkbox-sm"/>
                                <label htmlFor="keep-logged-check" className="ml-3 font-medium capitalize">Keep me logged in - applies to all log in options below. More info</label>
                            </li>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-between px-4 py-3 bg-darkgrey text-white rounded-lg hover:bg-gray-700 transition-colors uppercase disabled:opacity-70"
                            >
                                {loading ? 'Registering...' : 'Register'}
                                {loading ? <span className="loading loading-spinner"></span> : <ArrowForward className="stroke-[#F8F8F8]" />}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
            <div className="w-[60%] h-fit flex flex-col justify-center p-8 mt-8 bg-[#f5f5f5] rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Join Baso Club Get Rewarded Today.</h1>
                <p className="mb-6">As Baso club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:</p>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li>Exclusive offers and promotions</li>
                    <li>Early access to new products and releases</li>
                    <li>Invitations to special events</li>
                    <li>Personalized recommendations</li>
                </ul>
                <p className="mb-6">Join Baso Club today and start enjoying the perks of being a valued member of our community!</p>
                <button
                    type="button"
                    className="w-full bg-darkgrey text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors uppercase flex items-center justify-between gap-2"
                >
                    Join The Baso Club <ArrowForward className="stroke-[#F8F8F8]" />
                </button>
            </div>
        </div>
    )
}