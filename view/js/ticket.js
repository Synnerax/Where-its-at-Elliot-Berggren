let ticketID = sessionStorage.getItem('ticket');
let event = sessionStorage.getItem('Event');
async function getSession() {
    console.log('this is the ticket in session storage:', ticketID);
    console.log('this is the Event ID in session storage:', event);
    getEvent(event)
}

async function getEvent(id) {
    try {
        console.log('getting Events....')
        console.log(id)
    const response = await fetch ( `http://localhost:8000/api/events/one?id=${id}`, { method: 'GET' });
    const data = await response.json();
    await displayEvent(data);
    console.log('data from getEvent request in ticket.js', data)
    return await data;

    } catch (error) {
    alert('Unfortunatly occured an error please reload the page', error);

    }
}

async function displayEvent(event) {
    const eventContainer = document.querySelector('#ticket');


    eventContainer.innerHTML = '';

        const { Date, Name, Where, From, To, Price, } = event;

            // skapar namn för Event
            const nameContainer = document.createElement('section');
            nameContainer.setAttribute('id', 'name-container');

            const nameSpan = document.createElement('span')
            const nameSpanText = document.createTextNode('What')
            nameSpan.setAttribute('class', 'event-name-span')
            nameSpan.appendChild(nameSpanText);

            const pName = document.createElement('h1');
            pName.setAttribute('id', 'buy-name')
            pName.setAttribute('class', 'sansita')
            const name = document.createTextNode(Name);
            pName.appendChild(name);

            nameContainer.appendChild(nameSpan)
            nameContainer.appendChild(pName)


            // skapar Plats för event
            const locationContainer = document.createElement('section');
            locationContainer.setAttribute('id', 'location-container');

            const locSpan = document.createElement('span')
            const locSpanText = document.createTextNode('Where')
            locSpan.setAttribute('class', 'event-name-span')
            locSpan.appendChild(locSpanText);

            const pLocation = document.createElement('p');
            pLocation.setAttribute('class', 'event-location')
            const location = document.createTextNode(Where);
            pLocation.appendChild(location);

            locationContainer.appendChild(locSpan);
            locationContainer.appendChild(pLocation);


            /// 3 sektioner med Date / From / To

            const dateContainer = document.createElement('section');
            dateContainer.setAttribute('id', 'date-time-container');
            
            // Date

            const trueDatecontainer = document.createElement('section');
            trueDatecontainer.setAttribute('class', 'small-date-container');

            const dateSpan = document.createElement('span')
            const dateSpanText = document.createTextNode('When')
            dateSpan.setAttribute('class', 'event-name-span')
            dateSpan.appendChild(dateSpanText);

            const pDate = document.createElement('p');
            pDate.setAttribute('class', 'small-date-center')
            const date = document.createTextNode(Date);
            pDate.appendChild(date);
            trueDatecontainer.appendChild(dateSpan);
            trueDatecontainer.appendChild(pDate);


            // From

            const fromContainer = document.createElement('section');
            fromContainer.setAttribute('class', 'small-date-container');


            const fromSpan = document.createElement('span')
            const fromSpanText = document.createTextNode('When')
            fromSpan.setAttribute('class', 'event-name-span')
            fromSpan.appendChild(fromSpanText);

            const pFrom = document.createElement('p')
            pFrom.setAttribute('class', 'small-date-center')

            const from = document.createTextNode(From);
            pFrom.appendChild(from);
            fromContainer.appendChild(fromSpan);
            fromContainer.appendChild(pFrom);


            // To

            const toContainer = document.createElement('section');
            toContainer.setAttribute('class', 'small-date-container');

            const toSpan = document.createElement('span')
            const toSpanText = document.createTextNode('When')
            toSpan.setAttribute('class', 'event-name-span')
            toSpan.appendChild(toSpanText);

            const pTo = document.createElement('p')
            pTo.setAttribute('class', 'small-date-center')

            const to = document.createTextNode(To);
            pTo.appendChild(to);

            toContainer.appendChild(toSpan);
            toContainer.appendChild(pTo);



            
            dateContainer.appendChild(trueDatecontainer);
            dateContainer.appendChild(fromContainer);
            dateContainer.appendChild(toContainer);
            
            // section with barcode and ticket id 
            const barcodeContainer = document.createElement('Selection');
            barcodeContainer.setAttribute('id', 'barcode-container');

            const iBarcode = document.createElement('img')
            iBarcode.setAttribute('src', '../img/A2ED7barcode.png')
            iBarcode.setAttribute('class', 'barcode-img');

            const pTicket = document.createElement('p');
            pTicket.setAttribute('class', 'barcode-ticket')
            const ticket = document.createTextNode(ticketID);
            pTicket.appendChild(ticket)

            barcodeContainer.appendChild(iBarcode)
            barcodeContainer.appendChild(pTicket)




            eventContainer.appendChild(nameContainer);
            eventContainer.appendChild(locationContainer);
            eventContainer.appendChild(dateContainer);
            eventContainer.appendChild(barcodeContainer);

}
getSession();