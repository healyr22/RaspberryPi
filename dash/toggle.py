import requests
import sys

def getUrl(bulb):
	return "http://192.168.1.2/api/FSliJM3xX21iUPFN86Nnvk5eQ973bjsq4jQvKRoA/lights/" + bulb + "/"

def toggle(bulb):
	toggleUrl = getUrl(bulb) + "state"
	toggle = not getStatus(bulb)
	requests.put(toggleUrl, data='{"on":' + str(toggle).lower() + '}')

def getStatus(bulb):
	r = requests.get(getUrl(bulb))
	return r.json()["state"]["on"]

if len(sys.argv) != 2:
	print("Wrong")
	sys.exit()

for bulb in sys.argv[1].split(","):
	toggle(bulb)