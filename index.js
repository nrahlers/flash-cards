const questionSelector = document.getElementById("question");
const answerSelector = document.getElementById("answer");
const exampleSelector = document.getElementById("example");
const linkSelector = document.getElementById("link");
const wrongCountSelector = document.getElementById("wrong-count");
const correctCountSelector = document.getElementById("correct-count");

let config = {
  questions: getQuestions(),
  correctCount: 0,
  wrongCount: 0,
  currentQuestion: 0,
};

let showingQuestion = true;
let started = false;
let shownAnswer = false;
let finished = false;

function start() {
  started = true;
  let count = 0;
  for (let question of config.questions) {
    question.id = count++;
  }
  config.questions = shuffleArray(config.questions);
  showNextQuestion(true);
}

function showNextQuestion(start = false) {
  if (!start) {
    config.currentQuestion++;
  }
  if (config.currentQuestion >= config.questions.length) {
    return gameOver();
  }
  questionSelector.innerHTML = `Question : 
    ${config.questions[config.currentQuestion].question}`;
}

function gameOver() {
  finished = true;
  //todo add metrics
}

function showHideAnswer(show) {
  if (show && !finished) {
    answerSelector.innerHTML = `Answer : 
        ${config.questions[config.currentQuestion].answer}`;
    exampleSelector.innerHTML = `Example: 
        ${config.questions[config.currentQuestion].examples}`;
    linkSelector.innerHTML = `Link: 
       <a target="#" href="${config.questions[config.currentQuestion].link}">${
      config.questions[config.currentQuestion].link
    }</a>`;
    return;
  }
  answerSelector.innerHTML = ``;
  exampleSelector.innerHTML = ``;
  linkSelector.innerHTML = ``;
}

function toggleQuestion(element, override = null) {
  if (!started) {
    return;
  }

  if (showingQuestion || override) {
    element.innerHTML = "Show Answer";
    showingQuestion = true;
    showHideAnswer(true);
    return;
  }

  element.innerHTML = "Show Question";
  showingQuestion = false;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function logAnswer(correct) {
  if (!started) {
    return;
  }
  showHideAnswer(false);
//   toggleQuestion(document.getElementById("showAnswerToggle"), false);
  if (correct) {
    config.correctCount++;
    updateScore();
    showNextQuestion();
    return;
  }
  config.wrongCount++;
  showNextQuestion();
  updateScore();
}

function updateScore() {
  if (finished) {
    return;
  }
  wrongCountSelector.innerHTML = config.wrongCount;
  correctCountSelector.innerHTML = config.correctCount;
}

function getQuestions() {
  return [
    {
      question: "What is an html element?",
      answer:
        "An HTML element is defined by a starting tag. If the element contains other content, it ends with a closing tag, where the element name is preceded by a forward slash as shown below with few tags",
      examples: `<*div*><*/div*> <*p*>I am an element<*/p*>`,
      link: `https://www.tutorialspoint.com/html/html_elements.htm`,
    },
    {
      question: "What is a Javascript Function?",
      answer:
        "a set of statements that performs a task or calculates a value, but for a procedure to qualify as a function, it should take some input and return an output where there is some obvious relationship between the input and the output",
      examples: `function doSomething(name){ 
                  console.log(name) 
              };`,
      link: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#:~:text=A%20function%20in%20JavaScript%20is,the%20input%20and%20the%20output`,
    },
    {
      question: "What is an html class? where does it go?",
      answer:
        "The class global attribute is a space-separated list of the case-sensitive classes of the element. Classes allow CSS and Javascript to select and access specific elements via the class selectors or functions like the DOM method document",
      examples: `<*div class="my-class*><*/div*> or in css .my-class{css...}`,
      link: `https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class#:~:text=Jump%20to%20section,like%20the%20DOM%20method%20document.`,
    },
    {
      question: "How do you call a function?",
      answer:
        "functionName(). Do not forget the () after the function name. If you do forget it that will only get the function not call it.",
      examples: `hello(), callTheFunction(true, 1 ,false, 2.3,)`,
      link: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call`,
    },
    {
      question: "How do you declare a variable in JS?",
      answer:
        "let || var || const variableName = value. Value can be an object, class, string, int, bool etc.",
      examples: `let myVar = 1; const name = "do not change me";`,
      link: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var`,
    },
    {
      question: "What is the best site to find solutions to problems?",
      answer: "StackOverflow",
      examples: `BECAUSE!`,
      link: `https://stackoverflow.com/`,
    },
    {
      question: "How do you get an html element in JS?",
      answer: "document.getElementById('id-of-the-element')",
      examples: `document.getElementById('my-element')`,
      link: `https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById`,
    },
    {
      question:
        "How do you set the html inside of a div (html element) using javascript?",
      answer:
        "Lots of ways. 1. .innerHtml(), .append() these are just two ways there are many many more.",
      examples: `document.getElementById('my-element').innerHtml = '<*div*>hello world<*/div*>`,
      link: [
        `https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append`,
        `https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML`,
      ],
    },
    {
      question:
        "How do you call a function from an html element when the element is clicked?",
      answer:
        "onClick='fucntionName(). There are so many more things then just on click, mouseOver, unfocus, onFocus, etc...",
      examples: `<*div onClick='buyItem()'*><*/div*>`,
      link: `https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick`,
    },
    {
      question: "This is aplace holder question",
      answer: " this is a placeholder answer  ",
      examples: `asdf `,
      link: `asdf `,
    },
  ];
}
