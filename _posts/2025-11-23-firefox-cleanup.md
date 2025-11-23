---
layout: post
title: Firefox cleanup
---

Despite the fact the Firefox is more privacy-friendly the company often makes unexpected moves which looks rather 
annoying for Firefox's users. So here is my short collection of things to disable in Firefox.

All settings below can be accessed using `about:config` or they can be put into a file named `prefs.js` (or `user.js`)
which located in a Firefox profile folder.
```js
user_pref("some.setting.name", false); // "some.setting.name" is the same name as for about:config
```

The profiles folder located in:
- `~/.mozilla/firefox/` on Linux or `~/snap/firefox/common/.mozilla/firefox/ if Snap is used
- `/Library/Application Support/Firefox/Profiles` on Mac
- `%APPDATA%\Mozilla\Firefox\Profiles\` on Windows

IMPORTANT: Firefox parameters are quite messy. They could be `boolean` (`true`/`false`). They could be numbers, which sometimes
act as booleans (`1`/`0` as `true`/`false`) or it could be a range of numbers (see DoH below).

## Disable data submission for advertising purposes
This is for the times when Mozilla decided to play with "good" advertisers..
```
dom.private-attribution.submission.enabled
```
The parameter must be set `false`. The parameter type is `boolean`.  

## Disable various LLM and AI "integrations"
This is for the times when Mozilla decided that all users want LLMs in the browser..
```
browser.ml.enable
```
The parameter must be set `false`. The parameter type is `boolean`.
```
browser.ml.chat.enabled
```
The parameter must be set `false`. The parameter type is `boolean`.
```
browser.ml.chat.hideFromLabs
```
The parameter must be set `true`. The parameter type is `boolean`.
```
browser.ml.chat.hideLabsShortcuts
```
The parameter must be set `true`. The parameter type is `boolean`.
```
browser.ml.chat.page
browser.ml.chat.page.footerBadge
browser.ml.chat.page.menuBadge
browser.ml.chat.menu
browser.ml.linkPreview.enabled
browser.ml.pageAssist.enabled
browser.tabs.groups.smart.enabled
browser.tabs.groups.smart.userEnabled
extensions.ml.enabled
```
All the parameters above must be set `false`. The parameters type is `boolean`.

## Disable DoH
While DoH (DNS over HTTPS) considered privacy-friendly and useful thing it proved to be quite unstable if providers 
like CloudFlare goes down which happens not that rarely.  
Unfortunately Firefox uses CloudFlare for DoH (at least it was for the feature rollout) and this makes DoH quite unreliable sometimes.
```
network.trr.mode
```
The parameter must be set `5`. The parameter type is `number`.
The value can be in range `0-5` where `5` means the DoH disabled definitely and will be not enabled automatically back again..  
NOTE: The DoH also can be disabled in firefox settings.
```
network.trr.uri
```
The parameter type is `string`. At the moment it is empty for me maybe because I disabled DoH completely.
The `network.trr.mode` must be set to `3` to use it.

## Disable IPv6
Not a proved issue but there are some claims that disabling `IPv6` could improve long TLS handshakes in some cases.
```
network.dns.disableIPv6
```
The parameter must be set `true`. The parameter type is `boolean`.  

## Tweak Firefox UI
```
ui.prefersReducedMotion
```
The parameter must be set `1`. The parameter type is `number`.  
NOTE: I used this because Firefox introduced context menus (right-click menus) which are sort of resized while activated
and for some reason this annoyed me. Previously the context menu "just appeared" without any effects.
