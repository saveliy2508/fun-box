import React, {useMemo, useState} from 'react';
import {ICards} from '../App';
import './Card.scss';

interface CardProps {
    cardData: ICards;
    selected: boolean;
    onClick: () => void;
}

export const Card = ({cardData, selected, onClick}: CardProps) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const descriptionText = useMemo(() => {
        if (isHover && selected) {
            return (
                <div className='selectedDescription'>
                    Котэ не одобряет?
                </div>
            )
        } else {
            return (
                <div className='description'>
                    Сказочное заморское яство
                </div>
            )
        }
    }, [isHover, selected])

    const typeText = useMemo(() => {
        switch (cardData.foodType) {
            case 'chicken':
                return 'с курой';
            case 'duck':
                return 'с фуа-гра';
            case 'fish':
                return 'с рыбой';
        }
    }, []);

    const portionText = useMemo(() => {
        switch (cardData.size) {
            case '0,5':
                return (
                    <>
                        10 порций
                        <br/>
                        мышь в подарок
                    </>
                );
            case '2':
                return (
                    <>
                        40 порций
                        <br/>
                        2 мыши в подарок
                    </>
                );
            case '5':
                return (
                    <>
                        100 порций
                        <br/>
                        5 мыши в подарок
                        <br/>
                        закзачик доволен
                    </>
                );
        }
    }, []);

    const footer = useMemo(() => {
        if (cardData.outOfStock) {
            return (
                <div
                    className='footer emptyFooter'
                >
                    Печалька, {typeText} закончился
                </div>
            );
        }

        if (selected) {
            switch (cardData.foodType) {
                case 'chicken':
                    return <div className='footer'>Филе из циплят с трюфелями в бульоне.</div>;
                case 'duck':
                    return <div className='footer'>Печень утки разварная с артишоками.</div>;
                case 'fish':
                    return <div className='footer'>Головы щучьи да свежайшая семгушка</div>;
            }
        }

        return <div className='footer'>Чего сидишь? Порадуй котэ, <span className='buyButton'
                                                                        onClick={onClick}>купи</span>.
        </div>

    }, [cardData.foodType, cardData.outOfStock, selected, typeText]);

    const selectCardHandle = () => {
        onClick()
        setIsHover(false)
    }

    if (cardData.outOfStock) {
        return (
            <div className={'cardWrapper disabledCardWrapper'}>
                <div className='cardBorder'>
                    <main className='card'>
                        <div className='description'>
                            Сказочное заморское яство
                        </div>
                        <div className='title'>
                            Нямушка
                        </div>
                        <div className='type'>
                            {typeText}
                        </div>
                        <div className='portion'>
                            {portionText}
                        </div>
                        <div className='size'>
                            <span className='number'>{cardData.size}</span>
                            <span className='weight'>кг</span>
                        </div>
                    </main>
                </div>
                {footer}
            </div>
        )
    }


    return (
        <div
            className={`cardWrapper ${selected ? 'selectedCardWrapper' : ''}`}
        >
            <div className='cardBorder'>
                <main className='card'
                      onMouseEnter={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                      onClick={selectCardHandle}
                >
                    {descriptionText}
                    <div className='title'>
                        Нямушка
                    </div>
                    <div className='type'>
                        {typeText}
                    </div>
                    <div className='portion'>
                        {portionText}
                    </div>
                    <div className='size'>
                        <span className='number'>{cardData.size}</span>
                        <span className='weight'>кг</span>
                    </div>
                </main>
            </div>
            {footer}
        </div>
    );
};
