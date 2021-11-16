<h1 align="center">
    Project - Ngo Van Hau
</h1>

<p align="center">
  <strong>Kanj _ Connect Everyone - Everywhere:</strong><br>
  Build mobile apps with React Native.
</p>

# Contents

-   [Introduction](#-introduction)
-   [All of feature](#-all-of-feature)
-   [Run app in dev environment](#-run-app-in-dev-environment)
-   [Run app your android device](#-run-app-your-android-device)
-   [UI](#-ui)

# Introduction

Kanj app is a charity social networking application running on mobile phones, for the purpose of sharing information and creating auctions for charity purposes.

# All of feature

-   Manage feed
-   Manage auction
-   Search post by hashtag, username, content
-   Search auction by username, category, price, title
-   Change theme color, language
-   Edit profile, change avatar
-   Login with account, login by GG, register
-   Like/dislike feed, auction
-   Pay auction with Momo
-   Notification when have new comment, accept auction, like feed, like auction
-   Feedback
-   Chat
-   Rating user

# 📖 Run app in dev environment

You have 2 way to start project in development

## Required install

-   Node 12 or newer.
-   Java SE Development Kit (at least the version 8) or OpenJDK from AdoptOpenJDK
-   Android studio (make sure the boxes next to all of the following items are checked: Android SDK, Android SDK Platform, Android Virtual Device)

Follow the detail [installation instructions][install_env] to install development environment of React Native.

[install_env]: https://reactnative.dev/docs/environment-setup

## Start app with connect device by USB

Required

-   Android 5.0 (Lollipop) or newer
-   Connected via USB
-   USB debugging enabled

Run this command

```
yarn android&&yarn start
```

## Start app with expo app in your phone

Required

-   Expo Go app installed

### Step

1. Run this command

```
expo start
```

2. Scan the QR code with Expo Go

## For production

1. Build apk

```
cd android && ./gradlew assembleRelease
```

2. Install apk

```
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

3. Start server local

```
cd app&&python3 manage.py runserver localhost:5000
```

Server of this project releases in this [repo][repo-link-server].

[repo-link-server]: https://github.com/haungo2109/btl_caccongnghelaptrinhhiendai

# Run app your android device

Copy and install file **kanj-app.apk** in your android device

# UI

**Wellcome Screen**

<img src="app/assets/ui/wellcome.jpg" width="200">

**Login Screen** (by account and by Google)

<img src="app/assets/ui/login.jpg" width="200">
<img src="app/assets/ui/login-gg.jpg" width="200">

**Register Screen**

<img src="app/assets/ui/register.jpg" width="200">

**Draw Screen**

<img src="app/assets/ui/draw-bar.jpg" width="200">

**Register Screen**

<img src="app/assets/ui/register.jpg" width="200">

**Home Screen**

<img src="app/assets/ui/home.jpg" width="200">

**Home-My Auction Screen**

<img src="app/assets/ui/home-auction.jpg" width="200">

**Home-My Join Auction Screen**

<img src="app/assets/ui/home-aiction-join.jpg" width="200">

**Home-Notification Screen**

<img src="app/assets/ui/home-notification.jpg" width="200">

**Auction Screen**

<img src="app/assets/ui/auction.jpg" width="200">

**Auction Create Screen**

<img src="app/assets/ui/auction-create.jpg" width="200">

**Auction Detail Screen**

<img src="app/assets/ui/auction-detail.jpg" width="200">

**Auction Pay Screen**

<img src="app/assets/ui/auction-pay-comment.jpg" width="200">

**Momo Confirm Screen**

<img src="app/assets/ui/momo-confirm.jpg" width="200">

**Choose App Momo Screen**

<img src="app/assets/ui/momo-choose-app.png" width="200">

**Message Screen**

<img src="app/assets/ui/message.jpg" width="200">

**Message Screen**

<img src="app/assets/ui/chat.jpg" width="200">

**Feed back Screen**

<img src="app/assets/ui/feedback.jpg" width="200">

**Introduction Screen**

<img src="app/assets/ui/introduction.jpg" width="200">

**Setting Screen**

<img src="app/assets/ui/setting.jpg" width="200">

**Dark mode && English Language Screen**

<img src="app/assets/ui/draw-dark-mode.jpg" width="200">
