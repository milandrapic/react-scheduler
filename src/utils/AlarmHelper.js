const alarmAudio = ['/mixkit-correct-answer-reward-952.mp3',
                    '/mixkit-happy-bells-notification-937.mp3',
                    '/mixkit-musical-reveal-961.mp3',
                    '/mixkit-positive-notification-951.mp3'];

const sounds = {
    start: '/mixkit-quick-win-video-game-notification-269.mp3',
    pause: '/mixkit-select-click-1109.mp3',
    clear: '/mixkit-click-error-1110.mp3'
}

function playSound (path, volume=0.4) {
    let audio = new Audio(path);
    audio.volume = volume;
    audio.play();
  }

export const playAudio = (action, alarm=0) => {
    switch(action){
        case "start":
            playSound(sounds.start);
            break;
        case "pause":
            playSound(sounds.pause);
            break;
        case "clear":
            playSound(sounds.clear);
            break;
        case "alarm":
            playSound(alarmAudio[alarm]);
            break;
        default:
            playSound(alarmAudio[0]);
            break;
    }
}