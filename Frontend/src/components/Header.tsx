import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className=" bg-teal-600 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">JojoHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-teal-700 rounded"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-teal-700 rounded"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="flex bg-white items-center text-teal-600 px-3 rounded font-bold hover:bg-teal-100 hover:scale-95"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
