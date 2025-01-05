---
layout: post
title: Work with ADB
---

## Intro
`ADB` stands for `Android Debug Bridge`. I worked with Android when it was 4.4 KitKat and it was a fun time.
Probably `ADB` is the first thing you need to get working when starting to develop for Android. I'm not going to put 
any information here on how to install it. It changes and improves from time to time so it is better to get the latest info
from the official sources.

Most problems I had were related to Windows and USB drivers. On Ubuntu/Linux it was fairly
easy to get everything working and I've never tried to develop for Android under macOS. Also more options available for
Android at the moment like remote debugging using Wi-Fi but I've never tried this as well. 

## Commands
Get connected devices list. This is the very first command to check that everything works fine.  
No errors should be shown here:
```shell
adb devices
```
```
List of devices attached
333AY0JFQD  device
```
By default, you are not the `root` and this limits your possibilities. It is possible to get the `root` access but I also
will not cover it in detail because this procedure is different from vendor to vendor and from device to device so it is
better to find the most recent information available.

Connect to a device's shell:
```shell
adb shell
```
In case if several devices are connected or several Android emulators are running `-s` option can be used to select a specific device:
```shell
adb -s 333AY0JFQD shell
```
The `shell` is more or less standard and is based on `ash` and many commands are based on `toybox`. At least at the moment.
So it is possible to run commands like:
```shell
ls -al
cat /proc/cpuinfo
```
Check device's logs (this shows ALL the logs):
```shell
adb logcat
```
The logs can be filtered by a level or by a tag or by a tag and a level etc (there many options for `logcat`):
```shell
adb logcat "*:E"
adb logcat -s CarrierServices
adb logcat -s CarrierServices:E
```
List installed packages:
```shell
adb shell pm list packages
```
This way it is possible to detect/check for bloatware and try to uninstall it (but no luck without the `root` access):
```shell
adb uninstall com.some.application
```
It is possible to install an APK file as well:
```shell
adb install -r someApplication.apk
```
It is possible to make a screenshot and pull it from the device:
```shell
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png
adb shell rm /sdcard/screen.png
```
Starting from the version 4.4 KitKat it is also possible to record a video:
```shell
adb shell screenrecord --verbose /sdcard/demo.mp4
adb pull /sdcard/demo.mp4
adb shell rm /sdcard/demo.mp4
```
Push a file into the device:
```shell
adb push some_music_file.mp3 /sdcard/music
```
Pull a file from the device:
```shell
adb pull /sdcard/music/some_music_file.mp3
```

## Work with events
When you interact with the device as a user everything is an event. Touches, button presses etc.
All such events can be captured and sent back if required.
```shell
adb shell getevent -l
```
Possible output:
```
/dev/input/event1: EV_ABS       ABS_MT_TRACKING_ID   00004bcd            
/dev/input/event1: EV_ABS       ABS_MT_POSITION_X    00000088 <---- 136
/dev/input/event1: EV_ABS       ABS_MT_POSITION_Y    00000702 <---- 1794  
/dev/input/event1: EV_ABS       ABS_MT_PRESSURE      00000031            
/dev/input/event1: EV_ABS       ABS_MT_TOUCH_MAJOR   00000005            
/dev/input/event1: EV_SYN       SYN_REPORT           00000000            
/dev/input/event1: EV_ABS       ABS_MT_TRACKING_ID   ffffffff            
/dev/input/event1: EV_SYN       SYN_REPORT           00000000            
```
Send a touch event back:
```shell
adb shell input tap 136 1794
```
This is quite fun and can be used for tests or for automating something. Back in the days I created a shell alias which
automatically unlocked my old `Nexus 5` device by this command:
```shell
adb shell input keyevent 82 && adb shell input text 1234 && adb shell input keyevent 66
```
`82` - is the power button click code  
`input text <code>` - enters the code into the PIN input field  
`66` - `OK` button click code  

This doesn't work anymore because now when you click the power button the locked screen is shown and you need to swipe 
it up to get the PIN input screen (if any). In case if no PIN set the power button click should be enough. So for my
newer `Pixel 3` I got this:
```shell
adb shell input keyevent 82 && sleep 0.5 && adb shell input swipe 100 1500 100 500 && adb shell input text 1234 && adb shell input keyevent 66
```
A small `sleep` is required after the screen is on  
`input swipe` is a swipe gesture emulation. The numbers are `X1=100` `Y1=1500` `X2=100` `Y2=500`. There is also an additional
`Duration` parameter for swipe but I omitted it here.  
The reset is the same as for the `Nexus 5`.

There are many other possibilities which `ADB` provides, for example, start an application, reboot a device, reboot a device
in special modes etc. but I'm not going to cover all of that here.
