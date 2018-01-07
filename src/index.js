import styles from "./styles/main.scss";
import AppState from "./AppState";
import SizingContainer from "./SizingContainer";
import HoverBar from "./HoverBar";

// //TODO: abstract out the whole thing as a container object

var state = new AppState;
var container = document.getElementById("container");

var ctx = new SizingContainer({
	container: container,
	horsizontal: false
});

var hoverBar = new HoverBar({
	container: container,
	thickness: 5
});

var onKeyDown = e => {
	console.log("inside onKeyDown");
	if (e.key == "Control") {
		console.log("Control");
		AppState.set("horizontal", true);
	}
}

var onKeyUp = e => {
	console.log("inside onKeyUp");
	AppState.set("horizontal", false);
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
