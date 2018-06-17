import SeatingChart from './seating-chart';

/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AdminSeatingChart} from './admin-view'
export {default as StudentSeatingChart} from './student-view'
export {SeatingChart} from './seating-chart'
export {sortTrio} from './sort-trio';
export {generatedSeats} from './generate-seats';
