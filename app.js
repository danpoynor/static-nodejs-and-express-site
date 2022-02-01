const express = require('express');
const app = express();
const morgan = require('morgan');
const aboutRouter = require('./routes/about');
const port = process.env.PORT || 1337;
const { data } = require('./data.json');
// Using a controller file here to help keep code organized.
const { getAllProjects, getSingleProject, getRandomProject, getNextProject, getPreviousProject } = require('./controllers/projects');

app.set('view engine', 'pug');
app.set('views', './views');

// middleware
app.use(morgan('dev'))
app.use(express.json());
app.use('/static', express.static('public'));
app.use('/about', aboutRouter); // Using a /routes/about.js file to understand how this works

app.get('/', (req, res) => {
  res.render('index', { projects: getAllProjects(), randomProject: getRandomProject() });
});

app.get('/project/:id', (req, res) => {
  const id = req.params.id;
	if (data.projects[id]) {
    // Along with the project, the previous and next project ids are passed to the view for prev/next navigation
    res.render('project', { project: data.projects[id], prevProjectId: getPreviousProject(id), nextProjectId: getNextProject(id) });
	}
});

/**
 * Whenever an 'id' is passed in the url this middleware is called automatically.
 * Tests if the id param in the url is a number and if it is within the range of the projects array.
 * The id is then used as a parameter in getSingleProject() to get a project before passing it on to a view.
 *
 * Abstracting this out enables it to be reused in other routes if eventually needed.
 * For example if we add .put() or .delete() requests which also need to access a single project by id.
 * This gets run before the request is handled by the router, so 'next' is needed to continue to the router.
 * The variable name 'project' in 'req.project' could be named anything we want.
 *
 * @param {string} id
 * @returns {object}
 */
app.param('id', (req, res, next, id) => {
  // Test if the id contains a non-numeric characters
  const regEx = /^\d+$/;
  if (!regEx.test(id)) {
    const err = new Error(`The project ID &ldquo;${id}&rdquo; is not a number. <strong>Project ID must be a number!</strong>`);
    err.status = 404;
    return next(err);
  } else {
    req.parsedId = parseInt(id, 10);
    // Test if the id is a valid project id
    if (req.parsedId >= 0 && req.parsedId < data.projects.length) {
      req.project = getSingleProject(req.parsedId);
      return next();
    } else {
      const err = new Error(`The project ID &ldquo;${id}&rdquo; is not a valid. <strong>Project ID value must be between 0 and ${data.projects.length - 1}!</strong>`);
      err.status = 404;
      return next(err);
    }
  }
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Page Not Found!');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	err.status = err.status || 500;
  console.error(`Error: ${err.message}, Status: ${err.status}`);

	if (err.status === 404) {
		res.render('page-not-found', {err: err});
	} else {
		res.render('error', {err: err});
	}
});


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
