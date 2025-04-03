
export default function Home() {
  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="m-32 pt-32">
          <h1 className="text-3xl">Welcome to the Star Wars Library !</h1>
          <br />
          <h2 className="text-xl">What's the SWL ? </h2>
          <p>
            SWL is a student project, the goal was to use API for the first time in my web developer adventure. We had free choice of which API to use, 
            and you could guess it by the name of the website, the first thing that comes to my mind when I'm given free will is Star Wars. 
            <br />
            So, this website you're currently visiting uses the <a href="https://swapi.dev">SWAPI API</a>, which is a little bit old but is really nice to
            work with as an introduction to APIs. 
            <br />
            I can't assure the pictures I used for this project will always work since I used old images bank, and the website absolutely lack of good styling,
            but since it was not the goal of this project, I did not spend too much time on this part. 
            <br />
            I hope you'll enjoy the information you can find on the Star Wars Library !
          </p>
        </div>
      </main>
    </div></>
  );
}
