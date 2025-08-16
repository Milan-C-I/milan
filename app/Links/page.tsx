import type { NextPage } from "next"
import PlaceholderPage from "../../components/PlaceholderPage"
import GetInTouch from "@/components/getintouch"
import { FaExternalLinkAlt, FaForward } from "react-icons/fa"

const Links: NextPage = () => {
  return (
    <div className="min-h-[80vh] overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 mb-16 sm:my-28">
    <a
      href="https://codepen.io/Milan-C-I"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex w-fit bg-gradient-to-br from-white via-white to-orange-400 items-center gap-2 p-4 mb-4 bg-transparent border border-orange-500 rounded-lg transition-all duration-300 transform flex-1 justify-center hover:bg-gradient-to-br hover:from-black hover:via-black/80 hover:to-orange-400 hover:text-orange-500 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30
          text-black hover:bg-orange-500/10`}
    >
      <FaExternalLinkAlt className="text-sm" />
      <span
        className={`font-semibold text-sm hover:text-white`}
      >
        Check out my CodePen Snippets
      </span>
    </a>
    <GetInTouch />
    </div>
  )
}

export default Links
