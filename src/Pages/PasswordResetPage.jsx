const PasswordResetPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Send Reset Link
        </button>
        <p className="mt-4 text-center text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default PasswordResetPage;
