export { GET, POST } from '@/app/_lib/auth.js';

// We are importing and then exporting the functions in a single line (It is a special syntax, saves us lines of code)

// This route.js file will handle any route after '/api/auth/'
// Eg. /api/auth/any, /api/auth/any/any2, /api/auth/any/any2/any3, /api/auth/any/any2/any3/LiterallyAnyNestedLengthRoute

// Important predefined routes are: .../signin, .../signout, .../providers
