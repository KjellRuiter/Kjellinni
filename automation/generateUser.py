from datetime import datetime 

now = str((datetime.now()).timestamp())
pointIndex = now.find('.')
secondsNow = now[0:pointIndex]

automatedUser = f'testUser{secondsNow}'

print(automatedUser)