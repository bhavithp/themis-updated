import React, { useState } from 'react';

function TruncateText({ text, maxLength }) {
    const [truncated, setTruncated] = useState(true);

    const toggleTruncate = () => {
        setTruncated(!truncated);
    };

    const truncatedText = truncated ? text.slice(0, maxLength) : text;

    return (
        <div>
            <p>{truncatedText}</p>
            {text.length > maxLength && (
                <button onClick={toggleTruncate}>
                    {truncated ? 'Show More' : 'Show Less'}
                </button>
            )}
        </div>
    );
}

export default TruncateText;
