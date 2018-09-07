document.addEventListener("DOMContentLoaded",() => {

  const monsterContainer = document.getElementById("monster-container")
  const backButton = document.getElementById("back")
  const forwardButton = document.getElementById("forward")
  const createMonster = document.getElementById("create-monster")
  const monsterForm = document.createElement("form")
  let pageNum = 20

  monsterForm.innerHTML= `
  <label> Monster Name: </label>
  <input type = "text" id ="monster-name"/>
  <label> Monster Age: </label>
  <input type = "number" id = "monster-age"/>
  <label> Monster Description: </label>
  <input type = 'text' id = "monster-description"/>
  <input type ='submit' value= "rawr xd"/>
  `

  monsterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let nameInput = document.getElementById('monster-name')
    let ageInput = document.getElementById('monster-age')
    let descriptionInput = document.getElementById('monster-description')

    fetch('http://localhost:3000/monsters', {
      method: "POST",
      headers: {'Content-type': "application/json"},
      body: JSON.stringify({name: `${nameInput.value}`, age: `${ageInput.value}`, description: `${descriptionInput.value}`})
    }).then(res => res.json())
    .then(monsterForm.reset())
  })

  createMonster.append(monsterForm)


  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
  .then(res => res.json())
  .then(data => data.forEach((monster) => {
    page = document.createElement('div')
    page.innerHTML = `this is page ${pageNum}`
    monsterContainer.append(page)
    let monsterSpan = document.createElement("span")
    monsterSpan.innerHTML = `
    <h3>Name: ${monster.name}</h3>
    <h6>Age: ${monster.age}</h6>
    <p>Description: ${monster.description}</p>
    `
    monsterSpan.style.color = "lightblue"
    monsterContainer.append(monsterSpan,document.createElement('hr'))
  }))//end then

  backButton.addEventListener('click', () => {
    pageNum-=1
    if (pageNum === 0) {
      pageNum +=1
      window.alert("no monsters back there")
    }else{
    monsterContainer.innerHTML =""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(data => data.forEach((monster) => {

      page = document.createElement('div')
      page.innerHTML = `this is page ${pageNum}`
      monsterContainer.append(page)
      let monsterSpan = document.createElement("span")
      monsterSpan.innerHTML = `
      <h3>Name: ${monster.name}</h3>
      <h6>Age: ${monster.age}</h6>
      <p>Description: ${monster.description}</p>
      `
      monsterSpan.style.color = "lightblue"
      monsterContainer.append(monsterSpan,document.createElement('hr'))
    }))//end else
    }
  })//end back button event listener

  forwardButton.addEventListener('click', () => {
    pageNum+=1

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then((monsters) => {
      console.log(monsters)
      if (monsters.length === 0) {
        pageNum -=1
        window.alert("no monsters ahead")
      }else{
        console.log("hi")
        monsterContainer.innerHTML =""

        monsters.forEach((monster) => {
      page = document.createElement('div')
      page.innerHTML = `this is page ${pageNum}`
      monsterContainer.append(page)
      let monsterSpan = document.createElement("span")
      monsterSpan.innerHTML = `
      <h3>Name: ${monster.name}</h3>
      <h6>Age: ${monster.age}</h6>
      <p>Description: ${monster.description}</p>
      `
      monsterSpan.style.color = "lightblue"
      monsterContainer.append(monsterSpan,document.createElement('hr'))
    })
    }
  })
})







})//end dom content loaded
