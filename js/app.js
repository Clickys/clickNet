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

    computerID: 0,
    //Add computer object to grid
    addComputer() {
        this.computerList.push({
            computerNumber: this.computerID,
            available: true,
        });
        console.log(this.computerList);
        console.log(this.computerID);
    },
    //Remove computer from grid
    removeComputer(pos) {
        this.computerList.splice(pos, 1);
        this.computerID -= 1;
        console.log(this.computerList);
        console.log(this.computerID);
    }
}


const handlers = {
    addComputer() {
        let addComputerModal = document.getElementById('addComputerModal');
        computerAddToDom.addComputer();
        computerAdd.addComputer();
    },

    removeComputer() {

    }
}

const computerAddToDom = {
    addComputer() {
        let pcGrid = document.getElementById('pcGrid');

        let createComputerDiv = document.createElement('div');
        let createComputerIcon = document.createElement('i');
        let createCloseIcon = document.createElement('i');
        let createisAvailableIcon = document.createElement('i');

        let computerIconText = document.createTextNode('desktop_windows');
        let createCloseIconText = document.createTextNode('close');
        let isAvailableIconText = document.createTextNode('brightness_1');

        createComputerDiv.id = computerAdd.computerID;
        computerAdd.computerID += 1;

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
        document.addEventListener('click', function(e) {
            if (e.target.closest('.closeComputerGrid')) {
                let pcGridParent = e.target.parentNode;
                let pcGrid = document.getElementById('pcGrid');
                computerAdd.removeComputer(pcGridParent.id);
                pcGrid.removeChild(pcGridParent);
            }
        }, false);
    }

}

//AddEventListeners

computerAddToDom.computerGridEventListeners();
