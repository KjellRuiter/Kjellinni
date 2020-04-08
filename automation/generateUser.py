from datetime import datetime 

def createDummyUser():
    now = str((datetime.now()).timestamp())
    pointIndex = now.find('.')
    secondsNow = now[0:pointIndex]

    automatedUser = f'testUser{secondsNow}'
    return {
        "name": automatedUser,
        "email": f'{automatedUser}@hotmail.com',
        "password": "testtest123"
    }