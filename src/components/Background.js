import React, { useContext } from 'react';

import styles from '../styles/components/Background.module.css'

import back_up from '../images/back_up.svg'
import back_down from '../images/back_down.svg'

export default function Background() {

    return(
        <div data-cy='background' className={styles.backgroundContainer}>
            <div>
                <img
                    src={back_up}
                />
            </div>
            <div>
                <img
                    src={back_down}
                />
            </div>
        </div>
    )
}
