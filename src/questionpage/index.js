import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionnairePage = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/questions`) // Replace with actual API
            .then((response) => response.json())
            .then((data) => {
                // Filter questions with category "proman"
                
                const filteredQuestions = data
                    .filter((question) => question.category.toLowerCase() === 'prowoman')
                    .map((question, index) => ({
                        ...question,
                        localId: index + 1,
                    }));

                setQuestions(filteredQuestions);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionId]: option,
        });
    };

    const handleSubmit = () => {
        const totalScore = Object.values(selectedOptions).reduce(
            (sum, option) => sum + option.weight,
            0
        );

        // Send data to API
        fetch('http://localhost:5000/responses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalScore }),
        })
            .then(() => {
                // Save completion state
                localStorage.setItem('testCompleted', 'true');
                localStorage.setItem('totalScore', totalScore);

                // Redirect to result page
                navigate('/result', { replace: true, state: { totalScore } });
            })
            .catch((error) => console.error(error));
    };

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (questions.length === 0) {
        return <div style={styles.loading}>No questions available for category "proman".</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Personality Test</h2>
            <form>
                {questions.map((question) => (
                    <div key={question.localId} style={styles.questionContainer}>
                        <p style={styles.questionText}>
                            {question.localId}. {question.question_text}
                        </p>
                        {question.options.map((option) => (
                            <div key={option.id} style={styles.optionContainer}>
                                <label style={styles.optionLabel}>
                                    <input
                                        type="radio"
                                        name={`question-${question.localId}`}
                                        value={option.id}
                                        checked={selectedOptions[question.localId]?.id === option.id}
                                        onChange={() => handleOptionChange(question.localId, option)}
                                    />
                                    {option.text}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="button" style={styles.submitButton} onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};


const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#6200EE',
        marginBottom: '20px',
    },
    questionContainer: {
        marginBottom: '20px',
        textAlign: 'left',
    },
    questionText: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    optionContainer: {
        marginBottom: '5px',
    },
    optionLabel: {
        fontSize: '16px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#6200EE',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
    loading: {
        fontSize: '20px',
        textAlign: 'center',
        marginTop: '50px',
    },
};

export default QuestionnairePage;
