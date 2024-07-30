import {FaCloudRain, FaFire, FaMugHot, FaTree} from "react-icons/fa6";
import {Slider} from "@/components/ui/slider.tsx";
import {useState} from "react";
import AudioPlayer from "@/components/AudioPlayer.tsx";
import useClicked from "@/hooks/useClicked.ts";
import Spotify from "@/components/Spotify.tsx";
import {cn} from "@/lib/utils.ts";

enum SoundName {
    Rain = 'Rain',
    Cafe = 'Cafe',
    Fireplace = 'Fireplace',
    Forest = 'Forest'
}

type Sound = {
    name: SoundName
    icon: JSX.Element;
    media: string;
}


const WorkSoundContent = () => {
    const hasClickedContent = useClicked()

    const LIST_SOUNDS: Sound[] = [
        {
            name: SoundName.Rain,
            icon: <FaCloudRain/>,
            media: 'https://focusly.vercel.app/sound/rain.mp3'
        },
        {

            name: SoundName.Cafe,
            icon: <FaMugHot/>,
            media: 'https://focusly.vercel.app/sound/coffee-shop-chatter.mp3'
        },
        {
            name: SoundName.Fireplace,
            icon: <FaFire/>,
            media: 'https://focusly.vercel.app/sound/fire.mp3'
        },
        {
            name: SoundName.Forest,
            icon: <FaTree/>,
            media: 'https://focusly.vercel.app/sound/garden.mp3'
        }

    ]

    const [soundVolumes, setSoundVolumes] = useState<Record<SoundName, number>>({
        [SoundName.Rain]: 0,
        [SoundName.Cafe]: 0,
        [SoundName.Fireplace]: 0,
        [SoundName.Forest]: 0
    })

    const handleChangeVolume = (name: SoundName, values: number[]) => {
        setSoundVolumes(prev => ({
            ...prev,
            [name]: values[0]
        }))
    }

    return (
        <div className="flex flex-col space-y-5">
            {LIST_SOUNDS.map(sound => {
                const volume = soundVolumes[sound.name] || 0;

                return (
                    <div className="flex space-x-2" key={sound.name}>
                        <label>{sound.icon}</label>
                        <Slider max={100} step={1} defaultValue={[volume]}
                                onValueChange={(e) => handleChangeVolume(sound.name, e)}/>
                        {hasClickedContent && volume ? (
                            <AudioPlayer src={sound.media} volume={volume / 100}/>
                        ) : null}
                    </div>
                )
            })}
        </div>
    );
}

const Sound = () => {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div className="fixed top-5 right-5 z-50">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl cursor-pointer"
                 onClick={() => setIsOpen(prev => !prev)}>
                <FaMugHot/></div>

            <div className={cn('fixed top-20  z-50 w-[300px] right-5 bg-white p-4 rounded-lg transition-all', {
                'opacity-100': isOpen,
                'opacity-0': !isOpen,
            })}>
                <WorkSoundContent/>

                <Spotify/>
            </div>
        </div>

    );
};

export default Sound;