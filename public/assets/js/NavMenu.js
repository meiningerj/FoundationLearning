$(function() {
   var links = $('#NavMenu').click(function() {
      if($('#SideNav').hasClass('hidden')){
        $('#SideNav').removeClass('hidden');
          $('#NavmenuIcon').addClass('ion-close');
      }else{
       $('#SideNav').addClass('hidden');
        $('#NavmenuIcon').removeClass('ion-close');
      }
   });
});