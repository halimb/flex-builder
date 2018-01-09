import styles from "./styles/main.scss";
import App from "./App";
import SizingContainer from "./SizingContainer";
import History from "./History";
import HoverBar from "./HoverBar";

var container = document.getElementById("container");
var undoButton = document.getElementById("undo");
var redoButton = document.getElementById("redo");

undoButton.addEventListener("click", e => History.undo())

var app = new App(container);
