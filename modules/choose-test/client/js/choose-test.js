/** **/
/** **/

$(".start-test").click(function () {
	var subj = $(this).data("test-subj");
	$("#test-subject-msg").text(subj);
	$(".test-select-overlay").fadeIn();
});

$("#confirm-test-selection").click(function () {
	var activeSubj = $("#test-subject-msg").text();
	$(".test-select-overlay").fadeOut();
	$("#active-test-subj").text(activeSubj);
	$(".active-test-overlay").fadeIn();
});

$("#cancel-test-selection").click(function () {
	$(".test-select-overlay").fadeOut();
});

$("#close-test").click(function () {
	$(".active-test-overlay").fadeOut();
});