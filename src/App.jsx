import React, {useEffect} from "react"
import './App.css'


const App = ()=> {
    let order = [];
    let clickedOrder = [];
    let score = 0;

    // 0 = verde
    // 1 = vermelho
    // 2 = amarelo
    // 3 = azul

    const blue = document.querySelector('.blue');
    const red = document.querySelector('.red');
    const green = document.querySelector('.green');
    const yellow = document.querySelector('.yellow');

    //cria ordem aleatória de cores
    const shuffleOrder = ()=> {
        let colorOrder = Math.floor(Math.random() * 4);
        order[order.length] = colorOrder;
        clickedOrder = [];

        for(let i in order) {
            let elementColor = createColorElement(order[i]);
            ligthColor(elementColor, Number(i) + 1)
        }
    }
        
    //acende a próxima cor
    const ligthColor = (element, number)=> {
        number = number * 500;
        setTimeout(()=> {
            element.classList.add('selected');
        }, number - 250);
        setTimeout(()=> {
            element.classList.remove('selected');
        },number);
    }
        
    //checa se ordem clicada é mesma gerada no jogo
    const checkOrder = ()=> {
        for(let i in clickedOrder) {
            if(clickedOrder[i] != order[i]) {
                gameOver();
                break;
            }
        }

        if(clickedOrder.length == order.length) {
            alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível`);
            nextLevel();
        }
    }
        
    //função para o click do usuario
    const click = (color)=> {
        clickedOrder[clickedOrder.length] = color;
        console.log(color)
        createColorElement(color).classList.add('selected');

        setTimeout(()=> {
            createColorElement(color).classList.remove('selected');
            checkOrder();
        }, 250);

    }

    //função que retorna a cor
    const createColorElement = (color)=> {
        if(color == 0) {
            return green;
        } else if(color == 1) {
            return red;
        } else if(color == 2) {
            return yellow;
        } else if(color == 3){
            return blue;
        }
    }

    //função para o  próximo nível do jogo
    const nextLevel = ()=> {
        score++;
        shuffleOrder();
    }

    //função para game over
    const gameOver = ()=> {
        alert(`Pontuação ${score}!\nVocê perdeu o jogo!\nClick em OK para iniciar um novo jogo!`);
        order = [];
        clickedOrder = [];

        playGame();
    }
    //função de inicio do jogo
    const playGame = ()=> {
        alert(`Bem vindos ao Genius! Iniciando novo jogo!`);
        score = 0;
        // alert(score)

        nextLevel();
    }

    //evento de click para as cores
    // green.onclick = ()=> click(0);
    // red.onclick = ()=> click(1);
    // yellow.onclick = ()=> click(2);
    // blue.onclick = ()=> click(3);

    // green.addEventListener('click', click(0));
    // red.addEventListener('click', click(1));
    // yellow.addEventListener('click', click(2));
    // blue.addEventListener('click', click(3));

    //inicio do jogo
    // playGame()

    useEffect(
      () => { playGame() });

    return (
        <div className="main-game">
            {/* <button style={{position: "fixed", left: "0"}} onClick={()=> playGame()}>Iniciar</button> */}
            <div className="genius">
                <div className="blue" onClick={()=> click(3)}></div>
                <div className="yellow" onClick={()=> click(2)}></div>
                <div className="red" onClick={()=> click(1)}></div>
                <div className="green" onClick={()=> click(0)}></div>
            </div>
        </div>
    )
}

export default App;
