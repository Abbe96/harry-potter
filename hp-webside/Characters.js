const grid = document.querySelector('.grid')

function showAll() { 
    fetch('https://hp-api.onrender.com/api/characters')
        .then((res) => res.json())
        .then((data) => {
            data.forEach(el => {
                var card = document.createElement('div')
                card.classList.add('card')
                
                var name = document.createElement('p')
                name.textContent = el.name
                
                var house = document.createElement('p')
                house.textContent = el.house

                if (el.house == 'Gryffindor') {
                    house.style.color = 'red'
                } else if(el.house == 'Slytherin') {
                    house.style.color = 'green'
                } else if(el.house == 'Hufflepuff') {
                    house.style.color = 'orange'
                } else if(el.house == 'Ravenclaw') {
                    house.style.color = 'lightgreen'
                }
                
                var img = document.createElement('img')
                img.setAttribute('src', el.image)

                grid.appendChild(img)
                card.appendChild(name)
                card.appendChild(house)
            })
        })
        .catch((e) => console.log(e));
}

function showHouse(house) {
    fetch('https://hp-api.herokuapp.com/api/characters/house/' + house)
        .then((res) => res.json())
        .then((data) => {
            data.forEach(el => {
                var card = document.createElement('div')
                card.classList.add('card')
                
                var name = document.createElement('p')
                name.textContent = el.name

                var actor = document.createElement('p')
                actor.textContent = 'Actor: ' + el.actor
                
                var house = document.createElement('p')
                house.textContent = el.house

                if (el.house == 'Gryffindor') {
                    house.style.color = 'red'
                } else if(el.house == 'Slytherin') {
                    house.style.color = 'green'
                } else if(el.house == 'Hufflepuff') {
                    house.style.color = 'orange'
                } else if(el.house == 'Ravenclaw') {
                    house.style.color = 'lightgreen'
                }
                
                var img = document.createElement('img')
                img.setAttribute('src', el.image)

                grid.appendChild(card)
                card.appendChild(img)
                card.appendChild(name)
                card.appendChild(actor)
                card.appendChild(house)
            })
        })
        .catch((e) => console.log(e));
}

function hogwartsType(type) {
    fetch('https://hp-api.herokuapp.com/api/characters/' + type)
        .then((res) => res.json())
        .then((data) => {
            data.forEach(el => {
                var card = document.createElement('div')
                card.classList.add('card')
                
                var name = document.createElement('p')
                name.textContent = el.name

                var actor = document.createElement('p')
                actor.textContent = 'Actor: ' + el.actor
                
                var house = document.createElement('p')
                house.textContent = el.house
                if(el.house == 'Gryffindor') {
                    house.style.color = 'red'
                }
                else if(el.house == 'Slytherin') {
                    house.style.color = 'green'
                }
                else if(el.house == 'Hufflepuff') {
                    house.style.color = 'orange'
                }
                else if(el.house == 'Ravenclaw') {
                    house.style.color = 'lightgreen'
                }
                
                var img = document.createElement('img')
                img.setAttribute('src', el.image)

                grid.appendChild(card)
                card.appendChild(img)
                card.appendChild(name)
                card.appendChild(actor)
                card.appendChild(house)
            })
        })
        .catch((e) => console.log(e));
}
showAll()