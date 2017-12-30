import styles from "./styles/main.scss";

//TODO: abstract out the whole thing as a container object

var count = 0;
var items = [];
var handles = [];
var addBtn = document.getElementById("add");
var removeBtn = document.getElementById("remove");
var container = document.getElementById("container");

window.onmouseup = onMouseUp;
window.onmouseleave = onMouseUp;

function getRandColor() {
	var rgb = [0, 0, 0].map( () => Math.ceil(Math.random() * 255) );
	var color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
	return color;
}

function getFlexItem() {
	var item = document.createElement("div");
	item.className = "item"
	item.id = `item${count}`
	item.innerHTML = count;
	item.style.flexGrow = 1;
	item.style.background = getRandColor();
	return item;
}

function appendFlexItem() {
	count++;
	var item = getFlexItem();
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
var handleIndex, 
	totalGrow,
	areaStart,
	areaEnd,
	nextItem, 
	precedingItem, 
	contextSize; 

function getFlexGrow(item) {
	return parseFloat(item.style.flexGrow);
}

function setSizingArea() {
	areaStart = precedingItem.offsetLeft;
	areaEnd = areaStart + nextItem.offsetLeft + nextItem.offsetWidth;
}

/* Given a target sizing handle index, set: 
 * contextSize: sum of the sizes of the two flex items surrounding the handle
 * nextItem: reference to flex item element directly after the handle
 * precedingItem: reference to flex item element directly before the handle
 * */
function initSizingContext(index) {
	nextItem = items[index];
	precedingItem = items[index - 1];
	var precedingItemGrow = getFlexGrow(precedingItem);
	var nextItemGrow = getFlexGrow(nextItem);
	totalGrow = getContextGrow();//precedingItemGrow + nextItemGrow; 
	contextSize = precedingItem.clientWidth + nextItem.clientWidth;
}

// Attach event handlers only to flex items within the sizing context
function setEventHandlers() {
	items.forEach( item => {
		var target = (item == precedingItem || item == nextItem);
		item.onmousemove = target ? onMouseMove : null;
	});
}

function onHandleClick(e) {
	e.preventDefault();
	clicked = true;
	handleIndex = e.target.index;
	initSizingContext(handleIndex);
	setSizingArea();
	setEventHandlers(handleIndex);
}

function onMouseUp(e) {
	e.preventDefault();
	if (clicked && count > 1) {
		clicked = false;
	}
}

function getMousePosition(e) {
	var pos = e.clientX - areaStart;
	if (pos < 0) { 
		pos = 0 
	} else if (pos > areaEnd) {
		pos = areaEnd;
	}
	return pos;
}

function onMouseMove(e) {
	e.preventDefault();
	if (clicked && count > 1) {
		var currentPos = getMousePosition(e);
		var precedingItemGrow = totalGrow * currentPos / contextSize;
		var nextItemGrow = totalGrow - precedingItemGrow;
		nextItem.style.flexGrow = nextItemGrow;
		precedingItem.style.flexGrow = precedingItemGrow;
		//logItemsGrow();
	}
}

function logItemsGrow() {
	var c = 1;
	var log = "";
	items.forEach(i => log += `${c++} = ${getFlexGrow(i).toFixed(2)}, `);
	console.log(log);
}

function getContextGrow(index) {
	var total = 0;
	for(let i = 0; i < items.length; i++) {
		var item = items[i];
		if(item != nextItem && item != precedingItem) {
			total += getFlexGrow(item);
		}
	}
	var res = items.length - total + handles.length * .05;
	return res > 0 ? res : 0;
} 


