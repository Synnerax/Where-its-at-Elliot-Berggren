const id = location.search.slice(2);
const buyButton = document.getElementById('buy-button');
async function getEvent() {
    try {
        console.log('getting Events....')
        console.log(id)
    const response = await fetch ( `http://localhost:8000/api/events/one?id=${id}`, { method: 'GET' });
    const data = await response.json();
    await displayEvent(data);
    
    return await data;

    } catch (error) {
    alert('Unfortunatly occured an error please reload the page', error);

    }
}


async function displayEvent(event) {
    const eventContainer = document.querySelector('#buy-main');


    eventContainer.innerHTML = '';

        const { Date, Name, Where, From, To, Price, } = event;



        // skapar namn för produkt
        const pName = document.createElement('h1');
        pName.setAttribute('id', 'buy-name');
        pName.setAttribute('class', 'sansita')
        const name = document.createTextNode(Name);
        pName.appendChild(name);
    
        const pDate = document.createElement('p');
        pDate.setAttribute('class', 'buy-date-info');
        const date = document.createTextNode(`${Date} Kl ${From} - ${To}`);
        pDate.appendChild(date);

        const pLocation = document.createElement('p');
        pLocation.setAttribute('class', 'buy-location');
        const location = document.createTextNode(Where);
        pLocation.appendChild(location);
        
        const pPrice = document.createElement('p');
        pPrice.setAttribute('class', 'buy-price');
        const price = document.createTextNode(`${Price} SEK`);
        pPrice.appendChild(price);

        // const hrefEvent = document.createElement('a');
        // const hrefUrl = `http://localhost:8000/ticket.html`;
        // hrefEvent.setAttribute('href',`${hrefUrl}`);
        // hrefEvent.setAttribute('id', 'buyRef');
        // hrefEvent.setAttribute('class', 'buy-button-href');


        const pButton = document.createElement('button');
        pButton.setAttribute('id', 'buy-button');
        pButton.setAttribute('type', 'submit');
        pButton.addEventListener('click', async () => {
            console.log('hello')
            await createTicket();
            
            
            
        });

        const button = document.createTextNode('beställ');
        pButton.appendChild(button);
        //hrefEvent.appendChild(pButton)
        eventContainer.appendChild(pName);
        eventContainer.appendChild(pDate);
        eventContainer.appendChild(pLocation);
        eventContainer.appendChild(pPrice);
        eventContainer.appendChild(pButton)
        // eventContainer.appendChild(hrefEvent)

    return
    
}

getEvent();
// lägger till produkt i varukorg 
async function createTicket(){
    const name = document.getElementById('buy-name').innerText
    const eventObj =  {
        'Name': name,
        
    };

    console.log('this is the ticketObj:', eventObj);
    const response = await fetch('http://localhost:8000/api/buy/event'
    , { 
        method: 'POST',
        body: JSON.stringify(eventObj),
        headers: { 'Content-Type': 'application/json' }}
        );
    const data = await response.json();
    console.log('this is in buy.js',data)
    await sessionStorage.setItem('ticket', data.TicketID);
    await sessionStorage.setItem('Event', id);
    location.href = 'http://localhost:8000/ticket.html';
    return await data;
}


function testfunc() {
    console.log('doing test function...')
    sessionStorage.setItem('test', 'test 123')
}
testfunc();

