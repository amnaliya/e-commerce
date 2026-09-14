import { Link } from "react-router-dom";

function Aboutus() {
  return (
    <>
      <div className="min-h-screen bg-[#f7f3eb]">
        <section className="px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="text-xs tracking-[0.3em] text-[#1F4D3A] sm:text-sm">
            WELCOME TO YESTERA
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-[#4A2C22] sm:text-5xl lg:text-6xl">
            Where Every Era Tells a Story
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            YESTERA is a vintage marketplace created for people who believe that
            beautiful things deserve a second story.
          </p>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div className="rounded-xl bg-white p-7 shadow-sm sm:p-10">
              <p className="text-sm tracking-widest text-[#1F4D3A]">
                OUR STORY
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-[#4A2C22] sm:text-4xl">
                A Love for the Past
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                We started YESTERA with a simple idea — the past should never
                feel forgotten.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                From vintage cameras and vinyl records to timeless posters and
                unique collectibles, every piece carries a little bit of
                history. We bring these pieces together so they can find a new
                home and become part of someone else's story.
              </p>
            </div>

            <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-[#1F4D3A] p-8 text-center sm:min-h-[380px]">
              <div>
                <p className="font-serif text-5xl text-[#f7f3eb] sm:text-6xl">
                  Y
                </p>

                <p className="mt-4 font-serif text-2xl font-bold text-[#f7f3eb]">
                  YESTERA
                </p>

                <p className="mt-2 text-sm tracking-widest text-[#e5d8c7]">
                  EST. WITH A LOVE FOR VINTAGE
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm tracking-widest text-[#1F4D3A]">
              WHAT WE BELIEVE
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#4A2C22] sm:text-4xl">
              More Than Just Vintage
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <div className="rounded-xl bg-[#f7f3eb] p-7">
                <div className="text-3xl">📷</div>

                <h3 className="mt-4 font-serif text-xl font-bold text-[#4A2C22]">
                  Timeless
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  We celebrate objects that continue to hold their charm through
                  generations.
                </p>
              </div>

              <div className="rounded-xl bg-[#f7f3eb] p-7">
                <div className="text-3xl">♻️</div>

                <h3 className="mt-4 font-serif text-xl font-bold text-[#4A2C22]">
                  Sustainable
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Giving vintage pieces a new home means giving old treasures a
                  new life.
                </p>
              </div>

              <div className="rounded-xl bg-[#f7f3eb] p-7">
                <div className="text-3xl">✨</div>

                <h3 className="mt-4 font-serif text-xl font-bold text-[#4A2C22]">
                  Meaningful
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Every piece has a story, and we want you to become part of it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 text-center sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm tracking-widest text-[#1F4D3A]">
              OUR MISSION
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#4A2C22] sm:text-4xl">
              Giving Yesterday a Place in Tomorrow
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              At YESTERA, our mission is to make vintage accessible, beautiful,
              and meaningful. We want every customer to discover something that
              feels like it was meant to be found.
            </p>
          </div>
        </section>

        <section className="border border-[#D8DFD2] px-5 py-14 text-center sm:px-8">
          <h2 className="font-serif text-3xl font-bold text-[#1F4D3A] sm:text-4xl">
            Find Something With a Story
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#4A2C22] sm:text-base">
            Explore our collection and discover a piece from another era waiting
            to become part of yours.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-block bg-[#f7f3eb] rounded-full bg-[#f7f3eb] px-7 py-3 font-semibold text-[#4A2C22] transition hover:bg-[#e8dccb]"
          >
            Explore Collection →
          </Link>
        </section>
      </div>
    </>
  );
}

export default Aboutus;
