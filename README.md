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

# How to use

You have 2 way to start project in development

## Start app with connect device by USB

Required

-   Android 5.0 (Lollipop) or newer
-   USB debugging enabled
-   connected via USB

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

# For production

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
cd ../../btl_caccongnghelaptrinhhiendai/&&source venv/bin/activate.fish&&cd app&&python3 manage.py runserver 192.168.1.21:5000
```
