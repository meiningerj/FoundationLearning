function hotspot(id) { 
    if ($(id).hasClass('Hidden')){
        $(id).removeClass('Hidden');
    }else{
        $(id).addClass('Hidden');
    }
}