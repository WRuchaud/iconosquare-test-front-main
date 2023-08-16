import React from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import EditableCell from './EditableCell';

const LiveTable = props => {
    const { data } = useLiveChartContext();
    const nbTotalEvents = data?.events?.length
    //const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);
    const eventsFiltered = data.running?data.events.slice(nbTotalEvents - 20, nbTotalEvents):data.events.slice(data.pauseIndex,data.pauseIndex+20)

    return (
        <div className="flex border border-gray-300 rounded">
            <div>
                <div className="p-2">Index</div>
                <div className="p-2 border-t border-gray-300">Value 1</div>
                <div className="p-2 border-t border-gray-300">Value 2</div>
            </div>
            {eventsFiltered.map((event) => (
                <div key={event.index} className="border-l border-gray-300 flex-1">
                    <div className="p-2">{event.index}</div>                    
                    <EditableCell index={event.index} value={event.value1} type="value1" />
                    <EditableCell index={event.index} value={event.value2} type="value2" />
                </div>
            ))}
        </div>
    );
};

LiveTable.propTypes = {
    
};

export default LiveTable;