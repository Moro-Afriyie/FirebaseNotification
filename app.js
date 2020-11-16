let submit = document.querySelector('.submit');
let titleInput = document.querySelector('#title');
let textInput = document.querySelector('.text');
let optionsInput = document.querySelector('.cars');
let errorText = '';
let successText = '';
let url = 'https://fcm.googleapis.com/fcm/send';
submit.addEventListener('click', () => {
    var title = titleInput.value;
    var text = textInput.value;
    var page = optionsInput.value;
    titleInput.value = '';
    textInput.value = '';

    console.log(`title: ${title}`);
    console.log(`text: ${text}`);
    console.log(`page: ${page}`);
    if (title == '' || text == '' || page == '') {
        console.log('error');
        titleInput.focus();
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
                        "tabViewIndex": 0
                    },

                    "priority": "High",
                    "showWhenInForeground": true,
                    "to": "/topics/all"

                },
            })
            .then((result) => {
                if (result['message_id']) {
                    //Show success message
                } else {
                    //show error message
                }
                console.log(result);
            })
            .catch((ex) => {
                console.log(ex);
            });
    }


});