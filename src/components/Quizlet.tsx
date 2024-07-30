import {useInterval, useLocalStorage} from "react-use";
import {QUIZLET_SETS_ID_SETTING_KEY} from "@/consts/setting.ts";
import {useEffect, useState} from "react";
import {randomItem} from "@/lib/utils.ts";
import {playSound} from "@/lib/helpers.ts";
import {QUIZLET_MEDIA_URL} from "@/consts/quizlet.ts";
import res from '@/mocks/quizzet.json';

interface Card {
    id: string;
    front: string;
    back: string;
    frontMedia: string;
    backMedia: string;
}

const Quizlet = () => {
    const [quizletSetId] = useLocalStorage(QUIZLET_SETS_ID_SETTING_KEY, undefined, {
        raw: true
    })

    const [cards, setCards] = useState<Card[]>([]);
    const [activeCard, setActiveCard] = useState<Card>();

    const pronunciation = (card: Card) => {
        playSound(QUIZLET_MEDIA_URL + card.frontMedia)
    }

    useInterval(() => {
        const card = randomItem(cards);
        setActiveCard(card)
        pronunciation(card)
    }, 60 * 1000);

    useEffect(() => {
        if (!quizletSetId || quizletSetId === "") return;

        async function getQuizletCards(id: string) {
            // const res = await fetch(addProxy(`https://quizlet.com/webapi/3.4/studiable-item-documents?filters%5BstudiableContainerId%5D=${id}&filters%5BstudiableContainerType%5D=1&perPage=1000&page=1`)).then(res => res.json());
            console.log(">> TODO", id)

            const cards = res.responses[0].models.studiableItem;
            const cardsData = cards.map((card: any) => {
                const front = card.cardSides?.[0]?.media?.[0];
                const back = card.cardSides?.[1]?.media?.[0]
                return {
                    id: card.id,
                    front: front?.plainText,
                    back: back?.plainText,
                    frontMedia: front?.ttsUrl,
                    backMedia: front?.ttsUrl,
                }
            });

            setCards(cardsData)
            setActiveCard(randomItem(cardsData))
        }

        getQuizletCards(quizletSetId);
    }, [quizletSetId]);

    return (
        <div
            className="w-[400px] p-4 rounded-lg bottom-4 left-[50%] translate-x-[-50%] translate-y-[-50%] fixed text-white text-center">
            {activeCard && (
                <>
                    <div className="flex justify-center items-end gap-2">
                        <h3 className="text-3xl font-bold w-full cursor-pointer"
                            onClick={() => pronunciation(activeCard)}>{activeCard?.front}</h3>
                    </div>

                    <p className="italic">{activeCard?.back}</p>
                </>
            )
            }
        </div>
    )
};

export default Quizlet;