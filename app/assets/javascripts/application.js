//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .

document.addEventListener("turbolinks:load", function() {
  $('.archive').click(function() {
    Turbolinks.visit('/notifications/'+$(this).val()+'/archive'+location.search)
  });
  $('.unarchive').click(function() {
    Turbolinks.visit('/notifications/'+$(this).val()+'/unarchive'+location.search)
  });
  $('.toggle-star').click(function() {
    $(this).toggleClass("star-active star-inactive")
    $.get('/notifications/'+$(this).data('id')+'/star')
  });

  // Set current notification for navigation
  $('.table-notifications tbody tr').first().find("td").first().addClass("current");
});

// Add key events only once

$( document ).ready(function() {
  $(document).keydown(function(e) {
    if ( e.which == 74 ) {  // j
      current = $('td.current');
      next = $(current).parent().next();
      if(next.length > 0) {
        $(current).removeClass("current");
        $(next).find('td').first().addClass("current");
      }
    }
    if ( e.which == 75 ) { // k
      current = $('td.current');
      prev = $(current).parent().prev();
      if(prev.length > 0) {
        $(current).removeClass("current");
        $(prev).find('td').first().addClass("current");
      }
    }
    if ( e.which == 83 ) { // s
      $('td.current').parent().find('.toggle-star').click();
    }
    if ( e.which == 89 ) { // y
      $('td.current').parent().find('.archive').click();
    }
    if ( e.which == 13 || e.which == 79 ) { // Enter | o
      e.preventDefault();
      $('td.current').parent().find('.link')[0].click();
    }
    if ( e.which == 191 ) { // ?
      $("#help-box").modal();
    }
    if ( e.which == 190 || e.which == 82) { // . | r
      $("a.sync").click();
    }
  });
});

$(document).on('click', '[data-toggle="offcanvas"]', function () {
  $('.row-offcanvas').toggleClass('active')
});

if(!('ontouchstart' in window))
{
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
}
