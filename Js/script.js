const typingtest = document.querySelector(".typing-test p"),
  inputfield = document.querySelector(".wraper .input-field"),
  TimeTag = document.querySelector(".Time span b");
CPMtag = document.querySelector(".CPM span");
WPMtag = document.querySelector(".WPM span");
TryAgain = document.querySelector("button");
mistakesTag = document.querySelector(".Mistakes span");

let timer,
  maxtimer = 60,
  timeleft = maxtimer,
  charIndex = mistakes = isTyping = 0;

const randomParagraph = () => {
  
  let randompara = Math.floor(Math.random() * paragraphs.length);
  typingtest.innerHTML = "";
  paragraphs[randompara].split("").forEach((span) => {
    let spantag = `<span>${span}</span>`;
    typingtest.innerHTML += spantag;
  });

  typingtest.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => {
    inputfield.focus();
  });
  typingtest.addEventListener("click", () => {
    inputfield.focus();
  });
};


function initCharecter() {
  const chareter = typingtest.querySelectorAll("span");
  let inputChar = inputfield.value.split("")[charIndex];
 
  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  

  if (charIndex < chareter.length - 1 && timeleft > 0) {
    if (inputChar == null) {
      charIndex--;
      if (chareter[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      chareter[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (inputChar === chareter[charIndex].innerText) {
        chareter[charIndex].classList.add("correct");
      } else {
        mistakes++;
        chareter[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    chareter.forEach((span) => {
      span.classList.remove("active");
    });
    chareter[charIndex].classList.add("active");
    mistakesTag.innerText = mistakes;

    let CPM = charIndex - mistakes;
    CPMtag.innerText = CPM;

    let WPM = Math.round(
      ((charIndex - mistakes) / 5 / (maxtimer - timeleft)) * 60
    );
    WPM = WPM < 0 || WPM === Infinity || !WPM ? 0 : WPM;
    WPMtag.innerText = WPM;
  } else {
    clearInterval(timer);
    inputfield.value = "";
  }
}

function initTimer() {
  if (timeleft > 0) {
    timeleft--;
    TimeTag.innerText = timeleft;
  } else {
    clearInterval(timer);
  }
}

function resetGame(){
  randomParagraph();
  inputfield.value = "";
  clearInterval(timer);
  timeleft = maxtimer,
  charIndex = mistakes = isTyping = 0;
  mistakesTag.innerText = mistakes;
  TimeTag.innerText = timeleft;
  CPMtag.innerText = 0;
  WPMtag.innerText = 0;
}

randomParagraph();
inputfield.addEventListener("input", initCharecter);
TryAgain.addEventListener("click",resetGame);

