import { format } from "date-fns"
import Image from "next/image";
import Link from "next/link"
import { FaSquareFacebook, FaSquareYoutube } from "react-icons/fa6"
import aveLogo from "./AVE logo_vegleges.svg"

export default function Footer() {
  let dateNow = format(Date.now(), "yyyy")

  return (
    <footer className="bg-ave-blue relative overflow-hidden">
      <div className="absolute w-full h-[120%] -mt-4 md:-mt-3 z-0">
        <div>
          <Image
            src={aveLogo}
            fill
            alt=""
            style={{
              opacity: 0.05,
              objectPosition: "center",
              objectFit: "fill",
            }}
          />
        </div>
      </div>
      <div className="py-12 md:py-8 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="md:flex md:items-center md:justify-between">
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0 justify-center gap-3">
              <li>
                <Link
                  href="https://www.facebook.com/ave.kurzus"
                  target="_blank"
                  className="flex justify-center items-center"
                  aria-label="Facebook - AVE kurzus"
                >
                  <FaSquareFacebook size="3em" color="white" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/c/Emm%C3%A1nuelK%C3%B6z%C3%B6ss%C3%A9gHU"
                  target="_blank"
                  className="flex justify-center items-center"
                  aria-label="Youtube - Emmanuel közösség"
                >
                  <FaSquareYoutube size="3em" color="white" />
                </Link>
              </li>
            </ul>

            <div className="text-white text-center text-base md:mr-4">
              <span>
                <span title={process.env.version}>&copy;</span> {dateNow}{" "}
                Emmánuel közösség - AVE szolgálat
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-50 bottom-1 right-1 text-ave-blue-500 text-xs m-0 p-0 leading-none">
        v{process.env.version}
      </div>
    </footer>
  );
}
