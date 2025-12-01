'use client'
import React from "react";
import Image from "next/image";
import { menbers } from "../data";
import ArrowBack from "@/components/icons/arrow-back";
import ArrowUndoRegular from "@/components/icons/arrow-undo";
import ArrowForward from "@/components/icons/arrow-forward";

export default function AboutView() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const goToPrevious = () => {
        const isFirstMember = currentIndex === 0;
        const newIndex = isFirstMember ? menbers.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastMember = currentIndex === menbers.length - 1;
        const newIndex = isLastMember ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const currentMember = menbers[currentIndex];
    const prevIndex = (currentIndex - 1 + menbers.length) % menbers.length;
    const nextIndex = (currentIndex + 1) % menbers.length;
    const prevMemberRole = menbers[prevIndex].name;
    const nextMemberRole = menbers[nextIndex].name;
    return (
        <div className="m-auto 3xl:max-w-[1500px] 2xl:max-w-[1450px] xl:max-w-[90%] lg:max-w-[90%] max-w-[95%] py-10">
            <div className="flex flex-row max-h-[60vh] gap-3 p-3">
                <div className="w-[40%] flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-full h-full flex justify-center items-center p-12">
                        <Image src='/logo.png' alt='Well Shoes Logo' width={266} height={340} />
                    </div>
                </div>

                <div className="w-full h-auto flex flex-col gap-[10px]">
                    <p className="h-[50%] leading-relaxed p-12">
                        This e-commerce platform has been developed as part of a student group project for our course on digital business and e-commerce. The objective of this project is to explore and apply the key concepts of online retail, user experience design, and digital marketing strategies. Our team has worked together to create a user-friendly, functional website that demonstrates our understanding of e-commerce systems and the technical aspects of building an online store. The platform features a variety of products and incorporates payment gateways, customer support systems, and inventory management tools, providing a comprehensive solution for online business operations. This project not only showcases our skills in web development but also reflects our ability to collaborate and implement real-world business solutions.
                    </p>
                    <img className="w-full h-[50%] p-12 rounded-[3.5rem] object-cover" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExanp5aGdwdGRweWpuOGJwMnRheXNpdjJ6dmoxZnE2dDdpYno0cmM4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif" alt="Our Story" />  
                </div>
            </div>
            <div className="w-full mt-12">
                <h2 className="text-4xl font-bold text-center uppercase tracking-widest mb-16">
                    Our Team
                </h2>
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={goToPrevious}
                        className="flex flex-col items-center gap-3 transition-all"
                    >
                        <div className="border border-graymain p-3 rounded-lg">
                            <ArrowBack />
                        </div>
                        <span className="font-bold text-lg uppercase tracking-wider">{prevMemberRole}</span>
                    </button>

                    <div className="relative w-full max-w-3xl p-4 font-sans">
                        <div className="relative pl-8">
                            <div
                            className="absolute -top-[50%] right-8 w-1/2 h-40 bg-darkgrey rounded-xl shadow-lg z-10"
                            >
                                <img src={currentMember.image} alt={currentMember.name} className="w-full h-full object-contain rounded-xl" />
                            </div>

                            <div
                            className="relative bg-transparent border border-graymain rounded-xl mt-16 pt-24 px-8 z-5"
                            >
                                <p className="w-1/2 justify-self-end">{currentMember.description}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={goToNext}
                        className="flex flex-col items-center gap-3 transition-all"
                    >
                        <div className="border border-graymain p-3 rounded-lg">
                            <ArrowForward />
                        </div>
                        <span className="font-bold text-lg uppercase tracking-wider">{nextMemberRole}</span>
                    </button>

                </div>
            </div>
        </div>
    );
}