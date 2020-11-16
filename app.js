const submit = document.querySelector('.submit');
const titleInput = document.querySelector('#title');
const textInput = document.querySelector('.text');
let optionsInput = document.querySelector('.Page');
let tabViewInput = document.querySelector('.tabView');
const error = document.querySelector('.error-text');
const errorText = '';
const successText = '';
const url = 'https://fcm.googleapis.com/fcm/send';

// switching between second-page and first page class or the tab view 
const selectElement = document.querySelector('select');
document.getElementById("second-Page").style.display = 'none';

selectElement.addEventListener('change', (event) => {
    const result = document.querySelector('.result');

    console.log(event.target.value);
    if (event.target.value == "home") {
        document.getElementById("second-Page").style.display = 'block';
        // result.textContent = `You selected ${event.target.value}`;
    } else {
        document.getElementById("second-Page").style.display = 'none';
    }
});

// when the user clicks the submit button
submit.addEventListener('click', () => {
    let title = titleInput.value;
    let text = textInput.value;
    let page = optionsInput.value;
    let tabViewIndex = tabViewInput.value;
    titleInput.value = '';
    textInput.value = '';
    optionsInput.value = 'NaN';
    console.log(`title: ${title}`);
    console.log(`text: ${text}`);
    console.log(`page: ${page}`);
    console.log(`tab View Index: ${tabViewIndex}`);
    if (title == '' || text == '' || page == 'NaN') {
        console.log('error');
        titleInput.focus();
        error.innerHTML = `<p>An Error Has Occured</p>`;

        // displays the error message
    } else {

        // fetch the data
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "key=AAAAWjEVoU8:APA91bEjKEYhLd5CKGfLEpKN2oiHxXxHhPfQWD0nuqPQEZBGXdKS4lF7CTKLOqBlLZZz7AaUFHwbtATiZjfYZ_je6cuu_mJFkYAnpbvcLDV19LMaiStmMCs-Pfpd87jc1ayOSbjZ2OKf",
                },
                body: {
                    "notification": {
                        "title": title,
                        "text": text,
                        "sound": "default"
                    },
                    "data": {
                        "page": page,
                        "tabViewIndex": tabViewIndex
                    },

                    "priority": "High",
                    "showWhenInForeground": true,
                    "to": "/topics/all"

                },
            })
            .then((result) => {
                if (result['message_id']) {
                    //Show success message
                    error.innerHTML = `<p style="color: green;">Success</p>`;
                } else {
                    //show error message
                    error.innerHTML = `<p>An Error Has Occured</p>`;
                }
                console.log(result);
            })
            .catch((ex) => {
                console.log(ex);
            });
    }


});