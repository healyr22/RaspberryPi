from time import sleep
from requests import get

# ip = ""
# while True:
# 	print('My public IP address is: {}'.format(ip))
# 	newIp = get('https://api.ipify.org').text
# 	if(newIp != ip):
# 		print("New IP!")
# 		ip = newIp
# 		sendEmail(ip)
# 	sleep(5000)

def uploadFile(fileName):
	file_metadata = {'name': fileName}
	media = MediaFileUpload('externalIP/' + fileName,
	                        mimetype='text/plain')
	file = drive_service.files().create(body=file_metadata,
	                                    media_body=media,
	                                    fields='id').execute()
	println('File ID: ' + file.get('id'))

println("Attempting to upload text.txt")
uploadFile("text.txt")