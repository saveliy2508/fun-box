import React, {useState} from 'react';
import {Card} from './Card/Card';
import './styles/App.scss';

export interface ICards {
    id: string;
    foodType: 'duck' | 'chicken' | 'fish';
    size: string;
    outOfStock: boolean;
}

const cards: ICards[] = [
    {
        id: '1',
        foodType: 'duck',
        size: '0,5',
        outOfStock: false
    },
    {
        id: '2',
        foodType: 'fish',
        size: '2',
        outOfStock: false
    },
    {
        id: '3',
        foodType: 'chicken',
        size: '5',
        outOfStock: true
    },
];

export function App() {
    const [selectedCard, setSelectedCard] = useState<string[]>([]);

    const handleClickCard = (id: string) => {
        if (selectedCard.includes(id)) {
            setSelectedCard((prev) => prev.filter(item => item !== id))
        } else {
            setSelectedCard((prev) => [...prev, id])
        }
    }

    return (
        <div className='App'>
            <div className='appContainer'>
                <div className='appTitle'>
                    Ты сегодня покормил кота?
                </div>
                <div className='cardsList'>
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            cardData={card}
                            selected={selectedCard.includes(card.id)}
                            onClick={() => handleClickCard(card.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
