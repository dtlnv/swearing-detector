export default class SwearingDetector {
    private started: boolean = false;
    private recognition: SpeechRecognition;
    private audio: HTMLAudioElement = new Audio('beep.mp3');

    constructor() {
        this.setup();
    }

    setup() {
        this.recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = window.navigator.language;
        this.recognition.onresult = this.onResult.bind(this);
        this.recognition.onend = () => this.recognition.start();
    }

    start(lang?: string) {
        if (this.started) {
            this.stop();
            this.setup();
        } else {
            this.started = true;
        }

        if (lang) {
            this.recognition.lang = lang;
        }

        this.recognition.start();
    }

    stop() {
        this.recognition.onend = null;
        this.recognition.stop();
        this.recognition = null;
    }

    onResult(event: SpeechRecognitionEvent) {
        let transcript: string = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i][0].confidence < 0.01) {
                transcript += event.results[i][0].transcript.toLowerCase();
            }
        }

        if (this.isBadWord(transcript)) {
            this.showProtest();
        }
    }

    isBadWord(word: string): boolean {
        return word.length > 0 && word.includes('*');
    }

    showProtest() {
        this.audio.play();

        document.body.style.background = '#f44242';
        setTimeout(function () {
            document.body.style.background = '#ffffff';
        }, 1500);
    }
}
