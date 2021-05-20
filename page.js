//Data recovery
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
    
    //Remove children from "section"
    function update() {
        for(let i = 0; i < photographers.length; i++) {
            if (photographers[i].name === storage) {
                showPhotographer(photographers[i]);
                localStorage.setItem("Id", determineId(photographers[i]));
            }
        }
    }
    
    //Create the photographer's profile
    function showPhotographer(photographer) {
        //Create article "profile-photographer"
        const article = document.createElement("article");
        article.classList.add("profile-photographer");
        
        //Create div "profile-photographer__infos" containing name, city, country and tagline
        const div1 = document.createElement("div");
        div1.classList.add("profile-photographer__infos");
        const h1 = document.createElement("h1");
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
        
        //Create nav "profile-photographer__tags" containing tags
        const nav = document.createElement("nav");
        nav.classList.add("profile-photographer__tags");
        const ul = document.createElement("ul");
        ul.classList.add("tags-container");
        
        let tags = photographer.tags;
        for (let i = 0; i < tags.length; i++) {
            let a2 = document.createElement("a");
            a2.classList.add("tags");
            a2.classList.add("tags-page");
            a2.href = "#";
            let li = document.createElement("li");
            a2.textContent = "#" + tags[i];
            li.appendChild(a2);
            ul.appendChild(li);
        }
        
        nav.appendChild(ul);
    
        //Create div "profile-photographer__infos-tags" containing previous div and nav
        const div2 = document.createElement("div");
        div2.classList.add("profile-photographer__infos-tags");
    
        div2.appendChild(div1);
        div2.appendChild(nav);
        article.appendChild(div2);
    
        //Create button "Contacter-moi"
        const a3 = document.createElement("button");
        a3.classList.add("button");
        a3.classList.add("contact");
        a3.textContent = "Contactez-moi";
            
        article.appendChild(a3);
    
        //Create photographer portrait
        const img = document.createElement("img");
        img.classList.add("portrait-page");
        img.alt = "Portrait de " + photographer.name;
                
        img.src = "Images/Photographers ID Photos/" + photographer.portrait;
                
        article.appendChild(img);
        
        sectionProfile.appendChild(article);

        //Create price (at the end of the page)
        const sectionLikesPrice = document.getElementById("likesPrice");  
        
        const p3 = document.createElement("p");
        p3.id = "likesPrice__price";
        p3.textContent = photographer.price + "€ / jour";
        sectionLikesPrice.appendChild(p3);
    }

    //Get the photographer's id
    function determineId(photographer) {
        const id = photographer.id;
        return id;
    }

    launchForm();

    const tagsPage = document.querySelectorAll(".tags-page");
    
    //Listen to clicks on tags and redirects to index.html with tag in memory
    for (let i = 0; i < tagsPage.length; i++) {
        tagsPage[i].addEventListener("click", function() {
            localStorage.setItem("Tag", tagsPage[i].textContent);
            document.location.href="index.html";
        });
    }
}

//Flag initialized to 0 allows you to create the objects and display them
let flag = 0;
let mediasCreated = [];
const sectionMedias = document.getElementById("medias");
 
function photographerMedia(medias) {
    //Frist pass flag === 0;
    if (flag === 0) {
        createAllMedia(medias);
        likesPrice();
    } else {
        filter(mediasCreated);
    }

    //Create the objects
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

        //Image object
        class createImage {
            constructor(medias) {
                this.type = "createImage";

                this.name = medias.image.substring(medias.tags.toString().length+1);
                this.name = this.name.substring(0, this.name.length-4);
                this.name = this.name.replace(/_/g, " ");

                this.image = medias.image;
                this.tags = medias.tags.toString();
                this.likes = medias.likes;
                this.date = medias.date;
            }
        }

        //Video object
        class createVideo {
            constructor(medias) {
                this.type = "createVideo";

                this.name = medias.video.substring(medias.tags.toString().length+1);
                this.name = this.name.substring(0, this.name.length-4);
                this.name = this.name.replace(/_/g, " ");

                this.video = medias.video;
                this.tags = medias.tags.toString();
                this.likes = medias.likes;
                this.date = medias.date;
            }
        }

        //Id storage
        const id = localStorage.getItem("Id");

        //Creation of the table with the created objects
        for (let i = 0; i < medias.length; i++) {
            if (medias[i].photographerId == id) {
                let factory = new mediaFactory();
                let media = factory.createMedia(medias[i]);
                mediasCreated.push(media);
            }
        }

        //Flag = 1;
        flag = 1;
        filter(mediasCreated);
    }

    //Collect the filter
    function filter(mediasCreated){
        const filter = localStorage.getItem("Filtre");

        if (filter === "Popularité") {
            mediasCreated.sort(function(a, b) {
                return b.likes - a.likes;
            });
        } else if (filter === "Date") {
            mediasCreated.sort(function(a, b) {
                return a.date.replace(/-/g, "") - b.date.replace(/-/g, "");
            });
        } else if (filter === "Titre") {
            mediasCreated.sort(function (a, b) {
                a = a.name.toLowerCase().replace(" ", "");
                b = b.name.toLowerCase().replace(" ", "");
                return a.localeCompare(b);
            });
        }

        //Display reset
        while (sectionMedias.firstChild) {
            sectionMedias.removeChild(sectionMedias.firstChild);
        }

        //Lightbox reset
        resetLightbox();

        for (let i = 0; i < mediasCreated.length; i++) {
            showMedias(mediasCreated[i]);
            createLightbox(mediasCreated[i]);
        }
    }

    //Display the photographs according to the filter
    function showMedias(mediaCreated) {
        ////Create article containing the photo, the title and number of likes
        const article = document.createElement("article");
        article.classList.add("medias-photographer");
            
        //Create link "medias-photographer__visual" containing the photo (redirect to lightbox)
        const a1 = document.createElement("a");
        a1.classList.add("medias-photographer__visual");
        a1.href = "#";

        //If the object is image or video
        if (mediaCreated.type == "createImage") {
            const img = document.createElement("img");
            img.classList.add("medias-photographer__visual__img");
            img.alt = "Photo intitulé : " + mediaCreated.name;
            
            img.src = "Images/" + localStorage.getItem("Nom") + "/" + mediaCreated.image;
                    
            a1.appendChild(img);
        } else if (mediaCreated.type == "createVideo") {
            const video = document.createElement("video");
            video.classList.add("medias-photographer__visual__video");
            video.title = "Video intitulé : " + mediaCreated.name;
            video.src = "Images/" + localStorage.getItem("Nom") + "/" + mediaCreated.video;
                    
            a1.appendChild(video);
        }

        article.appendChild(a1);

        //Create p "medias-photographer__infos" width the title
        const div1 = document.createElement("div");
        div1.classList.add("medias-photographer__infos");
        const p1 = document.createElement("p");
        
        p1.textContent = mediaCreated.name;

        div1.appendChild(p1);

        article.appendChild(div1);

        //Create link containing likes
        const a2 = document.createElement("a");
        a2.classList.add("medias-photographer__infos__likes");
        article.id = mediaCreated.name;
        a2.href = "#" + mediaCreated.name;

        const p2 = document.createElement("p");
        p2.textContent = mediaCreated.likes;
        a2.appendChild(p2);

        //Heart icon
        const span = document.createElement("span");
        span.classList.add("fas");
        span.classList.add("fa-heart");
        a2.appendChild(span);

        div1.appendChild(a2);
        
        article.appendChild(div1);

        sectionMedias.appendChild(article);
    }

    likes();

    //Like counter
    function likes() {
        const link = document.querySelectorAll(".medias-photographer__infos__likes");
    
        for (let i = 0; i < link.length; i++) {
            link[i].addEventListener("click", function() {
                this.firstChild.textContent = parseInt(this.firstChild.textContent) + 1;

                let sumLikes = document.getElementById("likesPrice__sum");
                sumLikes.textContent = parseInt(sumLikes.textContent) + 1;
            });
        }
    }

    //Create like (at the end of the page)
    function likesPrice() {
        const sectionLikesPrice = document.getElementById("likesPrice");
        const p3 = document.getElementById("likesPrice__price");

        //Likes sum
        const p1 = document.createElement("p");
        p1.id = "likesPrice__sum";

        const likes = document.querySelectorAll(".medias-photographer__infos__likes");
        let sumLikes = 0;
        for (let i = 0; i < likes.length; i++) {
            sumLikes = sumLikes + parseInt(likes[i].firstChild.textContent);
        }

        p1.textContent = sumLikes;

        sectionLikesPrice.insertBefore(p1, p3);

        //Heart icon
        const span = document.createElement("span");
        span.classList.add("fas");
        span.classList.add("fa-heart");
        sectionLikesPrice.insertBefore(span, p3);
    }

    showlightbox();
}