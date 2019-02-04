var currentActivity;
$( document ).ready(function() {
    $('#continue').click(nextActivity);
    $('.ActivityLink').click(bottomMenuLink);
    LoadActivity(1,"Load");

});

function LoadActivity(ActivityNum,tag){
    currentActivity = ActivityNum;
    if(tag != "Load"){
    //$( "#LessonContainer" ).animate({}, 2000);
    }

    $.get("https://foundationlearning.eu-gb.mybluemix.net/course-EC101/Lesson-1/"+ActivityNum, function(data, status){
         $( "#LessonContainer" ).animate({opacity: 0}, 500,function(){
             $( "#LessonContainer" ).html( data.activityHTML );
             $('#Title').html(data.longName)
             $( "#LessonContainer" ).animate({opacity: 1},500)
         })
     });
     var BottomList = $('#BottomMenu div')
     $('#BottomMenu div').removeClass("OnPage");
     $('#BottomMenu div:nth-child('+ActivityNum+') a').removeClass("InactiveLink");
     $('#BottomMenu div:nth-child('+ActivityNum+') ').removeClass("InactiveLink");
     $('#BottomMenu div:nth-child('+ActivityNum+')').addClass("OnPage");
}

function nextActivity(){
    LoadActivity(parseInt(currentActivity) + 1)
}

function bottomMenuLink(){
    if(!($(this).hasClass('InactiveLink'))){
        LoadActivity($(this).attr('href'))
    }


    return false;
}
