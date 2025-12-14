
export default function Hero() {
  return (
    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
      <h1 className="h1 mb-4" data-aos="fade-up">
        Landing template for startups
      </h1>
      <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
        Our landing page template works on all devices, so you only have to set it up once, and get beautiful results
        forever.
      </p>
      <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
        <div data-aos="fade-up" data-aos-delay="400">
          <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">
            Start free trial
          </a>
        </div>
        <div data-aos="fade-up" data-aos-delay="600">
          <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">
            Learn more
          </a>
        </div>
      </div>
    </div>
  )
}
