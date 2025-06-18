$(function () {
  
  /* resume_stamp */

  const stamp = document.querySelector('.stamp');
  const section = document.querySelector('.Resume');
  const overlay = document.querySelector('.boarding-text-wrapper');
  const text = document.querySelector(".boarding-line");
  const stampEffect = document.querySelector(".stamp-effect1");
  const waveEffect = document.querySelector(".wave-effect2");

  let typingInterval;
  let i = 0;
  const content = "Boarding complete !\nNow entering the world of design.";

  function clearTyping() {
    clearInterval(typingInterval);
    text.innerHTML = "";
  }

  function resetStampAnimation() {
    clearTyping();
    overlay.classList.remove("on");

    stampEffect.style.opacity = 0;
    waveEffect.style.opacity = 0;

    stampEffect.classList.remove("show");
    waveEffect.classList.remove("show");

    stamp.classList.remove("animate");
    void stamp.offsetWidth;
  }

  function startTyping() {
    i = 0;
    text.innerHTML = "";
    stampEffect.style.opacity = 0;
    waveEffect.style.opacity = 0;

    typingInterval = setInterval(() => {
      if (i >= content.length) {
        clearInterval(typingInterval);

        // 마지막 글자도 빨간색으로 바꾸기
        const allChars = text.querySelectorAll(".char");
        if (allChars.length > 0) {
          allChars[allChars.length - 1].classList.add("red");
        }

        setTimeout(() => {
          overlay.classList.remove("on");
        }, 800);
        return;
      }

      const char = content[i++];

      if (char === "\n") {
        text.appendChild(document.createElement("br"));
      } else {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char");

        // 이전 글자를 빨간색으로
        const prev = text.querySelectorAll(".char");
        if (prev.length > 0) {
          prev[prev.length - 1].classList.add("red");
        }


        text.appendChild(span);

        // 특수 타이밍 이벤트 (예시: 도장 끝나고 wave 등장)
        if (i === "Boarding complete!".length) {
          // boarding complete! 끝난 직후: 도장 이미지 등장
          stampEffect.style.opacity = 1;
          stampEffect.classList.add("show");
        }

        if (i === "Boarding complete!\nNow entering".length) {
          // Now entering 타이핑 시작할 때 wave 등장
          waveEffect.style.opacity = 1;
          waveEffect.classList.add("show");
        }
      }
    }, 150);
  }

 function runResumeAnimation() {
  resetStampAnimation();

  setTimeout(() => {
    stamp.classList.add('animate');
  }, 40);

  setTimeout(() => {
    overlay.classList.add("on");
    startTyping();
  });
}

const resumeRect = section.getBoundingClientRect();
const isInViewport = resumeRect.top < window.innerHeight && resumeRect.bottom > 0;

if (isInViewport) {
  runResumeAnimation();
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runResumeAnimation();
        observer.unobserve(section);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);
}

/*   let hasScrolledIntoStamp = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!hasScrolledIntoStamp) {
          // 처음 들어왔는지 확인
          hasScrolledIntoStamp = true;
          // 메인 페이지에서 너무 위쪽이면 실행 방지
          if (window.scrollY < 500) return;
        }
        resetStampAnimation();

        setTimeout(() => {
          stamp.classList.add('animate');
        }, 80);

        setTimeout(() => {
          overlay.classList.add("on");
          startTyping();
        }, 2100);
      } else {
        resetStampAnimation();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section); */

  // 히스토리 뒤로가기로 복귀할 때도 초기화
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      resetStampAnimation();
    }
  });

  /* Resume 여권 */
  const passportImg = document.querySelector('.Resume_left img');
  const resumeSection = document.querySelector('.Resume');

/*   const passportObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        passportImg.classList.remove('jello-horizontal');
        void passportImg.offsetWidth;
        passportImg.classList.add('jello-horizontal');
      }
    });
  }, { threshold: 0.5 }); */

  setTimeout(() => {
  /*   passportObserver.observe(resumeSection); */
    passportImg.classList.add('jello-horizontal');
    /* right 튀어나오는 애니메이션 */
    passportImg.addEventListener('animationend', function () {
      document.querySelector('.Resume_right').classList.add('show');
    });
  }, 9000);


const stampRight = document.querySelector('.Resume_right');
const stampImg = document.querySelector('img.stamp');

// MutationObserver로 'show' 클래스가 붙는 순간 감지
const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (
      mutation.type === 'attributes' &&
      mutation.attributeName === 'class' &&
      stampRight.classList.contains('show')
    ) {
      setTimeout(() => {
        // 애니메이션 재실행 보장
        stampImg.classList.remove('animate');
        void stampImg.offsetWidth;
        stampImg.classList.add('animate');
      }, 1000);
      observer.disconnect();
    }
  }
});

observer.observe(stampRight, { attributes: true });

});