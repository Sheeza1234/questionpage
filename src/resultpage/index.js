import React, { useEffect } from 'react';

const ResultPage = () => {
    useEffect(() => {
        if (!localStorage.getItem('testCompleted')) {
            window.location.href = '/';  // Redirect to questionnaire page if not completed
        }
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Thank You!</h2>
            <p style={styles.message}>
                You have an Agreeable Personality! We appreciate you taking the time to complete the test.
            </p>
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
    message: {
        fontSize: '18px',
        marginBottom: '20px',
    },
};

export default ResultPage;
