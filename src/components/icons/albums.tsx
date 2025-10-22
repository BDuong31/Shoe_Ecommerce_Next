import { useTheme } from "next-themes";

export default function AlbumsRegular(){
    const { theme } = useTheme();
    return (
        <svg
            className="dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 512 512"
        >
            <rect 
                width={384} 
                height={256} 
                x={64} y={176} 
                fill="none" 
                rx={28.87} 
                ry={28.87}
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="32"
            />
	        <path 
                d="M144 80h224m-256 48h288"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="32"
                fill="none"
            />
        </svg>
    )
}

export function AlbumsBold() {
    const { theme } = useTheme()
    return (
        <svg
            className="dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 512 512"
        >
            <path
                d="M368 96H144a16 16 0 0 1 0-32h224a16 16 0 0 1 0 32m32 48H112a16 16 0 0 1 0-32h288a16 16 0 0 1 0 32m19.13 304H92.87A44.92 44.92 0 0 1 48 403.13V204.87A44.92 44.92 0 0 1 92.87 160h326.26A44.92 44.92 0 0 1 464 204.87v198.26A44.92 44.92 0 0 1 419.13 448"
            />
        </svg>
    )
}