import styles from "./styles/main.scss";
import AppState from "./AppState";
import SizingContainer from "./SizingContainer";
import AppHistory from "./AppHistory";
import HoverBar from "./HoverBar";

var state = new AppState;
var container = document.getElementById("container");
var undoButton = document.getElementById("undo");
var redoButton = document.getElementById("redo");

var ctx = new SizingContainer({
	container: container,
	horsizontal: false
});

var hoverBar = new HoverBar({
	container: container,
	thickness: 5
});

var onKeyDown = e => {
	if (e.key == "Control") {
		AppState.set("horizontal", true);
	}
}

var onKeyUp = e => {
	AppState.set("horizontal", false);
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

undoButton.addEventListener("click", e => AppHistory.undo())
