import React from 'react';
import './instruct.css';

function Instruct() {
    return (
        <div className="instruct-container" style={{textAlign:"left"}}>
            <h1>How to Use Quick Split</h1>
            <ol>
                <li>Enter the number of people you want to split the expense with.</li>
                <li>Enter the name and amount spent by each person.</li>
                <li>Click on the "Split" button to see the results.</li>
                <li>Review the calculated amounts each person owes or is owed.</li>
                <li>Adjust any amounts if necessary and recalculate.</li>
            </ol>
        </div>
    );
}

export default Instruct;