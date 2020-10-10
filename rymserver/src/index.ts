import app from './app';

import dotenv from 'dotenv';
dotenv.config()

/**
 * Get port from environment and store in Express.
 */

let port = process.env.PORT || "5000";

/**
 * Listen on provided port, on all network interfaces.
*/

app.listen(port, () => console.log(`Running on port ${port}`));