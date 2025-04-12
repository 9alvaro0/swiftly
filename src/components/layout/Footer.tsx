import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-600">
                            © {new Date().getFullYear()} Mi Proyecto. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            GitHub
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
