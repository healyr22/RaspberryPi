import requests
from bs4 import BeautifulSoup
import yagmail
from time import sleep

def sendEmail(ip):
	yag = yagmail.SMTP("robert.raspberry3@gmail.com")
	yag.send("robert.healy3@gmail.com", "New External IP Address for PI", ip)

ip = ""
while True:
	response = requests.get("http://myexternalip.com")
	soup = BeautifulSoup(response.text, "html.parser")
	newIp = soup.select("#ip")[0].get_text()
	if(newIp != ip):
		print("New IP!")
		ip = newIp
		sendEmail(ip)
	sleep(5)