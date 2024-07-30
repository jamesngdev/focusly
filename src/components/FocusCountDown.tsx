import {useRef, useState} from 'react';
import useCountdown from "@/hooks/useCoutdown.tsx";
import {FaRegCirclePause, FaRegCirclePlay, FaRegCircleXmark} from "react-icons/fa6";
import {useLocalStorage} from "react-use";
import {FOCUS_TIME_SETTING_KEY, RELAX_TIME_SETTING_KEY} from "@/consts/setting.ts";

interface ModeProps {
    onCompleted: () => void;
}

const FocusMode = ({onCompleted}: ModeProps) => {
    const [value] = useLocalStorage(FOCUS_TIME_SETTING_KEY, 0, {
        deserializer: (value) => Number(value),
        serializer: (value) => value.toString(),
        raw: false
    })

    const count = useCountdown({
        minutes: value,
        autoStart: false,
        onCompleted: onCompleted
    })

    return (
        <div>
            <h1 className="text-center text-sm uppercase font-light">👨🏽‍💻</h1>
            <h1 className="text-center text-md uppercase font-light">Let's focus</h1>

            <h1 className="text-7xl font-bold text-center mt-2">{count.formatted}</h1>

            <div className="flex justify-center items-center gap-2 opacity-0 hover:opacity-100 transition-all mt-2">
                {count.isRunning ? (
                    <FaRegCirclePause onClick={count.pause} className="cursor-pointer"/>
                ) : <FaRegCirclePlay onClick={count.resume} className="cursor-pointer"/>}

                <FaRegCircleXmark className="cursor-pointer" onClick={() => count.reset()}/>
            </div>
        </div>
    )
}

const RelaxMode = ({onCompleted}: ModeProps) => {
    const [value] = useLocalStorage(RELAX_TIME_SETTING_KEY, 0, {
        deserializer: (value) => Number(value),
        serializer: (value) => value.toString(),
        raw: false
    })

    const count = useCountdown({
        minutes: value,
        autoStart: false,
        onCompleted
    })

    return (
        <div>
            <h1 className="text-center text-sm uppercase font-light">🍆💦</h1>
            <h1 className="text-center text-md uppercase font-light">Let's Relax</h1>

            <h1 className="text-7xl font-bold text-center mt-2">{count.formatted}</h1>

            <div className="flex justify-center items-center gap-2 opacity-0 hover:opacity-100 transition-all mt-2">
                {count.isRunning ? (
                    <FaRegCirclePause onClick={count.pause} className="cursor-pointer"/>
                ) : <FaRegCirclePlay onClick={count.resume} className="cursor-pointer"/>}

                <FaRegCircleXmark className="cursor-pointer" onClick={() => count.reset()}/>
            </div>
        </div>
    )
}


const FocusCountDown = () => {
    const [isFocus, setIsFocus] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null);

    const triggerFocus = (value: boolean) => {
        setIsFocus(value);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        audioRef.current.currentTime = 0;
        audioRef.current?.play();
    }

    return (
        <div
            className="w-[280px] h-[280px] rounded-full flex items-center justify-center p-4 backdrop-blur-sm bg-white/70 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fixed">

            {isFocus ? (
                <FocusMode onCompleted={() => triggerFocus(false)}/>
            ) : <RelaxMode onCompleted={() => triggerFocus(true)}/>}

            <audio controls ref={audioRef} className="hidden">
                <source src="/sounds/ting-ting.mp3" type="audio/mpeg"/>
            </audio>
        </div>
    );
};

export default FocusCountDown;