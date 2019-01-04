'use strict';

console.log('极客播: 已经加载');
setTimeout(() => {
  // Get Element
  let breakTimer;
  const curAudio = document.getElementsByTagName('audio')[0];
  if(curAudio) {
    curAudio.setAttribute('controls', true);
    // Binding shortcuts
    document.onkeypress = (e) => {
      if(e.isTrusted && e.key === 'q') {
        if(!curAudio.src.startsWith('blob:')) {
          document.getElementsByClassName('btn-play')[0].click();

          chrome.storage.sync.get([
            location.pathname
          ], function(result) {
            if(result[location.pathname]) {
              curAudio.currentTime = result[location.pathname]
            }
          });

          breakTimer = setInterval(() => {
            chrome.storage.sync.set({
              [location.pathname]: curAudio.currentTime
            });
          }, 3e3);
          return;
        }

        if(curAudio.paused) {
          curAudio.play();
        } else {
          curAudio.pause();
        }
      }
    }

    console.log('极客播: 元素绑定成功, 通过 q 来播放/暂停，拥有断点续播功能');
  } else {
    console.log('极客播: 没有发现 Audio 元素');
  }
}, 1e3);