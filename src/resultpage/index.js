

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('testCompleted')) {
            navigate('/result', { replace: true });
        }
    }, [navigate]);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Thank You!</h2>
            <p style={styles.message}>
                You have an <h3 style={{'color':'blue'}}>Agreeable Personality!</h3> We appreciate you taking the time to complete the test.
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
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#6200EE',
        marginBottom: '20px',
        marginTop:'20px'
    },
    message: {
        fontSize: '24px',
        color: '#333',
    },
};

export default ResultPage;

