 // Configure enzyme adapter
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

// require all modules ending in ".spec" from the
// current directory and all subdirectories
const testsContext = require.context('./src', true, /.spec$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('./src', true, /.ts$/);
componentsContext.keys().forEach(componentsContext);
