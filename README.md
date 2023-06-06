# Ableton UI

Running app
```
nvm use
./run.sh
```

https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html

To build/deploy the app
```
yarn build
aws s3 sync build s3://lbert.io/
```