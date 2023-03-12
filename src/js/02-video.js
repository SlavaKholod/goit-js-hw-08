import Player from '@vimeo/player';
import trottle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const SAVED_TIME = 'videoplayer-current-time';
updateTimePlay();

player.on('timeupdate', trottle(timeCalc, 1000));

function timeCalc() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(SAVED_TIME, seconds);
    })
    .catch(function (error) {
      // an error occurred
    });
}

function updateTimePlay() {
  if (localStorage.getItem(SAVED_TIME)) {
    player.setCurrentTime(localStorage.getItem(SAVED_TIME));
  }
}
