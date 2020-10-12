import app from './app';

import 'dotenv/config'

/**
 * Get port from environment and store in Express.
 */

let port = process.env.PORT || "5000";
console.log(`port is: ${process.env.PORT}`)

/**
 * Listen on provided port, on all network interfaces.
*/

export default app.listen(port, () => console.log(`Running on port ${port}`));