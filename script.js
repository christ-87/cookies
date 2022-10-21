const display = document.querySelector('.display');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt');
let result =  false
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

// console.log(nextWeek);

let day = ('0' + nextWeek).slice(9,11);
let month =  ('0' + (today.getMonth() + 1)).slice(-2)
let year = today.getFullYear();
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`

// desplaying items on the screen

btns.forEach(btn => {
    btn.addEventListener('click', btnAction);
})
function btnAction(e){
    let newObj = {};

    inputs.forEach(input => {
        let attrName = input.getAttribute('name');
        let attrValue = attrName !== 'cookieExpire' ? input.value : input.valueAsDate;
        newObj[attrName] = attrValue;
    })
    // console.table(newObj);
    let description = e.target.getAttribute('data-target');

    if(description === 'create'){
        createCookie(newObj.cookieName, newObj.cookieValue, newObj.cookieExpire);
    }else if (description === 'displayAll'){
        liestCookies()
    }
}

function createCookie(name, value, exp){
 infoTxt.innerText ='';
 display.innerHTML = '';
 display.childNodes.forEach(child => {
    child.remove();
 })

 // if cookie as the same name

 let cookies = document.cookie.split(';');
 cookies.forEach(cookie => {
    cookie = cookie.trim();
    // console.log(cookie)
    let formatCookie = cookie.split('=');
    // console.log(formatCookie)
    if(formatCookie[0] === encodeURIComponent(name))
    result = true
})

if(result){
    infoTxt.innerText = `a cookie already has the same nam.`
    result = false;
    return;
}

    // if the cookies does not have name
    if(name.length === 0) {
        infoTxt.innerText = `can't defined a cookie without name`;
        return;
    }
    document.cookie = `${encodeURIComponent(name)}=${encodeURI(value)};expires=${exp.toUTCString()}`
    let info = document.createElement('li')
    info.innerText = `Cookie ${name} bonjour.`;
    display.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 1500)
}

function liestCookies(){
    let cookies = document.cookie.split(';');
    if(cookies.join() === ""){
        infoTxt.innerText = 'no cookies display'
        return
    }
    cookies.forEach(cookie => {
        cookie = cookie.trim()
        let formatCookie = cookie.split('=');
        
        // console.log(formatCookie);
        let item = document.createElement('li');
        infoTxt.innerText = 'Click to delete';
        item.innerText = `Name : ${decodeURIComponent(formatCookie[0])}, value : ${decodeURIComponent(formatCookie[1])}`;
        display.appendChild(item);

        // delete cookie
        item.addEventListener('click', () => {
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`
            item.innerText = `Cookie ${formatCookie[0]} delete`;
            setTimeout(() => {
                item.remove();
            }, 1000)
        })
    })
}
console.log(new Date(0));