function App() {
    return (
        <div className="App 2xl:mx-96   xl:mx-80   lg:mx-72 md:mx-12">
            <div className="flex w-full border-b-4 justify-center items-center">
                <div className="flex w-full  justify-between px-7 font-medium">
                    <div className="p-5 cursor-pointer">Home</div>
                    <div className="flex">
                        <ul className="flex ">
                            <li className="p-5 cursor-pointer">Sign in</li>
                            <li className="p-5 cursor-pointer">Register</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="h-screen bg-slate-100 mt-5">
                <div>
                    <h1>Heading</h1>
                </div>
            </div>
        </div>
    )
}

export default App
