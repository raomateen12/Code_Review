import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'

function App() {
  const [code, setCode] = useState(`function calculateSum(a, b) {
  // Add two numbers together
  const result = a + b;
  return result;
}

// Example usage
const sum = calculateSum(5, 3);
console.log('The sum is:', sum);`)
  
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Prism is already loaded
  }, []);

  async function reviewCode(){
    if (!code.trim()) {
      setReview(' Please enter some code to review!')
      return
    }
    
    setIsLoading(true)
    setReview(' Analyzing your code...')
    
    try {
      const apiUrl = import.meta.env.PROD ? '/api/ai/get-review' : 'http://localhost:3000/ai/get-review';
      const response = await axios.post(apiUrl, { code });
      setReview(response.data.response);
    } catch (error) {
      console.error('Error:', error);
      setReview(' **Error getting review**\n\nPlease try again. Make sure the server is running.');
    } finally {
      setIsLoading(false)
    }
  }

  const clearCode = () => {
    setCode('')
    setReview('')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          AI Code Review
        </h1>
      </header>
      
      <main className="main-content">
        <div className="panel left-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              Your Code
            </h2>
            <button onClick={clearCode} className="clear-btn" title="Clear Code">
              Clear
            </button>
          </div>
          
          <div className="code-editor">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.js)}
              padding={20}
              style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
                fontSize: 16,           // Perfect reading size
                lineHeight: 1.6,        // Comfortable line spacing
                border: 'none',
                borderRadius: '12px',
                minHeight: '100%',      // Take full available height
                width: '100%',
                overflow: 'auto',       // Enable scrolling within editor
                background: 'transparent',
                color: '#d4d4d4',       // Perfect light text on dark background
                outline: 'none',
                resize: 'none',         // Prevent manual resizing
              }}
              textareaProps={{
                style: {
                  outline: 'none',
                  resize: 'none',       // Prevent textarea resizing
                }
              }}
            />
          </div>
          
          <button 
            onClick={reviewCode}
            disabled={isLoading}
            className={`review-btn ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              <>
                 Get AI Review
              </>
            )}
          </button>
        </div>
        
        <div className="panel right-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              AI Review
            </h2>
          </div>
          
          <div className="review-content">
            {review ? (
              <div className="review-text">
                <pre>{review}</pre>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"></div>
                <h3>Ready for Code Review!</h3>
                <p>Write your JavaScript code in the editor and click "Get AI Review" to receive detailed feedback, suggestions, and improvements.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
    </div>
  )
}

export default App
