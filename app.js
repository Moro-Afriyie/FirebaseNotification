const submit = document.querySelector('.submit');
const titleInput = document.querySelector('#title');
const textInput = document.querySelector('.text');
let optionsInput = document.querySelector('.Page');
let tabViewInput = document.querySelector('.tabView');
const error = document.querySelector('.error-text');
const errorText = '';
const successText = '';
const url = 'https://fcm.googleapis.com/fcm/send';
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
    console.log(`page: ${tabViewIndex}`);
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