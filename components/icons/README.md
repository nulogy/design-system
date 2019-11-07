# Icons

We use a subset of "Outlined" Material icons at Nulogy. To find and add a new one:

1. Search https://material.io/resources/icons/ for the icon you need
2. Download svg and rename to desired icon name (in camelCase)
3. Place svg in `/icons/` folder
4. In the `/components` directory, run `yarn icons` to make the icon available to use
5. Run `yarn start` and verify the icon was added correctly at [http://localhost:8080/?path=/story/icon--icon](http://localhost:8080/?path=/story/icon--icon)
6. After verifying the icon is there, update storyshots with `yarn storyshots:update`
7. Submit PR

If the icon you need can't be found in the Material Design collection, please reach out on #design-system on Slack.
