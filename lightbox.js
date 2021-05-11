const lightbox = document.querySelector(".lightbox");
const lightboxContent = document.createElement("div");
lightboxContent.classList.add("lightbox__content");

//Close
const cross = document.createElement("a");
cross.classList.add("fas");
cross.classList.add("fa-times");
lightbox.appendChild(cross);

cross.addEventListener("click", function() {
    lightbox.style.display = "none";
});

//Right
const right = document.createElement("a");
right.classList.add("fas");
right.classList.add("fa-chevron-right");
lightbox.appendChild(right);

right.addEventListener("click", function() {
    slide(1);
});

//Left
const left = document.createElement("a");
left.classList.add("fas");
left.classList.add("fa-chevron-left");
lightbox.appendChild(left);

left.addEventListener("click", function() {
    slide(-1);
});

lightbox.appendChild(lightboxContainer);

function resetLightbox() {
    while (lightboxContent.firstChild) {
        lightboxContent.removeChild(lightboxContent.firstChild);
    }
}

function createLightbox (mediaCreated) {
    const sectionMedias = document.getElementById("medias");

    //article "medias-photographer"
    const newArticle = document.createElement("article");
                
    //link "__visual"
    if (mediaCreated.type == "createImage") {
        const img = document.createElement("img");
        img.alt = mediaCreated.image;     
        img.src = "Images/" + localStorage.getItem("Nom") + "/" + mediaCreated.image;             
        newArticle.appendChild(img);
    } else if (mediaCreated.type == "createVideo") {
        const video = document.createElement("video");
        video.src = "Images/" + localStorage.getItem("Nom") + "/" + mediaCreated.video; 
        video.setAttribute("controls", "controls");           
        newArticle.appendChild(video);
    }

    //static "__infos"
    const p = document.createElement("p");      
    p.textContent = mediaCreated.name;
    newArticle.appendChild(p);

    lightboxContent.appendChild(newArticle);
    lightbox.appendChild(lightboxContent);
    sectionMedias.appendChild(lightbox);
}

function showlightbox () {
    const link = document.querySelectorAll(".medias-photographer__visual");
    const article = document.querySelectorAll(".lightbox__content article");

    for (let i = 0; i < link.length; i++) {
        link[i].addEventListener("click", function() {
            article[i].classList.add("visualization");

            if ((article[i].className === "visualization") && (i === 0)) {
                left.classList.remove("fa-chevron-left");
            }

            if ((article[i].className === "visualization") && (i === link.length-1)) {
                right.classList.remove("fa-chevron-right");
            } 

            open();
        });
    }
}

function open() {
    lightbox.style.display = "block";
}

function slide(n) {
    const article = document.querySelectorAll(".lightbox__content article");

    for (let i = 0; i < article.length; i++) {
        if (article[i].className === "visualization") {
            article[i].classList.remove("visualization");
            let j = n + i;
            console.log(j);
            article[j].classList.add("visualization");
            if (j === 1) {
                left.classList.add("fa-chevron-left");
            }
            if (j === 0) {
                left.classList.remove("fa-chevron-left");
            }
            if (j === article.length-1) {
                right.classList.remove("fa-chevron-right");
            }
            if (j === article.length-2) {
                right.classList.add("fa-chevron-right");
            }
            break;
        }
    }
}

