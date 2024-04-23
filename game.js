window.onload = () => {
    loadGameData("1");  
};

function loadGameData(scenarioId) {
    fetch('data.json')
        .then(response => response.json())
        .then(json => displayGameScenario(json[scenarioId]));
}

function displayGameScenario(scenario) {
    const storyElement = document.getElementById('story');
    storyElement.innerHTML = `<p>${scenario.description}</p>`;

    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';  

    if (scenario.choices) {
        Object.entries(scenario.choices).forEach(([key, choice]) => {
            let button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => loadGameData(choice.next);
            choicesContainer.appendChild(button);
        });
    } else if (scenario.riddleAnswer) {
        let input = document.createElement('input');
        let submit = document.createElement('button');
        let message = document.createElement('p');
        message.id = 'message';
        submit.textContent = "Answer";
        submit.onclick = () => {
            if (input.value.toLowerCase() === scenario.riddleAnswer.toLowerCase()) {
                loadGameData(scenario.nextSuccess);
            } else {
                document.getElementById('message').textContent = "Incorrect. Try again!";
            }
        };
        choicesContainer.appendChild(input);
        choicesContainer.appendChild(submit);
        choicesContainer.appendChild(message);
    } else if (scenario.tokenAnswer) {
        let input = document.createElement('input');
        let submit = document.createElement('button');
        let message = document.createElement('p');
        message.id = 'message';
        submit.textContent = "Insert Token";
        submit.onclick = () => {
            if (input.value.toLowerCase() === scenario.tokenAnswer.toLowerCase()) {
                loadGameData(scenario.nextSuccess);
            } else {
                document.getElementById('message').textContent = "Incorrect. Try again!";
            }
        };
        choicesContainer.appendChild(input);
        choicesContainer.appendChild(submit);
        choicesContainer.appendChild(message);
    }
}
