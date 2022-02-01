/**
 * @description The projects controller is responsible for handling various requests to data/projects.json
 */
const { data } = require('../data.json');
const { projects } = data;

const getAllProjects = () => {
  return projects;
};

const getSingleProject = parsedId => {
  return projects[parsedId];
};

const getRandomProject = () => {
  return projects[Math.floor(Math.random() * projects.length)];
};

const getNextProject = id => {
  id = parseInt(id, 10);
  // If last project, return the first project
  if (id === projects.length - 1) {
    return 0;
  }
  return id + 1;
};

const getPreviousProject = id => {
  id = parseInt(id, 10);
  // If first project, return the last project
  if (id === 0) {
    return projects.length - 1;
  }
  return id - 1;
};

module.exports = {
  getAllProjects, getSingleProject, getRandomProject, getNextProject, getPreviousProject
};
