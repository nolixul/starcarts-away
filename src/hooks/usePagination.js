import { useState, useEffect } from "react"

export const usePagination = (pageNum, query) => {
    const [paginatedData, setpaginatedData] = useState([])

    useEffect(() => {
        query(pageNum).then((response) => {
            setpaginatedData(response)
        })
    }, [pageNum, query])

    return {paginatedData}
}