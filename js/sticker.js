$(function () {
const plane = document.getElementById("plane");
    let mouseX = 0;
    let mouseY = 0;
    let planeX = window.innerWidth / 2;
    let planeY = window.innerHeight / 2;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function movePlane() {
      planeX += (mouseX - planeX) * 0.1;
      planeY += (mouseY - planeY) * 0.1;

      plane.style.left = `${planeX}px`;
      plane.style.top = `${planeY}px`;

      requestAnimationFrame(movePlane);
    }
    movePlane();

    // 총알 만들기
    const bullets = [];

    document.addEventListener("click", () => {
      const bullet = document.createElement("div");
      bullet.classList.add("bullet");
      bullet.style.left = `${planeX + 25}px`;
      bullet.style.top = `${planeY - 10}px`;
      document.body.appendChild(bullet);
      bullets.push(bullet);
    });

    // 총알 움직임
    function moveBullets() {
      bullets.forEach((b, i) => {
        b.style.top = `${b.offsetTop - 10}px`;
        if (b.offsetTop < -20) {
          b.remove();
          bullets.splice(i, 1);
        }
      });
      requestAnimationFrame(moveBullets);
    }
    moveBullets();
    


/* sticker_book */
const clickMe = document.querySelector('.click-me-text');
  const stickerSection = document.querySelector('.sticker_book');

  window.addEventListener('scroll', () => {
    const sectionTop = stickerSection.offsetTop;
    const sectionHeight = stickerSection.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 스크롤 위치가 sticker_book 영역에 들어왔을 때만 표시
    if (scrollY + windowHeight > sectionTop + 100 && scrollY < sectionTop + sectionHeight) {
      clickMe.style.display = 'block';
    } else {
      clickMe.style.display = 'none';
    }
  });

//클릭시 말풍선 등장
const character = document.querySelector('.character');
const bubble = document.querySelector('.speech-bubble');

character.addEventListener('click', () => {
  bubble.classList.toggle('show');
  bubble.classList.remove('hidden');
});

// li 클릭
const skillItems = document.querySelectorAll('.sticker-left ul li');
const flowerBubble = document.querySelector('.flower-bubble');
const flowerText = document.querySelector('.flower-text');

const leftWrapper = document.querySelector('.sticker-left');
const skilldescriptions = [
  "", 
  "", 
  "", 
  ""
];

skillItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const rect = item.getBoundingClientRect();
    const wrapperRect = leftWrapper.getBoundingClientRect();

    const top = rect.top - wrapperRect.top - 500; //li 위쪽에 띄우기
    const left = rect.left - wrapperRect.left + (rect.width / 1.0) - (flowerBubble.offsetWidth / 2);

    flowerBubble.style.bottom = `${top}px`;
    flowerBubble.style.left = `${left}px`;
    
    flowerText.textContent = skilldescriptions[index];
    flowerBubble.classList.add('active');

    //자동으로 사라지게 (선택사항)
    setTimeout(() => {
      flowerBubble.classList.remove('active');
    }, 3000);
  });
});

/* sticker_right 클릭시 p등장 */
document.querySelectorAll('.sticker-right .sticker').forEach((sticker) => {
  sticker.addEventListener('click', () => {
    sticker.classList.toggle('active');
/*     setTimeout(() => {
      sticker.classList.remove('active');
    },3000); */ //3초후 사라짐
  });
});


/* right_img popup */
const stickers = document.querySelectorAll('.sticker-right .sticker');
const popup = document.getElementById('stickerPopup');
const popupText = document.getElementById('popupText');
const popupOverlay = document.getElementById('popupOverlay');

// 각 스티커에 대한 설명 텍스트 배열
const stickerDescriptions = [
  "상황을 관찰하고, 유연하게 풀어낼 줄 압니다.",
  "틀 밖에서 생각하고, 틀 안까지 세심하게 설계합니다.",
  "좋은 결과는 팀워크와 리더십에서 시작된다고 생각합니다.",
  "시간 관리는 기본! 효율적인 스타일",
  "스토리를 담은 디자인으로 영감을 주고 소통하고 싶습니다.",
  "작은 디테일에서부터 사용자 경험과 감정을 만든다고 믿습니다.",
  "일상의 작은 순간에서 영감을 찾습니다.",
  "디자인은 나를 표현하는 또 하나의 언어라고 생각합니다."
];

// 닫기 함수
function closePopup() {
  popup.classList.remove('show');
  popupOverlay.classList.remove('show');
}

// 팝업, 배경 클릭 시 닫힘
popup.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);


// 스티커 클릭 이벤트
stickers.forEach((sticker, index) => {
  sticker.addEventListener('click', () => {
    // p 태그 등장
    sticker.classList.add('active');

    // popup은 약간 딜레이 후 등장 (p 태그 등장 이후)
    setTimeout(() => {
      popupText.textContent = stickerDescriptions[index];
      popup.classList.add('show');
      popupOverlay.classList.add('show');
      // setTimeout(closePopup, 2000); // 자동 닫힘
    }, 500); // p가 자연스럽게 등장하고 나서 팝업 등장
  });
});
});