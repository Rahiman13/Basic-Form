document.getElementById('saveButton').addEventListener('click', function () {
    let name_label = document.getElementById('name_label');
    let name = document.getElementById('name');
    let tel_label = document.getElementById('tel_label');
    let tel = document.getElementById('tel');
    let email_label = document.getElementById('email_label');
    let email = document.getElementById('email');

    let userData = JSON.parse(localStorage.getItem('userData')) || [];

    userData.push({
        name: name.value,
        mobile: tel.value,
        email: email.value
    });

    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Data saved successfully!');
    updateTable();
});

function updateTable() {
    var userData = JSON.parse(localStorage.getItem('userData')) || [];
    var userDataHTML = '';

    userData.forEach(function (user, index) {
        userDataHTML += '<tr>';
        userDataHTML += '<td>' + user.name + '</td>';
        userDataHTML += '<td>' + user.mobile + '</td>';
        userDataHTML += '<td>' + user.email + '</td>';
        userDataHTML += '<td><button class="deleteButton" data-index="' + index + '">Delete</button></td>';
        userDataHTML += '</tr>';
    });

    document.getElementById('userData').innerHTML = userDataHTML;

    var deleteButtons = document.getElementsByClassName('deleteButton');
    Array.from(deleteButtons).forEach(function (button) {
        button.addEventListener('click', function () {
            var index = parseInt(button.getAttribute('data-index'));
            deleteUserInfo(index);
        });
    });
}

function deleteUserInfo(index) {
    var userData = JSON.parse(localStorage.getItem('userData')) || [];
    userData.splice(index, 1); // Remove the user info entry at the specified index
    localStorage.setItem('userData', JSON.stringify(userData));
    updateTable(); // Update the table display
}

document.getElementById('clearButton').addEventListener('click', function () {
    localStorage.removeItem('userData');
    alert('Data cleared successfully!');
    updateTable();
});

window.addEventListener('load', function () {
    updateTable();
});