import random


def get_random_url_assignment():
    random_choices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    rand_assignment = ''
    for i in range(10):
        rand_Num = random.randint(0, len(random_choices))
        x = random_choices[rand_Num-1:rand_Num]
        rand_assignment += x

    return rand_assignment
