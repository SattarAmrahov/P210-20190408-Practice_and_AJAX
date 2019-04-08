"use strict";

let mediaItems = document.querySelector(".media-items");

var http = new XMLHttpRequest();
http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let photosArray = JSON.parse(this.responseText);

        for (var i = 0; i < photosArray.length; i++) {
            let divElem = document.createElement("div");
            divElem.classList.add("media", "my-2");

            // create img
            let imgElem = document.createElement("img");
            imgElem.classList.add("mr-3");
            imgElem.setAttribute("src", photosArray[i].thumbnailUrl);

            // create inner div
            let innerDiv = document.createElement("div");
            innerDiv.classList.add("media-body");
            let text = document.createTextNode(photosArray[i].title);
            innerDiv.appendChild(text);

            divElem.appendChild(imgElem);
            divElem.appendChild(innerDiv);

            mediaItems.appendChild(divElem);
        }

    }
};

http.open("GET", "https://jsonplaceholder.typicode.com/photos", true);
http.send();




var http2 = new XMLHttpRequest();

http2.onreadystatechange = function () {
    console.log(this);
    if (this.readyState == 4 && this.status == 200) {
        let photosArray = JSON.parse(this.responseText);
    }
};

http2.open("GET", "https://jsonplaceholder.typicode.com/photos", true);
http2.send();
