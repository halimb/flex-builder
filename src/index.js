import styles from "./styles/main.scss";
import SizingContainer from "./SizingContext";
import HoverBar from "./HoverBar";

// //TODO: abstract out the whole thing as a container object

var container = document.getElementById("container");

var ctx = new SizingContainer({
	container: container,
	horsizontal: false
});

var hoverBar = new HoverBar({
	container: container,
	thickness: 10
});