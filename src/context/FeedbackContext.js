import { createContext, useState } from 'react';
import FeedbackData from '../data/FeedbackData';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(FeedbackData);
    const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

    // Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback((prev) => [newFeedback, ...prev]);
    };

    // Delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?'))
            setFeedback((prev) => prev.filter((item) => item.id !== id));
    };

    //Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item)));
        setFeedbackEdit({ item: {}, edit: false });
    };

    // Set item to be updated
    const editFeedback = (item) => setFeedbackEdit({ item, edit: true });

    // Cancel editing
    const cancelEditFeedback = () => {
        setFeedbackEdit({ item: {}, edit: false });
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                deleteFeedback,
                addFeedback,
                editFeedback,
                cancelEditFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
