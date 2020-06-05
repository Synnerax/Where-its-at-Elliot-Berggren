async function getEvents() {
    try {
        console.log('getting Events....')
    const response = await fetch ( 'http://localhost:8000/api/events/all', { method: 'GET' });
    const data = await response.json();
    await displayEvents(data);
    return await data;

    } catch (error) {
    alert('Unfortunatly occured an error please reload the page', error);

    }
}
async function displayEvents(events) {
    console.log(events)
    const eventContainer = document.querySelector('#active-events');


    eventContainer.innerHTML = '';


    for (event of events) {
        const { Date, Name, Where, From, To, Price, id } = event;

        // ska en <a></a> runt varje Event
        const hrefEvent = document.createElement('a');
        const hrefUrl = `http://localhost:8000/buy.html?=${id}`
        hrefEvent.setAttribute('href',`${hrefUrl}`);
        hrefEvent.setAttribute('value',`${id}`)
        hrefEvent.setAttribute('id', 'buyRef')
        hrefEvent.setAttribute('class', 'href-container');


        // skapar en sektion för Event
        const container = document.createElement('section');
        container.setAttribute('id','event');



        // Skapar Div med Border - datum i center 
        const pDateC = document.createElement('div');
        pDateC.setAttribute('id','time');
        const pDate = document.createElement('p');
        pDate.setAttribute('class', 'date-text')
        const date = document.createTextNode(Date);
        pDate.appendChild(date);
        pDateC.appendChild(pDate);

        // skapar en Div med Namn, Plats, Tid och Pris
        const infoContainer = document.createElement('div');
        infoContainer.setAttribute('id','info-container');


        // skapar namn för produkt
        const pName = document.createElement('h3');
        pName.setAttribute('id', 'name');
        pName.setAttribute('class', 'name-font');

        const name = document.createTextNode(Name);
        pName.appendChild(name);
    
        const pWhere = document.createElement('p');
        pWhere.setAttribute('id', 'location');
        pWhere.setAttribute('class', 'location-font');

        const where = document.createTextNode(Where);
        pWhere.appendChild(where);

        const pTime = document.createElement('p');
        pTime.setAttribute('id', 'from-to');
        const time = document.createTextNode(`${From} - ${To}`);
        pTime.appendChild(time);
        
        const pPrice = document.createElement('p');
        pPrice.setAttribute('id', 'price');
        pPrice.setAttribute('class', 'price-font');
        const price = document.createTextNode(`${Price} SEK`);
        pPrice.appendChild(price);

        const priceTimeContainer = document.createElement('div');
        priceTimeContainer.setAttribute('class', 'price-time-container');
        priceTimeContainer.appendChild(pTime);
        priceTimeContainer.appendChild(pPrice);


        container.appendChild(pDateC);
        container.appendChild(hrefEvent);
        hrefEvent.appendChild(infoContainer)
        infoContainer.appendChild(pName);
        infoContainer.appendChild(pWhere);
        infoContainer.appendChild(priceTimeContainer);



        eventContainer.appendChild(container);
    }
    return
    
}


getEvents();