from gpiozero import LED, Button, MotionSensor
from time import sleep

led = LED(17)
button = Button(2)
led.on()

button.when_pressed = led.on
button.when_released = led.off



pir = MotionSensor(4)

while True:
    led.on()
    sleep(0.1)
    if pir.motion_detected:
         led.off()
         sleep(0.1)
