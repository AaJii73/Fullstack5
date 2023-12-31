import { useState } from 'react'

const CreateNew = ({ createNewBlog }) => {

    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState('') 

    const addBlog = (event) => {
        event.preventDefault()
        createNewBlog({
            title: title,
            author: author,
            url: url
        })
    
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    

    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)} />
                </div>

                <button type="submit">create</button>
            </form>
        </div>  
    )
}
  
  export default CreateNew