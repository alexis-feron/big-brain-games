import Header from '@/components/Header'
import styles from '@/styles/Blackjack.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import getUser from '@/utils/functions/getUser';
import React, { useEffect, useState } from 'react';


export default function Blackjack() {

    const ONE_DICE_PROBS = new Array(6).fill(0)
    const TWO_DICE_PROBS = new Array(11).fill(0)
    const THREE_DICE_PROBS = new Array(16).fill(0)

    const userConnected = getUser()
    const joueur1 = "Joueur";

    useEffect((joueur1) => {

    document.querySelector('#playButton').addEventListener("click", function(){
        location.reload();
    });

    joueur1 = userConnected ? userConnected.pseudo : "Joueur";
    document.querySelector('#pseudo1').innerHTML = joueur1;
    document.querySelector('#pseudo2').innerHTML = joueur1;


    // Stats :
    let diceThrown = 0;
    let blackjack = 0;
    let score = 0;
    let bust = 0;
    let roundPlayed = 0;
    let userWon = false;
        
    const btn1=document.querySelector("#btn1");
    const btn2=document.querySelector("#btn2");
    const btn3=document.querySelector("#btn3");
    const btn4=document.querySelector("#btn4");
    const divLog = document.querySelector('#logMes');
    
    const DICE = [1, 2, 3, 4, 5, 6]

    for (let i = 1; i <= DICE.length; i++) {
        ONE_DICE_PROBS[i-1] += (1 / DICE.length);
    }

    for (let i = 1; i <= DICE.length; i++) {
        for (let j = 1; j <= DICE.length; j++) {
            TWO_DICE_PROBS[i+j-2] += (1 / 36);
        }
    }

    for (let i = 1; i <= DICE.length; i++) {
        for (let j = 1; j <= DICE.length; j++) {
            for (let k = 1; k <= DICE.length; k++) {
                THREE_DICE_PROBS[i+j+k-3] += (1 / 216);
            }
        }
    }

    function showDice(nb){
        const div = document.querySelector('#game_board');
        let img = document.createElement("img");
        img.src = "/"+nb+".png";
        img.height=150;
        div.appendChild(img);
    }


    function rollDice(n,j){
        
        let total = 0;
        for (let i = 0; i < n; i++) {
            let nb=Math.floor(Math.random() * 6) + 1;
            if (j!="ordi") showDice(nb);
            total += nb;
        }
        if (j!="ordi"){
            log(`${joueur1} a fait `+total+" avec "+n+" dé" + (n > 1 ? "s" : "") );
            diceThrown += n;
            score += total;
        } 
        else log("L'ordinateur a fait "+total+" avec "+n+" dé" + (n > 1 ? "s" : ""));
        return total;
    }

    function getLowerOver21WithOneDice(score){
        let inf = 0;
        let supp = 0;
        for (let i = 0; i < ONE_DICE_PROBS.length; i++) {
            if ((score + (i+1)) <= 21) {
                inf += ONE_DICE_PROBS[i];
            } else {
                supp += ONE_DICE_PROBS[i];
            }
        }
        return { inf, supp };
    }

    function getLowerOver21WithTwoDices(score){
        let inf = 0;
        let supp = 0;
        for (let i = 0; i < TWO_DICE_PROBS.length; i++) {
            if ((score + (i+2)) <= 21) {
                inf += TWO_DICE_PROBS[i];
            } else {
                supp += TWO_DICE_PROBS[i];
            }
        }
        return { inf, supp };
    }

    function getLowerOver21WithThreeDices(score){
        let inf = 0;
        let supp = 0;
        for (let i = 0; i < THREE_DICE_PROBS.length; i++) {
            if ((score + (i+3)) <= 21) {
                inf += THREE_DICE_PROBS[i];
            } else {
                supp += THREE_DICE_PROBS[i];
            }
        }
        return { inf, supp };
    }

    function ordiTurn(score){
        let resp3 = getLowerOver21WithThreeDices(score);
        if(resp3.supp <= resp3.inf) return 3;
    
        let resp2 = getLowerOver21WithTwoDices(score);
        if(resp2.supp <= resp2.inf) return 2;
    
        let resp1 = getLowerOver21WithOneDice(score);
        if(resp1.supp <= resp1.inf) return 1;
    
        return 0;

    }

    function playerDefeat(jetons_p1, jetons_ordi, cagnotte){
        if(jetons_p1 > 0) jetons_p1 -= 1;
        if(jetons_p1 >= 0) cagnotte += 1;
        jetons_ordi += cagnotte;
        log("L'ordinateur gagne la manche ("+score_p1+"/"+score_ordi+"), il remporte "+(cagnotte)+" jeton" + (cagnotte > 1 ? "s" : ""));
        cagnotte = 0;
        return { jetons_p1, jetons_ordi, cagnotte };
    }

    function ordiDefeat(jetons_p1, jetons_ordi, cagnotte){
        if(jetons_ordi > 0) jetons_ordi -= 1;
        if(jetons_ordi >= 0) cagnotte += 1;
        jetons_p1 += cagnotte;
        log(`${joueur1} a  gagné la manche (`+score_p1+"/"+score_ordi+"), il remporte "+ (cagnotte) +" jeton" + (cagnotte > 1 ? "s" : ""));
        cagnotte = 0;
        return { jetons_p1, jetons_ordi, cagnotte };
    }

    function over21(jetons, cagnotte, depassementBool){
        if(jetons > 0) jetons -= 1;
        if(jetons >= 0) cagnotte += 1;
        depassementBool = true;
        return { jetons, cagnotte, depassementBool };
    }
    let selectedValue;
    function waitForButtonClick() {
        return new Promise((resolve) => {
            function handleButtonClick(value) {
                selectedValue = value;
                resolve(value);
            }
            btn1.addEventListener("click", () => handleButtonClick(1));
            btn2.addEventListener("click", () => handleButtonClick(2));
            btn3.addEventListener("click", () => handleButtonClick(3));
            btn4.addEventListener("click", () => handleButtonClick("Ne pas lancer"));
        });
    }

    function log(message){
        let mess = document.createElement("message");
        mess.innerHTML = message;    
        mess.style.display = "block";
        mess.style.marginTop = "10px";
        divLog.appendChild(mess);
    }

    function deleteDice(){
        const div = document.querySelector("#game_board");
        div.innerHTML = '';
        let img = document.createElement("img");
        img.src = "/"+1+".png";
        img.height=150;
        img.width=0;
        img.style.visibility = "hidden";
        div.appendChild(img);
    }

    let jetons_p1;
    let jetons_ordi;
    let score_p1;
    let score_ordi;

    async function play(){
        
        jetons_p1 = 6;
        jetons_ordi = 6;

        let depassement_p1 = false;
        let depassement_ordi = false;

        let cagnotte = 0;
        
        score_p1 = 0;
        score_ordi = 0;

        document.querySelector('#scoreJoueur').innerHTML=" "+score_p1;
        document.querySelector('#scoreIa').innerHTML=" "+score_ordi;

        document.querySelector('#jetonsJoueur').innerHTML=" "+jetons_p1;
        document.querySelector('#jetonsIa').innerHTML=jetons_ordi;
        deleteDice();
        while (jetons_p1 > 0 && jetons_ordi > 0) {

            roundPlayed += 1;

            for(let i=0; i<3; i++){

                let selectedValue = await waitForButtonClick();
                deleteDice();
                
                if(i == 0) document.querySelector('#logMes').innerHTML="";
                if (selectedValue != "Ne pas lancer") {
                    score_p1 += rollDice(selectedValue,"j1");
                     
                    log(`${joueur1} a `+score_p1+" point" + (score_p1 > 1 ? "s" : ""));
                    log("<br/>")
                }else{
                    log(`${joueur1} passe son tour`);
                    log("<br/>")
                }

                let nb_dices = ordiTurn(score_ordi);
                if(nb_dices != 0){
                    score_ordi += rollDice(nb_dices,"ordi");
                    log("L'ordinateur possède "+score_ordi+" point" + (score_ordi > 1 ? "s" : ""));
                    log("<br/>")
                }else{
                    if(score_p1 > score_ordi && jetons_ordi > 2 && score_p1 <= 21 && score_ordi <= 19){
                        score_ordi += rollDice(1,"ordi");
                        log("L'ordinateur possède "+score_ordi+" point" + (score_ordi > 1 ? "s" : ""));
                        log("<br/>")
                    } else{
                        log("L'ordinateur passe son tour");
                        log("<br/>")
                    } 
                }  

                document.querySelector('#scoreJoueur').innerHTML=" "+score_p1;
                document.querySelector('#scoreIa').innerHTML=" "+score_ordi;

                if(score_ordi === 21 && score_p1 === 21){
                    blackjack += 1;
                    break;
                }else if(score_p1 > 21 && score_ordi > 21){
                    let resp = over21(jetons_p1, cagnotte, depassement_p1);
                    jetons_p1 = resp.jetons;
                    cagnotte = resp.cagnotte;
                    depassement_p1 = resp.depassementBool;
    
                    resp = over21(jetons_ordi, cagnotte, depassement_ordi);
                    jetons_ordi = resp.jetons;
                    cagnotte = resp.cagnotte;
                    depassement_ordi = resp.depassementBool;
                    break;
                }else if(score_p1 > 21){
                    let resp = over21(jetons_p1, cagnotte, depassement_p1);
                    jetons_p1 = resp.jetons;
                    cagnotte = resp.cagnotte;
                    depassement_p1 = resp.depassementBool;
                    break;
                }else if(score_ordi > 21){
                    let resp = over21(jetons_ordi, cagnotte, depassement_ordi);
                    jetons_ordi = resp.jetons;
                    cagnotte = resp.cagnotte;
                    depassement_ordi = resp.depassementBool;
                    break;
                }
            }
            if(depassement_ordi && depassement_p1){
                bust += 1;
                log("EGALITE ("+score_p1+"/"+score_ordi+"), ils déposent chacun 1 jeton dans la cagnotte");
                log("<br/>")
                cagnotte += 2;
            }else if(depassement_p1 && !depassement_ordi){
                bust += 1;
                log(`${joueur1} a dépassé 21, il dépose 1 jeton dans la cagnotte`);
                let resp = playerDefeat(jetons_p1, jetons_ordi, cagnotte);
                jetons_p1 = resp.jetons_p1;
                jetons_ordi = resp.jetons_ordi;
                cagnotte = resp.cagnotte;
            }else if(!depassement_p1 && depassement_ordi){
                log("L'ordinateur a dépassé 21, il dépose 1 jeton dans la cagnotte");
                if(score_p1 === 21){
                    blackjack += 1;
                }
                let resp = ordiDefeat(jetons_p1, jetons_ordi, cagnotte);
                jetons_p1 = resp.jetons_p1;
                jetons_ordi = resp.jetons_ordi;
                cagnotte = resp.cagnotte;
            
            }else if(score_p1 > score_ordi){
                log(`${joueur1} a un score plus élevé`)
                if(score_p1 === 21){
                    blackjack += 1;
                }
                let resp = ordiDefeat(jetons_p1, jetons_ordi, cagnotte);
                jetons_p1 = resp.jetons_p1;
                jetons_ordi = resp.jetons_ordi;
                cagnotte = resp.cagnotte;
            }else if(score_p1 < score_ordi){
                if(score_p1 === 21){
                    blackjack += 1;
                }
                log("L'ordinateur a un score plus élevé")
                let resp = playerDefeat(jetons_p1, jetons_ordi, cagnotte);
                jetons_p1 = resp.jetons_p1;
                jetons_ordi = resp.jetons_ordi;
                cagnotte = resp.cagnotte;
            }else{
                log("EGALITE ("+score_p1+"/"+score_ordi+"), les jetons de la cagnotte restent en jeu");  
                if(score_p1 === 21){
                    blackjack += 1;
                }
            }

            depassement_p1 = false;
            depassement_ordi = false;
            score_p1 = 0;
            score_ordi = 0;

        
            document.querySelector('#scoreJoueur').innerHTML=" "+score_p1;
            document.querySelector('#scoreIa').innerHTML=score_ordi;
            
            document.querySelector('#jetonsJoueur').innerHTML=" "+jetons_p1;
            document.querySelector('#jetonsIa').innerHTML=jetons_ordi;
            
        }

        if(jetons_p1 <= 0){
            log("--------------------------------------");
            log("L'ordinateur a gagné la partie");
            document.querySelector('#playButton').style.visibility = "visible";
	        deleteDice();

            console.log("userWon : "+userWon)
            console.log("diceThrown : "+diceThrown)
            console.log("blackjack : "+blackjack)
            console.log("score : "+score)
            console.log("bust : "+bust)
            console.log("roundPlayed : "+roundPlayed)
            if(userConnected != null) await addWin(userWon, diceThrown, blackjack, score, bust, roundPlayed);

        }else{
            log("-------------------------------------");
            log(`${joueur1} a gagné la partie`);
            document.querySelector('#playButton').style.visibility = "visible";
	        deleteDice();

            userWon = true;
            console.log("userWon : "+userWon)
            console.log("diceThrown : "+diceThrown)
            console.log("blackjack : "+blackjack)
            console.log("score : "+score)
            console.log("bust : "+bust)
            console.log("roundPlayed : "+roundPlayed)
            if(userConnected != null) await addWin(userWon, diceThrown, blackjack, score, bust, roundPlayed);
            
        }
    }

    async function addWin(userWon, diceThrown, blackjack, score, bust, roundPlayed){
        if(userConnected) {
            const resp = await userConnected.addBlackJackStats(userWon, diceThrown, blackjack, score, bust, roundPlayed)
            if(resp.success === true) console.log('Stats ajoutées');
            else console.log(resp.error);
        }

    }

    play();
});

return (
    <div id="container" className={styles.container}>
        <Header/>
        <main id="content" className={styles.content}>
            <div id="main" className={styles.main}>
                <div id="name_player_get" className={styles.name_player_get}></div>
                <div id="jetons" className={styles.jetons}>
                        <h4>Jetons</h4>
                        <span className={styles.name}>Ordinateur</span>
                        <span id='jetonsIa'></span> /
                        <span id='jetonsJoueur'></span>
                        <span className={styles.name} id="pseudo1">{joueur1}</span>
                    </div>
                <div id="board" className={styles.board}>
                    <div id="game_board" className={styles.game_board}></div>
                    <div id="score" className={styles.score}>
                        <h4>Score</h4>
                        <span className={styles.name}>Ordinateur</span>
                        <span id='scoreIa'></span> / 
                        <span id='scoreJoueur'></span>
                        <span className={styles.name} id="pseudo2">{joueur1}</span>
                    </div>
                    <div id="action" className={styles.action}> 
                        <h3>Choisir une action</h3> 
                        <input type="button" className={styles.validButton} id="btn1" value="Lancer 1 dé"  />
                        <input type="button" className={styles.validButton} id="btn2" value="Lancer 2 dés" />
                        <input type="button" className={styles.validButton} id="btn3" value="Lancer 3 dés"  />
                        <input type="button" className={styles.validButton} id="btn4" value="Ne pas lancer" />
                    </div>
                    <p id="goal" className={styles.goal}> Objectif : Avoir un plus grand score que son adversaire sans dépasser 21</p>
                </div>
			</div>
            <div id="log" className={styles.log}>
                <h3 className={styles.logTitle}>LOGS</h3><hr/>
                <div id="logMes" className={styles.logMes}></div>
                <button id="playButton" className={styles.playButton}> <FontAwesomeIcon className={styles.arrowIcon} icon={faCircleArrowRight} /> <span className={styles.spanButton}>Relancer la partie</span></button> 
            </div>
        </main>
    </div>
 
  )
}
