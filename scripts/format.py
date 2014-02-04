def doFormat(filename, skipRow=True):
	points = []
	with open(filename, "rU") as csvfile:
		file = csv.reader(csvfile, delimiter=",")
		for row in file:
        point = {}
	    	values = []
            
        if skipRow:
            skipRow = False
        else:
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

	print points
	return points


doFormat("SumCallsDaily15days.csv")





