const verifyButton = document.getElementById('submit-ticket')


function getToken() {
    return sessionStorage.getItem('auth');
}


async function staff() {
    const url = 'http://localhost:8000/api/account/staff';
    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();
    console.log('this is the staff DATA',data)
    if (!data.success) {
        location.href = '/account.html'
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


staff();
isLoggedIn();




verifyButton.addEventListener('click', async () => {
    const ticket = document.getElementById('ticket-input').value

    const ticketObj =  {
        'id': ticket,
        
    };

    console.log('this is the ticket ID:', ticketObj);
    const response = await fetch('http://localhost:8000/api/verify/ticket'
    , { 
        method: 'POST',
        body: JSON.stringify(ticketObj),
        headers: { 'Content-Type': 'application/json' }}
        );
    const data = await response.json();

        console.log('this is the data recived back to the client', data)
        if (data.Status !== 404 && data.Redeemed !== true){
            alert("Successfully Verified!");

        }else if(data.status !== 404 && data.Redeemed !== false) {
            alert("Failed to Verified! - already Redeemed");

        }else {
            alert("Ticket Not Found");

        }
})