import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('./chat-widget'), { ssr: false })

export default function ChatWidgetClientOnly() {
  return <ChatWidget />
}
