import React, {useEffect, useRef} from 'react';

interface Mp3PlayerProps {
    src: string;
    volume: number
}

const FADING_DURATION = 5 * 1000;

const AudioPlayer: React.FC<Mp3PlayerProps> = ({src, volume}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    useEffect(() => {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const fetchAudio = async () => {
            const response = await fetch(src);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.loop = true;

            const gainNode = audioContext.createGain();
            gainNode.gain.value = volume;

            sourceNode.connect(gainNode);
            gainNode.connect(audioContext.destination);


            sourceNodeRef.current = sourceNode;
            gainNodeRef.current = gainNode;

            sourceNodeRef.current?.start();
        };


        fetchAudio();

        return () => {
            audioContextRef.current?.close();
        };
    }, [src]);


    useEffect(() => {
        if (audioContextRef.current) {
            gainNodeRef.current?.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
        }
    }, [volume]);

    useEffect(() => {
        const fadeEffect = () => {
            const currentTime = audioContextRef.current?.currentTime || 0;
            const gainNode = gainNodeRef.current;

            if (gainNode) {
                // Fade out
                gainNode.gain.setValueAtTime(volume, currentTime);
                gainNode.gain.linearRampToValueAtTime(0, currentTime + FADING_DURATION / 1000);

                // Fade in
                gainNode.gain.setValueAtTime(0, currentTime + FADING_DURATION / 1000);
                gainNode.gain.linearRampToValueAtTime(volume, currentTime + 2 * FADING_DURATION / 1000);
            }
        };

        if (sourceNodeRef.current) {
            sourceNodeRef.current.onended = fadeEffect;
        }

        return () => {
            if (sourceNodeRef.current) {
                sourceNodeRef.current.onended = null;
            }
        };
    }, [volume]);

    return (
        <div>
            <audio src={src} ref={audioRef}></audio>
        </div>
    );
};

export default AudioPlayer;
