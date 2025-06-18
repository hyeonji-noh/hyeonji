$(function () {
    let percent = 0; // 시작 퍼센트
    const gateEl = document.getElementById("gate-number");
    const firstLoading = document.querySelector(".first_loading");
    const mainBag = document.querySelector(".main_bag");
    const interval = setInterval(() => {
        percent++;
        gateEl.textContent = `gate ${String(percent).padStart(2, '0')}`; // 텍스트 업데이트

        if (percent >= 100) {
            clearInterval(interval);
            // sessionStorage.setItem("loadedOnce", "true");
            // location.href = '#con1';
            setTimeout(() => {
                location.href = 'main.html'
            }, 300);
        }
    }, 40);

});