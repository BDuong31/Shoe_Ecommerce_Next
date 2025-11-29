'use client';
import { sendContactEmail } from '@/app/actions';
import { SplashScreen } from '@/components/loading';
import React, { FormEvent } from 'react';

export default function ContactView() {
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [isLoading, setIsLoading] = React.useState(false);
    const [formStatus, setFormStatus] = React.useState<'success' | 'error' | null>(null);
    const [statusMessage, setStatusMessage] = React.useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setFormStatus(null);
        setStatusMessage('');

        try {
            const result = await sendContactEmail({ email, phone, message });
            if (result.success) {
                setFormStatus('success');
                setStatusMessage(result.message || 'Email đã được gửi thành công!');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                setFormStatus('error');
                setStatusMessage(result.error || 'Đã xảy ra lỗi khi gửi email.');
            }
        } catch (error) {
            setFormStatus('error');
            setStatusMessage('Đã xảy ra lỗi không mong muốn.');
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <SplashScreen className="h-[80vh]" />;
    }
    return (
        <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-10">
        <div className="w-full">
            <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 uppercase tracking-wider">
                Store Address
            </h2>
            <div className="flex flex-row w-full gap-10 items-start">
                <div className="h-[60vh] w-[60%] rounded-xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.6035188858214!2d106.6549349255638!3d10.799460612367845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292976c117ad%3A0x5b3f38b21051f84!2zSOG7jWMgVmnhu4duIEjDoG5nIEtow7RuZyBWaeG7h3QgTmFtIENTMg!5e0!3m2!1svi!2s!4v1762539845970!5m2!1svi!2s"
                    className="w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
                <div className="flex items-center justify-center w-[40%] h-[60vh] text-base leading-relaxed">
                    <p>
                        Founded in 1991, Well Shoes has been a leading manufacturer in the footwear industry for over three decades. Our commitment to quality and innovation drives us to craft exceptional shoes that blend comfort with style. At Well Shoes, we take pride in our meticulous craftsmanship and dedication to creating footwear that meets the highest standards. With a rich history and a passion for excellence, we continue to set the benchmark for quality in every pair we produce.
                    </p>
                </div>
            </div>
            </section>

            <section>
            <h2 className="text-4xl font-bold text-center mb-12 uppercase tracking-wider">
                Contact Us
            </h2>

            <form
                onSubmit={handleSubmit}
                className="w-full border border-graymain rounded-lg p-12"
            >
                <div className="form-control w-full mb-6">
                <label className="label">
                    <span className="label-text text-gray-400 text-xs font-bold uppercase">
                    Email Address
                    </span>
                </label>
                <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    className="input input-bordered w-full bg-transparent border-gray-600 focus:border-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="form-control w-full mb-6">
                <label className="label">
                    <span className="label-text text-gray-400 text-xs font-bold uppercase">
                    Phone Number
                    </span>
                </label>
                <input
                    type="tel"
                    placeholder="ENTER YOUR PHONE NUMBER"
                    className="input input-bordered w-full bg-transparent border-gray-600 focus:border-white"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                </div>
                <div className="form-control w-full mb-6">
                <label className="label">
                    <span className="label-text text-gray-400 text-xs font-bold uppercase">
                    Message
                    </span>
                </label>
                <textarea
                    className="textarea textarea-bordered h-32 w-full bg-transparent border-gray-600 focus:border-white"
                    placeholder="ENTER YOUR MESSAGE"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                </div>
                <button
                type="submit"
                className={`btn btn-neutral btn-block uppercase tracking-widest ${isLoading ? 'btn-disabled' : ''}`}
                disabled={isLoading}
                >
                {isLoading ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    'Submit'
                )}
                </button>
            </form>
            </section>
        </div>
        </div>
    );
}