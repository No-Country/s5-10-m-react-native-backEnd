const app = require('./app.js');

app.listen(app.get('PORT'));

console.log(`Server running on port ${app.get('PORT')}`);