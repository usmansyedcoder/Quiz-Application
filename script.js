let currentQuestion = 1;
const totalQuestions = 10;
let score = 0;

function startQuiz() {
    document.getElementById('form').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
}

function submitQuiz() {
    const answers = {
        q1: 'Paris',
        q2: '4',
        q3: 'Mars',
        q4: '6',
        q5: 'Honey',
        q6: 'Forbidden City',
        q7: 'Aragog',
        q8: 'Skin',
        q9: 'All of the above',
        q10: 'Phoenix – Phoenix sees more than 320 sunny days each year.',
    };

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selectedAnswer) {
            alert(`Please answer question ${i}.`);
            return;
        }
        if (selectedAnswer.value === answers[`q${i}`]) {
            score++;
        }
    }

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').innerHTML = `
        <h2>Quiz Result</h2>
        <p>Name: ${document.getElementById('name').value}</p>
        <p>Roll No: ${document.getElementById('rollNo').value}</p>
        <p>Batch: ${document.getElementById('batch').value}</p>
        <p>Session: ${document.getElementById('session').value}</p>
        <p>Score: ${score} out of ${totalQuestions}</p>
    `;
    document.getElementById('result').style.display = 'block';
}