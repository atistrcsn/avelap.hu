import Link from "next/link";
import { FaInfo } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="mx-6 lg:mx-0 flex flex-col gap-6">
      <h2 className="flex flex-row items-baseline text-2xl text-ave-blue">
        <FaInfo size={30} />
        <span>Az oldal nem található</span>
      </h2>
      <p className="p-0 m-0! mt-3!">Lehetséges okok:</p>
      <ul className="not-found-funny-causes">
        <li>
          <strong>Baptista magyarázat:</strong>
          <span>
            valamilyen bűn van az életedben. Mindenki másnak rendesen megnyílik.
          </span>
        </li>
        <li>
          <strong>Presbiteriánus magyarázat:</strong>
          <span>Istennek nem az az akarata, hogy megnyisd ezt a linket.</span>
        </li>
        <li>
          <strong>"Hit szava" magyarázat:</strong>
          <span>
            A hit hiánya miatt nem tudod megnyitni ezt a linket. A negatív
            szavaid megakadályozzák, hogy valóban lásd ennek a linknek a
            beteljesedését.
          </span>
        </li>
        <li>
          <strong>Karizmatikus magyarázat:</strong>
          <span>
            Feloldattál a te betegségedből. Parancsolom neked: Nyílj meg!
          </span>
        </li>
        <li>
          <strong>Unitariánus magyarázat:</strong>
          <span>
            Minden link egyenlő, szóval ha ez a link neked nem működik,
            nyugodtan próbálkozz másikkal, hátha valamelyik örömet és
            kiteljesedést ad.
          </span>
        </li>
        <li>
          <strong>Buddhista magyarázat:</strong>
          <span>...................</span>
        </li>
        <li>
          <strong>Episzkopális magyarázat:</strong>
          <span>Azt mondod, hogy valami problémád van a melegekkel?</span>
        </li>
        <li>
          <strong>Keresztény Tudomány magyarázat:</strong>
          <span>Linkek nem is léteznek.</span>
        </li>
        <li>
          <strong>Ateista magyarázat:</strong>
          <span>
            Az egyetlen ok, amiért úgy gondolod, hogy ez a link létezik, az az,
            hogy szükséged volt rá, hogy kitaláld.
          </span>
        </li>
        <li>
          <strong>A lelkigondozód magyarázata:</strong>
          <span>- Mit éreztél, amikor nem nyílt meg ez a link?</span>
        </li>
      </ul>
      <Link
        href="/"
        className="text-ave-blue font-bold inline-flex flex-row items-center"
      >
        <FaChevronLeft size={14} />
        <span>Vissza a főoldalra</span>
      </Link>
    </div>
  );
}
