const selectContainer = document.getElementById("select-container");
const selectItems = ["Popularité", "Date", "Titre"];

//Elément selectionné
const div1 = document.createElement("div");
div1.classList.add("select-selected");
div1.textContent = selectItems[0];
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
    }

    item.addEventListener("click", function() {
        for (let i = 0; i < selectItems.length; i++) {
            div1.textContent = this.textContent;

            //Si ".select-active" existe, l'enlever
            const itemSelected = document.querySelectorAll(".select-items div");
            for (let i = 0; i < itemSelected.length; i++) {
                if (itemSelected[i].className === "select-active") {
                    itemSelected[i].classList.remove("select-active");
                }
            }

            //Ajout de .selected à l'élément actuellement sélectionné
            this.classList.add("select-active");
        }
    });
    
    div2.appendChild(item);
}

selectContainer.appendChild(div2);

div1.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);

    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
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
        }
    }

    const selectItems = document.getElementsByClassName("select-items");

    for (let i = 0; i < selectItems.length; i++) {
        //Si click sur élément déjà selectionné
        if (index0.indexOf(i)) {
            selectItems[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);