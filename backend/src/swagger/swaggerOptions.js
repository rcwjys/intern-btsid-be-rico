export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Intern Project Documentation',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Boards',
        description: 'API endpoints for managing boards',
      },
      {
        name: 'Auth',
        description: 'API endpoints for users Auth',
      },
      {
        name: 'List',
        description: 'API endpoints for managing lists'
      }, 
      {
        name: 'Task',
        description: 'API endpoints for managing lists'
      }, 
    ],
  },
  apis: ['./src/routes/*.js'],
};