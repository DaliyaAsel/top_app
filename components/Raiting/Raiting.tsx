// компонент для звездочек

import { useEffect, useState, KeyboardEvent } from "react";
import { RaitingProps } from "./Raiting.props";

import styles from './Raiting.module.css';
import cn from 'classnames';

import StarIcon from './star.svg';


export function Raiting( {isEditable=false, raiting, setRaiting, ...props} : RaitingProps ): JSX.Element {

    const [raitingArray, setRaitingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))

    useEffect(() => {
        constructRaiting(raiting)
    }, [raiting])

    // для того чтобы заполнить state raitingArray
    const constructRaiting = (currentRaiting: number) => {
        const updateArray = raitingArray.map((r: JSX.Element, i: number) => {
            return(
                <span  key={i}  
                className={cn(styles.star, {
                    [styles.filled] : i < currentRaiting,
                    [styles.editable] : isEditable
                })}                 
                onMouseEnter={() => changeDisplay( i + 1 )}
                onMouseLeave={() => changeDisplay(raiting)} // если мышь ушла с элемента, то возвращаем исходный рейтинг
                onClick={() => onClickStar( i + 1) }
                >
                  <StarIcon 
                    tabIndex={isEditable ? 0 : -1}
                    onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace( i + 1, e)}
                />
                </span>

            )
        })

        setRaitingArray(updateArray);
    }


    const changeDisplay = (rai: number) => {
        if(!isEditable) { //это если компонент нередактируемый
            return;
        }

        constructRaiting(rai);
    }

    const onClickStar = (rai: number) => {
        if(!isEditable || !setRaiting) { //это если компонент нередактируемый
            return;
        }

        setRaiting(rai);
    }

    const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
        if(e.code !=='Space' || !setRaiting) {
            return;
        }

        setRaiting(i);
    }

    return (
        <div {...props}>
            {
                raitingArray.map((r,i) => (<span key={i}>{r}</span>))
            }
        </div>
    )
}