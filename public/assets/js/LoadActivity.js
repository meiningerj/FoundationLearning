var currentActivity;
var score = [];
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

    $.get(window.location.href+"/"+ActivityNum, function(data, status){
         $( "#LessonContainer" ).animate({opacity: 0}, 500,function(){
             $( "#LessonContainer" ).html( data.activityHTML );
             $('#Title').html(data.longName)
             $( "#LessonContainer" ).animate({opacity: 1},500)

              if ( $('#3DObject').length){
                  init()
                  animate();
              }
              $( "#RunCode" ).click(function() {
                    runCode();
                    return false;
              });
              try{
              document.getElementsByClassName('HotSpotQuiz')[0].addEventListener("click", getClickPosition, false)
              $('#continue').off();
              $('#continue').click(checkAnswer);
              $('#continue').html("Submit")
              }catch{}
              if ($('#CodeAnswer').length){
                  $('#continue').off();
                  $('#continue').html("Waiting for correct response")
              }
               if ($('.Question').length){
                  $('#continue').off();
                  $('#continue').click(checkQuizAnswers);
                  $('#continue').html("Submit")
              }

         })
     });
     var BottomList = $('#BottomMenu div')
     $('#BottomMenu div').removeClass("OnPage");
     $('#BottomMenu div:nth-child('+ActivityNum+') a').removeClass("InactiveLink");
     $('#BottomMenu div:nth-child('+ActivityNum+') ').removeClass("InactiveLink");
     $('#BottomMenu div:nth-child('+ActivityNum+')').addClass("OnPage");
}

function nextActivity(){
    if(currentActivity == $('#BottomMenu').children().length){
        var count = 0;
        for(var i = 0; i < score.length; ++i){
            if(score[i] == 1) count++;
        }
        scoreTotalnum = (count/score.length * 100)
        scoreTotal = Math.round((count/score.length * 100)) + '%'
        $.post("https://foundationlearning.eu-gb.mybluemix.net/updatescore", {_id: window.location.href.split("/")[3].split("-")[1], score : scoreTotalnum, lesson : window.location.href.split("/")[4].split("-")[1]})
        $('#learnersScore').html(scoreTotal)
        $('#exampleModalCenter').modal('show')
        $('#continue').click(function(){
             window.location.href='https://foundationlearning.eu-gb.mybluemix.net/course-EC101';
          });
    }else{
    LoadActivity(parseInt(currentActivity) + 1)
    }
}

function bottomMenuLink(){
    if(!($(this).hasClass('InactiveLink'))){
        LoadActivity($(this).attr('href'))
    }


    return false;
}

function runCode(){
    var editor = ace.edit("AceEditor");
    var code = editor.getValue();
    $.get( "https://foundationlearning.eu-gb.mybluemix.net/python", { text: code} , function(data, status){

           var editor = ace.edit("AceEditorOutput");
           editor.setValue(data.test);
           if ($('#CodeAnswer').length){
                if($('#CodeAnswer').val() == data.test){
                    alert("That is correct");
                    score.push(1)
                    $('#continue').html("Continue")
                    $('#continue').click(nextActivity);
                    }
          }

       });
}
function getClickPosition(e) {
    var rect = document.getElementById("HotspotCont").getBoundingClientRect();
    var xPosition = e.clientX-rect.left + "px";
    var yPosition = e.clientY-rect.top + 'px';
    document.getElementById('ImageHotspot').style.left = xPosition;
    document.getElementById('ImageHotspot').style.top = yPosition;
}
function checkAnswer(){
    var correctx = $("#x").val()
    var correcty = $("#y").val()
    if( (Math.abs(correctx - parseInt((document.getElementById('ImageHotspot').style.left).split(".")[0]))<20) ){
        alert("That is correct");
        score.push(1)

    }else{
        alert("Unfortunately that isn't right, the correct answer is shown below")
        document.getElementById('ImageHotspot').style.left = $("#x").val()+"px";
        document.getElementById('ImageHotspot').style.top = $("#y").val()+"px";
        score.push(0)
    }

        $('#continue').html("Continue")
        $('#continue').off();
        $('#continue').click(nextActivity);
}

function checkQuizAnswers(){

    for(var x = 0; x < document.getElementsByClassName('Question').length; x++){
        if(document.getElementsByClassName('Question')[x].children[1].value == document.getElementsByClassName('Question')[x].children[2].value){
           document.getElementsByClassName('Question')[x].children[1].style.backgroundColor = "lightgreen";
           score.push(1)
        }else{
           document.getElementsByClassName('Question')[x].children[1].style.backgroundColor = "indianred";
           score.push(0)
        }
        var paragraph = document.createElement("P");
        var textnode = document.createTextNode("The correct answer is:" + document.getElementsByClassName('Question')[x].children[2].value);
        paragraph.appendChild(textnode);
        document.getElementsByClassName('Question')[x].appendChild(paragraph);
        document.getElementsByClassName('Question')[x].style.padding = "20px 20px 0px 20px";
    }

        $('#continue').html("Continue")
        $('#continue').off();
        $('#continue').click(nextActivity);
}
