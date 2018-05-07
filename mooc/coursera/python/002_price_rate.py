price = input('Please enter price: ')
rate = input('Please enter rate: ')
try:
    price = float(price)
    rate = float(rate)
except:
    print('Please enter numeric input')
    quit()

print('Pay: ', price * rate)
