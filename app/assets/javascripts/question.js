jQuery(document).ready(function($) {
    $('#open_question').click(function(e){
      if($('.right_video').is(":visible")) {
          $('#open_interaction_at').val($('#time').text());
          $('#open_interaction_at_offset').val($('#time').attr("interaction-offset"));
          $('.added_at').text($('#time').text());
          $('.open_questions').show();
          $("#interaction_items").hide();
      } else {
        $('.right_video').show();
        $('.open_questions').hide();
      }
   });

   $('#quiz_question').click(function(){
      if($('.right_video').is(":visible")) {
        $('#quiz_interaction_at').val($('#time').text());
        $('#quiz_interaction_at_offset').val($('#time').attr("interaction-offset"));
        $('.added_at').text($('#time').text());
        $('.quiz_questions').show();
        $("#interaction_items").hide();
      } else {
        $('.right_video').show();
        $('.quiz_questions').hide();
      }
   });
  $('#poll_question').click(function(){
      if($('.right_video').is(":visible")) {
         $('#poll_interaction_at').val($('#time').text());
         $('#poll_interaction_at_offset').val($('#time').attr("interaction-offset"));
         $('.added_at').text($('#time').text());
         $('.poll_questions').show();
         $("#interaction_items").hide();
      } else {
         $('.right_video').show();
         $('.poll_questions').hide();
      }
  });

  $('#email_question').click(function(){
      if($('.right_video').is(":visible")) {
         $('#email_interaction_at').val($('#time').text());
         $('#email_interaction_at_offset').val($('#time').attr("interaction-offset"));
         $('.added_at').text($('#time').text());
         $('.email_questions').show();
         $("#interaction_items").hide();
      } else {
         $('.right_video').show();
         $('.email_questions').hide();
      }
  });
  
  $('.remove_popup').click(function(){
         $('.open_questions').hide();
         $('.email_questions').hide();
         $('.poll_questions').hide();
         $('.quiz_questions').hide();
         $("#interaction_items").hide();
         playVideo();
  });
  
  $('.spot_question').on('click', function(e){
    e.preventDefault();
    $("#progressBar").removeClass("progress-bar-interaction");
    var id_attr = $(this).attr('id').split('_');
    var id = id_attr[2];
    $(this).addClass("active");
    $(".spot_question_action").find('a').each(function(){$(this).attr("spot_question_id",id)});
    $(".spot_question_action").find('#spot_delete_question').attr("href","/questions/"+id);
    $("#question_spot_time").text(formatTime(id_attr[3]));
    $(".added_at").text(formatTime(id_attr[3]));
    $("#question_spot_time").attr("interaction-offset",id_attr[4]);
    $("#interaction_items").hide();
    $("#spot_interaction_items").show();
    spotProgressBar(id_attr[3]);
    
  });
  
  $('#spot_cancel_question,#interaction_cancel_question').click(function(){
    $("#progressBar").addClass("progress-bar-interaction");
    $(".spot_question").removeClass("active");
    $(".spot_question_action").hide();
    $("#interaction_items").hide();
     playVideo();
  });
  
  $('#spot_edit_question').click(function(){
     if($('.right_video').is(":visible")) {
         var quest_id = $(this).attr("spot_question_id");
         $("#question_"+quest_id).show();
      } else {
         $('.right_video').show();
         $("#question_"+quest_id).show();
      }
  });
  
  $(".remove_edit_popup").click(function(){
     var role = $(this).attr("role");
     //$("#"+role).hide();    
     $("#progressBar").addClass("progress-bar-interaction");
     $(".spot_question").removeClass("active");
     $("#spot_interaction_items").hide();
     $("#interaction_items").hide();
     $('.right_video').show();
     $("#"+role).hide();    
        playVideo();
     
  });
  
  $('.timeline_edit_question').click(function(){
     if($('.right_video').is(":visible")) {
         var quest_id = $(this).attr("spot_question_id");
         var spot_time = $(this).attr("spot_time");
         $("#question_"+quest_id).show();
         spotProgressBar(spot_time);
      } else {
         $('.right_video').show();
         $("#question_"+quest_id).show();
      }
  });
  
});  