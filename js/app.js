//Create Object Computer Add
// Create an array to store computer objects
// Create methods of adding removing computers from array
//Computer obj details Number Of Pc, Available,
//
//

//MODALS
$(document).ready(function() {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('select').material_select();
});


const computerAddToGrid = {
    //List of computers in the net
    computerList: [],
    //Add computer object to computerList
    addComputer() {
        this.computerList.push({
            computerNumber: this.computerList.length,
            isAvailable: true,
            usernameInUse: null,
            time: 0,
        });
        console.log(this.computerList);
    },
    //Remove computer from computerList array
    removeComputer(pos) {
        this.computerList.splice(pos, 1);
        console.log(this.computerList);

    },
    //Get the nodelist and loop through them and changing the IDs depends on how many left on the computerList Array
    autoIdToElements() {
        let createComputerDiv = Array.from(document.getElementsByClassName('createComputerDiv'));
        createComputerDiv.forEach((element, position) => {
            element.id = position;
        })
        this.computerList.forEach((element, position) => {
            element.computerNumber = position;
        })
    },

}


const handlers = {
    addComputer() {
        let addComputerModal = document.getElementById('addComputerModal');
        computerAddToGridToDom.addComputer();
    },

    removeComputer() {

    }
}

const computerAddToGridToDom = {
    addComputer() {
        computerAddToGrid.addComputer();
        computerAddToGrid.autoIdToElements();

        let pcGrid = document.getElementById('pcGrid');

        let createComputerDiv = document.createElement('div');
        let createComputerIcon = document.createElement('i');
        let createCloseIcon = document.createElement('i');
        let createisAvailableIcon = document.createElement('i');

        let computerIconText = document.createTextNode('desktop_windows');
        let createCloseIconText = document.createTextNode('close');
        let isAvailableIconText = document.createTextNode('brightness_1');

        createComputerDiv.className += ' col s4 m2 l2 createComputerDiv';
        createComputerIcon.className += ' large material-icons addComputerGrid';
        createCloseIcon.className += ' tiny material-icons closeComputerGrid';
        createisAvailableIcon.className += 'tiny material-icons isAvailableGrid';

        createisAvailableIcon.appendChild(isAvailableIconText);
        createCloseIcon.appendChild(createCloseIconText);
        createComputerIcon.appendChild(computerIconText);
        createComputerDiv.appendChild(createComputerIcon);
        createComputerDiv.appendChild(createCloseIcon);
        createComputerDiv.appendChild(createisAvailableIcon);
        pcGrid.appendChild(createComputerDiv);

    },

    computerGridEventListeners() {
        const pcGrid = document.getElementById('pcGrid');
        pcGrid.addEventListener('click', function(e) {
            if (e.target.closest('.closeComputerGrid')) {
                computerAddToGrid.autoIdToElements();
                let createComputerDiv = e.target.parentNode;
                let pcGrid = document.getElementById('pcGrid');
                computerAddToGrid.removeComputer(createComputerDiv.id);
                pcGrid.removeChild(createComputerDiv);
            }
        }, false);
    }

}

//Class of Users
class User {

    constructor(name, surname, username, password, email, amountOfDeposit) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.amountOfDeposit = amountOfDeposit;
        this.timeLeftOnAccount = null;
    }

}

// Everything about user accounts.
const userAccounts = {

    userAccountList: [],

    addUserAccount(name, surname, username,password, email, amountOfDeposit) {
        if (!(name && surname && username && password && email && amountOfDeposit)) {
            return;
        } else {
            this.userAccountList.push(new User(name, surname, username, password, email, amountOfDeposit));
        }
        console.log(this.userAccountList);
    },
}

const userAccountsFromDom = {
    addUserAccount() {
        let name = document.getElementById('first_name').value;
        let surname = document.getElementById('last_name').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let email = document.getElementById('email').value;

        let depositAmount = document.getElementById('depositAmount');
        let amountPicked = parseInt(depositAmount.options[depositAmount.selectedIndex].value);

        userAccounts.addUserAccount(name, surname,username, password, email, amountPicked);
    }
}
userAccounts.addUserAccount('andreas', 'evagorou', 'clickys', 10, 'dsadas', 3);
//AddEventListeners

computerAddToGridToDom.computerGridEventListeners();
