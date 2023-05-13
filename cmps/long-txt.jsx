const { useState } = React

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (txt.length <= length) {
    return <span>{txt}</span>
  }

  const displayedText = isExpanded ? txt : txt.substring(0, length) + '...'

  return (
    <p>
      <span>{displayedText}</span>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </p>
  )
}