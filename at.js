var httpRequest = function() {
    if(window.XMLHttpRequest) return new XMLHttpRequest();

    if(window.ActiveXObject) {
        try      { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(e) { return new ActiveXObject("Microsoft.XMLHTTP"); }
    }
}

var req = new httpRequest();

req.onreadystatechange = function() {
    if(req.readyState === 4 && req.status === 200) {
        var track = JSON.parse(req.responseText);

        var title   = document.createElement("span"),
            artist  = document.createElement("span"),
            divider = document.createElement("span");

        title.innerHTML   = track.name;
        artist.innerHTML  = "&#x266B;" + track.artist;
        divider.innerHTML = "&dash;";

        var container = document.getElementById("last-fm");
            container.appendChild(artist);
            container.appendChild(divider);
            container.appendChild(title);
            container.style.display = 'block';
    }
}

req.open('GET', 'http://at.cantl.in/last.php');
req.send();