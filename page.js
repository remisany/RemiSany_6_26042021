fetch("FishEyeDataFR.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let photographers = json["photographers"];
        let medias = json["media"];
        photographerProfile(photographers);
        photographerMedia(medias);
    })
    .catch(function(err) {
        console.log("Fetch problem: " + err.message);
    });


function photographerProfile(photographers) {
    let storage = localStorage.getItem("Nom");
    const sectionProfile = document.getElementById("profile");
    
    update();   
    
    function update() {
        for(let i = 0; i < photographers.length; i++) {
            if (photographers[i].name === storage) {
                showPhotographer(photographers[i]);
                localStorage.setItem("Id", determineId(photographers[i]));
            }
        }
    }
    
    function showPhotographer(photographer) {
        //article
        const article = document.createElement("article");
        article.classList.add("profile-photographer");
        
        //photographerPage-infos
        const div1 = document.createElement("div");
        div1.classList.add("profile-photographer__infos");
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
        nav.classList.add("profile-photographer__tags");
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
        div2.classList.add("profile-photographer__infos-tags");
    
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

    function determineId(photographer) {
        const id = photographer.id;
        return id;
    }
}

function photographerMedia(medias) {

    createAllMedia(medias);

    function createAllMedia (medias) {
        class mediaFactory {
            constructor () {
                this.createMedia = function(medias) {
                    
                    let media;

                    if (medias.image) {
                        media = new createImage(medias);
                    } else if (medias.video) {
                        media = new createVideo(medias);
                    }
                    
                    return media;
                };
            }
        }

        class createImage {
            constructor(medias) {
                this.name = "createImage";
                this.image = medias.image;
                this.tags = medias.tags.toString();
                this.likes = medias.likes;
                this.date = medias.date;
            }
        }

        class createVideo {
            constructor(medias) {
                this.name = "createVideo";
                this.video = medias.video;
                this.tags = medias.tags.toString();
                this.likes = medias.likes;
                this.date = medias.date;
            }
        }

        let mediasCreated = [];
        const id = localStorage.getItem("Id");

        for (let i = 0; i < medias.length; i++) {
            if (medias[i].photographerId == id) {
                let factory = new mediaFactory();
                let media = factory.createMedia(medias[i]);
                mediasCreated.push(media);
            }
        }

        for (let i = 0; i < mediasCreated.length; i++) {
            showMedias(mediasCreated[i]);
        }
    }

    function showMedias(mediaCreated) {
        const sectionMedias = document.getElementById("medias");

        //article "medias-photographer"
        const article = document.createElement("article");
        article.classList.add("medias-photographer");
            
        //link "__visual"
        const a1 = document.createElement("a");
        a1.classList.add("medias-photographer__visual");

        if (mediaCreated.name == "createImage") {
            const img = document.createElement("img");
            img.classList.add("medias-photographer__visual__img");
            img.alt = mediaCreated.image;
            
            img.src = "Images/" + localStorage.getItem("Nom") + "/" + mediaCreated.image;
                    
            article.appendChild(img);
        } else if (mediaCreated.name == "createVideo") {
            const video = document.createElement("video");
            video.classList.add("medias-photographer__visual__video");

            video.src = "Images/" + localStorage.getItem("Nom") + "/" + mediaCreated.video;
                    
            article.appendChild(video);
        }

        article.appendChild(a1);

        //static "__infos"
        const div1 = document.createElement("div");
        div1.classList.add("medias-photographer__infos");
        const p1 = document.createElement("p");

        let tag = mediaCreated.tags;
        let pContent;

        if (mediaCreated.name == "createImage") {
            pContent = mediaCreated.image;
        } else if (mediaCreated.name == "createVideo") {
            pContent = mediaCreated.video;
        }

        pContent = pContent.substring(tag.length+1);
        pContent = pContent.substring(0, pContent.length-4);
        pContent = pContent.replace(/_/g, " ");
        p1.textContent = pContent;
        
        div1.appendChild(p1);

        article.appendChild(div1);

        //static "__infos__likes"
        const a2 = document.createElement("a");
        a2.classList.add("medias-photographer__infos__likes");

        const p2 = document.createElement("p");
        p2.textContent = mediaCreated.likes;
        a2.appendChild(p2);

        //heart icon
        const span = document.createElement("span");
        span.classList.add("fas");
        span.classList.add("fa-heart");
        a2.appendChild(span);

        div1.appendChild(a2);
        
        article.appendChild(div1);

        sectionMedias.appendChild(article);
    }

    increment ();

    function increment() {
        const link = document.querySelectorAll(".medias-photographer__infos__likes");

        for (let i = 0; i < link.length; i++) {
            link[i].addEventListener("click", function() {
                console.log("ok");
                this.firstChild.textContent = parseInt(this.firstChild.textContent) + 1;
            });
        }
    }
}