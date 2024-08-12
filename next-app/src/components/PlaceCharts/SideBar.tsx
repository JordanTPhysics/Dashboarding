import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <ul className="card-list">
                <li className="card">Card 1</li>
                <li className="card">Card 2</li>
                <li className="card">Card 3</li>
                <li className="card">Card 4</li>
                <li className="card">Card 5</li>
            </ul>
        </div>
    );
};

export default Sidebar;