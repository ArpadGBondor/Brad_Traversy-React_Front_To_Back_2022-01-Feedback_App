import { motion, AnimatePresence } from 'framer-motion';
import React, { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackList = () => {
    const { feedback } = useContext(FeedbackContext);
    if (!feedback || feedback.length === 0) {
        return <p>No Feedback Yet</p>;
    }
    return (
        <div className="feedback-list">
            <AnimatePresence>
                {feedback.map((item, idx) => (
                    // use item.id as key instead of idx, otherwise the last element of the array will produce the effect
                    <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FeedbackItem item={item} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
    // return (
    //     <div className="feedback-list">
    //         {feedback.map((item, idx) => (
    //             <FeedbackItem key={idx} item={item} handleDelete={handleDelete} />
    //         ))}
    //     </div>
    // );
};

export default FeedbackList;
