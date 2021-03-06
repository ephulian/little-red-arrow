function satNav(directions) {
    const arrow = document.querySelector('.dot')
    const arrowContainer = document.querySelector('.arrow-container')

    const instructionsList = Array.from(directions).map(v => v.toLowerCase())    
    
    let currentX = 0
    let currentY = 0
    let currentDirection = 'north'

    // returns 1 if next and Nth * 1000 for rest
    function findDistance(instruction){
        const distanceInstruction = instruction.split(' ')[2];
        const distanceInstructionIndex = parseInt(instruction.split(' ')[2], 10)
        let distance = 0;

        if(distanceInstruction == 'next'){
            distance = 1
        } else if (distanceInstructionIndex >= 1){
            distance = distanceInstructionIndex * 1000
        }
        return distance
    }

    // takes instruction and outputs direction
    function findDirection(instruction){
        return instruction.split(' ')[3];
    }

    // check if km or m and outputs the distance
    function findStraight(instruction){
        let distance = 0;
        const km = instruction.split(' ')[3] //?
        if(km.endsWith('km')){
            distance = Number(km.replace(/km/, ' ') * 1000); //?
        } else {
            distance = Number(km.replace(/m/, ' ')); //?
        }
        return distance //?
    }

    // rounds and adds
    addRound = (current, distance) => {
        let currentVar =0
        if(current >= 0 && current % 1000 === 0){
            currentVar = current += distance; //?
        } else if(current >= 0 && current % 1000 !== 0){
            currentVar = Math.ceil(current * 0.001) * 1000; //?
        } else if (current < 0 && current % 1000 === 0){
            currentVar = current += distance; //?
        } else if (current < 0 && current % 1000 !==0){
            currentVar = Math.floor(current * 0.001) * 1000; //?
        }
        return currentVar
    }
    
    // rounds and subtracts
    subRound = (current, distance) => {
        let currentVar =0
        if(current >= 0 && current % 1000 === 0){
            currentVar = current -= distance; //?
        } else if(current >= 0 && current % 1000 !== 0){
            currentVar = Math.ceil(current * 0.001) * 1000; //?
        } else if (current < 0 && current % 1000 === 0){
            currentVar = current -= distance; //?
        } else if (current < 0 && current % 1000 !==0){
            currentVar = Math.floor(current * 0.001) * 1000; //?
        }
    return currentVar
    }

    // main switch 
    instructionsList.forEach(function(instruction){
        const firstWord = instruction.split(' ')[0]; //?
        const lastWord = instruction.split(' ')[1]; //?
        let distatnceToMove = findDistance(instruction); //?
        switch(firstWord){
            case 'head':
                switch(lastWord){ 
                    case 'east':
                        currentDirection = 'east'
                        break
                    case 'north':
                        currentDirection = 'north'
                        break
                    case 'south':
                        currentDirection = 'south'
                        break
                    case 'west':
                        currentDirection = 'west'
                        break
                    }
            case 'take':
                if(currentDirection === "east" && findDirection(instruction) === "right"){
                    currentX = addRound(currentX, distatnceToMove); //?
                    currentY += 1000; //?
                    currentDirection = 'south';
                } else if (currentDirection === "east" && findDirection(instruction) === "left"){
                    currentX = addRound(currentX, distatnceToMove);
                    currentY -= 1000;
                    currentDirection = 'north';
                } else if (currentDirection === "west" && findDirection(instruction) === "right"){
                    currentX = subRound(currentX, distatnceToMove)
                    currentY -= 1000
                    currentDirection = 'north'
                } else if (currentDirection === "west" && findDirection(instruction) === "left"){
                    currentX = subRound(currentX, distatnceToMove)
                    currentY += 1000;
                    currentDirection = 'south'
                } else if (currentDirection === "north" && findDirection(instruction) === "right"){
                    currentX += 1000
                    currentY = subRound(currentY, distatnceToMove)
                    currentDirection = 'east'
                } else if (currentDirection === "north" && findDirection(instruction) === "left"){
                    currentX -= 1000; 
                    currentY = subRound(currentY, distatnceToMove)
                    currentDirection = 'west'
                } else if (currentDirection === "south" && findDirection(instruction) === "right"){
                    currentX += 1000;
                    currentY = addRound(currentY, distatnceToMove);
                    currentDirection = 'east'
                } else if (currentDirection === "south" && findDirection(instruction) === "left"){
                    currentX -= 1000
                    currentY = addRound(currentY, distatnceToMove);
                    currentDirection = 'west'
                }
                break
            case 'go':
                switch(currentDirection){
                    case 'east':
                        currentX += findStraight(instruction); //?
                        break
                    case 'west':
                        currentX -= findStraight(instruction); //?
                        break
                    case 'north':
                        currentY -= findStraight(instruction); //?
                        break
                    case 'south':
                        currentY += findStraight(instruction); //?
                        break
                }
                break
            case 'turn':
                switch(currentDirection){
                    case "south":
                        currentDirection = "north"; //?
                        break
                    case "north":
                        currentDirection = "south"; //?
                        break
                    case "east":
                        currentDirection = "west"; //?
                        break
                    case "west":
                        currentDirection = "east"; //?
                        break
                }
                break
            }
    })

    // arrow control code
    function arrowControl(){
        let translateValueX = currentX * 0.05; //?
        let translateValueY = currentY * 0.05; //?
        
        // spin
        switch(currentDirection){
            case 'south':
                arrow.style.transform = ('rotate(180deg)')
                break
            case 'north':
                arrow.style.transform = ('rotate(0deg)')
                break
            case 'west':
                arrow.style.transform = ('rotate(270deg)')
                break
            case 'east':
                arrow.style.transform = ('rotate(90deg)')
                break
            }
        
        // move
        arrowContainer.style.transform = (`translate(${translateValueX}px, ${translateValueY}px)`);
        
    }

    arrowControl()

    return [currentX * 0.001, currentY*0.001]
}

let instructions = [
]

function enterInstruction (){
    let input = document.getElementById('input').value;
    if(input == 'reset'){
        instructions = []
        document.forms['form'].reset()
    } else {
        instructions.push(input)
        document.forms['form'].reset()
    }
    satNav(instructions)
    console.log(input)
    console.log(instructions)
}

