# Static Node.js and Express Site


## About This Project

This is a portfolio website created with Node.js, Express, and Pug templates. The site includes a landing page, about page, and project detail pages as part of an exercise in creating fast, modular and dynamic web applications.

---

## Style Changes Made

* `box-shadow` updated on `.cell img ` images.
* `:hover` transition added to `.cell img ` image box-shadows and rotation.
* `body`, `.sidebar`, and link colors updated.
* Added `.prev-next-project-nav` style for previous and next project navigation on project detail pages.

---

## Features

* Landing page with list of at least 5 projects.
* Project detail pages for each project.
* Personalized About page.
* Added `page-not-found.pug` template used for 404 errors.
* Added `error.pug` template use for all other errors.
* `data.json` file added containing a projects property set to an array containing at least five project objects.
* Each project object in the data includes:
  * `id`
  * `project_name`
  * `description`
  * `technologies`
  * `live_link`
  * `github_link`
  * `image_urls`

---

## Additional Added Features

* Controller added containing project related functions.
* Morgan logger added to log requests in the console.
* Random mystery project included in project list.
* "Previous Project" and "Next Project" links added to project detail pages.
* Helpful contextual error messaging hints added to `/projects/*` area, such as "Project ID value must be between 0 and 4!"

---

## Error handling

Urls tested to ensure they generate errors:

http://localhost:3000/noroute
Error page message: Page Not Found!

http://localhost:3000/project/noroute
Error page message: Page Not Found!

http://localhost:3000/project/2x
Error page message: The project ID "2x" is not a number. Project ID must be a number!

http://localhost:3000/project/99
Error page message: The project ID "99" is not a valid. Project ID value must be between 0 and 4!

---

## Running Locally

<details>
<summary>expand/collapse</summary>

```zsh
git clone git@github.com:danpoynor/static-nodejs-and-express-site.git
cd static-nodejs-and-express-site
npm install
```

Then to run the app in production mode:

```zsh
node app.js
```

This will automatically start the app at [http://localhost:1337/](http://localhost:1337/)

Or, to run the app in development mode instead:

```zsh
npm run watch
```

The app will then be running at [http://localhost:1337/](http://localhost:1337/). Now when any changes are made to .js, .pug, or .json files the server will be restarted (by `nodemon`) and you can manually refresh your browser to see the latest changes.

</details>

---

## My Deployment Process

<details>
<summary>expand/collapse</summary>

To deploy to Heroku, you first must have a Heroku account and the Heroku CLI application install. More info at: [Heroku Dev Center](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

Create the Heroku app and add a new origin to your git repo use (note if app name not included a random one will be used):

```zsh
heroku apps:create danp-public-api-request
```

Add a `Procfile` and check package.json "engines" is defined.

Test the app locally with:

```zsh
heroku local
```

The app will then be running at [http://localhost:5000/](http://localhost:5000/)

Then to deploy to Heroku, you must first push your code to the Heroku repo:

```zsh
git push heroku main
```

If an error message appears saying the tip of your branch is behind the remote, you can force the update using:

```zsh
git push heroku main --force
```

Then the app will be running at in your Heroku account

To open the site from the command line use:

```zsh
heroku open
```

Even thought `heroku local` might look okay errors can still occur once the app is deployed.

If errors occur when viewing the Heroku app at your-app-name.herokuapp.com, such as 'internal sever error', you can use the local Heroku app to view the server logs:

```zsh
heroku logs
```

Things you might need to check are files in /views used in your routes have the correct capitalization, and that Pug is in dependencies and not devDependencies.

</details>

---

## Technologies Used

* HTML
* CSS
* JavaScript
* Git and GitHub
* VS Code
* Accessibility
* OOP
* Fetch and Public APIs
* Node.js
* Express
* Pug
