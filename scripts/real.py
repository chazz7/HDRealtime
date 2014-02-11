from pymongo import MongoClient
import csv

def doFormat(filename, key, skipRow=True, save=False, find_max=False):
    current_max = None
    db = None
    if save:
        client = MongoClient()
        db = client.main
    points = []
    with open(filename, "rU") as csvfile:
        file = csv.reader(csvfile, delimiter=",")
        for row in file:
            point = {}
            values = []

            if skipRow:
                skipRow = False
                continue

            lat = False
            lng = False
            
            for col in row:
                if not lat:
                    point['latitude'] = col
                    lat = True
                    continue
            
                if not lng:
                    point['longitude'] = col
                    lng = True
                    continue
              
                values.append(col)
            
            point['values'] = values
            points.append(point)
            print db
            if find_max:
                max_val = max(values)
                if current_max == None or max_val > current_max:
                    current_max = max_val
            if save:
                point['key'] = key
                db.points.insert(point)
    
    if find_max:
        db_max = { "key" : key, "value" : current_max }
        print db
        maxes = db['maxes']
        maxes.insert(db_max)
        print db_max

    # print points
    return points


path = "../data/"

def saveCalls():
    # doFormat(path + "SumCallsDaily15days.csv", "sumCalls", save=True)
    doFormat(path + "SumCallsDaily15days.csv", "sumCalls", find_max=True)

def saveHome():
    # doFormat(path + "DivHomeDaily15days.csv", "divHome", save=True)
    doFormat(path + "DivHomeDaily15days.csv", "divHome", find_max=True)

def savePeople():
    # doFormat(path + "DivPeopleDaily.csv", "divPeople", save=True)
    doFormat(path + "DivPeopleDaily.csv", "divPeople", find_max=True)

saveCalls()
saveHome()
savePeople()


