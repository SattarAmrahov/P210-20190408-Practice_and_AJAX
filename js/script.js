"use strict";


// inputs
const man = document.forms['myForm']['manufacturer'];
const model = document.forms['myForm']['model'];
const release = document.forms['myForm']['release'];
const indexInput = document.forms['myForm']['index'];
const button = document.querySelector("#addButton");

const ulElem = document.querySelector("#myObjectList");

// validation

const onlyLetter = /^['a-zA-Z']+$/;
const numberLetter = /^['a-zA-Z0-9']+$/;
const onlyNumber = /^(([0-9]{4})*$)/;

// myAlert

const myAlert = document.getElementById('formAlert');


// object

function Car(id, man, model, rel) {
    this.id = id;
    this.man = man;
    this.model = model;
    this.rel = rel;
}

// my car list
let myObjectArray = [];


function validateForm() {
    if (man.value == '' || model.value == '' || release.value == '') {
        alert('Inputs cannot be empty!');
        return false;
    }

    else if (!man.value.match(onlyLetter)) {
        alert('Man should be only letter!');
        return false;
    }
    else if (!release.value.match(onlyNumber)) {
        alert('Model should be only number(2014)');
        return false;
    }

    CreateCar();
}


function CreateCar() {
    if (checkLocalStorage()) {

       
        if (localStorage.carArray) {
            myObjectArray = JSON.parse(localStorage.carArray);
        }


        console.log(myObjectArray);
        let myCar = new Car(Number(localStorage.carId), man.value, model.value, release.value);

        if (indexInput.value == "") {
            if (localStorage.carId) {
                localStorage.carId = Number(localStorage.carId) + 1;
            } else {
                localStorage.carId = 1;
            }

            myObjectArray.push(myCar);
            localStorage.setItem("carArray", JSON.stringify(myObjectArray));
        } else {
            myCar = new Car(myObjectArray[Number(indexInput.value)].id, man.value, model.value, release.value);

            myObjectArray[Number(indexInput.value)] = myCar;
            localStorage.setItem("carArray", JSON.stringify(myObjectArray));
            myLocalDataElemets();
            button.innerText = "Add";
        }

    }

}


function myLocalDataElemets() {
    if (localStorage.carArray) {
        myObjectArray = JSON.parse(localStorage.carArray);
    }

    console.log(myObjectArray);
    for (var i = 0; i < myObjectArray.length; i++) {
        let newLiElement = document.createElement("li");
        let text = document.createTextNode(myObjectArray[i].id + ". " + myObjectArray[i].man + " " + myObjectArray[i].model + " " + myObjectArray[i].rel);
        newLiElement.classList.add("d-flex", "justify-content-between", "list-group-item");
        newLiElement.addEventListener("click", function () {
            var index = Array.prototype.indexOf.call(this.parentElement.children, this);
            button.innerText = "Update";
            updateCar(index, myObjectArray)
        });

        newLiElement.appendChild(text);


        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-trash-alt", "text-danger");
        deleteIcon.addEventListener("click", function () {
            // let index = this.parentElement.parentElement.indexOf(this.parentElement);
            var index = Array.prototype.indexOf.call(this.parentElement.parentElement.children, this.parentElement);
            myObjectArray.splice(index, 1);
            localStorage.setItem("carArray", JSON.stringify(myObjectArray));
            this.parentElement.remove();
        });
        newLiElement.appendChild(deleteIcon);
        ulElem.appendChild(newLiElement);
    }


}


function updateCar(index, array) {
    let carObject = array[index];
    man.value = carObject.man;
    model.value = carObject.model;
    release.value = carObject.rel;
    indexInput.value = index;
}

// check local storage
function checkLocalStorage() {
    if (typeof (Storage) != "undefined") {
        return true;
    }
    else {
        return false;
    }
}