import type { NextPage } from 'next'

interface State {}

const HomePage: NextPage = () => {
  return (
    <main>
      <header className="container mx-auto">header</header>
      <div className="pt-40 text-center">
        <h1 className="text-4xl font-bold sm:text-7xl">PostGPT</h1>
        <p>클릭 한 번으로 ChatGPT 대화를 공유하세요.</p>
        <p>트위터, 레딧 등의 커뮤니티에 손쉽게 업로드하세요.</p>
      </div>
      <div className="container mx-auto grid grid-cols-3">asd</div>
    </main>
  )
}

export default HomePage
