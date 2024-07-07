import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"


const Home = () => {
  const { t } = useTranslation()
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  const handleCount = () => setCount(c => c + 1)
  const handleText = (e: ChangeEvent<HTMLElement>) => setText('hellos ' + e.target.value)
  return (
    <div>
      <h1>Home</h1>
      <h2>{count}</h2>
      <button onClick={handleCount}></button>
      <Link to='management'>Management</Link>
      <h3>{t('HELLO')}</h3>
      <input
        type="text"
        onChange={handleText}
      />
      <h4>{text}</h4>
    </div>
  )
}

export default Home