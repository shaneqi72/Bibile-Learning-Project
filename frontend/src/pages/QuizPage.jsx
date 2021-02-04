import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const QUESTIONS = [
    {
        questionText: 'What is the capital of France?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Dublin', isCorrect: false },
        ],
    },
    {
        questionText: 'Who is CEO of Tesla?',
        answerOptions: [
            { answerText: 'Jeff Bezos', isCorrect: false },
            { answerText: 'Elon Musk', isCorrect: true },
            { answerText: 'Bill Gates', isCorrect: false },
            { answerText: 'Tony Stark', isCorrect: false },
        ],
    },
    {
        questionText: 'The iPhone was created by which company?',
        answerOptions: [
            { answerText: 'Apple', isCorrect: true },
            { answerText: 'Intel', isCorrect: false },
            { answerText: 'Amazon', isCorrect: false },
            { answerText: 'Microsoft', isCorrect: false },
        ],
    },
    {
        questionText: 'How many Harry Potter books are there?',
        answerOptions: [
            { answerText: '1', isCorrect: false },
            { answerText: '4', isCorrect: false },
            { answerText: '6', isCorrect: false },
            { answerText: '7', isCorrect: true },
        ],
    },
];

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState(QUESTIONS);

    // const shuffledQuestions = [...QUESTIONS].sort(() => Math.random() - 0.5);
    const shuffleQuestions = () => {
        setShuffledQuestions([...QUESTIONS].sort(() => Math.random() - 0.5));
    };

    const classes = useStyles();

    const handleAnswerClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        setShowAnswer(true);
    };

    const handleNextButton = () => {
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < QUESTIONS.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }

        setShowAnswer(false);
    };

    const handlePreviousQuestion = () => {
        const previousQuestion = currentQuestion - 1;
        if (previousQuestion >= 0) {
            setCurrentQuestion(previousQuestion);
            return;
        }
    };

    const handleRestartButton = () => {
        setCurrentQuestion(0);
    };

    return (
        <div className={classes.quizContainer}>
            {showScore ? (
                <>
                    <div className={classes.scoreSection}>
                        Your score is {score} out of {QUESTIONS.length}
                    </div>
                    <div>
                        <button onClick={handleRestartButton} className={classes.indicateButton}>
                            Restart
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className={classes.appHeader}>
                        <div className={classes.scoreRecord}>Score: {score}</div>
                        <div className={classes.timer}>
                            <div className={classes.timerText}>Time Left :</div>
                            <div className={classes.timerSeconds}>15</div>
                        </div>
                    </div>

                    <div className={classes.questionSection}>
                        <div className={classes.questionCount}>
                            <span className={classes.questionCountSpan}>
                                Question {currentQuestion + 1}
                            </span>
                            /{QUESTIONS.length}
                        </div>
                        <div
                            className="question-text"
                            dangerouslySetInnerHTML={{
                                __html: QUESTIONS[currentQuestion].questionText,
                            }}
                        >
                            {/* {QUESTIONS[currentQuestion].questionText} */}
                        </div>
                    </div>
                    <div className={classes.answerSection}>
                        {shuffledQuestions[currentQuestion].answerOptions.map(
                            (answerOption, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerClick(answerOption.isCorrect)}
                                        // className={`${classes.answerOption}`}
                                        className={
                                            showAnswer
                                                ? answerOption.isCorrect
                                                    ? `${classes.answerOption} ${classes.correct}`
                                                    : `${classes.answerOption} ${classes.incorrect}`
                                                : `${classes.answerOption}`
                                        }
                                        // className={classes.answerOption}
                                        dangerouslySetInnerHTML={{
                                            __html: answerOption.answerText,
                                        }}
                                    >
                                        {/* {answerOption.answerText} */}
                                    </button>
                                );
                            },
                        )}
                    </div>
                    <div className={classes.indicateButtonsContainer}>
                        <button onClick={handlePreviousQuestion} className={classes.indicateButton}>
                            Previous
                        </button>
                        <button onClick={handleNextButton} className={classes.indicateButton}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    quizContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flexStart',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100vh',
        width: 'auto',
    },
    questionSection: {
        width: '100%',
        position: 'relative',
        padding: '3rem',
        fontSize: '25px',
        minHeight: '15rem',
    },
    questionCount: {
        marginBottom: '20px',
    },
    questionCountSpan: {
        fontSize: '28px',
    },
    answerSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
    },
    answerOption: {
        width: '100%',
        fontSize: '16px',
        color: 'white',
        backgroundColor: 'rgba(65, 131, 215, 1)',
        display: 'flex',
        justifyContent: 'flexStart',
        alignItems: 'center',
        border: '1px solid white',
        borderRadius: '5px',
        padding: '8px 10px',
        outline: 'none',
        margin: '0.5rem',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.01)',
            transition: 'transform 100ms ease-in-out',
        },
    },
    scoreSection: {
        display: 'flex',
        fontSize: '25px',
        alignItems: 'center',
        marginTop: '2rem',
    },
    correct: {
        backgroundColor: 'green',
    },
    incorrect: {
        backgroundColor: 'red',
    },
    indicateButtonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
    },
    indicateButton: {
        color: 'white',
        padding: '0.5rem',
        margin: '1rem',
        border: 'none',
        borderRadius: '10px',
        width: '6rem',
        fontSize: '18px',
        fontWeight: 'bold',
        outline: 'none',
        backgroundColor: 'rgba(42, 187, 155, 1)',
        '&:hover': {
            color: 'black',
            transform: 'scale(1.01)',
            transition: 'transform 100ms ease-in-out',
            cursor: 'pointer',
        },
    },
    appHeader: {
        display: 'flex',
        justifyContent: 'spaceArround',
        alignItems: 'center',
        padding: '1rem',
    },
    timer: {
        backgroundColor: 'rgba(42, 187, 155, 1)',
        display: 'flex',
        border: 'none',
        outline: 'none',
        borderRadius: '4px',
        userSelect: 'none',
        padding: '0.5rem 1rem',
        fontSize: '20px',
    },
    timerText: {
        fontWeight: 500,
    },
    timerSeconds: {
        fontWeight: 500,
        marginLeft: '5px',
    },
    scoreRecord: {
        fontSize: '30px',
        fontWeight: 500,
        marginRight: '60px',
    },
}));

export default QuizPage;
