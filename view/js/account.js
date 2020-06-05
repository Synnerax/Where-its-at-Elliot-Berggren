/**----------------------------------------------------------------
 *                          ACCOUNTS:
 * ----------------------------------------------------------------
 *                  Username: admin
 *                  Password: Password123!
 *                  Role: admin
 *                  ---------------------
 *                  Username: staff
 *                  Password: Pass123!
 *                  Role: user
 *                  ---------------------
 * 
 * -----------------------------------------------------------------
 */




const buttonElem = document.querySelector('#submit');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');

async function saveToken(token) {
    //return new Promise((resolve, reject) => {
        sessionStorage.setItem('auth', token);

        //resolve('Done');
    //})
}

function getToken() {
    return sessionStorage.getItem('auth');
}

async function login(username, password) {
    const url = 'http://localhost:8000/api/auth/login';
    const obj = {
        username: username,
        password: password
    }

    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();
    console.log(data)
    return await data;
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
    console.log('this is the isLoggedin data',data)
    if (data.isLoggedIn) {
        location.href = 'http://localhost:8000/admin.html';
    } 
}

buttonElem.addEventListener('click', async () => {
    const user = inputUser.value;
    const pass = inputPass.value;

    let loggedIn = await login(user, pass);
    console.log(loggedIn)
    if (loggedIn.success && loggedIn.role === 'admin') {
        saveToken(loggedIn.token);
        setTimeout(() => {
            location.href = 'http://localhost:8000/admin.html'
        }, 100);
    }else if (loggedIn.success && loggedIn.role === 'user'){
            saveToken(loggedIn.token);
            setTimeout(() => {
                location.href = 'http://localhost:8000/verify_app.html'
            }, 100);
        }
    else {
        document.querySelector('#errorMessage').classList.toggle('hide');
    }
});

isLoggedIn();