/* global document */
/*eslint-env jquery*/
/*eslint max-len: ["error", 180]*/

//Create Object Computer Add
// Create an array to store computer objects
// Create methods of adding removing computers from array
//Computer obj details Number Of Pc, Available,
//
//

//MODALS


const computerAddToGrid = {
    //List of computers in the net
    computerList: [],
    //Add computer object to computerList
    addComputer() {
        this.computerList.push({
            computerNumber: null,
            isAvailable: true,
            usernameInUse: null,
            time: 0,
        });
    },
    //Remove computer from computerList array
    removeComputer(pos) {
        this.computerList.splice(pos, 1);
    },
    //Get the nodelist and loop through them and changing the IDs depends on how many left on the computerList Array
    autoIdToElements() {
        const createComputerDiv = Array.from(document.getElementsByClassName('createComputerDiv'));
        createComputerDiv.forEach((element, position) => {
            const computerDivEl = element;
            computerDivEl.id = position;
        });
        this.computerList.forEach((element, position) => {
            const computer = element;
            computer.computerNumber = position;
        });
    },

    pcAvailability() {
        let isAvailable = this.computerList.map(computer => {
            if (computer.isAvailable === false) {
                return computer;
            }
        });
    }

};


const handlers = {
    addComputer() {
        computerAddToGridToDom.addComputer();
    },

    removeComputer() {

    }
};

const computerAddToGridToDom = {
    addComputer() {
        computerAddToGrid.addComputer();

        const pcGrid = document.getElementById('pcGrid');

        const createComputerDiv = document.createElement('div');
        const createComputerIcon = document.createElement('i');
        const createCloseIcon = document.createElement('i');
        const createisAvailableIcon = document.createElement('i');

        const computerIconText = document.createTextNode('desktop_windows');
        const createCloseIconText = document.createTextNode('close');
        const isAvailableIconText = document.createTextNode('brightness_1');

        createComputerDiv.className += ' col s4 m2 l2 createComputerDiv';
        createComputerIcon.className += ' large material-icons addComputerGrid modal-trigger';
        createComputerIcon.setAttribute('data-target', 'addTimeModal');
        createCloseIcon.className += ' tiny material-icons closeComputerGrid';
        createisAvailableIcon.className += 'tiny material-icons isAvailableGrid';

        createisAvailableIcon.appendChild(isAvailableIconText);
        createCloseIcon.appendChild(createCloseIconText);
        createComputerIcon.appendChild(computerIconText);
        createComputerDiv.appendChild(createComputerIcon);
        createComputerDiv.appendChild(createCloseIcon);
        createComputerDiv.appendChild(createisAvailableIcon);
        pcGrid.appendChild(createComputerDiv);
        computerAddToGrid.autoIdToElements();
        computerAddToGrid.pcAvailability();
    },

    computerGridEventListeners() {
        const pcGrid = document.getElementById('pcGrid');
        pcGrid.addEventListener('click', e => {
            if (e.target.closest('.closeComputerGrid')) {
                computerAddToGrid.autoIdToElements();
                const createComputerDiv = e.target.parentNode;
                computerAddToGrid.removeComputer(createComputerDiv.id);
                pcGrid.removeChild(createComputerDiv);
            }
        }, false);
    },

    addUserToPcEventListener() {
        let pcID = 0;

        document.addEventListener('click', e => {
            if (e.target.closest('.addComputerGrid')) {
                pcID = e.target.parentNode.id;

            }
            if (e.target.closest('.addUserToPc')) {
                const getParent = e.target.parentNode.parentNode;
                const getParentId = getParent.getAttribute('id');

                userAccounts.addUserToPc(getParentId, pcID);

            }
        });
    },

    checkPcAvailability() {

    }

};

//Class of Users
class User {

    constructor(name, surname, username, password, email, amountOfDeposit, timeLeftOnAccount) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.amountOfDeposit = amountOfDeposit;
        this.timeLeftOnAccount = timeLeftOnAccount;
    }

}

// Everything about user accounts.
const userAccounts = {

    userAccountList: [],

    addUserAccount(name, surname, username, password, email, amountOfDeposit, timeLeftOnAccount) {
        if (!(name && surname && username && password && email && amountOfDeposit)) {
            return;
        }
        this.userAccountList.push(new User(name, surname, username, password, email, amountOfDeposit, timeLeftOnAccount));
    },

    addUserToPc(userPos, pcPos) {
        const getUser = userAccounts.userAccountList[userPos].username;
        computerAddToGrid.computerList[pcPos].isAvailable = false;
        computerAddToGrid.computerList[pcPos].usernameInUse = getUser;
        checkDomPcAvailability.checkPcAvailability();
    },
};


const userHandlers = {

    addUserAccount() {
        getUserAccountsFromDom.addUserAccount();
        getUserAccountsFromDom.clearUserForm();
    }
};


const getUserAccountsFromDom = {
    addUserAccount() {
        const name = document.getElementById('first_name').value;
        const surname = document.getElementById('last_name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        let timeLeftOnAccount = 0;
        const depositAmount = document.getElementById('depositAmount');
        const amountPicked = parseInt(depositAmount.options[depositAmount.selectedIndex].value);

        if (amountPicked === 5) {
            timeLeftOnAccount = 3;
        } else if (amountPicked === 10) {
            timeLeftOnAccount = 7;
        } else {
            timeLeftOnAccount = 12;
        }

        userAccounts.addUserAccount(name, surname, username, password, email, amountPicked, timeLeftOnAccount);
        listUsersModalToDom.listUsers();
    },

    clearUserForm() {
        const username = document.getElementById('username');
        const name = document.getElementById('first_name');
        const surname = document.getElementById('last_name');
        const password = document.getElementById('password');
        const email = document.getElementById('email');

        username.value = '';
        name.value = '';
        surname.value = '';
        password.value = '';
        email.value = '';
    }
};

// Timer Add Time to Users

const listUsersModalToDom = {
    listUsers() {
        const addTimeModal = document.getElementById('addTimeModalMain');
        const userListUl = addTimeModal.querySelector('ul');

        userListUl.innerHTML = '';

        userAccounts.userAccountList.forEach((user, pos) => {
                const liForUser = document.createElement('li');
                liForUser.id = pos;
                const addTimeButton = document.createElement('a');
                const addTimeIcon = document.createElement('i');
                const liUserTextContent = document.createTextNode(`Username: ${user.username} Time: ${user.timeLeftOnAccount} hours`);

                addTimeButton.className = ' btn-floating btn-tiny red addTimeButtonModal';
                addTimeIcon.className = ' tiny material-icons addUserToPc';
                addTimeIcon.textContent = 'add';

                addTimeButton.appendChild(addTimeIcon);
                liForUser.appendChild(liUserTextContent);
                liForUser.appendChild(addTimeButton);
                userListUl.appendChild(liForUser);
                addTimeModal.appendChild(userListUl);
        });
    },
};

const checkDomPcAvailability = {
    checkPcAvailability() {
        let getPcs = Array.from(document.getElementsByClassName('createComputerDiv'));
        let clearPcs = document.getElementsByClassName('usernameInGrid');

        for (let i = 0; i < clearPcs.length; i++) {
            clearPcs[i].innerHTML = '';
        }

        let isAvailable = computerAddToGrid.computerList.filter(com => {
            return com.isAvailable === false;
        }).map(com => {
            return {computerNumber: com.computerNumber, usernameInUse: com.usernameInUse};
        });

        isAvailable.forEach((pc) => {
            let IsAvailableElPar = getPcs[pc.computerNumber].lastChild;
            let isAvailableEl =  getPcs[pc.computerNumber];
            let liPar = document.createElement('p');
            let text = document.createTextNode(pc.usernameInUse);
            liPar.className = ' usernameInGrid';
            liPar.appendChild(text);
            isAvailableEl.appendChild(liPar);
            IsAvailableElPar.style.color = 'red';
        })
    }
}


computerAddToGridToDom.computerGridEventListeners();
computerAddToGridToDom.addUserToPcEventListener();


userAccounts.addUserAccount('andreas', 'makis', 'user1', 'password', 'email', 5, 3);
userAccounts.addUserAccount('andreas1', 'makis2', 'user2', 'password4', 'email', 5, 3);
userAccounts.addUserAccount('andreas1', 'makis2', 'user3', 'password4', 'email', 5, 3);
userAccounts.addUserAccount('andreas1', 'makis2', 'user4', 'password4', 'email', 5, 3);
