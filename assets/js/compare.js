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


class Container {
    constructor(itemId) {
        let container = document.querySelector(`.newCon${itemId}`)
        container.addEventListener("click", () => {
            container.remove()
        })
        return container
    }

}



async function ApiSearch(search_key) {
    let list_of_request = []
    let api_array;

    let offset = 0
    let count = 100
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
    select.innerHTML = ""
    if (list_of_request.length > 0) {

        list_of_request.forEach(item => {
            select.innerHTML += `<option value="${item.id}">${item.title}</option>`
            // let option = document.querySelector(`#a${item.id}`)

            // option.addEventListener("click",()=>{
            //     console.log("salam");

            // })
        })

    }


}



let tbody = document.querySelector(".parent")
let select = document.querySelector("select")
let add = document.querySelector(".add")
let containers=[]

add.addEventListener("click", () => {
    console.log("salam");

    let selected = select.value
    console.log(selected)
    // console.log(selected);
    changed = false
    data.forEach((item) => {
        if (item.id == selected && !changed) {
            changed = true
            tbody.innerHTML +=
                ` <div class="container newCon${item.id}">
                    <div class="img-con"><img src=${item.images[0]}></img></div>
                    <h3 class="salam">${item.title}</h3>
                    <h3 class="salam">Commerce</h3>
                    <h3 class="salam">⭐⭐⭐⭐⭐</h3>
                    <h3 class="salam">Aviable</h3>
                    <h3 class="salam">Date: ${item.creationAt}</h3>
                    <h3 class="salam">Brand: ${item.title}</h3>
                    <h3 class="salam">${item.id}</h3>
                    <h3 class="salam">500</h3>
                    <h3 class="salam">10kq</h3>
                    <h3 class="salam">${item.description}</h3   >
                </div>`
            containers.push(new Container(item.id))
        }


    })
    // console.log(filtered_data.title);



})





// APICALL()

let api_search = document.querySelector(".searchinput")

api_search.addEventListener("input", () => {
    console.log("salam");

    let search = api_search.value
    search = search.trim()
    if (search != "") {
        Debounce(search)
    }
})
// apiSearch("s")