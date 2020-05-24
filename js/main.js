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
		option.setAttribute('data-lang', voice.name);
		voiceSelect.appendChild(option);
	})
}

getVoices();
if (synth.onvoiceschanged !== undefined){
	synth.onvoiceschanged = getVoices;
}