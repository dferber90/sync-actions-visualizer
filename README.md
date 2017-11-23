# sync-actions-visualizer

Shows generated
[sync-actions](https://commercetools.github.io/nodejs/sdk/api/syncActions.html)
for different data.

Live on
[sync-actions-visualizer.dferber.de](http://sync-actions-visualizer.dferber.de/).

> This project was bootstrapped with
> [Create React App](https://github.com/facebookincubator/create-react-app).

## Deployment

### One-Time setup

#### `s3_website`

To deploy, make sure you have
[`s3_website`](https://github.com/laurilehmijoki/s3_website) installed globally.

#### Set up `.env` file

Create a `.env` file containing your configuration.

```
S3_ID=xyz
S3_SECRET=xyz
S3_BUCKET=xyz.foo.de
CF_DIST_ID=xyz
```

Replace the values with your actual access data.

### Deploying

* Run `yarn build` to create the production bundle
* Run `yarn deploy` to deploy the created bundle
