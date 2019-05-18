# post-sesame-status-to-mackerel

set up.

```
cd post-sesame-status-to-mackerel
npm install
zip -r post-sesame-status-to-mackerel.zip .
```

upload post-sesame-status-to-mackerel.zip to aws lambda.

require environment variables.

```
SESAME_TOKEN
SESAME_DEVICE_ID
MACKEREL_API_KEY
MACKEREL_SERVICE_NAME
```

setting cron to cloudwatch event for invoke post-sesame-status-to-mackerel function.
