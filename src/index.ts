import SwearingDetector from "./SwearingDetector";
import './public/styles.css';

const languageSelect = document.getElementById('language') as HTMLSelectElement;

if (('webkitSpeechRecognition' in window)) {
    const rec = new SwearingDetector();

    languageSelect.onchange = (e: Event) => {
        const selectedLanguage = (e.target as HTMLSelectElement).value;

        if (selectedLanguage) {
            rec.start(selectedLanguage);
        } else {
            rec.stop()
        }
    };

} else {
    languageSelect.disabled = true;
}
