import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Landing from './components/Landing'
import Post from './components/Post'
import { PostsProvider } from './context/posts.context'

function App() {
    return (
        <PostsProvider>
            <div className="App 2xl:mx-96   xl:mx-full mx-5">
                <Router>
                    <Navbar />
                    <Routes>
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/" element={<Landing />}>
                            <Route path="/" element={<Home />} />
                            <Route exact path="/post/:id" element={<Post />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </PostsProvider>
    )
}

export default App
