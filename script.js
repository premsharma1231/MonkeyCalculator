let historyList = document.getElementById('history-list');
let history = [];
let input = document.getElementById('input');
let historyContainer = document.getElementById('history-container');
let toggleHistoryBtn = document.getElementById('toggle-history-btn');
let appendToChild = (value) =>{
    if (input.value === "0" && value !== ".") {
        input.value = value; // Replace 0 if it's the first input
    } else if (/[\+\-\*\/]$/.test(input.value) && /[\+\-\*\/]/.test(value)) {                
        return;
    } else {
        input.value += value;
    }
}

let deleteLastInput = () =>{
    input.value = input.value.toString().slice(0,-1) || 0;
}
let deleteAllData = () =>{
    input.value = "";
}
let TotalWork = () => {
    try {
        let expression = input.value;
        let result = eval(expression.replace(/[^-()\d/*+.]/g, '')) || "0";
        input.value = result;

        // Save the calculation in history
        history.push(`${expression} = ${result}`);
        updateHistory(); // Update the history display
    } catch (e) {
        input.value = "Error";
    }
}


let updateHistory = () => {
    historyList.innerHTML = ''; // Clear existing history

    // Loop through history array and display each calculation
    history.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

    const handleKeyPress = (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        appendToChild(key);
    } else if (key === "+") {
        appendToChild('+');
    } else if (key === "-") {
        appendToChild('-');
    } else if (key === "*") {
        appendToChild('*');
    } else if (key === "/") {
        appendToChild('/');
    } else if (key === "Enter") {
        TotalWork();
    } else if (key === ".") {
        appendToChild('.');
    } else if (key === "Backspace") {
        deleteLastInput();
    } else if (key === "Escape") {
        deleteAllData();
    }
}
document.addEventListener('keydown', handleKeyPress);

const toggleHistory = () => {
    historyContainer.classList.toggle('active'); // Toggle class for animation
    if (historyContainer.classList.contains('active')) {
        toggleHistoryBtn.textContent = 'Hide History'; // Update button text
    } else {
        toggleHistoryBtn.textContent = 'Show History';
    }
}

document.addEventListener('keydown', handleKeyPress);