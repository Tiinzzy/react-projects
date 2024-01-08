export function startMotion(mass, miu, velocity, initForce, selectedRedCoord, selectedBlackCoord) {
    let friction = mass * miu * 9.81;

    let x = selectedBlackCoord.col - selectedRedCoord.col;
    let y = selectedBlackCoord.row - selectedRedCoord.row;

    console.log('x ->', x, 'y ->', y, 'friction ->', friction);
}