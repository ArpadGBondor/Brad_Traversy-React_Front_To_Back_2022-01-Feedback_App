import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, reverse }) => {
    // Conditional class:
    return <div className={`card ${reverse ? 'reverse' : ''}`}>{children}</div>;

    // Conditional style:
    // const cardStyles = {
    //     backgroundColor: reverse ? 'rgba(0, 0, 0, 0.4)' : '#fff',
    //     color: reverse ? '#fff' : '#333',
    // };

    // return (
    //     <div className="card" style={cardStyles}>
    //         {children}
    //     </div>
    // );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool,
};

Card.defaultProps = {
    reverse: false,
};
export default Card;
