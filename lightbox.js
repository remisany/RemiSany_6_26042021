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

document.addEventListener("keydown", function(event){
    if(event.key === "Escape") {
        lightbox.style.display = "none";
        link[visual].focus();
    }
});

//Create right arrow 
const right = document.createElement("a");
right.classList.add("fas");
right.classList.add("fa-chevron-right");
lightbox.appendChild(right);

//Create left arrow
const left = document.createElement("a");
left.classList.add("fas");
left.classList.add("fa-chevron-left");
lightbox.appendChild(left);

//Reset Lightbox
function resetLightbox() {
    while (lightboxContent.firstChild) {
        lightboxContent.removeChild(lightboxContent.firstChild);
    }
}

function createLightbox (mediaCreated) {
    const sectionMedias = document.getElementById("medias");

    //Create article containing photo or video and title
    const newArticle = document.createElement("article");
                
    //Add image or video
    if (mediaCreated.type == "createImage") {
        const img = document.createElement("img");
        img.alt = mediaCreated.name;     
        img.src = "Images/" + localStorage.getItem("Nom") + "/" + mediaCreated.image;             
        newArticle.appendChild(img);
    } else if (mediaCreated.type == "createVideo") {
        const video = document.createElement("video");
        video.title = mediaCreated.name;
        video.src = "Images/" + localStorage.getItem("Nom") + "/" + mediaCreated.video; 
        video.setAttribute("controls", "controls");           
        newArticle.appendChild(video);
    }

    //Add title
    const p = document.createElement("p");      
    p.textContent = mediaCreated.name;
    newArticle.appendChild(p);

    lightboxContent.appendChild(newArticle);
    lightbox.appendChild(lightboxContent);
    sectionMedias.appendChild(lightbox);
}

let visual;
let link;

//Show the selected image in the lightbox
//Add class "vizualisation" which displays the selected image
function showlightbox () {
    link = document.querySelectorAll(".medias-photographer__visual");
    const article = document.querySelectorAll(".lightbox__content article");

    for (let i = 0; i < link.length; i++) {
        link[i].addEventListener("click", function() {

            visual = i;
            console.log(i);

            for (let i = 0; i < article.length; i++) {
                if (article[i].className === "visualization") {
                    article[i].classList.remove("visualization");
                }
            }
            article[i].classList.add("visualization");

            //If image is the first
            if ((article[i].className === "visualization") && (i === 0)) {
                left.classList.remove("fa-chevron-left");
            } else {
                left.classList.add("fa-chevron-left");
            }

            //If image is the last
            if ((article[i].className === "visualization") && (i === link.length-1)) {
                right.classList.remove("fa-chevron-right");
            } else {
                right.classList.add("fa-chevron-right");
            }

            open();
        });
    }
}

//Open lightbox
function open() {
    lightbox.style.display = "block";
    lightbox.focus();
}

//Arrow navigation
left.addEventListener("click", function() {
    slide(-1);
});

right.addEventListener("click", function() {
    slide(1);
});

document.addEventListener("keydown", function(event){
    if((event.key === "ArrowLeft") && (visual !== 0)) {
        slide(-1);
        visual--;
    }

    if((event.key === "ArrowRight") && (visual !== link.length-1)) {
        slide(1);
        visual++;
    }
});

//Create arrow to slide in the lightbox
//Remove or add class "vizualisation"
function slide(n) {
    const article = document.querySelectorAll(".lightbox__content article");

    for (let i = 0; i < article.length; i++) {
        if (article[i].className === "visualization") {
            article[i].classList.remove("visualization");
            let j = n + i;
            article[j].classList.add("visualization");
            //If image is the second
            if (j === 1) {
                left.classList.add("fa-chevron-left");
            }
            //If image is the first
            if (j === 0) {
                left.classList.remove("fa-chevron-left");
            }
            //If image is the last
            if (j === article.length-1) {
                right.classList.remove("fa-chevron-right");
            }
            //If image is the penultimate
            if (j === article.length-2) {
                right.classList.add("fa-chevron-right");
            }
            break;
        }
    }
}

