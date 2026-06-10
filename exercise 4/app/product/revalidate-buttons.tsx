"use client"
import { revalidateProduct } from "../action/revaldate-product"
export default function RevalidateButtons() {
    return (
        <div className="flex flex-col gap-3">
            <button className="btn" onClick={revalidateProduct}>
                Revalidate Product Data
            </button>
        </div>
    )
}
