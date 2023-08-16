import React, { useContext, useReducer, createContext } from 'react';
import { createRandomEvent } from '../utils';

const LiveChartContext = createContext();

const initialEvents = Array.from(Array(50)).map((_, ix) => createRandomEvent(ix));

const initialData = {
    events: initialEvents,
    running : true,
    pauseIndex : 0
}

const liveChartReducer = (state, action) => {
    switch (action.type) {
        case 'new_event':
            /*if(state.running) {*/
                return {
                    events: [...state.events, action.payload],
                    running: state.running,
                    pauseIndex:state.pauseIndex                   
               }
            /*} else {
                return {
                    events : [...state.events],
                    running : state.running
                }
            }
            */
        case 'change_value': 
            const modifiedEvents = [...state.events];
            modifiedEvents[action.payload.index][action.payload.type] = action.payload.value;            
            return {
                events : modifiedEvents,
                running : state.running,
                pauseIndex: state.pauseIndex
            }
        case 'pause_event':
            console.log("Pause on ",state.events.length-20);
            return {
                events: [...state.events],
                running: !state.running,
                pauseIndex: state.events.length-20
            }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const LiveChartProvider = ({ children }) => {
    const [data, dispatch] = useReducer(liveChartReducer, initialData);
    return (
        <LiveChartContext.Provider
            value={{
                data,
                dispatch
            }}>
            {children}
        </LiveChartContext.Provider>
    );
};

const useLiveChartContext = () => {
    const context = useContext(LiveChartContext);
    if (!context) {
        throw new Error('useLiveChartContext should be used within an LiveChartProvider');
    }

    return context;
};

export { LiveChartProvider, useLiveChartContext };
