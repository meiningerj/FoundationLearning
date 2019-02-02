$( document ).ready(function() {

   LoadActivity(1);
    
});

function LoadActivity(ActivityNum){
     $.get("https://foundationlearning.eu-gb.mybluemix.net/course-EC101/Lesson-1/"+ActivityNum, function(data, status){
         $( "#LessonContainer" ).append( data.activityHTML );
         $('#Title').html(data.longName)
     });
     var BottomList = $('#BottomMenu div')
     $('#BottomMenu div').removeClass("OnPage");
      $('#BottomMenu div:nth-child('+ActivityNum+')').removeClass("InactiveLink");
     $('#BottomMenu div:nth-child('+ActivityNum+')').addClass("OnPage");
}