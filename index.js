var section = document.querySelector('section');

//URL fichier JSON
var requestURL = 'FishEyeDataFR.json';

//Créer requête
var request = new XMLHttpRequest();

//Ouvrir requête
request.open('GET', requestURL);

//Type requête + envoi
request.responseType = 'json';
request.send();

//Réponse requête
request.onload = function() {
    var photographersdata = request.response;
    photographersprofile(photographersdata);
}

function photographersprofile(jsonObj) {
    var photographers = jsonObj['photographers'];

    for (var i = 0; i < photographers.length; i++) {
        //article
        var article = document.createElement('article');
        article.setAttribute("class", "photographer");

        //photographer-link
        var a1 = document.createElement('a');
        a1.setAttribute("class", "photographer-link");
        var img = document.createElement('img');
        img.setAttribute("class", "portrait");
        var h2 = document.createElement('h2');
        h2.setAttribute("class", "name");

        img.src = "Images/Photographers ID Photos/" + photographers[i].portrait;
        h2.textContent = photographers[i].name;

        a1.appendChild(img);
        a1.appendChild(h2);
        article.appendChild(a1);

        //photographer-infos
        var div = document.createElement('div');
        div.setAttribute("class", "photographer-infos");
        var p1 = document.createElement('p');
        p1.setAttribute("class", "citycountry");
        var p2 = document.createElement('p');
        p2.setAttribute("class", "tagline");
        var p3 = document.createElement('p');
        p3.setAttribute("class", "price");

        p1.textContent = photographers[i].city + ", " + photographers[i].country;
        p2.textContent = photographers[i].tagline;
        p3.textContent = photographers[i].price + "€/jour";

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        article.appendChild(div);

        //photographer-tags
        var nav = document.createElement('nav');
        nav.setAttribute("class", "photographer-tags");
        var ul = document.createElement('ul');
        ul.setAttribute("class", "tags-container");

        var tags = photographers[i].tags;
        for (var j = 0; j < tags.length; j++) {
            var a2 = document.createElement('a');
            a2.setAttribute("class", "tags");
            var li = document.createElement('li');
            a2.textContent = "#" + tags[j];
            li.appendChild(a2);
            ul.appendChild(li);
        }

        nav.appendChild(ul);
        article.appendChild(nav);

        section.appendChild(article);
    }
}