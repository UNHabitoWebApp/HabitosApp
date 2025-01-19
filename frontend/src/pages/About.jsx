

const About = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
                <p className="text-gray-600">
                    Welcome to our application! This section is styled using Tailwind CSS to ensure everything is working correctly.
                </p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default About;
