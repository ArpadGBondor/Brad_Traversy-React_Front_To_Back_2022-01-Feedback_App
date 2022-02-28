import { useContext } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Card from './shared/Card';

import FeedbackContext from '../context/FeedbackContext';

const FeedbackItem = ({ item }) => {
    const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
    const { id, rating, text } = item;
    return (
        <Card>
            <div className="num-display">{rating}</div>
            <button onClick={() => deleteFeedback(id)} className="close">
                <FaTimes color="purple" />
            </button>
            <button onClick={() => editFeedback(item)} className="edit">
                <FaEdit color="purple" />
            </button>
            <div className="text-display">{text}</div>
        </Card>
    );
};

FeedbackItem.propTypes = {
    item: PropTypes.shape({
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
    }),
};

export default FeedbackItem;
