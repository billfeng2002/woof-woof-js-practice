fetch("http://localhost:3000/pups").then(r => r.json()).then(j => {
    console.log(j)
    let dogBar = document.querySelector("#dog-bar")

    for (const dog of j) {
        let dogView = document.createElement("span")
        dogView.textContent = dog.name
        dogView.dataset.id = dog.id
        dogBar.append(dogView)
    }
})

function dogsUpdate(dogId) {
    fetch("http://localhost:3000/pups").then(r => r.json()).then(j => {
        let dog = j.find((item) => item.id == dogId)
        let dogInfoDisplay = document.querySelector('#dog-info')
        dogInfoDisplay.innerHTML = `<img src="${dog.image}">
        <h2>${dog.name}</h2>
        <button id="toggleGoodDog" data-id="${dog.id}">${dog.isGoodDog ? "Good Dog!" : "Bad Dog."}</button>`
    })
}



document.addEventListener("click", (e) => {
    if (e.target.matches('#dog-bar span')) {
        let dogId = e.target.dataset.id
        dogsUpdate(dogId)
    }

    if (e.target.matches('#toggleGoodDog')) {
        let dogId=e.target.dataset.id
        console.log("hi"+dogId)
        let requestSettings={headers: {
            'Content-Type': 'application/json'
        }}
        requestSettings.method="PATCH"
        if (e.target.textContent == "Bad Dog.") {
            requestSettings.body=JSON.stringify({isGoodDog: true})
            e.target.textContent="Good Dog!"
        } else {
            requestSettings.body=JSON.stringify({isGoodDog: false})
            e.target.textContent="Bad Dog."
        }
        console.log(requestSettings)
        fetch(`http://localhost:3000/pups/${dogId}`, requestSettings).then(r=> r.json())
    }

    if(e.target.matches('#good-dog-filter')){


    }

})