from pymongo import MongoClient
import csv

def doFormat(filename, skipRow=True, save=False):
    db = None
    if save:
        client = MongoClient()
        db = client.app
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
            if save:
                db.points.insert(point)
        
    print points
    return points
    # print points
    # return points


path = "../data/"
#doFormat(path + "SumCallsDaily15days.csv")
doFormat(path + "DivHomeDaily15days.csv")
#doFormat(path + "DivPeopleDaily.csv")


