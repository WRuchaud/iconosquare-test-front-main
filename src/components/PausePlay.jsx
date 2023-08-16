import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';

const PausePlay = () => {    
    const { data, dispatch } = useLiveChartContext();

    const clickHandler = () => {
        dispatch({
            type: 'pause_event',
            payload: null         
        })
    }

    return <button onClick={clickHandler} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
        {data.running?"Pause":"Play"}
    </button>
}

export default PausePlay;