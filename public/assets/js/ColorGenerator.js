function my_function() {
    var colors = ['#6E8898', '#9FB1BC', '#1F253A','#D3D0CB','#A0B2A6','#6E7E85'];
    var x = document.getElementsByClassName("RandomBackground");
    var y;
    for (y = 0; y < x.length; y++){
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        x[y].style.backgroundColor = random_color;
    }
}
if (window.attachEvent) {window.attachEvent('onload', my_function);}
else if (window.addEventListener) {window.addEventListener('load', my_function, false);}
else {document.addEventListener('load', my_function, false);}