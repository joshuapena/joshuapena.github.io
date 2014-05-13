var alternateTitle;
alternateTitle = false;

function changeTitle() {
  if (!alternateTitle) {
    $("#lyricsTitle").html("All By Myself in the ");
    $("#titleImage").attr("src", "image/jpg/universe.jpg");
    alternateTitle = true;
  } else {
    $("#lyricsTitle").html("Alone in the Universe");
    $("#titleImage").attr("src", "");
    alternateTitle = false;
  }
}
