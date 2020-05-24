//Init Variables - Synth API
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//Init Voice Arrays
let voices = [];


const getVoices = () => {
	voices = synth.getVoices();
	
	// Loop through Voices and Create Options for Each Voice
	voices.forEach((voice) => {
		//Create Option Element
		const option = document.createElement('option');

		//Fill Option with Voice
		option.textContent = voice.name + '('+ voice.lang +')';

		//Set Needed Option Atributes
		option.setAttribute('data-lang', voice.lang);
		option.setAttribute('data-name', voice.name);
		voiceSelect.appendChild(option);
	})
}

getVoices();
if (synth.onvoiceschanged !== undefined){
	synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
	
	//Check if Speaking
	if(synth.speaking) {
		console.error("Already Speaking");
		return;
	}
	if(textInput.value !== '') {

		// Get Speak Text
		const speakText = new SpeechSynthesisUtterance(textInput.value);

		//Speak End
		speakText.onend = e => {
			console.log('Done Speaking....');
		}

		//Speak Error
		speakText.onerror = e => {
			console.error("Somenthing Went Wrong");
		}

		//Selected Voice
		const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

		// Loop through Voices
		voices.forEach(voice => {
			if (voice.name === selectedVoice) {
				speakText.voice = voice;
			}
		});

		//Set Pitch and Rate
		speakText.rate = rate.value;
		speakText.pitch = pitch.value;

		//Speak the Text
		synth.speak(speakText);
	}
};

//Event Listeners

//Text Form Submit
textForm.addEventListener('submit', e => {
	e.preventDefault();
	speak();
	textInput.blur();
});

//Rate Value Change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

//Pitch Value Change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//Voice Select Change
voiceSelect.addEventListener('change', e => speak());
