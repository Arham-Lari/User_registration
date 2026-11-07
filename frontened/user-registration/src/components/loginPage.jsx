
import { useState } from "react";
import { registration } from "../Api/ragistration.js";

const RegistrationPage = () => {

    let response ;

    const[popup,Setpopup]=useState(false);

    const [userData, setUserData] = useState({
        username: "",
        password: "",
        fullname: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUserData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
             response = await registration({
                username:userData.username,
                password:userData.password,
                fullname:userData.fullname,
                email:userData.email
            });
           
            console.log(response.data._id)


            Setpopup(true);

            setUserData({
                username: "",
                password: "",
                fullname: "",
                email: "",
            });

        } catch (error) {
            Setpopup(false)
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle =
        "w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-sm border border-gray-200">

                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Create Account
                </h1>

                <p className="text-gray-500 text-sm text-center mt-2 mb-7">
                    Enter your details to register
                </p>

                <form onSubmit={onSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            className={inputStyle}
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={userData.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            className={inputStyle}
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={userData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            className={inputStyle}
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            className={inputStyle}
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?
                    <a href="/login" className="text-blue-600 ml-1 font-medium">
                        Login
                    </a>
                </p>


{popup && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white p-8 rounded-xl shadow-lg text-center w-80">

            <div className="text-green-500 text-5xl mb-3">
                ✓
            </div>

            <h2 className="text-xl font-bold text-gray-800">
                Registration Successful!
            </h2>

            <p className="text-gray-500 mt-2">
                Your account has been created successfully.
            </p>

            <button
                type="button"
                onClick={() => Setpopup(false)}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
                Continue
            </button>
        </div>
    </div>
)}

        </div>
    </div>
)
}

export default RegistrationPage;
