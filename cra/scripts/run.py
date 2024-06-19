# import random
# print(sum(range(1,101)))

# print(random.random(), end = " ")
# print(random.randint(1,101))

# list1 = ['zhangfei', 'guanyu', 'liubei', 'zhaoyun']
# list2 = [0, 3, 2]
# print(list(zip(list1, list2)))

def twoSum(nums, target):
    # for i in range(len(nums)):
    #     for j in range(i+1, len(nums)):
    #         if nums[i] + nums[j] == target:
    #             return [i, j]
    map = dict()
    for idx, num in enumerate(nums):
        if target-num in map.keys():
            return [map[target-num],idx]
        map[num] = idx
    return []

print(twoSum([2,3,9,10], 5))

# list = [a**2 for a in range(1,10)]
# print(list)

# def out(fuc):
#     def inner():
#         print('before do xxx')
#         fuc()
#         print('after do xxx')
#     return inner

# @out
# def study():
#     print('study')

# study()

class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):
            cls._instance = super(Singleton, cls).__new__(cls, *args, **kwargs)
        return cls._instance

s1 = Singleton()
s2 = Singleton()

# print(s1 is s2)
