let correctAnswers = ['A', 'A', 'B', 'A', 'B'];
let form = document.querySelector(".quiz-form");
let result = document.querySelector(".result");


form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0;
    let userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value];

    userAnswers.forEach((answer, i) => {

        if (answer === correctAnswers[i]) {
            score += 20;
        }
    });

    window.scrollTo(0, 0);
    
    result.classList.remove('d-none');

    
    let output = 0;
    let timer = setInterval(() => {

        result.querySelector('span').textContent = `${output}%`;

        if (output === score) {
            clearInterval(timer);
        }else {
            output++;
        }

    }, 10);

});

