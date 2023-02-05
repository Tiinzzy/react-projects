CURRENT__HOUSES = [1, -2, 0, 0, 1, 0, 0, 0, 0]

WINNING_POSSIBILITIES = [[1, 1, 1, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 1, 1, 1, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 1, 1, 1],
                         [1, 0, 0, 0, 1, 0, 0, 0, 1],
                         [0, 0, 1, 0, 1, 0, 1, 0, 0],
                         [1, 0, 0, 1, 0, 0, 1, 0, 0],
                         [0, 1, 0, 0, 1, 0, 0, 1, 0],
                         [0, 0, 1, 0, 0, 1, 0, 0, 1]]


def win_match(wp, cs):
    danger = 0
    for i in range(9):
        danger += wp[i] * cs[i]
    return danger


def find_max_danger_wp(wps, wps_danger):
    max_danger = max(wps_danger)
    for i in range(len(wps_danger)):
        if wps_danger[i] == max_danger:
            return wps[i]
    return None

def get_computer_move(max_danger_wp, cs):
    moves =[]
    for i in range(9):
        moves.append(max_danger_wp[i] * cs[i])
    for i in range(9):
        if moves[i] + max_danger_wp[i] == 1:
            return i
    return None

def find_next_move(wps, cs):
    wps_danger = []

    for wp in wps:
        danger = win_match(wp, cs)
        wps_danger.append(danger)
        print('current state --->', cs)
        print('winning possibility --->', wp)
        print('DANGER =>', danger)
        print('--------------------------')

    print(wps_danger)
    md_wp = find_max_danger_wp(wps, wps_danger)
    print(md_wp)

    if md_wp is not None:
        cm = get_computer_move(md_wp, cs)
    print(cm)    


if __name__ == '__main__':
    find_next_move(WINNING_POSSIBILITIES, CURRENT__HOUSES)
