import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
// import tanqueblanco from "@/assets/tanqueblanco.png";
// import tanqueblanco from "@/assets/tanqueblanco.png";
import homeTanques from "@/assets/homeTanques.png";


const HomePage = () => {
  return (
    <>
      <main className="flex flex-col justify-start mx-auto gap-7 text-center flex-1 text-white ">
        <section className="bg min-h-screen relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <Navbar />

          <div className="relative max-w-[1420px] mx-auto flex flex-row justify-between items-center pt-36 px-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-left text-6xl font-bold">ROTOARG</h2>
                <h3 className="text-left text-4xl font-bold">Calidad duradera... Ind Argentina</h3>
              </div>
              <p className="max-w-xl text-lg text-left font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus enim aperiam possimus provident eius doloribus aliquam quos cum nobis culpa adipisci quia, et, ducimus sit cupiditate explicabo qui fuga labore?
              </p>
              <div className="text-left flex flex-row gap-4">
                <button className="bg-red-500 px-4 py-2 rounded-3xl border-2 border-red-500">
                  NUESTROS PRODUCTOS
                </button>
                <button className="bg-red-500 px-4 py-2 rounded-3xl border-2 border-red-500">
                  CONTACTANOS
                </button>
              </div>
            </div>

            <div className="relative flex gap-3">
              {/* <img src={tanqueblanco} alt="tanque de agua" className="h-96 w-auto" />
              <img src={tanquenegro} alt="tanque de agua" className="h-96 w-auto" /> */}
              <img src={homeTanques} alt="tanque de agua" className="h-1/6 w-auto" />
            </div>
          </div>
        </section>

        <section className="text-xl text-green-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam magnam rerum asperiores necessitatibus, suscipit autem natus maiores dolorem, corrupti possimus consequatur aliquid soluta at, repellat maxime similique error quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rerum ad accusantium fugit ab autem. Unde animi iste commodi. Veritatis cum rerum similique perferendis dicta voluptates laborum alias aliquam non. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit voluptatibus libero minima consequatur nam obcaecati porro inventore aut distinctio, possimus iure sequi eaque quo ipsa itaque sint animi molestiae. Incidunt.
        </section>

        <section className="text-xl text-green-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam magnam rerum asperiores necessitatibus, suscipit autem natus maiores dolorem, corrupti possimus consequatur aliquid soluta at, repellat maxime similique error quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rerum ad accusantium fugit ab autem. Unde animi iste commodi. Veritatis cum rerum similique perferendis dicta voluptates laborum alias aliquam non. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit voluptatibus libero minima consequatur nam obcaecati porro inventore aut distinctio, possimus iure sequi eaque quo ipsa itaque sint animi molestiae. Incidunt.
        </section>

        <section className="text-xl text-green-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam magnam rerum asperiores necessitatibus, suscipit autem natus maiores dolorem, corrupti possimus consequatur aliquid soluta at, repellat maxime similique error quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rerum ad accusantium fugit ab autem. Unde animi iste commodi. Veritatis cum rerum similique perferendis dicta voluptates laborum alias aliquam non. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit voluptatibus libero minima consequatur nam obcaecati porro inventore aut distinctio, possimus iure sequi eaque quo ipsa itaque sint animi molestiae. Incidunt.
        </section>

        <section className="text-xl text-green-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam magnam rerum asperiores necessitatibus, suscipit autem natus maiores dolorem, corrupti possimus consequatur aliquid soluta at, repellat maxime similique error quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rerum ad accusantium fugit ab autem. Unde animi iste commodi. Veritatis cum rerum similique perferendis dicta voluptates laborum alias aliquam non. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit voluptatibus libero minima consequatur nam obcaecati porro inventore aut distinctio, possimus iure sequi eaque quo ipsa itaque sint animi molestiae. Incidunt.
        </section>

      </main>

      <Footer />
    </>
  )
}

export default HomePage

// className="bg"
// flex-col justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center bg-fixed 3md:[background-size:100%_100%]