"use client";

import { useRouter } from "next/navigation";
import {MdArrowForward} from "react-icons/md";

function Go({ texto }: { texto: string }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/search/${encodeURIComponent(texto)}`);
    };

    return (
        <button onClick={handleClick}>
            <MdArrowForward />
        </button>
    );
}

export default Go