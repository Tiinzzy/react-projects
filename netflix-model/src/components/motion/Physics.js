export function getRedBallDirection(redCoord, blackCoord) {
    let dx = blackCoord.col - redCoord.col;
    let dy = blackCoord.row - redCoord.row;
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    dx /= magnitude;
    dy /= magnitude;
    return { dx, dy };
}