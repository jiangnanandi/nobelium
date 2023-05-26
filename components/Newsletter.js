import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    setStatus('Sending...')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      setStatus(data.message)
      setEmail('')
    } catch (error) {
      setStatus('Oops, something went wrong. Please try again later.')
      console.error(error)
    }
  }

  return (
    <div className="bg-gray-100 p-8 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Subscribe to our newsletter</h2>
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="border-gray-300 border-2 p-2 rounded-lg w-full mb-4"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          disabled={status === 'Sending...'}
          >
          {status === 'Sending...' ? 'Sending...' : 'Subscribe'}
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
    )
}