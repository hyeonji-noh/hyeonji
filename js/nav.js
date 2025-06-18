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


/* 메인 가방 텍스트 타이핑 관련 */
    let typingIntervals = [];

    function clearTypingIntervals() {
        typingIntervals.forEach(interval => clearInterval(interval));
        typingIntervals = [];
}

    function startMainAnimation() {
        clearTypingIntervals();

    // 텍스트 초기화
    $('#text1, #text2, #text3, #text4').text('');

    // 아이템 초기화
    const items = ['.item1', '.item2', '.item3', '.item4'];

    items.forEach((selector, index) => {
    setTimeout(() => {
        const $el = $(selector);
        $el.fadeTo(300, 1);
        $el.addClass(`shake${index + 1}`); // 각기 다른 흔들림
    }, 500 + index * 300);
});

    // 가방 초기화
    $('.bag').stop(true, true).css({ opacity: 0 });

    // 1. 가방 등장
    $('.bag').fadeTo(800, 1);

    // 2. 텍스트 타이핑
    function typeText(element, text, speed, callback) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, speed);
        typingIntervals.push(interval);
    }

    typeText($('#text1'), "What’s", 150, function () {
        typeText($('#text2'), "in", 150, function () {
            typeText($('#text3'), "my", 150, function () {
                typeText($('#text4'), "bag?", 150);
            });
        });
    });

    // 3. 아이템 등장 애니메이션
    items.forEach((selector, index) => {
        setTimeout(() => {
            const $el = $(selector);
            $el.fadeTo(300, 1).addClass('item-appear');
            setTimeout(() => {
                $el.removeClass('item-appear');
            }, 400);
        }, 500 + index * 300);
    });

    // 4. Resume로 스크롤
    setTimeout(() => {
        document.querySelector('.Resume')?.scrollIntoView({ behavior: 'smooth' });
    }, 1800 + 1200);
}

// 페이지 로드시 자동 실행
    startMainAnimation();

// 햄버거 클릭 시 재진입
$('.ham').click(function () {
    $('.main_bag').addClass('on'); // 보이게만 하고
    startMainAnimation();          // 초기화 및 애니메이션 모두 여기서 처리
});

});