$(function () {

  const contactSection = $('.contact_main');
  const $hamBtn = $('nav button.ham');  // 햄버튼 선택

  function resetColors() {
    $('.cell').removeClass('highlight-orange highlight-mint');
  }

  function animateCells() {
    // 애니메이션 시작 시 햄버튼 사라짐
    $hamBtn.fadeOut();

    // 첫 번째 줄 주황색 칠하기
    $('.row1 .cell').each(function (index) {
      setTimeout(() => {
        $(this).addClass('highlight-orange');
      }, index * 250);
    });

    // 두 번째 줄 민트색 칠하기 (9개 셀은 민트색, 마지막은 주황색)
    $('.row2 .cell').each(function (index) {
      if (index < 9) {
        setTimeout(() => {
          $(this).addClass('highlight-mint');
        }, (10 + index) * 250);
      } else if (index === 9) {
        setTimeout(() => {
          $(this).removeClass('highlight-mint').addClass('highlight-orange');
        }, 2500);
      }
    });

    // 세 번째 줄 1~6열 민트색 칠하기
    $('.row3 .cell').each(function (index) {
      setTimeout(() => {
        if (index < 6) {
          $(this).addClass('highlight-mint');
        }
      }, (20 + index) * 250);
    });

    // 네 번째 줄 1~4열 민트색 칠하기
    $('.row4 .cell').each(function (index) {
      if (index < 4) {
        setTimeout(() => {
          $(this).addClass('highlight-mint');
        }, (26 + index) * 250);
      }
    });

    // 애니메이션 끝난 후 팝업 띄우고 햄버튼은 숨긴 채 유지
    setTimeout(() => {
      $('.popup-overlay').fadeIn();
      $('.popup-letter').show().addClass('show');
      // 여기서 햄버튼은 아직 안나타나도록 유지
    }, 8400);
  }

  function checkBingoComplete() {
    // 기존 함수는 팝업 띄우는 기능인데 지금은 animateCells 내부에서 실행함
  }

  // 팝업 오버레이 클릭 시 닫기 & 햄버튼 다시 보이게 하기
  $(document).on('click', '.popup-overlay', function () {
    $('.popup-overlay').fadeOut();
    $('.popup-letter').removeClass('show').fadeOut();

    // 팝업 닫힐 때 햄버튼 다시 나타나기
    $hamBtn.fadeIn();
  });

  // 초기 실행 부분
  $(window).on('load scroll', function () {
    const sectionTop = contactSection.offset().top;
    const sectionBottom = sectionTop + contactSection.outerHeight();
    const windowTop = $(window).scrollTop();
    const windowBottom = windowTop + $(window).height();

    if (windowBottom > sectionTop && windowTop < sectionBottom) {
      if (!contactSection.hasClass('animated')) {
        resetColors();
        animateCells();
        contactSection.addClass('animated');
      }
    }
  });

});
