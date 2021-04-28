fetch("FishEyeDataFR.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let photographers = json['photographers'];
        initialize(photographers);
    })
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });


function initialize(photographers) {
    const section = document.querySelector('section');

    let tagsGroup = photographers;

    update();

    function update() {
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }

        for(let i = 0; i < tagsGroup.length; i++) {
            showPhotographer(tagsGroup[i]);
        }
    }

    function showPhotographer(photographer) {
        //article
        const article = document.createElement('article');
        article.setAttribute("class", "photographer");
    
        //photographer-link
        const a1 = document.createElement('a');
        a1.setAttribute("class", "photographer-link");
        const img = document.createElement('img');
        img.setAttribute("class", "portrait");
        const h2 = document.createElement('h2');
        h2.setAttribute("class", "name");
    
        img.src = "Images/Photographers ID Photos/" + photographer.portrait;
        h2.textContent = photographer.name;
    
        a1.appendChild(img);
        a1.appendChild(h2);
        article.appendChild(a1);
    
        //photographer-infos
        const div = document.createElement('div');
        div.setAttribute("class", "photographer-infos");
        const p1 = document.createElement('p');
        p1.setAttribute("class", "citycountry");
        const p2 = document.createElement('p');
        p2.setAttribute("class", "tagline");
        const p3 = document.createElement('p');
        p3.setAttribute("class", "price");
    
        p1.textContent = photographer.city + ", " + photographer.country;
        p2.textContent = photographer.tagline;
        p3.textContent = photographer.price + "€/jour";
    
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        article.appendChild(div);
    
        //photographer-tags
        const nav = document.createElement('nav');
        nav.setAttribute("class", "photographer-tags");
        const ul = document.createElement('ul');
        ul.setAttribute("class", "tags-container");
    
        let tags = photographer.tags;
        for (let i = 0; i < tags.length; i++) {
            let a2 = document.createElement('a');
            a2.setAttribute("class", "tags");
            let li = document.createElement('li');
            a2.textContent = "#" + tags[i];
            li.appendChild(a2);
            ul.appendChild(li);
        }
    
        nav.appendChild(ul);
        article.appendChild(nav);
    
        section.appendChild(article);
    }

    const selectTag = document.getElementsByClassName("tags");
    console.log(selectTag);

    let tagsearch;

    document.getElementById("portrait").onclick = function() {
        tagsearch = "portrait";
        search();
    }

    document.getElementById("art").onclick = function() {
        tagsearch = "art";
        search();
    }

    document.getElementById("fashion").onclick = function() {
        tagsearch = "fashion";
        search();
    }

    document.getElementById("architecture").onclick = function() {
        tagsearch = "architecture";
        search();
    }

    document.getElementById("travel").onclick = function() {
        tagsearch = "travel";
        search();
    }

    document.getElementById("sport").onclick = function() {
        tagsearch = "sport";
        search();
    }

    document.getElementById("animals").onclick = function() {
        tagsearch = "animals";
        search();
    }

    document.getElementById("events").onclick = function() {
        tagsearch = "events";
        search();
    }

    document.getElementById("home").onclick = function() {
        tagsGroup = photographers;
        update();
    }

    function search () {
        tagsGroup = [];
        for (let i = 0; i < photographers.length; i++) {
            let tags = photographers[i].tags;
            let tagsfilters = tags.filter(function(tag){
                if (tag === tagsearch) {
                    tagsGroup.push(photographers[i]);
                }
            });
        }
        update();
    }

    tagsGroup = photographers;
    update();
}