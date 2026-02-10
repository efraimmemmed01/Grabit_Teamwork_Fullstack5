async function APICALL(count, offset) {
    try {
        if (data.length <= offset) {
            let res = await fetch(`https://api.escuelajs.co/api/v1/products?limit=${count}&offset=${offset}`)
            let new_data = await res.json()
            data = data.concat(new_data)
        }
        else {
            throw new Error("cekilen datada offsete qeder var idi, daha boyuk offsett cagir.");
        }

        console.log(data);

        // console.log("SALAM BIBITOS");

        return data

    }
    catch (err) {
        console.warn("API cavabi: " + err);
        return data
    }
}
let timeout;
let data = []

function Debounce(search_key) {

    clearTimeout(timeout)
    timeout = setTimeout(() => {
        ApiSearch(search_key)
    }, 400)
}



async function ApiSearch(search_key) {
    let list_of_request = []
    let api_array;

    let offset = 0
    let count = 10
    do {
        api_array = await APICALL(count, offset)

        list_of_request = api_array.filter((x) => x.title.toLowerCase().includes(search_key.toLowerCase()))

        offset += count
        console.log("Checkpoint");
        // console.log(list_of_request.length<5);


    }
    while (api_array.length == offset && list_of_request.length < 5)

    // if()
    console.log(`list of request = ${list_of_request.length}`);

    return list_of_request
}


// APICALL()

let api_search = document.querySelector("input")

api_search.addEventListener("input", () => {
    let search = api_search.value
    search = search.trim()
    if (search != "") {
        Debounce(search)

    }


})
// apiSearch("s")