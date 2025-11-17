import { useTheme } from "next-themes";

type ErrorCircleProps = {
    width?: number | 24;
    height?: number | 24;
}

export default function ErrorCircleRegular({ width, height }: ErrorCircleProps) {
    const { theme } = useTheme();
    return (
        <svg
            className="dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
            xmlns="http://www.w3.org/2000/svg"
            width={width} height={height} viewBox="0 0 512 512"
        >
            <path fill="none" strokeMiterlimit={10} strokeWidth={32} d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"></path>
	        <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M320 320L192 192m0 128l128-128"></path>
        </svg>
    )
}

export function ErrorCircleBold({ width, height }: ErrorCircleProps) {
    const { theme } = useTheme();
    return (
        <svg
            className="dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
            xmlns="http://www.w3.org/2000/svg"
            width={width} height={height} viewBox="0 0 512 512"
        >
            <path 
                d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256Z"
            />
        </svg>
    );
}