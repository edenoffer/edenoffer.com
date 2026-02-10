var main = {

params: {
        colorMin: "#8e8e8e",
        colorMax: "#ffffff",
        colorBgr: "#ffffff",
        interval: 50,
        fontSize: 21,
        fontShift: 4,
        opaque: 0.3
},

init: function() {
    this.setupBlocks();
    this.setupButtons(this.params);
    
    this.makeCloud();
    
    setInterval(function() {
        var t = 1000;
    }, 1000);
    
    setTimeout("main.statistics();", 3000);
}, // init

makeCloud: function() {
    var clouder = document.getElementById("clouder");

    var attrs = {
        container: clouder,
        tags: this.createTags()
    };
    
    for (var i in this.params) {
        attrs[i] = this.params[i];
    } // for
    
    if (this.clouder) {
        this.clouder.kill();
    } // if
    
    this.clouder = new Clouder(attrs);
    
}, // makeCloud

createTags: function() {
    return [
            {text: "UX<br/>UI", id: " you could say I am 9/10 in that ", weight: 0.5},
            {text: "Data<br/>Analysis", id: "you could say I am 6/10 in that", weight: 0.5},
            {text: "HTML<br/>", id: "you could say I am 8/10 in that", weight: 0.5},
            {text: "CSS<br/>", id: "you could say I am 8/10 in that", weight: 1},
            {text: "Java<br/>Script", id: "you could say I am 6/10 in that", weight: 1},
            {text: "Python<br/>", id: "you could say I am 6/10 in that", weight: 0.5},
            {text: "C++", id: "you could say I am 7/10 in that", weight: 1},
            {text: "Web analytics", id: "you could say I am 8/10 in that", weight: 0},
            {text: "statistics", id: " you could say I am 7/10 in that ", weight: 0},
            {text: "Qualitative and<br/> quantitative <br/>research", id: "you could say I am  8/10 in that", weight: 0.5},
            {text: "Product Management", id: "you could say I am 8/10", weight: 0.5},
            {text: "Product design", id: "you could say I am 7/10 in that", weight: 0},
            {text: "Machine learning", id: "you could say I am 6/10 in that", weight: 0.5},
            {text: "Entrepreneurship", id: "you could say I am 9/10 in that", weight: 0.5},
            {text: "Product strategy", id: "you could say I am 9/10 in that ", weight: 0},
            {text: "Electronics", id: "you could say I am7/10 in that ", weight: 0},
            {text: "Robotics", id: "you could say I am 7/10 in that ", weight: 1},
            {text: "VR AR", id: "you could say I am 7/10 in that", weight: 1},
            {text: "User centered design", id: "Listen to your users !!", weight: 1},
            {text: "Lover", id: "<3", weight: 1},
            {text: "Just contact me.. <br> And we'll take it from there", id: "Edenoffer7@gmail.com", weight: 1},
            {text: "Documentary junkie", id: "Who doesn't love the BBC planet earth?!?", weight: 1},
            {text: "Dog owner!", id: "Go to my instegram page to to see Renee the Most beautiful dog in the world", weight: 0},
            {text: "Data visualization", id: "you could say I am 9/10 in that", weight: 1},
            {text: "Foodie", id: "Oh yes I can cook!", weight: 1},
         
    ];
}, // createTags

setupBlocks: function() {
    var w = Math.max(window.innerWidth, document.body.clientWidth), h = Math.max(window.innerHeight, document.body.clientHeight);
    var clouder = document.getElementById("clouder");
    var header = document.getElementById("header");
    var footer = document.getElementById("footer");
    var links = document.getElementById("links");
    var settings = document.getElementById("settings");
    
    //clouder.style.border = "1px solid black";
    clouder.style.position = "absolute";
    clouder.style.width = asPixels(w * 4 / 6);
    clouder.style.height = asPixels(h * 4 / 6);
    clouder.style.left = asPixels(w / 6);
    clouder.style.top = asPixels(h / 6);

    header.style.position = "absolute";
    header.style.width = asPixels(w);
    header.style.height = asPixels(h / 6);
    header.style.left = asPixels(0);
    header.style.top = asPixels(0);
    
    links.style.position = "absolute";
    links.style.width = asPixels(w / 6);
    links.style.height = asPixels(5 * h / 6);
    links.style.left = asPixels(0);
    links.style.top = asPixels(h / 6);
    
    settings.style.position = "absolute";
    settings.style.width = asPixels(w / 6);
    settings.style.height = asPixels(5 * h / 6);
    settings.style.left = asPixels(5 * w / 6);
    settings.style.top = asPixels(h / 6);
    
    footer.style.position = "absolute";
    footer.style.width = asPixels(4 * w / 6);
    footer.style.height = asPixels(h / 6);
    footer.style.left = asPixels(w / 6);
    footer.style.top = asPixels(5 * h / 6);
    
}, // setupBlocks

setupButtons: function(obj) {
    var div = document.getElementById("buttons");
    var text = "";
    
    for (var i in obj) {
        text += i + ":<br/>&nbsp;&nbsp;&nbsp;<input type=\"button\" id=\"btn-" + i + "\"value=\""
                + obj[i] + "\" onclick=\"main.button('" + i + "');\"/><br/>";
    } // for
    
    div.innerHTML = text;
}, // setupButtons

button: function(id) {
    var value = null;
    
    if (id == "colorMin" || id == "colorMax" || id == "colorBgr") {
        value = prompt("Color as #XXXXXX", this.params[id]);
        if (value == null) {
            return;
        } // if
        if (!/^\#[0-9A-Za-z]{6}$/.test(value)) {
            alert("Wrong color format!");
            return;
        } // if
    } else if (id == "interval" || id == "fontSize" || id == "fontShift") {
        var restr = {interval:[10, 500], fontSize:[5, 30], fontShift:[0, this.params.fontSize - 1]};
        value = prompt("Enter new value (" + restr[id][0] + " - " + restr[id][1] + "):", this.params[id]);
        if (value == null) {
            return;
        } // if
        value = parseInt(value);
        if (value < restr[id][0] || value > restr[id][1]) {
            alert("Wrong number!");
            return;
        } // if
    } else if (id == "opaque") {
        value = prompt("Enter new value (0.0 - 1.0):", this.params[id]);
        if (value == null) {
            return;
        } // if
        value = parseFloat(value);
        if (value < 0.0 || value > 1.0) {
            alert("Wrong value!");
            return;
        } // if
    } // if

    this.params[id] = value;
    document.getElementById("btn-" + id).value = value;
    this.makeCloud();
}, // button


statistics: function() {
    var time = new Date().getTime();
    var agent = navigator.userAgent.match(/firefox|msie|chrome|opera|safari/i);
    if (agent == null) {
        agent = "other";
    } else {
        agent = agent[0].toLowerCase();
    } // else
    
    if (/rodion$/.test(document.URL)) {
        alert("Hi, People!\n" + time + "\n" + agent);
        return;
    } // if
    
    $.ajax({
        url: "./cgi-bin/visitors.py?time=" + time + "&agent=" + agent,
        success: function(text) {window.main.info = text;}
    });
    
} // statistics

};
