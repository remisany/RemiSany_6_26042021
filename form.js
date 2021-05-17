function launchForm() {

    //Name recovery
    const div = document.getElementById("form__header");
    const p = document.createElement("p");
    p.textContent = localStorage.getItem("Nom");
    const cross = document.querySelector(".close");
    div.insertBefore(p, cross);

    //Open form
    const contact = document.querySelector(".contact");
    const form = document.getElementById("form__container");
    contact.addEventListener("click", function () {
        form.style.display = "block";
        const input = document.getElementsByTagName("input");
        input[0].focus();
    });

    //Close form
    cross.addEventListener("click", function(){
        form.style.display = "none";
        const contact = document.getElementsByClassName("contact");
        contact[0].focus();
    });

    form.addEventListener("keydown", function(event){
        if(event.key === "Escape") {
            form.style.display = "none";
            const contact = document.getElementsByClassName("contact");
            contact[0].focus();
        }
    });

    //Submit
    const submit = document.querySelector("#form__submit");

    submit.addEventListener("click", function(event) {
        event.preventDefault();
        form.style.display = "none";

        const label = document.getElementsByTagName("label");
        const response = document.getElementsByClassName("response");

        for (let i = 0; i<response.length; i++) {
            console.log(label[i].textContent + " : " + response[i].value);
            response[i].value = "";
        }

        const contact = document.getElementsByClassName("contact");
        contact[0].focus();
    });
}


