import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

    useEffect(() => {
        fetchFeedback();
    }, []);

    // Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`);
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    };

    // Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch(`/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFeedback),
        });
        const data = await response.json();
        setFeedback((prev) => [data, ...prev]);
    };

    // Delete feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' });
            setFeedback((prev) => prev.filter((item) => item.id !== id));
        }
    };

    //Update feedback item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updItem),
        });
        const data = await response.json();
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...data } : item)));
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
                isLoading,
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
