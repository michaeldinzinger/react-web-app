import React from 'react';

const RobotsStatus = ({ isValid }) => {
    return (
        <div>
            {isValid ? (
                <div>
                    <span>✔️</span> robots.txt file found
                </div>
            ) : (
                <div>
                    <span>❗</span> 
                    <span title="Maybe there are too many redirects or the robots.txt file is hosted in another domain.">robots.txt file not found</span>
                </div>
            )}
        </div>
    );
}

export default RobotsStatus;
