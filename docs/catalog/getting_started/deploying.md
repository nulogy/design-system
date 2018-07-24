The [nulogy.design](http://nulgoy.design) website is deployed to [Netlify](https://app.netlify.com/sites/nulogy-design-system/) using [continuous deployment](https://www.netlify.com/docs/continuous-deployment/) on every merge to the [master branch](https://github.com/nulogy/design-system).

This means that you can trigger a new deploy automatically simply by merging a pull-request, or even by editing a markdown file directly in GitHub's online file editor.

## Some useful links

- Website: [http://nulogy.design](http://nulogy.design])
- Netlify – Web server and CD server: [https://app.netlify.com/sites/nulogy-design-system/](https://app.netlify.com/sites/nulogy-design-system/)
- GitHub repo: [https://github.com/nulogy/design-system](https://github.com/nulogy/design-system)

## Configuration

There is a [`netlify.toml`](https://www.netlify.com/docs/netlify-toml-reference/) in the root of the repo that tells Netlify how to build the project. At this time the only package that is deployed to Netlify is the [nulogy.design](http://nulogy.design) website in the `docs/` folder / `@nulogy/nulogy-design` package. Some additional configuration is done through the [Netlify web UI](https://app.netlify.com/sites/nulogy-design-system/).

## Setting up a fork to publish to Netlify

You may want to publish your fork to the web to share with others. You can configure Netlify from the command line to get this working.

On GitHub, create a fork of the [https://github.com/nulogy/design-system](https://github.com/nulogy/design-system) repo and clone the fork to your machine. Follow the [setup instructions](getting_started/setup) to get your fork running locally.

### `netlifyctl` command line tool

The `netlifyctl` tool allows you to interact with the netlify service from the command line.

Install the `netlifyctl` via [instructions on github](https://github.com/netlify/netlifyctl).

Configure your fork to publish to Netlify:

```code
lang: sh
---
$ cd path/to/design-system/fork
$ netlifyctl init --manual
```

Follow the instructions in the terminal:

1. Answer `yes` to the first question (`Create a new site? (yes/no)`).
1. The project has a `netlify.toml` config in the root so you can just hit `return` to accept the defaults for the next two questions.
1. You will be asked to add an SSH key to your repo. Add it here: [https://github.com/___YOUR_GITHUB_USER___/design-system/settings/keys](https://github.com/_YOUR_GITHUB_USER_/design-system/settings/keys)
1. You will be asked to configure a webhook: 
  1. Go here: [https://github.com/___YOUR_GITHUB_USER___/design-system/settings/hooks](https://github.com/_YOUR_GITHUB_USER_/design-system/settings/hooks)
  1. Click "Add a webhook".
  1. Enter the url provided in the terminal as the "Payload URL"
  1. Select "`application/json`" as the "Content type".
  1. Click the "Let me select individual events" radio button.
    1. Choose "Pushes" and "Pull requests".

If all goes well you will be given a Netlify url. Now whenever you push or merge to master on your fork on GitHub, it will trigger a build.

## Netlify account

At the moment, the Netlify account is run by [Ned Schwartz](https://github.com/theinterned). Get in touch if you need help!