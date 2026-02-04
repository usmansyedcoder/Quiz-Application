// Quiz data - correct answers
const correctAnswers = {
    q1: "Paris",
    q2: "4",
    q3: "Mars",
    q4: "6",
    q5: "Honey",
    q6: "Eiffel Tower",
    q7: "Aragog",
    q8: "Liver",
    q9: "All of the above",
    q10: "Phoenix – Phoenix sees more than 320 sunny days each year."
};

// User information
let userInfo = {};

// Start Quiz function
function startQuiz() {
    // Get form values
    const name = document.getElementById('name').value;
    const rollNo = document.getElementById('rollNo').value;
    const batch = document.getElementById('batch').value;
    const session = document.getElementById('session').value;
    
    // Validation
    if (!name || !rollNo || !batch || !session) {
        alert("Please fill in all fields before starting the quiz!");
        return;
    }
    
    // Store user information
    userInfo = {
        name: name,
        rollNo: rollNo,
        batch: batch,
        session: session
    };
    
    // Hide form and show quiz
    document.getElementById('form').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    document.querySelector('.text-danger').textContent = "Good luck with your quiz!";
    
    // Scroll to quiz section
    document.querySelector('.quiz').scrollIntoView({ behavior: 'smooth' });
    
    // Initialize quiz by resetting all radio buttons
    resetQuiz();
}

// Reset all radio buttons
function resetQuiz() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
}

// Submit Quiz function
function submitQuiz() {
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    
    // Check each question
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = `q${i}`;
        const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        
        if (selectedAnswer) {
            if (selectedAnswer.value === correctAnswers[questionName]) {
                score++;
            }
        }
    }
    
    // Calculate percentage
    const percentage = (score / totalQuestions) * 100;
    
    // Determine grade
    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    else grade = "F";
    
    // Display result
    displayResult(score, totalQuestions, percentage, grade);
}

// Display result function
function displayResult(score, totalQuestions, percentage, grade) {
    const resultDiv = document.getElementById('result');
    const quizDiv = document.querySelector('.quiz');
    
    // Hide quiz and show result
    quizDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h2><i class="fa-solid fa-trophy"></i> Quiz Results</h2>
        <div style="background-color: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> <span>${userInfo.name}</span></p>
            <p><strong>Roll No:</strong> <span>${userInfo.rollNo}</span></p>
            <p><strong>Batch:</strong> <span>${userInfo.batch}</span></p>
            <p><strong>Session:</strong> <span>${userInfo.session}</span></p>
        </div>
        <div style="font-size: 1.5rem; margin: 25px 0;">
            <p>Your Score: <span style="color: ${percentage >= 50 ? '#28a745' : '#dc3545'}; font-weight: bold;">${score}/${totalQuestions}</span></p>
            <p>Percentage: <span style="color: ${percentage >= 50 ? '#28a745' : '#dc3545'}; font-weight: bold;">${percentage.toFixed(2)}%</span></p>
            <p>Grade: <span style="color: ${percentage >= 50 ? '#28a745' : '#dc3545'}; font-weight: bold;">${grade}</span></p>
        </div>
        <div style="margin-top: 30px;">
            <h3>${percentage >= 50 ? '🎉 Congratulations! 🎉' : '😟 Keep practicing! 😟'}</h3>
            <p>${percentage >= 50 ? 'You passed the quiz!' : 'You need to score at least 50% to pass.'}</p>
        </div>
        <button type="button" onclick="restartQuiz()" style="margin-top: 20px; padding: 12px 30px; background-color: #007bff; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
            <i class="fa-solid fa-rotate-right"></i> Take Quiz Again
        </button>
    `;
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Restart quiz function
function restartQuiz() {
    const resultDiv = document.getElementById('result');
    const formDiv = document.getElementById('form');
    
    // Hide result and show form
    resultDiv.style.display = 'none';
    formDiv.style.display = 'block';
    
    // Reset form
    document.getElementById('form').reset();
    
    // Reset quiz radio buttons
    resetQuiz();
    
    // Reset heading
    document.querySelector('.text-danger').textContent = "Please enter your information here!";
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to radio button labels
    const labels = document.querySelectorAll('.question label');
    labels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        
        label.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add enter key support for form submission
    const formInputs = document.querySelectorAll('#form input');
    formInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                startQuiz();
            }
        });
    });
});
