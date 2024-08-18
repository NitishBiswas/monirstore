import { useState, useCallback, useRef } from 'react';

type UseLongPressProps = {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
};

const useLongPress = (callback: () => void = () => {}, ms: number = 300): UseLongPressProps => {
    const [startLongPress, setStartLongPress] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout>();

    const start = useCallback(() => {
        setStartLongPress(true);
        timerRef.current = setTimeout(() => {
            callback();
            setStartLongPress(false);
        }, ms);
    }, [callback, ms]);

    const stop = useCallback(() => {
        setStartLongPress(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
};

export default useLongPress;
