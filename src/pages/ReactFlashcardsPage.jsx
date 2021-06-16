import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Button from "../components/Button";
import Flashcard from "../components/Flashcard";
import Flashcards from "../components/Flashcards";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Main from "../components/Main";
import RadioButton from "../components/RadioButton";
import Error from "../components/Error";

import { helperShuffleArray } from "../helpers/arrayHelpers";
import { apiDeleteFlashcard, apiGetAllFlashcards } from "../services/apiService";
import FlashCardItem from "../components/FlashCardItem";
import FlashcardForm from "../components/FlashcardForm";

export default function ReactFlashcardsPage() {
    const [allCards, setAllCards] = useState([]);
    const [studyCards, setStudyCards] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showTitle, setShowTile] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedFlashcard, setSelectedFlashcard] = useState(null);

    const [createMode, setCreateMode] = useState(true);

    useEffect(() => {
        (async function() {
            try {
                const allFlashcards = await apiGetAllFlashcards();
                setAllCards(allFlashcards);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        })()
    }, [])

    useEffect(() => {
        setStudyCards(allCards.map(card => ({...card, showTitle: true})));
    }, [allCards])
    
    function handleButtonClick() {
        const shuffledCards = helperShuffleArray(studyCards);
        setStudyCards(shuffledCards);
    }

    function handleRadioClick() {
        setShowTile(showTitle => !showTitle);
        const updatedFlashcards = [...studyCards].map((card) => {
            return {...card, showTitle: !showTitle};
        })
        setStudyCards(updatedFlashcards);
    }

    function handleCardClick(cardId) {
        const updatedFlashcards = [...studyCards];
        const cardIndex = studyCards.findIndex((card) => card.id === cardId);
        updatedFlashcards[cardIndex].showTitle = !updatedFlashcards[cardIndex].showTitle; 
        setStudyCards(updatedFlashcards);
    }

    let mainJsx = (
        <div className="text-center">
            <Loading />
        </div>
    )

    if (error) {
        mainJsx = <Error>{error}</Error>
    }

    function handleEditCardClick(flashCard) {
        setCreateMode(false);
        setSelectedTab(1);
        setSelectedFlashcard(flashCard);
    }

    function handleDeleteCardClick(id) {
        const updatedAllCards = allCards.filter(card => card.id !== id);
        setAllCards(updatedAllCards);
        apiDeleteFlashcard(id);
    }

    function handleTabSelection(tabIndex) {
        setSelectedTab(tabIndex);
    }

    if (!loading) {
        mainJsx = (
            <>
                <Tabs selectedIndex={selectedTab} onSelect={handleTabSelection}>
                    <TabList>
                    <Tab>Listagem</Tab>
                    <Tab>Cadastro</Tab>
                    <Tab>Estudo</Tab>
                    </TabList>

                    <TabPanel>
                        {
                            allCards.map(card => {
                                return <FlashCardItem onEdit={handleEditCardClick}
                                    onDelete={handleDeleteCardClick}
                                    key={card.id}
                                >
                                        {card}
                                    </FlashCardItem>
                            })
                        }
                    </TabPanel>

                    <TabPanel>
                        <FlashcardForm flashCard={selectedFlashcard} createMode={createMode} />
                    </TabPanel>

                    <TabPanel>
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
                                    studyCards.map(({id, title, description, showTitle}) => {
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
                    </TabPanel>
                </Tabs>
                
            </>
        );
    } 

    return (
        <>
            <Header>React-Flashcards</Header>
            <Main>{mainJsx}</Main>
        </>
    )
}
