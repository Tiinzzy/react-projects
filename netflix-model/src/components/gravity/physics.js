export function updateUniverse(universe) {
    let nextUniverseState = [];
    for (let b of universe) {
        nextUniverseState.push(nextState(b));
    }
    return nextUniverseState;
}

function nextState(body) {
    let newState = { ...body }

    newState.x += newState.s * Math.cos(newState.a);
    newState.y -= newState.s * Math.sin(newState.a);
    return newState;
}