```
echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
watchman shutdown-server
```

origin api ky : AIzaSyAq7E7zOctCSJ7vqMJg0YQ1CpU2ldnpjpQ

server key AAAA4oN1NGc:APA91bGqU7-3NJN63dXzp_98wernQ8zqZ3xXQdJl3sqXDXoXhsSNhp6z0Uv-L0prhPaCG7JFlSsPrYL6ZR4BQ3nA_aKY-SkceUKGSlUMV3ukG-OPh9DpcnK6GUdU3IuPs6aQdc3tt3_y
expo push:android:upload --api-key <your-token-here>
