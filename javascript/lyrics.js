var alternateTitle;
alternateTitle = true;

function changeTitle() {
  if (!alternateTitle) {
    $("#lyricsTitle").html("All by myself in the ");
    $("#titleImage").attr("src", "image/frame.jpg");
    alternateTitle = true;
  } else {
    $("#lyricsTitle").html("Alone in the Universe");
    $("#titleImage").attr("src", "");
    alternateTitle = false;
  }
}
