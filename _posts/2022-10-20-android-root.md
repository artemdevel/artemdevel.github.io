---
layout: post
title: Android root
---

## Intro
Here is a collection of notes related to Android root. I will not describe any detailed methods to obtain root on a device
because it is different from vendor to vendor and from device to device. It is better to check the most recent instructions
for a vendor, for example, Google provides instructions on how to enable root on its Nexus or Pixel devices, or
check XDA Forums or projects like TWRP.

With the rooted device many various possibilities are available such as clean up the device from various default bloatware
or anything unwanted, install any compatible custom ROMs, perform advanced device backups etc. Back in the days of Android 2.3
when I rooted my HTC tablet and cleaned everything I didn't need it battery life improved so greatly that I couldn't believe it.
It is also possible to compile native binaries and install them into the system by just copying them into `/system/bin`.

The major drawback of rooting a device is that OTA won't be possible anymore. If you unlock the bootloader and modify anything,
for example, uninstalled something, the checksums won't be equal anymore and any updates won't be performed. The updates only
possible if the predefined software wasn't changed and the bootloader locked back (but what is the point to root the device 
then?). Another way, at least for Google, is to download an official Android image for a particular device and overwrite 
any custom changes.

Also you lose your warranty if you root your device.

## Root the device
The process of rooting a device includes several general steps.

#### Switch device to the `fastboot` mode
The device can be switched to the `fastboot` mode manually by using cryptic buttons combinations like
```
Power down the device. Then press and hold both Volume Up and Volume Down, then press and hold Power.
```
Such combinations are quite different from vendor to vendor and from device to device.  

Using `ADB`
```shell
adb reboot fastboot
```
or
```shell
adb reboot bootloader
```
NOTE: It is recommended to use the latest `fastboot` tool version.

Check if `fastboot` works fine
```shell
fastboot devices
```
NOTE: `fastboot` could require `sudo`.

#### OEM and flashing unlock
```shell
fastboot oem unlock
fastboot flashing unlock
```
NOTE: These commands could be obsolete or different for different vendors.

#### Flash some images
```shell
fastboot flash some-image-x.img
```
Usually the image is something like a TWRP image which will allow you to install tools like `SuperSU` or similar.
I think this command is totally obsolete now because of the `A/B System update` approach. At least for Google's devices
it looks like this
```shell
fastboot --slot=other flash bootloader some-bootloader-image.img
```
As soon as you have a custom bootloader flashed and it allows you to install a custom `su` tool you are the root.

My main concern for all of this was that all `su` tools I found at those times were closed source and you install
them on your device where you can have lots of private things and all such tools are rootkits in their nature and
you have installed them voluntarily. All of this drove me quite paranoid so at the end I only experimented with root
on some dedicated device which I bought for this purpose.

## Some other possible approaches for root
I was thinking about my own root for some time and collected some possible approaches on that. The latest thing I found
out is that the AOSP project has its own `su` implementation so most probably all the tools I tried before were based on it.
I gave up the idea eventually because with every new Android version things were changed/hardened and obviously would break
any approach to make a root. The generic root approach is rather impossible to implement except on the system level but
vendors probably never do this except for development tools.

#### Modify system manually
```shell
adb remount
adb push su /system/xbin/su
adb shell chmod 04755 /system/xbin/su
```
NOTE: unfortunately this doesn't work because `adb remount` requires `adb root` and `adb root` fails for `production builds`
Possible workaround is modify and recompile adb.

#### Modify system image and flash it
This looks relatively simple but it requires careful image modification and own `su` implementation. As the AOSP has its own
`su` implementation most probably it is possible to build (but the build must be for exact platform and CPU)

#### Set the suid bit
Copy the `shell` under existing root with the `suid` bit set. It requires root but it doesn't require any `su` or etc things.  
So if you have ADB with root you can copy the `shell` into another file with root permissions set. For example,
```shell
cat /system/bin/mksh /system/bin/sushi  
chmod 4777 /system/bin/sushi  
```  
This is a big security hole but this is quite a simple way to get root permanently.  
One more thing the system partition must be `rw` mounted.  
NOTE: unfortunately this doesn't work on Android 6.x and higher because of `SELinux`.  

## Things to do under the root

#### Uninstall bloatware
Remount `/system` partition as writable
```shell
mount -o rw,remount /system
```

Check `/system` partition status
```shell
mount | grep /system
```
or
```shell
cat /proc/mount | grep /system
```

List installed packages
```shell
adb shell pm list packages -f
```
```shell
adb shell pm list packages -f | grep /data/app
```
```shell
adb shell pm list packages -f | grep /system/app
```
```shell
adb shell pm list packages -f | grep /system/priv
```
NOTE: `-f` options shows package location on a file system.

Uninstall a package
```shell
pm uninstall --user 0 com.example.some.app
```
This command uninstalls a package for a selected user.
NOTE: sometimes `-k` option could be required for `uninstall`. This option keeps the data and cache directories around
after package removal.
  
The application can be uninstalled but its `.apk` file can still be present on the file system.
So it can be deleted for good or it can be installed back if the app is required again
```shell
pm install -r --user 0 /system/app/SomeApp/SomeApp.apk
```

List of users also can be get by `pm` command
```shell
pm list users
```

#### Dump partitions
In general any partition can be dumped and looks like every time more and more partitions are added. When I last
tried all of this there was only one `system` partition but more recent devices most probably have `system_a` and
`system_b` partitions (at least my Pixel 3 has) because of `A/B System updates` introduced some time ago.

Another important requirement is the free space availability on a device. A partition will be copied as a whole identical
copy so if the `system` partition size is 8GB then its dump file will be also 8GB. When I experimented with all of this
there was a possibility to insert a SD card and copy everything into it but SD card support is fading away recently.
Another option is try `USB OTG` (On-The-Go) cable and try to connect an external thumb drive to the device.

Get partitions list
```shell
cat /proc/partitions
```
or try to find anything with `fstab` in its name inside the `/etc` folder
```shell
cat etc/fstab.postinstall
```
NOTE: The name or the file location can be different, for example, `/fstab.sofia3g`.
Most probably some search will be required because files, partitions, their names and locations are wildly different on
all android devices. For example, this location can be checked as well `/dev/block/platform/soc/` and find `by-name` sub-folder
under it.
```shell
ls -al /dev/block/platform/soc/7c4000.sdhci/by-name/
```
the output is pretty long for my `Pixel 3`
```
...
lrwxrwxrwx 1 root root   21 1973-07-13 20:31 system_a -> /dev/block/mmcblk0p68
lrwxrwxrwx 1 root root   21 1973-07-13 20:31 system_b -> /dev/block/mmcblk0p69
...
```
NOTE: Such weird dates for the device made in the 21th century.

Copy partition using `dd`
```shell
dd if=/dev/block/mmcblk0p68 of=/some/large/storage/backup.img
```
or copy partition using `cat`
```shell
cat /dev/block/mmcblk0p68 > /some/large/storage/backup.img
```
The `cat` is much faster than `dd`.

Pull the dump file from the device
```shell
adb pull /some/large/storage/backup.img backup.img
```

Under Linux it is possible to mount copied image via loop interface
```shell
sudo mount -o loop backup.img /some/mount/path/
```

The booting partitions could be trickier because `cpio` format is used for them but they can be unpacked/repacked.
There were tools like `mkbootimg`, `mkbootfs` etc and the `cpio` util itself. Anyway it is better to check the most
recent information from vendors about what is going on there now.

#### Get list of all saved wifi networks with passwords
```shell
cat /data/misc/wifi/wpa_supplicant.conf
```
```
ctrl_interface=/data/misc/wifi/sockets
update_config=1
device_name=WW_P023
manufacturer=asus
model_name=P023
model_number=P023
serial_number=AAAAFP063208
device_type=10-00000204-5
config_methods=physical_display virtual_push_button
external_sim=1

network={
    ssid="NETWORK_1"
    psk="PASSWORD_1"
    key_mgmt=WPA-PSK
    priority=99
}

network={
    ssid="NETWORK_2"
    psk="PASSWORD_2"
    key_mgmt=WPA-PSK
    priority=33
}
```
