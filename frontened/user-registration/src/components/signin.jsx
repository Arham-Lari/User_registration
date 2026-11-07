
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../Api/loginApi.js";

const LoginPage = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!userData.email || !userData.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await login(userData);
            console.log("Login successful:", response);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-10">

            {/* Background gradients */}
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-700/30 blur-[120px]" />

            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-700/30 blur-[120px]" />

            {/* Login Card */}
            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-10"
            >

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-2xl">
                        🔐
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Login to continue to your account.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={userData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Registration Link */}
                <p className="mt-8 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        to="/registration"
                        className="font-bold text-indigo-400 transition hover:text-purple-400"
                    >
                        Sign up
                    </Link>
                </p>

            </form>
        </div>
    );
};

export default LoginPage;

