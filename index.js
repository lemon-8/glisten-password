function textCopy() {
    /* Get the text field */
    var copyText = document.getElementById("pw-text");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    alert("Copied the text: " + copyText.value);
}

function getPassword() {
    var password = document.getElementById("typePasswordX");

    var loader = document.getElementById('loader');
    loader.style.display = "flex";
    var pw = document.getElementById("pw-wrapper");
    pw.style.display = "none";
    var error = document.getElementById("error");
    error.style.display = "none";

    fetch("http://15.207.79.253:8969/passphrase", {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "pass": password.value }),
    }).then(response => response.json())
        .then(data => {
            loader.style.display = "none";
            if (data.status === 'success') {
                var pw_text = document.getElementById("pw-text");
                console.log(pw_text);
                console.log(data.pass);
                pw_text.value = data.pass;
                console.log(pw_text.value);
                pw.style.display = "flex";
            } else {
                document.getElementById("error").innerHTML = data.message;
                error.style.display = "block";
                console.log(data);
            }
        })
        .catch((error) => {
            loader.style.display = "none";
            error.style.display = "block";
            console.error('Error:', error);
        });
}