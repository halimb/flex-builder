import styles from "./styles/main.scss";
import App from "./App";
import SizingContainer from "./SizingContainer";
import History from "./History";

let container = document.getElementById("container");
let undoButton = document.getElementById("undo");
let redoButton = document.getElementById("redo");

undoButton.addEventListener("click", e => History.undo());

let init = c => {
    new SizingContainer({ container: c });
    App.init(c);
};

init(container);

