

function getToken() {
    return sessionStorage.getItem('auth');
}


async function getAccount() {
    const url = 'http://localhost:8000/api/account/get';

    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();

    if (data.success) {
        usernameElem.innerHTML = data.user;
        roleElem.innerHTML = data.role;
    }
}


async function admin() {
    const url = 'http://localhost:8000/api/account/admin';
    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();
    console.log('this is the admin DATA',data)
    if (!data.success) {
        location.href = '/verify_app.html'
    }
}

async function isLoggedIn() {
    const token = getToken();
    const url = 'http://localhost:8000/api/auth/isloggedin';

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();
    console.log(data);
    if (!data.isLoggedIn) {
        location.href = '/account.html';
    }
}

admin();
isLoggedIn();





async function getEvents() {
    try {
        console.log('getting Events....')
    const response = await fetch ( 'http://localhost:8000/api/events/all', { method: 'GET' });
    const data = await response.json();
    console.log(data)
    await displayEvents(data);
    return await data;

    } catch (error) {
    alert('Unfortunatly occured an error please reload the page', error);

    }
}


async function displayEvents(events) {
    console.log(events)
    const eventContainer = document.querySelector('.event-board');


    eventContainer.innerHTML = '';


    for (event of events) {
        const { Name, Where, Tickets, Sold } = event;
        // skapar en sektion för produkten
        const container = document.createElement('section');
        container.setAttribute('class','event-board-text event');


    
        // skapar namn för produkt
        const pName = document.createElement('h3');
        pName.setAttribute('class', 'events-name');
        const name = document.createTextNode(Name);
        pName.appendChild(name);
    
        // skapar en p tag med pris
        const pPlace = document.createElement('p');
        pPlace.setAttribute('class', 'events-place');
        const place = document.createTextNode(Where);
        pPlace.appendChild(place);
        
        const pSeats = document.createElement('p')
        pSeats.setAttribute('class', 'events-tickets');
        const seats = document.createTextNode(Tickets);
        pSeats.appendChild(seats);

        const pSold = document.createElement('p')
        pSold.setAttribute('class', 'events-tickets');
        const sold = document.createTextNode(Sold);
        pSold.appendChild(sold);
        
        container.appendChild(pName);
        container.appendChild(pPlace);
        container.appendChild(pSeats);
        container.appendChild(pSold);

    
        eventContainer.appendChild(container);
    }
    return
    
}


// lägger till produkt i varukorg 
async function createEvent(){
    const name = document.getElementById('name').value;
    const where = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const from = document.getElementById('from-time').value;
    const to = document.getElementById('to-time').value;
    const tickets = document.getElementById('tickets').value;
    const price = document.getElementById('price').value;

    const eventObj = await {
        'Name': name,
        'Where': where,
        'Date': date,
        'From': from,
        'To': to,
        'Tickets': tickets,
        'Price': price
    };

    console.log('this is the eventObj:', eventObj);
    const response = await fetch('http://localhost:8000/api/create/event'
    , { 
        method: 'POST',
        body: JSON.stringify(eventObj),
        headers: { 'Content-Type': 'application/json' }}
        );
    const data = await response.json();
    return await data;
}


        document.getElementById('create-button').addEventListener('click',async () => {
    
            await createEvent();
            await getEvents();
        });


getEvents();