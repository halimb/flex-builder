import styles from "./styles/main.scss";
import App from "./App";
import SizingContext from "./SizingContext";
import History from "./History";

let container = document.getElementById("container");
let undoButton = document.getElementById("undo");
let redoButton = document.getElementById("redo");

let onBackHistoryChange = backHistory => {
	undoButton.className = backHistory ? "btn-active" : "btn-inactive";
}

let onForwardHistoryChange = forwardHistory => {
	redoButton.className = forwardHistory ? "btn-active" : "btn-inactive";
}

App.subscribe("backHistory", onBackHistoryChange);
App.subscribe("forwardHistory", onForwardHistoryChange);

undoButton.addEventListener("click", e => App.undo());

let init = c => {
    new SizingContext({ container: c });
    App.init(c);
    App.saveState();
};

init(container);

