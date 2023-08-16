import { useState, useEffect, useCallback, useRef } from "react";
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
    
const EditableCell = ({index,value,type}) => {
    const { dispatch } = useLiveChartContext();
    const [content, setContent] = useState(0);
    const divRef = useRef();

    useEffect(() => {
        setContent(value);        
    },[])
    
    //const onContentBlur = useCallback(evt => setContent(evt.currentTarget.innerHTML))
    const onContentBlur = useCallback(evt => dispatch({
        type : 'change_value',
        payload : {
            index,
            type,
            value:evt.currentTarget.innerHTML
    }}))

    const onKeyDown = (evt) => {
        if(evt.key === "Enter") {
            evt.preventDefault();
            divRef.current.blur();
            return false;
        }    
    }

    const onFocus = () => {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(divRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    return (
        <div
            contentEditable
            className = "p-2 border-t border-gray-300"
            onBlur = {onContentBlur}            
            onFocus={onFocus}   
            onKeyDown={onKeyDown}     
            dangerouslySetInnerHTML={{__html: content}}            
            id = {`event-${index}`}
            ref = { divRef }
        />                
    )
}

export default EditableCell