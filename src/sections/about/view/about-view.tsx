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
    const prevMemberRole = menbers[prevIndex].role;
    const nextMemberRole = menbers[nextIndex].role;
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
                        Founded in 1991, Well Shoes has been a leading manufacturer in the footwear industry for over three
                        decades. Our commitment to quality and innovation drives us to craft exceptional shoes that blend
                        comfort with style. At Well Shoes, we take pride in our meticulous craftsmanship and dedication to
                        creating footwear that meets the highest standards. With a rich history and a passion for excellence, we
                        continue to set the benchmark for quality in every pair we produce.
                    </p>
                    <img className="w-full h-[50%] p-12 rounded-lg object-cover" src="https://placehold.co/600x400/a9a28a/333333?text=Our+Story" alt="Our Story" />
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