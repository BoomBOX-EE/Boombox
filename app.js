// Music Fortune Telling
document.getElementById('get-fortune').addEventListener('click', async () => {
    // This would typically connect to a backend API
    const fortunes = [
        "You'll discover an amazing new artist today!",
        "Your perfect song is just around the corner",
        "A musical collaboration is in your future"
    ];
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    document.getElementById('fortune-result').textContent = fortune;
});

// Artist Quiz
class QuizManager {
    constructor() {
        this.score = 0;
        this.currentQuestion = 0;
        this.questions = [
            // Would be populated with real song data
            {
                audio: 'path/to/audio1.mp3',
                options: ['Song 1', 'Song 2', 'Song 3', 'Song 4'],
                correct: 0
            }
        ];
    }

    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        const player = document.getElementById('quiz-player');
        player.src = question.audio;
        
        const optionsContainer = document.querySelector('.quiz-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn');
            button.addEventListener('click', () => this.checkAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    checkAnswer(index) {
        if (index === this.questions[this.currentQuestion].correct) {
            this.score += 10;
            document.getElementById('score').textContent = this.score;
        }
    }
}

// Swipefy
class SwipefyManager {
    constructor() {
        this.songs = [
            // Would be populated with real song data
            {
                title: 'Example Song',
                artist: 'Example Artist',
                preview: 'path/to/preview.mp3'
            }
        ];
        this.currentSong = 0;
    }

    loadSong() {
        const song = this.songs[this.currentSong];
        document.getElementById('preview-player').src = song.preview;
        document.getElementById('song-title').textContent = song.title;
        document.getElementById('artist-name').textContent = song.artist;
    }

    handleSwipe(liked) {
        // Would typically send this data to a backend
        this.currentSong++;
        if (this.currentSong < this.songs.length) {
            this.loadSong();
        }
    }
}

// Review Hub
class ReviewHub {
    constructor() {
        this.reviews = [];
    }

    addReview(song, rating, text) {
        const review = {
            song,
            rating,
            text,
            date: new Date(),
            id: this.reviews.length + 1
        };
        this.reviews.push(review);
        this.displayReviews();
    }

    displayReviews() {
        const container = document.querySelector('.reviews-list');
        container.innerHTML = '';
        
        this.reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <h3>${review.song}</h3>
                <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                <p>${review.text}</p>
                <small>${review.date.toLocaleDateString()}</small>
            `;
            container.appendChild(reviewElement);
        });
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new QuizManager();
    const swipefy = new SwipefyManager();
    const reviewHub = new ReviewHub();

    // Initialize event listeners
    document.querySelector('.swipe-left').addEventListener('click', () => swipefy.handleSwipe(false));
    document.querySelector('.swipe-right').addEventListener('click', () => swipefy.handleSwipe(true));
    
    document.getElementById('submit-review').addEventListener('click', () => {
        const song = document.getElementById('song-search').value;
        const rating = document.querySelector('.stars .fas')?.dataset.rating || 0;
        const text = document.getElementById('review-text').value;
        reviewHub.addReview(song, rating, text);
    });
}); 