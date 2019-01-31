var course = [];
var CurrentLesson = 1;
var CurrentActivity = 1;
$(document).ready(function(){
    var LessonCount = $('.LessonTab')
    for(var x = 0; x < LessonCount.length; x++){
        course.push([]);
        var ActivityList = $('#Lesson'+(x+1)+' > .ActivityTab' )
        for(var i = 0; i < ActivityList.length; i++){
            course[x].push({});
        }
    }
    document.getElementById('addLesson').onclick = addLesson;
    document.getElementById('addActivity').onclick = addActivity;

    $(".TemplateDropDown").on("click", changeTemplate);
    UpdateListeners();
});
function addLesson(){
    $( '#Lesson'+CurrentLesson+'-tab' ).triggerHandler( "shown.bs.tab" );
    course.push([]);
    LessonCount = course.length
    document.getElementById('LessonList').insertAdjacentHTML('beforeend','<li class="nav-item LessonTab"><a class="nav-link mynav" href="#Lesson'+LessonCount+'" id="Lesson'+LessonCount+'-tab" lessonnum="'+LessonCount+'" data-toggle="tab" data-target="#Lesson'+LessonCount+'">Lesson '+LessonCount+'</a></li>');
    document.getElementById('LessonActivitysList').insertAdjacentHTML('beforeend','<ul class="nav nav-tabs nav-fill tab-pane fade in active show" id="Lesson'+LessonCount+'" role="tablist" lessonnum="'+LessonCount+'">');
    CurrentLesson = LessonCount;
    addActivity("saved");
    $('#Lesson'+LessonCount+'-tab').tab('show');

}
function addActivity(isSaved){
    if(isSaved != "saved"){
     $('#Lesson'+CurrentLesson+'-tab').triggerHandler( "shown.bs.tab" );
    }
    ActivityNum = course[CurrentLesson-1].length + 1
    document.getElementById('Lesson'+CurrentLesson).insertAdjacentHTML('beforeend','<li class="nav-item ActivityTab"><a class="nav-link mynav" href="#Lesson'+CurrentLesson+'Activity'+ActivityNum+'" id="Activity'+ActivityNum+'-tab" activitynum="'+ActivityNum+'" data-toggle="tab">Activity '+ActivityNum+'</a></li>');
    UpdateListeners();
    course[CurrentLesson-1].push({});
    CurrentActivity = ActivityNum
    $('#Lesson'+CurrentLesson+' li #Activity'+ActivityNum+'-tab').tab("show")


}
function isInteger(value) {
  return /^\d+$/.test(value);
}
function getActivityHTML(TemplateName){
    HTMLstring ="";
    switch(TemplateName){

        case "3D Model":
            HTMLstring = '<input id="notedObjectsCount" type="hidden" value="1"><div class="form-group"><span class="h4 FormLabel">Activity name<a href="#" data-toggle="popover" title="Activity Name" data-content="This is the name that will show on the left navigation menu when completing the Lesson"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="name" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Sub-title<a href="#" data-toggle="popover" title="Sub-title" data-content="This longer text field allows for a more verbose description, shown in the title header"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="longName" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Starter Code<a href="#" data-toggle="popover" title="Starter Code" data-content="This option allows you to upload a plaintext (.txt) file to populate the code ditor on load"><sup><i class="fa fa-question"></i></sup></a></span><input type="file" style="width: 100%;margin-top: 10px;"></div><div role="dialog" tabindex="-1" class="modal fade ImageModal " id="EditNotedObject"> <div class="modal-dialog lg-modal" role="document"> <div class="modal-content"> <div class="modal-header"> <h4 class="modal-title">Modal Title</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div> <div class="modal-body"> <div style="width:100%;height:500px" > <div id="" style="width: 100%;height: 100%;"></div> </div> </div> <div class="modal-footer"><button class="btn btn-light" type="button" data-dismiss="modal">Close</button><button class="btn btn-primary" type="button" data-dismiss="modal">Save</button></div> </div> </div> </div> <div class="table-responsive"> <table class="table"> <thead> <tr> <th colspan="2"><a href="#" id="AddNotedObject" style="float: right;"><i class="icon ion-android-add"></i></a>3D Notes</th> </tr> </thead> <tbody id="NotedObjectsTable"> <tr id="NotedObject1"> <td>Noted Object 1<input class="form-control" type="hidden" id="NotedObjectName1" value="0"></td> <td class="d-flex align-items-center"><textarea class="form-control" id="NotedObject1Text" style="width: 70%;height: 90px;"></textarea> <div class="d-flex" style="float: right;margin-left: auto;"><a href="#" id="EditNotedObject1" class="EditNotedObject" data-target="#EditNotedObject" data-toggle="modal"><i class="material-icons">my_location</i></a><a href="#" id="DeleteNotedObject1" class="DeleteNotedObject"><i class="fa fa-remove"></i></a></div> </td> </tr> </tbody> </table> </div>'
            break;
        case "Image Hot Spots":
            HTMLstring = '<div class="form-group"><span class="h4 FormLabel">Activity name<a href="#" data-toggle="popover" title="Activity Name" data-content="This is the name that will show on the left navigation menu when completing the Lesson"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="name" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Sub-title<a href="#" data-toggle="popover" title="Sub-title" data-content="This longer text field allows for a more verbose description, shown in the title header"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="longName" type="text"></div><div class="form-group"><span class="h4 FormLabel">Starter Code<a href="#" data-toggle="popover" title="Starter Code" data-content="This option allows you to upload a plaintext (.txt) file to populate the code ditor on load"><sup><i class="fa fa-question"></i></sup></a></span><input type="file" onchange="readImagefile()" style="width: 100%;margin-top: 10px;"></div><div role="dialog" tabindex="-1" class="modal fade ImageModal" id="EditHotSpot"> <div class="modal-dialog lg-modal" role="document"> <div class="modal-content"> <div class="modal-header"> <h4 class="modal-title">Modal Title</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div> <div class="modal-body"> <div id="HotspotCanvas" class="HotspotCanvas" HotSpotNumber="1" style="position: relative;height: 722px;"> <img id="hotspotImage1" class="hotspotImage" src="" style="position: absolute;top: 0;left: 0;"/> <button class="btn btn-primary ImageHotspot" type="button" id="ImageHotspot" style="position:absolute;"><i class="fa fa-circle-o"></i></button> </div> </div> <div class="modal-footer"><button class="btn btn-light" type="button" data-dismiss="modal">Close</button><button class="btn btn-primary" type="button" data-dismiss="modal">Save</button></div> </div> </div> </div> <div class="table-responsive"><input type="hidden" name="HotSpotCount" value=1 > <table class="table"> <thead> <tr> <th colspan="2"><a href="#" class="AddHotSpot" style="float: right;"><i class="icon ion-android-add"></i></a>Hot-Spot</th> </tr> </thead> <tbody class="HotSpotTable"> <tr id="HotSpot1"> <td>Hot-Spot 1<input class="form-control" type="hidden" id="HotSpot1X" value="0"><input class="form-control" type="hidden" id="HotSpot1Y" value="0"></td> <td class="d-flex align-items-center"><textarea class="form-control" id="HotSpot1Text" style="width: 70%;height: 90px;"></textarea> <div class="d-flex" style="float: right;margin-left: auto;"><a href="#" id="EditHotSpot1" class="EditHotSpot" data-target="#EditHotSpot" data-toggle="modal"><i class="material-icons">my_location</i></a><a href="#" id="DeleteHotSpot1" class="DeleteHotSpot"><i class="fa fa-remove"></i></a></div> </td> </tr> </tbody> </table> </div>'
            var newHotSpot = {
                "hotSpotId": 1,
                "hotSpotLocationLeft": 0,
                "hotSpotLocationTop": 0,
                "hotSpotTextLocationLeft": 0,
                "hotSpotTextLocationTop": 0,
                "hotSpotText": "<p></p>"
              }
            course[CurrentLesson-1][CurrentActivity-1]["variables"]["hotSpots"] = [newHotSpot];
            break;
        case "Terminal":
            HTMLstring = '<input id="tab-count" type="hidden" value="1"><div class="form-group"><span class="h4 FormLabel">Activity name<a href="#" data-toggle="popover" title="Activity Name" data-content="This is the name that will show on the left navigation menu when completing the Lesson"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="name" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Sub-title<a href="#" data-toggle="popover" title="Sub-title" data-content="This longer text field allows for a more verbose description, shown in the title header"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="longName" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Server<a href="#" data-toggle="popover" title="Server" data-content="Select the server to be used for the terminal shell"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" type="hidden" id="SyntaxHighlight"> <div class="modal fade" role="dialog" tabindex="-1" id="AddServerModal"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h4 class="modal-title">Add Server</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div> <div class="modal-body"> <div class="form-group"><span class="h4 FormLabel">Server name<a href="#" data-toggle="popover" title="Server Name" data-content="Psuedo name for given server"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" type="text"></div> <div class="form-group"><span class="h4 FormLabel">IP Address<a href="#" data-toggle="popover" title="IP Address" data-content="Provide the public IP address for the given server"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" type="text"></div> </div> <div class="modal-footer"><button class="btn btn-light" type="button" data-dismiss="modal">Close</button><button class="btn btn-primary" type="button">Save</button></div> </div> </div> </div><input class="form-control" type="hidden" id="Server"> <div class="dropdown" style="width: 100%; margin-top:10px"><button class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button" id="ServerDropDownBtn" style="background-color: #1f253a;color: rgb(255,255,255);border: none;">Server&nbsp;</button> <div class="dropdown-menu" role="menu"><a class="dropdown-item ServerDropDown" role="presentation" href="#">Test-Server</a> <div class="dropdown-divider" role="presentation"></div><a class="dropdown-item ServerDropDown" role="presentation" href="#" data-toggle="modal" data-target="#AddServerModal">Add Server</a></div> </div> </div> <div class="form-group"><span class="h4 FormLabel">Instruction tab content<a href="#" data-toggle="popover" title="Instruction tab content" data-content="This is the text content that will be shown on each tab"><sup><i class="fa fa-question"></i></sup></a></span> <div style="width: 100%;"> <ul class="nav nav-tabs" id="TextAreaTabs" style="padding-left: 0;"> <li class="nav-item"><a class="nav-link active" role="tab" data-toggle="tab" href="#tab-1" id="TextTab1Link">Tab 1</a></li> <li class="nav-item" id="FinalTab" data-toggle=""><a class="nav-link AddTab" role="" data-toggle="" href="" ><i class="fa fa-plus"></i></a></li> </ul> <div class="tab-content"> <div class="tab-pane active" role="tabpanel" id="tab-1"><textarea class="form-control" id="TabTextArea1" style="width: 100%;height: 300px;background-color: white;"></textarea></div> <div class="tab-pane" role="tabpanel" id="FinalTabPane"></div> </div> </div> </div>'
            break;
        case "Code Editor":
            HTMLstring = '<input id="tab-count" type="hidden" value="1"><div class="form-group"><span class="h4 FormLabel">Activity name<a href="#" data-toggle="popover" title="Activity Name" data-content="This is the name that will show on the left navigation menu when completing the Lesson"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="name" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Sub-title<a href="#" data-toggle="popover" title="Sub-title" data-content="This longer text field allows for a more verbose description, shown in the title header"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="longName" type="text"></div><div class="form-group"><span class="h4 FormLabel">Syntax highlighting<a href="#" data-toggle="popover" title="Syntax highlighting" data-content="The below dropdown allows you to choose the language that will be used to syntax highlight the code in the editor"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" type="hidden" id="SyntaxHighlight"> <div class="dropdown" style="width: 100%; margin-top:10px"><button class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button" id="LanguageDropdownBtn" style="background-color: #1f253a;color: rgb(255,255,255);border: none;">Language&nbsp;</button> <div class="dropdown-menu" role="menu"><a class="dropdown-item LanguageDropDown" role="presentation" href="#">Java</a><a class="dropdown-item LanguageDropDown" role="presentation" href="#">Python</a><a class="dropdown-item LanguageDropDown" role="presentation" href="#">HTML</a></div> </div> </div> <div class="form-group"><span class="h4 FormLabel">Starter Code<a href="#" data-toggle="popover" title="Starter Code" data-content="This option allows you to upload a plaintext (.txt) file to populate the code ditor on load"><sup><i class="fa fa-question"></i></sup></a></span><input type="file" style="width: 100%;margin-top: 10px;" id="starterFile"></div> <div class="form-group"><span class="h4 FormLabel">Server<a href="#" data-toggle="popover" title="Server" data-content="Select the server to be used to run submitted code in real-time"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" type="hidden" id="SyntaxHighlight"> <div class="modal fade" role="dialog" tabindex="-1" id="AddServerModal"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h4 class="modal-title">Add Server</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div> <div class="modal-body"> <div class="form-group"><span class="h4 FormLabel">Server name<a href="#" data-toggle="popover" title="Server Name" data-content="Psuedo name for given server"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" type="text"></div> <div class="form-group"><span class="h4 FormLabel">IP Address<a href="#" data-toggle="popover" title="IP Address" data-content="Provide the public IP address for the given server"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" type="text"></div> </div> <div class="modal-footer"><button class="btn btn-light" type="button" data-dismiss="modal">Close</button><button class="btn btn-primary" type="button">Save</button></div> </div> </div> </div><input class="form-control" type="hidden" id="Server"> <div class="dropdown" style="width: 100%; margin-top:10px"><button class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button" id="ServerDropDownBtn" style="background-color: #1f253a;color: rgb(255,255,255);border: none;">Server&nbsp;</button> <div class="dropdown-menu" role="menu"><a class="dropdown-item ServerDropDown" role="presentation" href="#">Test-Server</a> <div class="dropdown-divider" role="presentation"></div><a class="dropdown-item ServerDropDown" role="presentation" href="#" data-toggle="modal" data-target="#AddServerModal">Add Server</a></div> </div> </div> <div class="form-group"><span class="h4 FormLabel">Instruction tab content<a href="#" data-toggle="popover" title="Instruction tab content" data-content="This is the text content that will be shown on each tab"><sup><i class="fa fa-question"></i></sup></a></span> <div style="width: 100%;"> <ul class="nav nav-tabs" id="TextAreaTabs" style="padding-left: 0;"> <li class="nav-item"><a class="nav-link active" role="tab" data-toggle="tab" href="#tab-1" id="TextTab1Link">Tab 1</a></li> <li class="nav-item" id="FinalTab" data-toggle=""><a class="nav-link AddTab" role="" data-toggle="" href="" ><i class="fa fa-plus"></i></a></li> </ul> <div class="tab-content"> <div class="tab-pane active" role="tabpanel" id="tab-1"><textarea class="form-control" id="TabTextArea1" style="width: 100%;height: 300px;background-color: white;"></textarea></div> <div class="tab-pane" role="tabpanel" id="FinalTabPane"></div> </div> </div> </div>'
            break;
        case "Text Tabs":
            HTMLstring = '<input id="tab-count" type="hidden" value="1"><div class="form-group"><span class="h4 FormLabel">Activity name<a href="#" data-toggle="popover" title="Activity Name" data-content="This is the name that will show on the left navigation menu when completing the Lesson"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="name" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Sub-title<a href="#" data-toggle="popover" title="Sub-title" data-content="This longer text field allows for a more verbose description, shown in the title header"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="longName" type="text"></div><div class="form-group"><span class="h4 FormLabel">Tab Content<a href="#" data-toggle="popover" title="Tab-Content" data-content="This is the text content that will be shown on each tab"><sup><i class="fa fa-question"></i></sup></a></span> <div style="width: 100%;"> <ul class="nav nav-tabs" id="TextAreaTabs" style="padding-left: 0;"> <li class="nav-item"><a class="nav-link active" role="tab" data-toggle="tab" href="#tab-1" id="TextTab1Link">Tab 1</a></li> <li class="nav-item" id="FinalTab" data-toggle=""><a class="nav-link AddTab" role="" data-toggle="" ><i class="fa fa-plus"></i></a></li> </ul> <div class="tab-content"> <div class="tab-pane active" role="tabpanel" id="tab-1"><textarea class="form-control" id="TabTextArea1" style="width: 100%;height: 300px;background-color: white;"></textarea></div> <div class="tab-pane" role="tabpanel" id="FinalTabPane"></div> </div> </div> </div>'
            break;
        case "Video":
            HTMLstring = '<input id="tab-count" type="hidden" value="1"><input id="YTtab-count" type="hidden" value="1"><div class="form-group"><span class="h4 FormLabel">Activity name<a href="#" data-toggle="popover" title="Activity Name" data-content="This is the name that will show on the left navigation menu when completing the Lesson"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="name" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Sub-title<a href="#" data-toggle="popover" title="Sub-title" data-content="This longer text field allows for a more verbose description, shown in the title header"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" name="longName" type="text"></div><div style="width: 100%;"> <ul class="nav nav-tabs" style="margin-bottom: 20px;"> <li class="nav-item"><a class="nav-link active" role="tab" data-toggle="tab" href="#tab-2">Custom Video File</a></li> <li class="nav-item"><a class="nav-link" role="tab" data-toggle="tab" href="#tab-1" id="YouTubeTab">YouTube Video</a></li> </ul> <div class="tab-content"> <div class="tab-pane" role="tabpanel" id="tab-1"> <div> <div class="form-group"><span class="h4 FormLabel">YouTube Embed URL<a href="#" data-toggle="popover" title="Youtube Embed URL" data-content="Upload the video you would like to play during the activity"><sup><i class="fa fa-question"></i></sup></a></span><input class="form-control" type="text"></div> <div class="form-group"><span class="h4 FormLabel">Tab Content<a href="#" data-toggle="popover" title="Tab-Content" data-content="This is the text content that will be shown on each tab"><sup><i class="fa fa-question"></i></sup></a></span> <div style="width: 100%;"> <ul class="nav nav-tabs" id="TextAreaTabs" style="padding-left: 0;"> <li class="nav-item"><a class="nav-link active" role="tab" data-toggle="tab" href="#tab-YT1" id="TextTab1Link">Tab 1</a></li> <li class="nav-item" id="FinalTab" data-toggle=""><a class="nav-link AddYTTab" role="" data-toggle="" href="" ><i class="fa fa-plus"></i></a></li> </ul> <div class="tab-content"> <div class="tab-pane active" role="tabpanel" id="tab-YT1"><textarea class="form-control" id="TabTextAreaY1" style="width: 100%;height: 300px;background-color: white;"></textarea></div> <div class="tab-pane" role="tabpanel" id="FinalTabPane"></div> </div> </div> </div> </div> </div> <div class="tab-pane active" role="tabpanel" id="tab-2"> <div> <div class="form-group"><span class="h4 FormLabel">Video File<a href="#" data-toggle="popover" title="Video File" data-content="Upload the video you would like to play during the activity"><sup><i class="fa fa-question"></i></sup></a></span><input type="file" style="width: 100%;margin-top: 10px;"></div> <div class="form-group"><span class="h4 FormLabel">Tab Content<a href="#" data-toggle="popover" title="Tab-Content" data-content="This is the text content that will be shown on each tab"><sup><i class="fa fa-question"></i></sup></a></span> <div style="width: 100%;"> <ul class="nav nav-tabs" id="TextAreaTabs" style="padding-left: 0;"> <li class="nav-item"><a class="nav-link active" role="tab" data-toggle="tab" href="#tab-v1" id="TextTab1Link">Tab 1</a></li> <li class="nav-item" id="FinalTab" data-toggle=""><a class="nav-link AddVideoTab" role="" data-toggle="" href="" ><i class="fa fa-plus"></i></a></li> </ul> <div class="tab-content"> <div class="tab-pane active" role="tabpanel" id="tab-v1"> <div class="d-flex align-items-center" style="margin-bottom: 10px;"> <p style="margin: 0;margin-right: 10px;">Time trigger for note</p><input class="form-control form-control-sm" type="time" value="00:00" style="width: 94px;"></div><textarea class="form-control" id="TabTextArea1" style="width: 100%;height: 300px;background-color: white;"></textarea></div> <div class="tab-pane" role="tabpanel" id="FinalTabPane"></div> </div> </div> </div> </div> </div> </div> </div>'
            break;
        case "Dropdown":
            ""
            break;
    }
    return HTMLstring
}
function addTab(e){
    tabCount = parseInt($(this).parent().parent().parent().parent().siblings('#tab-count').val())
    tabCount += 1;
    $(this).parent().parent().parent().parent().siblings('#tab-count').val(tabCount)
    var obj=$(this).parent()
    $('<li class="nav-item"><a class="nav-link" role="tab" data-toggle="tab" href="#tab-'+tabCount+'" id="TextTab'+tabCount+'Link">Tab '+tabCount+'</a></li>').insertBefore($(obj))

    var obj=$(this).parent().parent().siblings('.tab-content')
    $( '<div class="tab-pane" role="tabpanel" id="tab-'+tabCount+'"><textarea class="form-control" id="TabTextArea'+tabCount+'"></textarea></div>').appendTo($(obj))

    $('#TextTab'+tabCount+'Link').tab('show');
    new nicEditor().panelInstance('TabTextArea'+tabCount);
    return false;
}
function addVideoTab(e){
    tabCount = parseInt($('#tab-count').val())
    tabCount += 1;
    $('#tab-count').val(tabCount)
    var obj=$(this).parent()
    $('<li class="nav-item"><a class="nav-link" role="tab" data-toggle="tab" href="#tab-v'+tabCount+'" id="TextTab'+tabCount+'Link">Tab '+tabCount+'</a></li>').insertBefore($(obj))

    var obj=$(this).parent().parent().siblings('.tab-content')
    $( '<div class="tab-pane" role="tabpanel" id="tab-v'+tabCount+'"><div class="d-flex align-items-center" style="margin-bottom: 10px;"> <p style="margin: 0;margin-right: 10px;">Time trigger for note</p><input class="form-control form-control-sm" type="time" value="00:00" style="width: 94px;" name="time-'+tabCount+'"></div><textarea class="form-control" id="TabTextArea'+tabCount+'"></textarea></div>').appendTo($(obj))

    $('#TextTab'+tabCount+'Link').tab('show');
    new nicEditor().panelInstance('TabTextArea'+tabCount);
    return false;
}
function addYTVideoTab(e){
    tabCount = parseInt($('#YTtab-count').val())
    tabCount += 1;
    $('#YTtab-count').val(tabCount)
    var obj=$(this).parent()
    $('<li class="nav-item"><a class="nav-link" role="tab" data-toggle="tab" href="#tab-YT'+tabCount+'" id="TextTabYT'+tabCount+'Link">Tab '+tabCount+'</a></li>').insertBefore($(obj))

    var obj=$(this).parent().parent().siblings('.tab-content')
    $( '<div class="tab-pane" role="tabpanel" id="tab-YT'+tabCount+'"><textarea class="form-control" id="TabTextAreaY'+tabCount+'"></textarea></div>').appendTo($(obj))

    $('#TextTabYT'+tabCount+'Link').tab('show');
    new nicEditor().panelInstance('TabTextAreaY'+tabCount);
    return false;
}
function AddHotSpot(e){
    HotSpotCounter = $(this).parent().parent().parent().parent().siblings("[name='HotSpotCount']")
    HotSpotCount = parseInt($(HotSpotCounter).val()) + 1
    $(HotSpotCounter).val(HotSpotCount)

    var obj = $(this).parent().parent().parent().siblings(".HotSpotTable")
    $('<tr id="HotSpot'+HotSpotCount+'"> <td>Hot-Spot '+HotSpotCount+'<input type="hidden" class="form-control" id="HotSpot'+HotSpotCount+'X" value="0" /><input type="hidden" class="form-control" id="HotSpot'+HotSpotCount+'Y" value="0" /></td> <td class="d-flex align-items-center"><textarea class="form-control" id="HotSpot'+HotSpotCount+'Text" style="width: 70%;height: 90px;"></textarea> <div class="d-flex" style="float: right;margin-left: auto;"><a href="#" id="EditHotSpot'+HotSpotCount+'" class="EditHotSpot" data-target="#EditHotSpot" data-toggle="modal"><i class="material-icons">my_location</i></a><a id="DeleteHotSpot'+HotSpotCount+'" class="DeleteHotSpot" onclick="DeleteHotSpot('+HotSpotCount+')"><i class="fa fa-remove "></i></a></div> </td> </tr>').appendTo($(obj))

    var newHotSpot = {
                "hotSpotId": HotSpotCount,
                "hotSpotLocationLeft": 0,
                "hotSpotLocationTop": 0,
                "hotSpotTextLocationLeft": 0,
                "hotSpotTextLocationTop": 0,
                "hotSpotText": "<p></p>"
              }

    course[CurrentLesson-1][CurrentActivity-1]["variables"]["hotSpots"].push(newHotSpot);
    UpdateListeners()
    console.log(course);
}
function EditHotSpot(x){
    currenthotspot = x;
    document.getElementById('ImageHotspot').style.left = document.getElementById("HotSpot"+currenthotspot+'X').value + "px";
    document.getElementById('ImageHotspot').style.top = document.getElementById("HotSpot"+currenthotspot+'Y').value + "px";
}
function getClickPosition(e) {
    var rect = document.getElementById("HotspotCanvas").getBoundingClientRect();
    var xPosition = e.clientX-rect.left + "px";
    var yPosition = e.clientY-rect.top + 'px';
    document.getElementById('ImageHotspot').style.left = xPosition;
    document.getElementById('ImageHotspot').style.top = yPosition;
    document.getElementById("HotSpot"+currenthotspot+'X').value = e.clientX-rect.left;
    document.getElementById("HotSpot"+currenthotspot+'Y').value = e.clientY-rect.top;
    course[CurrentLesson-1][CurrentActivity-1]["variables"]["hotSpots"][currenthotspot-1]["hotSpotLocationLeft"] = e.clientX-rect.left;
    course[CurrentLesson-1][CurrentActivity-1]["variables"]["hotSpots"][currenthotspot-1]["hotSpotLocationTop"] = e.clientY-rect.top;
}
function addNotedObject(){
    NotedObjectCount = $("#notedObjectsCount")
    NotedObjectCount += 1;
    document.getElementById('NotedObjectsTable').insertAdjacentHTML('beforeend',
    '<tr id="NotedObject'+NotedObjectCount+'"> <td>Noted Object '+NotedObjectCount+'<input class="form-control" type="hidden" id="NotedObjectName'+NotedObjectCount+'" value="0"></td> <td class="d-flex align-items-center"><textarea class="form-control" id="NotedObject'+NotedObjectCount+'Text" style="width: 70%;height: 90px;"></textarea> <div class="d-flex" style="float: right;margin-left: auto;"><a href="#" id="EditNotedObject'+NotedObjectCount+'" class="EditNotedObject" data-target="#EditNotedObject" data-toggle="modal"><i class="material-icons">my_location</i></a><a id="DeleteNotedObject'+NotedObjectCount+'" onclick="DeleteNotedObject('+NotedObjectCount+')" class="DeleteNotedObject"><i class="fa fa-remove"></i></a></div> </td> </tr>');
}
function setFormHTML(Lesson, Activity){
    Activity = course[Lesson-1][Activity-1];
    if('template' in Activity){
        $('#TemplateBtn').html(Activity.template)
        $('#TemplateForm').html(getActivityHTML(Activity.template))
        try{
        new nicEditor().panelInstance('TabTextArea1');
        }catch{}

    }else{
        $('#TemplateBtn').html("Dropdown")
        $('#TemplateForm').html(getActivityHTML("Dropdown"))
    }
      UpdateListeners();
}
function changeTemplate(){
    if($(this).html() != $("#TemplateBtn").html()){
    course[CurrentLesson-1][CurrentActivity-1]["template"] = $(this).html();
    course[CurrentLesson-1][CurrentActivity-1]["variables"] = {};
    $("#TemplateBtn").html($(this).html());
    setFormHTML(CurrentLesson, CurrentActivity)
        console.log(course)
    }
}
function UpdateListeners(){
    //Clear all Handlers
    $('#LessonList li a[data-toggle="tab"]').off();
    $('#LessonActivitysList ul li a[data-toggle="tab"]').off();
    //Re-apply handlers to Lessons
    $('#LessonList li a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        SaveContent(CurrentLesson, CurrentActivity);
        CurrentLesson = $(e.target).attr("lessonnum")
        $("#LessonActivities > div").removeClass("active");
        $("#LessonActivities > div").removeClass("show");
        CurrentActivity = parseInt($('#LessonActivitysList #Lesson'+CurrentLesson+' li .active').attr("activitynum"))
        setFormHTML(CurrentLesson, CurrentActivity)
    });
    //Re-apply handlers to Activitys
    $('#LessonActivitysList ul li a[data-toggle="tab"]').on('shown.bs.tab', function (e){
        SaveContent(CurrentLesson, CurrentActivity);
        CurrentActivity = parseInt($(e.target).attr("activitynum"))

        setFormHTML(CurrentLesson, CurrentActivity)
    });

    $('#YouTubeTab').on('shown.bs.tab', function (e) {
        new nicEditor().panelInstance('TabTextAreaY1');
    });
    //Add hotSpotButton
    try{$('.AddHotSpot').click(AddHotSpot);}catch{};
    //Edit hotSpotButtons
    try{
        var myElemts = document.getElementsByClassName("EditHotSpot")
        for(var i = 0; i < myElemts.length; i++){
            var id = myElemts[i].id;
            var number = id.substr(id.length - 1);
            myElemts[i].setAttribute("onclick", 'EditHotSpot('+number+')');
        }
    }catch{};
    //HotSpotImage Canvas Click
    try{
        var myElemts = document.getElementsByClassName("HotspotCanvas")
        for(var i = 0; i < myElemts.length; i++){
            myElemts[i].addEventListener("click", getClickPosition, false);
        }
    }catch{};

    try{$('[name="name"]').on('input',function(e){
        course[CurrentLesson-1][CurrentActivity-1]["name"] = $('[name="name"]').val()
        console.log(course)
    });}catch{};

    try{$('[name="longName"]').on('input',function(e){
        course[CurrentLesson-1][CurrentActivity-1]["longName"] = $('[name="longName"]').val()
        console.log(course)});}catch{};

    try{
    $('.AddTab').click(addTab);
    }catch{};

    try{
    $('.AddVideoTab').click(addVideoTab);
    }catch{};

    try{
    $('.AddYTTab').click(addYTVideoTab);
    }catch{};

    try{
        $(function(){
            $(".LanguageDropDown").click(function(){
                $("#LanguageDropdownBtn").text($(this).text());
                $("#SyntaxHighlight").val($(this).text());
            });
        });}catch{}

    try{$(function(){
        $(".ServerDropDown").click(function(){
            $("#ServerDropDownBtn").text($(this).text());
            $("#Server").val($(this).text());
        });
    });}catch{}

    try{
    document.getElementById('AddNotedObject').onclick = addNotedObject;
    }catch{}
}
function SaveContent(){

    if(course[CurrentLesson-1][CurrentActivity-1] != "undefined"){
        switch(course[CurrentLesson-1][CurrentActivity-1]["template"]){
            case "3D Model":
                var notes = $(".nicEdit-main");
                for(var x = 0; x < notes.length; x++){
                    course[CurrentLesson-1][CurrentActivity-1]["variables"]['comments']['tab-'+(x+1)+''] = $(notes[x]).html();
                    course[CurrentLesson-1][CurrentActivity-1]["variables"]['objectLinks'].push({"objectName":$('#NotedObjectName'+(x+1)).val(),"tabNum": (x+1)});
                }
                break;
            case "Image Hot Spots":
                break;
            case "Terminal":
                break;
            case "Code Editor":
                language = $("#LanguageDropdownBtn").html()
                server = $("#ServerDropDownBtn").html()
                if(language != "Language&nbsp;"){
                course[CurrentLesson-1][CurrentActivity-1]["variables"]['language'] = language
                }
                if(server != "Server&nbsp;"){
                course[CurrentLesson-1][CurrentActivity-1]["variables"]['server'] = server
                }
                CallBackLesson = CurrentLesson
                CallBackActivity = CurrentActivity
                readfile(function(val){
                    course[CallBackLesson-1][CallBackActivity-1]["variables"]['sarterFile'] = val;
                },"starterFile");
                break;
            case "Text Tabs":
                var notes = $(".nicEdit-main");
                for(var x = 0; x < notes.length; x++){
                    course[CurrentLesson-1][CurrentActivity-1]["variables"]['tab-'+(x+1)+''] = $(notes[x]).html();
                }
                break;
            case "Video":
                break;
            case "Dropdown":
                ""
                break;
        }

    }
    console.log(course)
}
function readfile(callback, id){
    fileContents = ""
    var file = document.getElementById(id).files[0];
    if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        fileContents = evt.target.result;
        callback(fileContents)
    }
    reader.onerror = function (evt) {

    }
    }
}
function readImagefile(){
    console.log("readinfile")
      var preview = document.getElementById('hotspotImage1');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
}
