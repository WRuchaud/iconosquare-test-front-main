import React from 'react';
import LiveTable from './LiveTable';
import LiveChart from './LiveChart';
import PausePlay from './PausePlay';

const Content = () => {
    return (
        <div className="mx-auto max-w-7xl px-8">
            <PausePlay />
            <LiveChart />
            <LiveTable />
        </div>
    )
}

export default Content;