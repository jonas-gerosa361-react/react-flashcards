import { useState } from "react";
import Button from "../components/Button";
import Flashcard from "../components/Flashcard";
import Flashcards from "../components/Flashcards";
import Header from "../components/Header";
import Main from "../components/Main";
import RadioButton from "../components/RadioButton";
import {flashCardsData as flashCards} from "../data/flashcards";
import { helperShuffleArray } from "../helpers/arrayHelpers";

export default function ReactFlashcardsPage() {

    const [allCards, setAllCards] = useState(flashCards);
    const [showTitle, setShowTile] = useState(true);
    
    function handleButtonClick() {
        const shuffledCards = helperShuffleArray(allCards);

        setAllCards(shuffledCards);
    }

    function handleRadioClick() {
        setShowTile(showTitle => !showTitle);
    }

    return (
        <>
            <Header>React-Flashcards</Header>
            <Main>
                <div className="mb-4 flex flex-col justify-center items-center">
                    <Button onButtonClick={handleButtonClick} >Suffle Cards</Button>
                    <div className="flex flex-row space-x-3 m-2">
                        <RadioButton name="radioButtonShowInfo"
                            id="radioButtonShowTitle"
                            checked={showTitle}
                            onRadioClick={handleRadioClick}
                        >
                            Show Title
                        </RadioButton>
                        <RadioButton name="radioButtonShowInfo"
                            id="radioButtonShowDescription"
                            checked={!showTitle}
                            onRadioClick={handleRadioClick}
                        >
                            Show Description
                        </RadioButton>
                    </div>
                </div>
                <Flashcards>
                    
                    <div className="border flex flex-wrap p-4 flex-auto justify-center flex-row">
                        {
                            allCards.map(({id, title, description}) => {
                                return <Flashcard key={id} title={title} description={description} showTitle={showTitle} />
                            })
                        }
                    </div>
                    
                </Flashcards>
            </Main>
        </>
    )
}
