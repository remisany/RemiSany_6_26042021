const link = document.querySelectorAll(".medias-photographer__infos__likes");

for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function() {
        this.firstChild.textContent = parseInt(this.firstChild.textContent) + 1;
    });
}