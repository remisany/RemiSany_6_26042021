//Import function page.js
import {photographerMedia} from "./page.js";

//Creation of the box containing the three filters
const selectContainer = document.getElementById("select-container");
//Creation of an array containing the filters
const selectItems = ["Popularité", "Date", "Titre"];

//Create div "Selected element"
const div1 = document.createElement("a");
div1.href = "#filter";
div1.classList.add("select-selected");

//Create span with the first element of the table
const span1 = document.createElement("span");
span1.textContent = selectItems[0];
div1.appendChild(span1);

//Create span with the down arrow (open)
const span2 = document.createElement("span");
span2.classList.add("fas");
span2.classList.add("fa-chevron-down");
div1.appendChild(span2);

selectContainer.appendChild(div1);

//Create div with .select-items and .select-hide
const div2 = document.createElement("div");
div2.classList.add("select-items");
div2.classList.add("select-hide");

for (let i = 0; i < selectItems.length; i++) {
    const item = document.createElement("a");
    item.href = "#filter";
    item.textContent = selectItems[i];
    
    //First pass erase "popularity"
    if (item.textContent == selectItems[0]) {
        item.classList.add("select-active");
        localStorage.setItem("Filtre", item.textContent);
    }

    //First pass adding .border
    if (item.textContent == selectItems[1]) {
        item.classList.add("border");
    }

    //First pass adding .radius
    if (item.textContent == selectItems[2]) {
        item.classList.add("radius");
    }

    //Listen to clicks when choosing the filter
    item.addEventListener("click", function() {
        for (let i = 0; i < selectItems.length; i++) {
            span1.textContent = this.textContent;

            //If .select-active exists, remove it
            const itemSelected = document.querySelectorAll(".select-items a");
            for (let i = 0; i < itemSelected.length; i++) {
                if (itemSelected[i].className === "select-active") {
                    itemSelected[i].classList.remove("select-active");
                }
                if (itemSelected[i].className === "border") {
                    itemSelected[i].classList.remove("border");
                }
                if (itemSelected[i].className === "radius") {
                    itemSelected[i].classList.remove("radius");
                }
            }

            //Adding .selected to the currently selected item
            this.classList.add("select-active");
            localStorage.setItem("Filtre", this.textContent);

            //Addind .border and .radius depending on the configuration
            const divItem = document.querySelectorAll(".select-items a");
            if (this.textContent === "Popularité") {
                divItem[1].classList.add("border");
                divItem[2].classList.add("radius");
            }
            if (this.textContent === "Date") {
                divItem[0].classList.add("border");
                divItem[2].classList.add("radius");
            }
            if (this.textContent === "Titre") {
                divItem[0].classList.add("border");
                divItem[1].classList.add("radius");
            }
        }
        closeAllSelect(this);
    });
    
    div2.appendChild(item);
}

selectContainer.appendChild(div2);

//Listen clicks when opening the filter box
div1.addEventListener("click", function(e) {
    e.stopPropagation();

    closeAllSelect(this);
    
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    span2.classList.toggle("fa-chevron-down");
    span2.classList.toggle("fa-chevron-up");

});

//Close the filter box
function closeAllSelect(item) {
    let index0 = [];

    const selectSelected = document.getElementsByClassName("select-selected");

    for (let i = 0; i < selectSelected.length; i++) {
        //If click on element already selected
        if (item == selectSelected[i]) {
            index0.push(i);
        } else {
            selectSelected[i].classList.remove("select-arrow-active");
            span2.classList.remove("fa-chevron-up");
            span2.classList.add("fa-chevron-down");
            //Calls the function to sort according to the selected filter
            photographerMedia();
        }
    }

    const selectItems = document.getElementsByClassName("select-items");

    for (let i = 0; i < selectItems.length; i++) {
        //If click on element already selected
        if (index0.indexOf(i)) {
            selectItems[i].classList.add("select-hide");
            //Calls the function to sort according to the selected filter
            photographerMedia();
        }
    }
}