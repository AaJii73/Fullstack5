import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateNew from './components/CreateNew'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notificationText, setNotificationText] = useState(null)
  const [errorText, setErrorText] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      console.log(user)

      window.localStorage.setItem('name', user.name)
      window.localStorage.setItem('username', user.username)
      window.localStorage.setItem('token', user.token)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
      setUser(null)
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('username')
      window.localStorage.removeItem('token')
      setUsername('')
      setPassword('')
  }

  const blogFormRef = useRef()

  const handleCreateNew = async (blog) => {

    try {
      blogFormRef.current.toggleVisibility()

      const response = await blogService.create({blog:blog, token:user.token})
      
      const blogs = await blogService.getAll()
      setBlogs( blogs )

      setNoticfication(`${blog.title} by ${blog.author} added`)


    } catch (exception) {
    }
  }

  const setNoticfication = (notification) => {
    setNotificationText(notification)
    setTimeout(() => {
      setNotificationText(null)
    }, 3000)
  }

  const setError = (error) => {
    setErrorText(error)
    setTimeout(() => {
      setErrorText(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

    if (window.localStorage.getItem('name'))
    {
      setUser({
        name: window.localStorage.getItem('name'),
        username: window.localStorage.getItem('username'),
        token: window.localStorage.getItem('token'),
      })
    }

  }, [])


  if (user){
  return (

    <div>
      <h2>blogs</h2>
      <Notification notification={notificationText} color={'green'} />
      <Notification notification={errorText} color={'red'} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <CreateNew
          createNewBlog={handleCreateNew}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

    )
  }else{
    return (
      <div>
        <h1>log in to application</h1>
        <Notification notification={notificationText} color={'green'} />
        <Notification notification={errorText} color={'red'} />
        <Login
        handleLogin={handleLogin} 
        setUsername={setUsername} 
        setPassword={setPassword}
        username={username}
        password={password}
        />
      </div>
      
    )
  }
}

export default App