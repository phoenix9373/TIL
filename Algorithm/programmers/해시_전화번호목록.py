# -*- coding: utf-8 -*-

def solution(phone_book):
    dict_phone_book = {key: 0 for key in phone_book}
    for i in range(len(phone_book)):
        for j in range(len(phone_book[i])):
            number = phone_book[i][:j+1]
            if number in dict_phone_book:
                dict_phone_book[number] += 1
                if dict_phone_book[number] == 2:
                    return False
    answer = True
    return answer

a = solution(["119", "97674223", "1195524421"])
print('안녕')

# 다른 사람 풀이 1 : 내부 메서드 활용
def solution1(phoneBook):
    phoneBook = sorted(phoneBook)

    for p1, p2 in zip(phoneBook, phoneBook[1:]):
        print(p1, p2)
        # if p2.startswith(p1):
        #     return False
    return True
b = solution1(["119", "97674223", "1195524421", '11922'])

# 다른 사람 풀이 2 : 해쉬 활용
def solution2(phone_book):
    answer = True
    hash_map = {}
    for phone_number in phone_book:
        hash_map[phone_number] = 1
    for phone_number in phone_book:
        temp = ""
        for number in phone_number:
            temp += number
            if temp in hash_map and temp != phone_number:
                answer = False
    return answer