"use client";
import React from "react"
import './Result.css'
import Link from "next/link";
export const Result = ({result}) =>{
    return (
        <Link href={`/movie/${result.id}`}>
            <div className="Resultado">
                {result.name}
            </div>
        </Link>
    )
}
export default Result