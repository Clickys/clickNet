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
});


const computerAdd = {
    //List of computers in the net
    computerList: [],
    //Add computer object to computerList
    addComputer() {
        this.computerList.push({
            computerNumber: this.computerList.length,
            available: true,
        });
        console.log(this.computerList);
    },
    //Remove computer from computerList array
    removeComputer(pos) {
        this.computerList.splice(pos, 1);
        console.log(this.computerList);

    },

    autoIdToElements() {
        let createComputerDiv = Array.from(document.getElementsByClassName('createComputerDiv'));
        createComputerDiv.forEach((element, position) => {
            element.id = position;
        })
    }
}


const handlers = {
    addComputer() {
        let addComputerModal = document.getElementById('addComputerModal');
        computerAddToDom.addComputer();
    },

    removeComputer() {

    }
}

const computerAddToDom = {
    addComputer() {
        computerAdd.addComputer();
        let pcGrid = document.getElementById('pcGrid');

        let createComputerDiv = document.createElement('div');
        let createComputerIcon = document.createElement('i');
        let createCloseIcon = document.createElement('i');
        let createisAvailableIcon = document.createElement('i');

        let computerIconText = document.createTextNode('desktop_windows');
        let createCloseIconText = document.createTextNode('close');
        let isAvailableIconText = document.createTextNode('brightness_1');

        computerAdd.computerList.forEach((element, pos) => {
            createComputerDiv.id = pos;
        })



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
                computerAdd.autoIdToElements();
                let createComputerDiv = e.target.parentNode;
                let pcGrid = document.getElementById('pcGrid');
                computerAdd.removeComputer(createComputerDiv.id);
                pcGrid.removeChild(createComputerDiv);
            }
        }, false);
    }

}

//AddEventListeners

computerAddToDom.computerGridEventListeners();
