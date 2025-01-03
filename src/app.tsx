import React from 'react';
import Timer from './Timer';
import CountDown from './CountDown';

const App: React.FC = () => {
    document.body.style.backgroundColor = '#24293e';
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Timer />
            <CountDown />
        </div>
    );
};

export default App;
