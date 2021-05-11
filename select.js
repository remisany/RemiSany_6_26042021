const selectContainer = document.getElementById("select-container");
const selectItems = ["Popularité", "Date", "Titre"];

//Elément selectionné
const div1 = document.createElement("div");
div1.classList.add("select-selected");

const span1 = document.createElement("span");
span1.textContent = selectItems[0];
div1.appendChild(span1);

const span2 = document.createElement("span");
span2.classList.add("fas");
span2.classList.add("fa-chevron-down");
div1.appendChild(span2);

selectContainer.appendChild(div1);

//Ajout de la div2 avec .select-items et .select-hide
const div2 = document.createElement("div");
div2.classList.add("select-items");
div2.classList.add("select-hide");

for (let i = 0; i < selectItems.length; i++) {
    const item = document.createElement("div");
    item.textContent = selectItems[i];
    
    //Premier passage effacer "popularité"
    if (item.textContent == selectItems[0]) {
        item.classList.add("select-active");
        localStorage.setItem("Filtre", item.textContent);
    }

    //Premier passage ajout .border
    if (item.textContent == selectItems[1]) {
        item.classList.add("border");
    }

    //Premier passage ajout .radius
    if (item.textContent == selectItems[2]) {
        item.classList.add("radius");
    }

    item.addEventListener("click", function() {
        for (let i = 0; i < selectItems.length; i++) {
            span1.textContent = this.textContent;

            //Si ".select-active" existe, l'enlever
            const itemSelected = document.querySelectorAll(".select-items div");
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

            //Ajout de .selected à l'élément actuellement sélectionné
            this.classList.add("select-active");
            localStorage.setItem("Filtre", this.textContent);

            //Ajout de .border
            const divItem = document.querySelectorAll(".select-items div");
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

div1.addEventListener("click", function(e) {
    e.stopPropagation();

    closeAllSelect(this);
    
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    span2.classList.toggle("fa-chevron-down");
    span2.classList.toggle("fa-chevron-up");

});


function closeAllSelect(item) {
    let index0 = [];

    const selectSelected = document.getElementsByClassName("select-selected");

    for (let i = 0; i < selectSelected.length; i++) {
        //Si click sur élément déjà selectionné
        if (item == selectSelected[i]) {
            index0.push(i);
        } else {
            selectSelected[i].classList.remove("select-arrow-active");
            span2.classList.remove("fa-chevron-up");
            span2.classList.add("fa-chevron-down");
            photographerMedia();
        }
    }

    const selectItems = document.getElementsByClassName("select-items");

    for (let i = 0; i < selectItems.length; i++) {
        //Si click sur élément déjà selectionné
        if (index0.indexOf(i)) {
            selectItems[i].classList.add("select-hide");
            photographerMedia();
        }
    }
}