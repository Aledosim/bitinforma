import React from 'react';

import '../styles/topbar.css'

export default function TopBar(){
    return(
        <div id='topbar'>
            <div>
                <img src='logo.svg' alt='logo'></img>
            </div>
            <div>
                <form>
                    <input type='search' id='searchfield' name='searchfield'></input>
                    <input type='button' name='searchfield'></input>
                </form>
            </div>
        </div>
    );
};
