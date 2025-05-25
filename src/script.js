const playBtn = document.getElementById('music-play');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const progressBar = document.getElementById('music-progress');
const timeLabel = document.getElementById('music-time');

const audio = document.getElementById('bg-music');

audio.volume = 0.01;

function updateIcons() {
    if (!audio.paused) {
        iconPlay.style.display = 'none';
        iconPause.style.display = '';
    } else {
        iconPlay.style.display = '';
        iconPause.style.display = 'none';
    }
}

playBtn.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updateIcons();
});

document.addEventListener('DOMContentLoaded', function() {
    audio.play().catch(() => {});
    updateIcons();
});

audio.addEventListener('play', updateIcons);
audio.addEventListener('pause', updateIcons);

audio.addEventListener('loadedmetadata', function() {
    progressBar.max = audio.duration || 100;
    timeLabel.textContent = '0:00 / ' + formatTime(audio.duration || 0);
});

audio.addEventListener('timeupdate', function() {
    progressBar.value = audio.currentTime;
    timeLabel.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration || 0);
});

progressBar.addEventListener('input', function() {
    audio.currentTime = progressBar.value;
});

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}