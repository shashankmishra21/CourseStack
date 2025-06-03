import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className='flex justify-between items-center p-6'>
            <div className="flex items-center gap-2">
                <img src='/logo_cs.png' alt='' className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-white font-bold">CourseStack</h1>
            </div>

            <div className="flex gap-4">
                <Link
                    to={"/Signin"}
                    className="bg-transparent text-white font-bold py-2 px-4 border border-white rounded hover:bg-white hover:text-purple-700 transition duration-200"
                >
                    Signin
                </Link>
                <Link
                    to={"/Signup"}
                    className="bg-transparent text-white font-bold py-2 px-4 border border-white rounded hover:bg-white hover:text-purple-700 transition duration-200"
                >
                    Signup
                </Link>
            </div>
        </header>
    )

}

export default Navbar;