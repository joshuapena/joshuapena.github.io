function enterPage() {
	var name;
	name = $("#name").val();
	$("#welcome").html("Welcome " + name);
	$("#nameText").fadeOut();
	$("#name").fadeOut();
	$("#enter").fadeOut();
}