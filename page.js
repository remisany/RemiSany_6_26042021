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
    let storage = localStorage.getItem("Nom");
    const sectionProfile = document.getElementById("profile");
    let tagsGroup = photographers;

    update();   

    function update() {
        for(let i = 0; i < tagsGroup.length; i++) {
            if (tagsGroup[i].name === storage) {
                showPhotographer(tagsGroup[i]);
            }
        }
    }

    function showPhotographer(photographer) {
        //article
        const article = document.createElement("article");
        article.classList.add("photographerPage");
    
        //photographerPage-infos
        const div1 = document.createElement("div");
        div1.classList.add("photographerPage-infos");
        const h1 = document.createElement("h2");
        h1.classList.add("name");
        h1.classList.add("name-page");
        const p1 = document.createElement("p");
        p1.classList.add("citycountry");
        p1.classList.add("citycountry-page");
        const p2 = document.createElement("p");
        p2.classList.add("tagline-page");
    
        h1.textContent = photographer.name;
        p1.textContent = photographer.city + ", " + photographer.country;
        p2.textContent = photographer.tagline;
    
        div1.appendChild(h1);
        div1.appendChild(p1);
        div1.appendChild(p2);
    
        //photographerPage-tags
        const nav = document.createElement("nav");
        nav.classList.add("photographerPage-tags");
        const ul = document.createElement("ul");
        ul.classList.add("tags-container");
    
        let tags = photographer.tags;
        for (let i = 0; i < tags.length; i++) {
            let a2 = document.createElement("a");
            a2.classList.add("tags");
            a2.classList.add("tags-page");
            let li = document.createElement("li");
            a2.textContent = "#" + tags[i];
            li.appendChild(a2);
            ul.appendChild(li);
        }
    
        nav.appendChild(ul);

        //div contenant photographerPage-infos et photographerPage-tags
        const div2 = document.createElement("div");
        div2.classList.add("photographerPage-infos-tags");

        div2.appendChild(div1);
        div2.appendChild(nav);
        article.appendChild(div2);

        //button "Contacter-moi"
        const a3 = document.createElement("button");
        a3.classList.add("contact");
        a3.textContent = "Contactez-moi";
        
        article.appendChild(a3);

        //photographerPage-img
        const img = document.createElement("img");
        img.classList.add("portrait-page");
        img.alt = "Portrait de " + photographer.name;
            
        img.src = "Images/Photographers ID Photos/" + photographer.portrait;
            
        article.appendChild(img);
    
        sectionProfile.appendChild(article);
    }
}