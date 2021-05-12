//Data recovery
fetch("FishEyeDataFR.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let photographers = json["photographers"];
        initialize(photographers);
    })
    .catch(function(err) {
        console.log("Fetch problem: " + err.message);
    });


function initialize(photographers) {
    let tagContent;
    const section = document.querySelector("section");
    let tagsGroup = photographers;

    //If there is a "tag" in the memory then call search()
    if (localStorage.getItem("Tag") !== null) {
        let tag = localStorage.getItem("Tag");
        localStorage.clear();
        search(tag);
    }

    update();   

    function update() {
        //Remove children from "section"
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }

        //Create the protographer profile according to those to display
        for(let i = 0; i < tagsGroup.length; i++) {
            showPhotographer(tagsGroup[i]);
        }
        select();
    }

    //Create the photographer's profile
    function showPhotographer(photographer) {
        //Create article
        const article = document.createElement("article");
        article.classList.add("photographerIndex");
    
        //Create link "photographer-link" containing the portrait and the name
        const a1 = document.createElement("a");
        a1.classList.add("photographerIndex-link");
        const img = document.createElement("img");
        img.classList.add("portrait-index");
        img.alt = "Portrait de " + photographer.name;
        const h2 = document.createElement("h2");
        h2.classList.add("name");
        h2.classList.add("name-index");
    
        img.src = "Images/Photographers ID Photos/" + photographer.portrait;
        h2.textContent = photographer.name;
    
        a1.appendChild(img);
        a1.appendChild(h2);
        article.appendChild(a1);
    
        //Create div "photographer-infos" containing the city, the country, the tagline and the price
        const div = document.createElement("div");
        div.classList.add("photographerIndex-infos");
        const p1 = document.createElement("p");
        p1.classList.add("citycountry");
        const p2 = document.createElement("p");
        p2.classList.add("tagline-index");
        const p3 = document.createElement("p");
        p3.classList.add("price");
    
        p1.textContent = photographer.city + ", " + photographer.country;
        p2.textContent = photographer.tagline;
        p3.textContent = photographer.price + "€/jour";
    
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        article.appendChild(div);
    
        //Create nav "photographer-tags" containing tags
        const nav = document.createElement("nav");
        nav.classList.add("photographerIndex-tags");
        nav.setAttribute("aria-label", photographer.name + " navigation tags");
        const ul = document.createElement("ul");
        ul.classList.add("tags-container");
    
        let tags = photographer.tags;
        for (let i = 0; i < tags.length; i++) {
            let a2 = document.createElement("a");
            a2.classList.add("tags");
            a2.classList.add("tags-index");
            if (tags[i] === tagContent) {
                a2.classList.add("active");
            }
            let li = document.createElement("li");
            a2.textContent = "#" + tags[i];
            li.appendChild(a2);
            ul.appendChild(li);
        }
    
        nav.appendChild(ul);
        article.appendChild(nav);
    
        section.appendChild(article);

        //Redirection to the photographer's page
        a1.href ="page.html";
        a1.onclick = storage(photographer);
    }

    //Listen to clicks on tags and home
    function select() {
        const selectTag = document.querySelectorAll(".tags");

        for (let i = 0; i < selectTag.length; i++) {
            selectTag[i].addEventListener("click", function() {
                search(this.textContent);
            });
        }

        document.getElementById("home").onclick = function() {
            tagContent = "";
            tagsGroup = photographers;
            localStorage.clear();
            navTag();
            update();
        };
    }

    //Build a photographer table following the selected tag
    function search(tag) {
        tagContent = tag.substr(1);
        tagContent = tagContent.toLowerCase();
        tagsGroup = [];
        for (let i = 0; i < photographers.length; i++) {
            let tags = photographers[i].tags;
            tags.filter(function(tag){
                if (tag === tagContent) {
                    tagsGroup.push(photographers[i]);
                }
            });
        }
        navTag();
        update();
    }

    //Select the same tag selected on the navigation bar
    function navTag() {
        const navTags = document.querySelectorAll(".nav a");
        for (let i = 0; i < navTags.length; i++) {
            navTags[i].classList.remove("active");
            let navTag = navTags[i].textContent;
            navTag = navTag.substr(1);
            navTag = navTag.toLowerCase();
            if (navTag === tagContent) {
                navTags[i].classList.add("active");
            }
        }
    }

    //Stores the name of the selected photographer
    function storage() {
        const selectProfile = document.querySelectorAll(".photographerIndex-link");

        for (let i = 0; i < selectProfile.length; i++) {
            selectProfile[i].addEventListener("click", function() {
                localStorage.setItem("Nom", tagsGroup[i].name);
            });
        }
    }
}


