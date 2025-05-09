function footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">© 2023 AgendaFácil</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-blue-500"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-gray-500 hover:text-blue-400"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-gray-500 hover:text-pink-500"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default footer;