// Define possible user inputs and corresponding bot responses with probabilities
const responses = [
    {
      input: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      response: 'Hello! How can I help you?',
      probability: 0.4
    },
    {
      input: ['help', 'assist', 'assistance'],
      response: 'Sure, I can help you. What do you need assistance with?',
      probability: 0.3
    },
    {
      input: ["many colleges","many college","in samara","in su"],
      response: "There are 9 colleges in SU. College of:<br> 1. E&T<br> 2. Business",
      probability: 0.4
    },
    {
      input: ["many departments","many department","in e&t","in engineering and technology"],
      response: "There are 5 departments in E&T. Department of:<br> 1. ECE<br> 2. Civil Engineering<br> 3. Mechanical Engineering<br> 4. Chemical Engineering<br> 5. Water Engineering",
      probability: 0.4
    },
    {
      input: ["what are books for ece","list ece resources", "list ece books"],
      response: "There're a lot of books for ECE:<br> 1. Digital Design - M. Morris Mano<br> 2. Signals and Systems - Alan V. Oppenheim<br> 3. Electric Circuit - James W. Nillson",
      probability: 0.4
    },
    {
      input: ["digital design","morris"],
      response: "The 'Digital Design' book has 3 editions:<br> 1. 2006 - arround 576 pages<br> 2. 2013 - arround 576 pages<br> 3. 2020 - arround 704 pages<br> <b>The book is located on second floor at the left side in shelf three.</b>",
      probability: 0.4
    },
    {
      input: ["ece books located","find ece","location of ece"],
      response: "The ece books are located on second floor at the left side in shelf three.",
      probability: 0.4
    },
    {
      input: ["civil books located","find civil","location of civil"],
      response: "The civil books are located on third floor at the right side in shelf two.",
      probability: 0.4
    },
    {
      input: ['thank you', 'thanks'],
      response: 'You\'re welcome! I\'m here to help.',
      probability: 0.1
    },
    {
      input: ['goodbye', 'bye', 'see you'],
      response: 'Goodbye! Have a great day!',
      probability: 0.2
    },
    {
      input: ['default'],
      response: 'I\'m sorry, I didn\'t understand. Can you please make/rephrase your message to relate to library specific quieries?',
      probability: 0
    }
  ];
  
function sendMessage() {
  const userInput = document.getElementById('user-input');
  const chatLog = document.getElementById('chat-log');
  const message = userInput.value.trim().toLowerCase();
  const botResponse = getBotResponse(message);
  const userMessage = `<div class="message user-message">${message}</div>`;
  const botMessage = `<div class="message bot-message">${botResponse}</div>`;

  chatLog.innerHTML += userMessage;
  chatLog.innerHTML += botMessage;

  // Clear input field
  userInput.value = '';

  // Scroll to bottom of chat log
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getBotResponse(message) {
  let maxProbability = 0;
  let selectedResponse = '';

  for (const response of responses) {
    const input = response.input;
    const responseText = response.response;
    const probability = response.probability;

    for (const keyword of input) {
      if (message.includes(keyword) && probability > maxProbability) {
        maxProbability = probability;
        selectedResponse = responseText;
      }
    }
  }

  if (selectedResponse === '') {
    selectedResponse = responses.find(response => response.input.includes('default')).response;
  }

  return selectedResponse;
}

// For Image Carousel
document.addEventListener('DOMContentLoaded', function() {
  const carouselImages = document.querySelector('.carousel-images');
  let imageIndex = 0;
  const imageCount = carouselImages.children.length;

  function showImage(index) {
    carouselImages.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextImage() {
    imageIndex = (imageIndex + 1) % imageCount;
    showImage(imageIndex);
  }

  function previousImage() {
    imageIndex = (imageIndex - 1 + imageCount) % imageCount;
    showImage(imageIndex);
  }

  setInterval(nextImage, 5000); // Change image every 3 seconds

  const carousel = document.querySelector('.carousel');
  const carouselControls = document.createElement('div');
  carouselControls.className = 'carousel-controls';

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', nextImage);

  const previousButton = document.createElement('button');
  previousButton.textContent = 'Previous';
  previousButton.addEventListener('click', previousImage);

  carouselControls.appendChild(previousButton);
  carouselControls.appendChild(nextButton);
  carousel.appendChild(carouselControls);
});