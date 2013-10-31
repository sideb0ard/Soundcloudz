$(document).ready(function(){

  var getTrackz = function(){
    var tagsz = $('input#tags_id').val();
    if (tagsz == '') {
      $('#trackzDisplay').html("<h2>Nah, mate, enter some tags data.</h2>");
    } else {
      $('#trackzDisplay').html("<h2>Finding some quality m00sics..</h2>");
      var tagz_array = tagsz.split(",");
      srch_tag = encodeURI(tagz_array[0]);
      SC.get('/tracks', {q:'*', tags: srch_tag, limit: 200}, function(tracks) {
        console.log(tracks);
        var display_limit = 10;
        var counter = 0;
        $.each(tracks, function(index,value) {
          if(counter >= display_limit) return false;
          if (tagz_array.length > 1) {
            for(var i = 1; i < tagz_array.length; i++) {
              console.log(tagz_array[i]);
              var regExx = new RegExp(tagz_array[i], "i");
              var found = value['tag_list'].match(regExx);
              if ( found === null ) {
                console.log("INDEX: " + index + "NULL - can't find " + tagz_array[i] + " in " + value['tag_list'] + " - SKIPPING!");
                  return true; // keep going to next .each
              }
            }
          }
          console.log(value['tag_list']);
          $('#trackzDisplay').append("<p id=\"trk_" + index + "\"> \
                      <script type=\"text/JavaScript\"> \
                      SC.oEmbed(\"" + value.permalink_url + "\", {auto_play: false, width: \"100%\"}, \
                      document.getElementById(\"trk_" + index + "\")); </script><br/>");
          $('#trackzDisplay').append("<div class=\"tag\">" + value['tag_list'] + "</div></p>");
          counter++;
        });
        console.log("AMOUNT OF TRACKS ON PAGE - " + $("#trackzDisplay > p").size());
        console.log("finished?");
        if ($("#trackzDisplay > p").size() < 1) {
          $('#trackzDisplay').html("<h2>Sorry bud, nae tracks match dem tags ..</h2>");
         } else {
          $('#trackzDisplay').prepend("<h2>Yer Sounds....</h2>");
        };
      });
    }
    return false;
  }

  $(".button").click(getTrackz);
  $("input#tags_id").keyup(function(event){
    if(event.keyCode == 13){
      getTrackz();
    }
  });

});

