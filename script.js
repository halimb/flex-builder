var count = 0;
var addBtn = document.getElementById("add");
var removeBtn = document.getElementById("remove");
var container = document.getElementById("container");
var items = [];
var handles = [];

function getRandColor() {
	var rgb = [0, 0, 0].map( () => Math.ceil(Math.random() * 255) );
	var color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
	console.log(color);
	return color;
}

function styleItem(item) {
	item.className = "item"
	item.id = `item${count}`
	item.innerHTML = count;
	item.style.flexGrow = 1;
	item.style.background = getRandColor();
}

function appendFlexItem() {
	count++;
	var item = document.createElement("div");
	styleItem(item);
	items.push(item);
	container.appendChild(item);
}

function appendSizingHandle() {
	var handle = document.createElement("div");
	handle.index = count;
	handle.className = "handle";
	handle.onmousedown = onHandleClick;
	handles.push(handle);
	container.appendChild(handle);
}

function removeFlexItem() {
	if (count > 0) {
		container.removeChild(items.pop());
		container.removeChild(handles.pop());
		count--;
	}
}

addBtn.onclick = () => {
	if (count > 0) { appendSizingHandle(); }
	appendFlexItem();
}

removeBtn.onclick = removeFlexItem;

var clicked = false;
var contextSize;

/* Given a target sizing handle index, set: 
 * contextSize: sum of the sizes of the two flex items surrounding the handle
 * nextItem: reference to flex item element directly after the handle
 * precedingItem: reference to flex item element directly before the handle
 * */
function setSizingContext(i) {
	nextItem = items[i];
	precedingItem = items[i - 1];
	console.log(`i = ${i}`)
	contextSize = precedingItem.clientWidth + nextItem.clientWidth;
}

function onHandleClick(e) {
	e.preventDefault();
	console.log("MOUSE CLICK");
	clicked = true;
	var handleIndex = e.target.index;
	setSizingContext(handleIndex);
}

function onMouseUp(e) {
	e.preventDefault();
	console.log("MOUSE UP");
	clicked = false;
}

function onMouseMove(e) {
	e.preventDefault();
	if (clicked && count > 1) {
		var currentPos = e.layerX;
		var precedingItemGrow = 2 * currentPos / contextSize;
		var nextItemGrow = 2 - precedingItemGrow;
		nextItem.style.flexGrow = nextItemGrow;
		precedingItem.style.flexGrow = precedingItemGrow;
	}
}

document.onmousemove = onMouseMove;
document.onmouseup = onMouseUp;
document.onmouseleave = onMouseUp;

