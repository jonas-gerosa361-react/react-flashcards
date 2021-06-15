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
        const updatedFlashcards = [...allCards].map((card) => {
            return {...card, showTitle: !showTitle};
        })
        setAllCards(updatedFlashcards);
    }

    function handleCardClick(cardId) {
        const updatedFlashcards = [...allCards];
        const cardIndex = allCards.findIndex((card) => card.id === cardId);
        updatedFlashcards[cardIndex].showTitle = !updatedFlashcards[cardIndex].showTitle; 
        console.log(updatedFlashcards[cardIndex])
        setAllCards(updatedFlashcards);
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
                            allCards.map(({id, title, description, showTitle}) => {
                                return <Flashcard key={id}
                                    id={id}
                                    title={title}
                                    description={description}
                                    onCardClick={handleCardClick}
                                    showTitle={showTitle} />
                            })
                        }
                    </div>
                    
                </Flashcards>
            </Main>
        </>
    )
}
