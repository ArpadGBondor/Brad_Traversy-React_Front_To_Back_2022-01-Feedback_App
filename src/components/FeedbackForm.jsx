import React, { useState, useEffect, useContext } from 'react';

import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const { feedbackEdit, addFeedback, updateFeedback, cancelEditFeedback } = useContext(FeedbackContext);

    useEffect(() => {
        if (feedbackEdit.edit) {
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
            setBtnDisabled(false);
            setMessage('');
        }
    }, [feedbackEdit]);

    const handleTextChange = (e) => {
        const newText = e.target.value.trim();
        if (newText === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if (newText.length < 10) {
            setBtnDisabled(true);
            setMessage('Review must be at least 10 characters.');
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.length >= 10) {
            const newFeedback = { text, rating };
            if (feedbackEdit.edit) {
                // Update Feedback
                updateFeedback(feedbackEdit.item.id, newFeedback);
            } else {
                // New Feedback
                addFeedback(newFeedback);
            }
            setText('');
            setBtnDisabled(true);
            setMessage('');
        }
    };

    const handleCancel = (e) => {
        cancelEditFeedback();
        setText('');
        setBtnDisabled(true);
        setMessage('');
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                {/* @todo - rating select component */}
                <RatingSelect select={setRating} />
                <div className="input-group">
                    <input value={text} onChange={handleTextChange} type="text" placeholder="Write a review" />
                    <Button type="submit" isDisabled={btnDisabled}>
                        {feedbackEdit.edit ? 'Update' : 'Send'}
                    </Button>
                    {feedbackEdit.edit && (
                        <Button version="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    )}
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    );
};

export default FeedbackForm;
