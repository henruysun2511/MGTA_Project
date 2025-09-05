import useFetch from "./useFetch";


function test(){
    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 12,
        sortBy:"title",
        order: "asc",
        q: ""
    });
    const [data] = useFetch("product", query, {});

    return(
        <>
        
        </>
    )
}