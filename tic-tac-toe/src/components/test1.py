def find_row_dangers(cs):
    danger_rows = []
    for r in range(3):
        row_sum = 0
        for c in range(3):
            row_sum += cs[r*3+c]
        if row_sum == 2:
            danger_rows.append(r)
    return danger_rows


def find_column_dangers(cs):
    danger_cols = []
    for c in range(3):
        col_sum = 0
        for r in range(3):
            col_sum += cs[r*3+c]
        if col_sum == 2:
            danger_cols.append(c)
    return danger_cols
        

def find_diagonal_dangers(cs):
    danger_diags = []
    if cs[0]+cs[4]+cs[8] == 2:
        danger_diags.append(0 if cs[0] == 0 else (4 if cs[4] == 0 else 8))
    if cs[2]+cs[4]+cs[6] == 2:
        danger_diags.append(6 if cs[6] == 0 else (4 if cs[4] == 0 else 2))

    return danger_diags


def my_nex_play(dr, dc, dd, cs):
    play = []
    for r in dr:
        for c in range(3):
            if cs[r*3 + c] == 0:
                play.append(r*3 + c)
                
    for c in dc:
        for r in range(3):
            if cs[r*3 + c] == 0:
                play.append(r*3 + c)    
                
    for d in dd:
        play.append(d)   
                
    return play


cs = [ 1,  0,  1,
       0,  0,  0,
       1,  10, 10
     ]

drs = find_row_dangers(cs)
print('DRs:', drs)

dcs = find_column_dangers(cs)
print('DCs:', dcs)

dds = find_diagonal_dangers(cs)
print('DDs:', dds)

play = my_nex_play(drs, dcs, dds, cs)
print(play)